import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !secretKey) {
  console.error(
    "Set SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY before running this script.",
  );
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const clubs = {
  northCoast: "11111111-1111-4111-8111-111111111111",
  harbourDunes: "55555555-5555-4555-8555-555555555555",
};

const generatedPasswords = [];

function throwIfError(result, context) {
  if (result.error) {
    throw new Error(`${context}: ${result.error.message}`);
  }
  return result;
}

function passwordFor(envName) {
  const existing = process.env[envName];
  if (existing) return existing;
  const generated = crypto.randomBytes(14).toString("base64url");
  generatedPasswords.push([envName, generated]);
  return generated;
}

const users = [
  {
    email: process.env.BASALT_DEV_ADMIN_EMAIL ?? "admin@basalt.local",
    password: passwordFor("BASALT_DEV_ADMIN_PASSWORD"),
    fullName: "Basalt Admin",
    globalRole: "basalt_super_admin",
  },
  {
    email: process.env.BASALT_DEV_ANALYST_EMAIL ?? "analyst@basalt.local",
    password: passwordFor("BASALT_DEV_ANALYST_PASSWORD"),
    fullName: "Basalt Analyst",
    globalRole: "basalt_analyst",
  },
  {
    email: process.env.BASALT_DEV_CLUB_ADMIN_EMAIL ?? "club-admin@northcoast.local",
    password: passwordFor("BASALT_DEV_CLUB_ADMIN_PASSWORD"),
    fullName: "North Coast Club Admin",
    memberships: [{ clubId: clubs.northCoast, role: "club_admin", status: "active" }],
  },
  {
    email: process.env.BASALT_DEV_CLUB_USER_EMAIL ?? "course-manager@northcoast.local",
    password: passwordFor("BASALT_DEV_CLUB_USER_PASSWORD"),
    fullName: "North Coast Course Manager",
    memberships: [{ clubId: clubs.northCoast, role: "club_user", status: "active" }],
  },
  {
    email: process.env.BASALT_DEV_COMMITTEE_EMAIL ?? "committee@northcoast.local",
    password: passwordFor("BASALT_DEV_COMMITTEE_PASSWORD"),
    fullName: "North Coast Committee Viewer",
    memberships: [{ clubId: clubs.northCoast, role: "committee_viewer", status: "active" }],
  },
  {
    email: process.env.BASALT_DEV_OTHER_CLUB_EMAIL ?? "manager@harbourdunes.local",
    password: passwordFor("BASALT_DEV_OTHER_CLUB_PASSWORD"),
    fullName: "Harbour Dunes Manager",
    memberships: [{ clubId: clubs.harbourDunes, role: "club_admin", status: "active" }],
  },
];

async function upsertUser(config) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: config.email,
    password: config.password,
    email_confirm: true,
    user_metadata: { full_name: config.fullName },
  });

  let user = data.user;
  if (error && error.message.toLowerCase().includes("already")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .ilike("email", config.email)
      .maybeSingle();
    user = profile ? { id: profile.id } : null;
  } else if (error) {
    throw error;
  }

  if (!user) {
    throw new Error(`Could not resolve user for ${config.email}`);
  }

  throwIfError(
    await supabase.from("profiles").upsert({
      id: user.id,
      email: config.email,
      full_name: config.fullName,
      updated_at: new Date().toISOString(),
    }),
    `Profile upsert failed for ${config.email}`,
  );

  if (config.globalRole) {
    throwIfError(
      await supabase.from("global_roles").upsert({
        user_id: user.id,
        role: config.globalRole,
      }),
      `Global role upsert failed for ${config.email}`,
    );
  }

  for (const membership of config.memberships ?? []) {
    throwIfError(
      await supabase.from("club_memberships").upsert({
        club_id: membership.clubId,
        user_id: user.id,
        role: membership.role,
        status: membership.status,
        joined_at: membership.status === "active" ? new Date().toISOString() : null,
      }),
      `Membership upsert failed for ${config.email}`,
    );
  }

  return user.id;
}

for (const user of users) {
  const userId = await upsertUser(user);
  console.log(`Prepared ${user.email} (${userId})`);
}

if (generatedPasswords.length) {
  console.log("\nGenerated development passwords:");
  for (const [name, password] of generatedPasswords) {
    console.log(`${name}=${password}`);
  }
}
