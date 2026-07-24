import Link from "next/link";
import { BasaltLogo } from "@/components/BasaltLogo";
import { AcceptInviteForm } from "@/components/portal/AuthForms";

export default function AcceptInvitePage() {
  return (
    <main className="min-h-screen bg-[#050807] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="dark" />
        </Link>
        <section className="mt-20 rounded-[8px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a6d8bd]">
            Invitation
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white">
            Accept your Basalt invitation.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Portal access is created by invitation only. Follow the secure link
            from your email first, then confirm your details here.
          </p>
          <AcceptInviteForm />
        </section>
      </div>
    </main>
  );
}
