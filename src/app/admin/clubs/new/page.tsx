import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { requireBasaltRole } from "@/lib/portal/access";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "Club details",
    fields: ["Club name", "URL slug", "Logo", "Cover image", "Address", "Website", "Primary contact"],
  },
  {
    title: "Package and modules",
    fields: ["Select package", "Enable report modules", "Configure available features"],
  },
  {
    title: "Course setup",
    fields: ["Course name", "Number of holes", "Boundary file or GeoJSON", "Map centre", "Initial course-area structure"],
  },
  {
    title: "Users",
    fields: ["Invite primary club administrator", "Add additional users", "Assign roles"],
  },
  {
    title: "Initial report",
    fields: ["Create blank report", "Associate survey", "Select report modules", "Leave as draft"],
  },
  {
    title: "Review",
    fields: ["Confirm club record", "Detect slug collisions", "Create club", "Send invitation when explicitly confirmed"],
  },
];

export default async function CreateClubPage() {
  await requireBasaltRole(["basalt_super_admin"]);

  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white">
          <ArrowLeft className="size-4" />
          Admin
        </Link>
        <div className="mt-5 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[#a6d8bd]">
            Create Club
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Guided customer workspace setup.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/58">
            This is the first admin workflow shell. Mutations will be wired to
            secure server actions with Zod validation and activity logging.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-xs text-white/36">Step {index + 1}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{step.title}</h2>
              <div className="mt-4 grid gap-2">
                {step.fields.map((field) => (
                  <div key={field} className="flex items-start gap-3 text-sm leading-5 text-white/62">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#a6d8bd]" />
                    {field}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
