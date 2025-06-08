// components/AboutSection.tsx

import Link from "next/link";
import { Stethoscope } from "lucide-react"; // Lucide icon import
// import { businessInfo } from "@/data/index";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        w-full
        py-[var(--section-gap)]
        px-[var(--section-padding)]
        bg-[var(--color-background)]
        flex flex-col items-center
      "
    >
      {/* Icon */}
      <div className="mb-3">
        <span className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)]/10 p-4">
          <Stethoscope className="h-10 w-10 text-[var(--color-accent)]" />
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--color-accent)] mb-4">
        About Galon Consulting
      </h2>
      <p className="max-w-4xl text-xl text-[var(--color-foreground)] text-center mb-6">
        Galon Consulting Services, LLC helps healthcare organizations thrive
        with expert billing, compliance, staffing, and operational guidance. Our
        team partners closely with practices of all sizes to streamline
        processes, maximize revenue, and ensure peace of mind in a complex
        regulatory landscape.
      </p>
      <Link
        href="/about"
        className="
          inline-block px-10 py-4 rounded-xl
          bg-[var(--color-primary)] text-[var(--color-background)] font-sans font-semibold
          hover:bg-[var(--color-accent)] transition-colors
          shadow
        "
      >
        Learn More
      </Link>
    </section>
  );
}
