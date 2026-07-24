"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseActionClient } from "@/lib/supabase/action";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { buildAuthRedirect, safeInternalPath } from "./redirects";
import { requireAuthenticatedUser, requireBasaltRole, resolveLoginDestination } from "./access";
import { logPortalEvent, logPortalWarning } from "./logging";
import { inviteUserSchema } from "./validation";

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

const resetSchema = z.object({
  email: z.string().email(),
});

const updatePasswordSchema = z.object({
  password: z.string().min(8, "Use at least 8 characters."),
  confirmPassword: z.string().min(8),
});

const acceptInviteSchema = z.object({
  fullName: z.string().min(2).max(160),
});

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Check your email and password." };
  }

  const supabase = await createSupabaseActionClient();
  if (!supabase) return { status: "error", message: "Portal access is not configured." };

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    logPortalWarning("login_failed", { email: parsed.data.email });
    return { status: "error", message: "Unable to sign in with those details." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { status: "error", message: "Unable to confirm your session." };

  const destination = parsed.data.next?.startsWith("/") && parsed.data.next !== "/clubs"
    ? safeInternalPath(parsed.data.next)
    : await resolveLoginDestination(supabase, user.id);

  logPortalEvent("login_success", { userId: user.id, destination });
  redirect(destination);
}

export async function logoutAction() {
  const supabase = await createSupabaseActionClient();
  await supabase?.auth.signOut();
  redirect("/login");
}

export async function requestPasswordResetAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = resetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const supabase = await createSupabaseActionClient();
  if (!supabase) return { status: "error", message: "Portal access is not configured." };

  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: buildAuthRedirect("/auth/callback?next=/update-password"),
  });

  logPortalEvent("password_reset_requested", { email: parsed.data.email });
  return {
    status: "success",
    message: "If that account exists, a secure reset link has been sent.",
  };
}

export async function updatePasswordAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = updatePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || parsed.data.password !== parsed.data.confirmPassword) {
    return { status: "error", message: "Enter matching passwords of at least 8 characters." };
  }

  const supabase = await createSupabaseActionClient();
  if (!supabase) return { status: "error", message: "Portal access is not configured." };

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: "Unable to update your password." };

  redirect("/clubs");
}

export async function acceptInviteAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = acceptInviteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: "Enter your full name." };

  const { supabase, user } = await requireAuthenticatedUser();

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.fullName, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (profileError) throw profileError;

  const { data, error } = await supabase
    .from("club_memberships")
    .update({ status: "active", joined_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("status", "invited")
    .select("club_id")
    .limit(1);

  if (error) throw error;
  if (!data?.length) {
    return { status: "error", message: "No pending invitation was found for this account." };
  }

  logPortalEvent("invite_accepted", { userId: user.id, clubId: data[0].club_id });
  redirect(await resolveLoginDestination(supabase, user.id));
}

export async function inviteClubUserAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireBasaltRole(["basalt_super_admin"]);
  const parsed = inviteUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Check the invitation details." };
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return { status: "error", message: "Server invitation access is not configured." };

  const { data: club, error: clubError } = await supabase
    .from("clubs")
    .select("id,name,slug")
    .eq("id", parsed.data.clubId)
    .maybeSingle();

  if (clubError) throw clubError;
  if (!club) return { status: "error", message: "Select a valid club." };

  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id,email")
    .ilike("email", parsed.data.email)
    .maybeSingle();

  let invitedUserId = existingProfile?.id as string | undefined;

  if (!invitedUserId) {
    const { data, error } = await admin.auth.admin.inviteUserByEmail(parsed.data.email, {
      data: { full_name: parsed.data.fullName },
      redirectTo: buildAuthRedirect("/auth/callback?next=/accept-invite"),
    });

    if (error || !data.user) {
      logPortalWarning("invite_user_failed", { email: parsed.data.email, clubId: parsed.data.clubId });
      return { status: "error", message: "Unable to send the invitation." };
    }

    invitedUserId = data.user.id;
    await admin.from("profiles").upsert({
      id: invitedUserId,
      email: parsed.data.email,
      full_name: parsed.data.fullName,
      updated_at: new Date().toISOString(),
    });
  }

  const { data: duplicate } = await admin
    .from("club_memberships")
    .select("id,status")
    .eq("club_id", parsed.data.clubId)
    .eq("user_id", invitedUserId)
    .maybeSingle();

  if (duplicate?.status === "active") {
    return { status: "error", message: "That user already has active access to this club." };
  }

  const { error: membershipError } = await admin.from("club_memberships").upsert({
    club_id: parsed.data.clubId,
    user_id: invitedUserId,
    role: parsed.data.role,
    status: duplicate?.status === "active" ? "active" : "invited",
    invited_at: new Date().toISOString(),
  });

  if (membershipError) throw membershipError;

  await admin.from("activity_log").insert({
    club_id: parsed.data.clubId,
    user_id: user.id,
    action: `Invited ${parsed.data.email}`,
    entity_type: "club_membership",
    entity_id: invitedUserId,
    metadata_json: { role: parsed.data.role },
  });

  logPortalEvent("club_user_invited", {
    invitedBy: user.id,
    invitedUserId,
    clubId: parsed.data.clubId,
  });

  revalidatePath("/admin");
  return { status: "success", message: `Invitation prepared for ${parsed.data.email}.` };
}
