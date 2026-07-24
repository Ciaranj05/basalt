"use client";

import { useActionState, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import {
  acceptInviteAction,
  inviteClubUserAction,
  logoutAction,
  requestPasswordResetAction,
  updatePasswordAction,
  type ActionState,
} from "@/lib/portal/actions";
import {
  navigateAfterLogin,
  signInAndResolveDestination,
} from "@/lib/portal/client-login";

const initialState: ActionState = { status: "idle", message: "" };

function ActionMessage({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <p
      className={`mt-4 rounded-[6px] border px-3 py-2 text-sm ${
        state.status === "success"
          ? "border-[#a6d8bd]/25 bg-[#a6d8bd]/10 text-[#dff4e8]"
          : "border-red-300/20 bg-red-300/10 text-red-100"
      }`}
    >
      {state.message}
    </p>
  );
}

const inputClass =
  "mt-2 h-12 w-full rounded-[6px] border border-white/12 bg-black/20 px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#b8f2d2]";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, setState] = useState<ActionState>(initialState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setState(initialState);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const requestedNext = String(formData.get("next") ?? nextPath);

    try {
      const result = await signInAndResolveDestination({
        email,
        password,
        nextPath: requestedNext,
      });

      if (!result.ok) {
        setState({ status: "error", message: result.message });
        setPending(false);
        return;
      }

      navigateAfterLogin(result.destination);
    } catch {
      setState({ status: "error", message: "Unable to sign in with those details." });
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="next" value={nextPath} />
      <label className="block text-sm font-medium text-white" htmlFor="email">
        Email address
      </label>
      <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      <label className="mt-5 block text-sm font-medium text-white" htmlFor="password">
        Password
      </label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] transition hover:bg-[#dff4e8] disabled:opacity-60"
      >
        {pending ? "Signing in" : "Sign in"} <ArrowRight className="size-4" />
      </button>
      <ActionMessage state={state} />
    </form>
  );
}

export function PasswordResetForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, initialState);

  return (
    <form action={action} className="mt-7">
      <label className="block text-sm font-medium text-white" htmlFor="email">
        Email address
      </label>
      <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      <button type="submit" disabled={pending} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] disabled:opacity-60">
        {pending ? "Sending" : "Send reset link"}
      </button>
      <ActionMessage state={state} />
    </form>
  );
}

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(updatePasswordAction, initialState);

  return (
    <form action={action} className="mt-7">
      <label className="block text-sm font-medium text-white" htmlFor="password">
        New password
      </label>
      <input id="password" name="password" type="password" autoComplete="new-password" required className={inputClass} />
      <label className="mt-5 block text-sm font-medium text-white" htmlFor="confirmPassword">
        Confirm password
      </label>
      <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className={inputClass} />
      <button type="submit" disabled={pending} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] disabled:opacity-60">
        {pending ? "Updating" : "Set new password"}
      </button>
      <ActionMessage state={state} />
    </form>
  );
}

export function AcceptInviteForm() {
  const [state, action, pending] = useActionState(acceptInviteAction, initialState);

  return (
    <form action={action} className="mt-7">
      <label className="block text-sm font-medium text-white" htmlFor="fullName">
        Full name
      </label>
      <input id="fullName" name="fullName" type="text" autoComplete="name" required className={inputClass} />
      <button type="submit" disabled={pending} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] disabled:opacity-60">
        {pending ? "Activating" : "Activate access"}
      </button>
      <ActionMessage state={state} />
    </form>
  );
}

export function InviteUserForm({ clubs }: { clubs: Array<{ id: string; name: string }> }) {
  const [state, action, pending] = useActionState(inviteClubUserAction, initialState);

  return (
    <form action={action} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-xl font-semibold text-white">Invite club user</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-white">
          Club
          <select name="clubId" required className={inputClass}>
            {clubs.map((club) => (
              <option key={club.id} value={club.id} className="bg-[#050807]">
                {club.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-white">
          Role
          <select name="role" required className={inputClass}>
            <option value="club_admin" className="bg-[#050807]">Club admin</option>
            <option value="club_user" className="bg-[#050807]">Club user</option>
            <option value="committee_viewer" className="bg-[#050807]">Committee viewer</option>
          </select>
        </label>
        <label className="text-sm font-medium text-white">
          Full name
          <input name="fullName" required className={inputClass} />
        </label>
        <label className="text-sm font-medium text-white">
          Email
          <input name="email" type="email" required className={inputClass} />
        </label>
      </div>
      <button type="submit" disabled={pending || !clubs.length} className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#07110d] disabled:opacity-60">
        {pending ? "Inviting" : "Send invitation"}
      </button>
      <ActionMessage state={state} />
    </form>
  );
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm text-white/64 transition hover:text-white sm:flex">
        Sign out
      </button>
    </form>
  );
}
