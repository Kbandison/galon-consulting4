// app/about/page.tsx
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-[96px] pb-16">
      <div className="flex items-center gap-3 mb-4">
        <Info className="h-8 w-8 text-[var(--color-accent)]" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-accent)]">
          About Galon Consulting Services
        </h1>
      </div>
      <p className="text-lg sm:text-xl text-[var(--color-foreground)] mb-6">
        Galon Consulting Services specializes in end-to-end revenue cycle
        management, healthcare compliance, IT, staffing, and more for clinics
        and healthcare organizations across Georgia. Our expert team delivers
        tailored solutions so you can focus on patient care and practice growth.
      </p>
      <ul className="list-disc pl-6 text-base text-[var(--color-foreground)] space-y-2">
        <li>Trusted by providers statewide</li>
        <li>
          Experienced in billing, legal support, analytics, and operational
          consulting
        </li>
        <li>
          Committed to confidentiality, compliance, and best-in-class service
        </li>
        <li>Family-owned and focused on personal attention</li>
      </ul>
    </main>
  );
}
