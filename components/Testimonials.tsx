/* eslint-disable react/no-unescaped-entities */
import { testimonials } from "@/data/index";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="
        w-full py-[var(--section-gap)] px-[var(--section-padding)]
        bg-[var(--color-muted)]/50
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--color-accent)] mb-4">
          What Our Clients Say
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-[var(--color-foreground)] text-center mb-10">
          Hear from healthcare leaders who’ve transformed their practices with
          our help.
        </p>

        <div className="w-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials
            .slice(0, 6)
            .map(({ id, name, role, organization, text }) => (
              <div
                key={id}
                className="
                relative bg-white/90 rounded-3xl shadow-xl p-8 flex flex-col items-start
                overflow-hidden
              "
              >
                {/* Big faint quote mark in background */}
                <Quote
                  className="absolute -top-3 -left-2 h-20 w-20 text-[var(--color-accent)] opacity-10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Small pill icon */}
                <span className="mb-4 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)]/10 p-3 shadow">
                  <Quote className="h-6 w-6 text-[var(--color-accent)]" />
                </span>

                <p className="mb-4 text-lg italic text-[var(--color-foreground)] font-light z-10">
                  "{text}"
                </p>
                <div className="mt-auto pt-2 text-base font-semibold text-[var(--color-accent)]">
                  {name}
                </div>
                <div className="text-xs text-[var(--color-foreground)]">
                  {role}, {organization}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
