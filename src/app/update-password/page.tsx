import Link from "next/link";
import { BasaltLogo } from "@/components/BasaltLogo";
import { UpdatePasswordForm } from "@/components/portal/AuthForms";

export default function UpdatePasswordPage() {
  return (
    <main className="min-h-screen bg-[#050807] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <section className="mt-20 rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Password Reset
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white">
            Set a new password.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Choose a new password for your Basalt portal account.
          </p>
          <UpdatePasswordForm />
        </section>
      </div>
    </main>
  );
}
