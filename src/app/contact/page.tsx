import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { BasaltLogo } from "@/components/BasaltLogo";

export const metadata: Metadata = {
  title: "Contact Basalt | Golf Course Intelligence",
  description:
    "Message or email Basalt to talk through what better course information could show you about your golf course.",
};

const contactEmail =
  process.env.NEXT_PUBLIC_BASALT_CONTACT_EMAIL?.trim() || "hello@basalt.co";
const whatsappNumber = process.env.NEXT_PUBLIC_BASALT_WHATSAPP_NUMBER?.replace(
  /\D/g,
  "",
);
const whatsappMessage =
  "Hi, I'd like to find out more about Basalt and what it could show us about our course.";
const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  : null;
const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
  "Basalt course enquiry",
)}`;

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.2 18.9 6 15.8a7.1 7.1 0 1 1 2.7 2.5l-3.5.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.3c.1.3 0 .5-.1.6l-.4.5c-.1.1-.1.3 0 .5.4.7 1 1.3 1.8 1.8.2.1.3.1.5 0l.6-.4c.2-.1.4-.2.6-.1l1.3.6c.3.1.4.3.4.6v.4c0 .3-.1.6-.4.8-.5.3-1.1.5-1.8.3-2.6-.6-4.7-2.6-5.4-5.1-.2-.7-.1-1.1.1-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ContactOption({
  eyebrow,
  title,
  copy,
  button,
  href,
  icon,
  disabledMessage,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  button: string;
  href: string | null;
  icon: ReactNode;
  disabledMessage?: string;
}) {
  return (
    <article className="rounded-[8px] border border-[#d8d1c1] bg-white p-6 shadow-[0_24px_70px_rgba(20,28,22,0.07)] sm:p-8">
      <div className="flex size-11 items-center justify-center rounded-full bg-[#07110d] text-white">
        {icon}
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[#486754]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#07110d]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#314138]/70">{copy}</p>
      {href ? (
        <a
          href={href}
          target={href.startsWith("https://wa.me") ? "_blank" : undefined}
          rel={href.startsWith("https://wa.me") ? "noreferrer" : undefined}
          className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#07110d] px-5 text-sm font-semibold text-white transition hover:bg-[#1b2b22] sm:w-auto"
        >
          {button} <ArrowRight className="size-4" />
        </a>
      ) : (
        <p className="mt-7 rounded-[8px] border border-[#d8d1c1] bg-[#f4f1e8] p-4 text-sm leading-6 text-[#314138]/68">
          {disabledMessage}
        </p>
      )}
    </article>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#07110d]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Basalt home">
          <BasaltLogo variant="horizontal" theme="light" />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-[#314138]/64 md:flex">
          <Link href="/#solutions" className="transition hover:text-[#07110d]">
            Solutions
          </Link>
          <Link href="/#record" className="transition hover:text-[#07110d]">
            Course Record
          </Link>
          <Link href="/#monitoring" className="transition hover:text-[#07110d]">
            Monitoring
          </Link>
          <Link href="/about" className="transition hover:text-[#07110d]">
            About
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.32em] text-[#486754]">
            Contact
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
            Let&apos;s talk about your course.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#314138]/72">
            Whether you have a specific issue in mind or just want to understand
            what better course information could show you, we&apos;d be happy to
            have a conversation.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <ContactOption
            eyebrow="WhatsApp"
            title="WhatsApp us"
            copy="Have a quick question or want to talk through your course? Send us a message on WhatsApp."
            button="Message us on WhatsApp"
            href={whatsappHref}
            icon={<WhatsAppIcon />}
            disabledMessage="WhatsApp will appear here once NEXT_PUBLIC_BASALT_WHATSAPP_NUMBER is configured."
          />
          <ContactOption
            eyebrow="Email"
            title="Email us"
            copy="Prefer email? Send us a message and we'll get back to you."
            button="Email us"
            href={emailHref}
            icon={<Mail className="size-5" />}
          />
        </div>

        <div className="mt-12 rounded-[8px] border border-[#d8d1c1] bg-[#f4f1e8] p-6 sm:p-8">
          <MessageCircle className="size-5 text-[#486754]" />
          <p className="mt-4 max-w-3xl text-balance text-2xl font-semibold leading-tight text-[#07110d] sm:text-4xl">
            No hard sell. Just tell us what you&apos;re trying to understand and
            we&apos;ll explain where Basalt may be able to help.
          </p>
          <p className="mt-5 text-base leading-7 text-[#314138]/70">
            You&apos;ll be speaking directly with Ciaran or Ciaran.
          </p>
        </div>
      </section>

      <footer className="bg-[#050807] px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <BasaltLogo variant="horizontal" theme="grey" size="compact" />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/#solutions" className="transition hover:text-white">
              Solutions
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <a href={emailHref} className="transition hover:text-white">
              Email us
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
