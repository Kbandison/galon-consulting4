"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function EmailSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle signup logic
  };

  return (
    <section
      id="newsletter"
      className="
        relative w-full min-h-[500px] xl:min-h-[640px]
        flex items-center justify-center overflow-hidden
        py-8 sm:py-16
      "
    >
      {/* Background Image (optional; remove if you want plain bg) */}
      <Image
        src="/cta-bg.png"
        alt="Newsletter background"
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Glass card */}
      <form
        onSubmit={handleSubmit}
        className="
          relative z-20
          w-full max-w-2xl
          bg-white/40 backdrop-blur-md rounded-2xl shadow-xl
          px-10 py-16 sm:px-16 sm:py-20
          flex flex-col items-center
        "
        autoComplete="off"
      >
        <span className="mb-3 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 p-3">
          <Mail className="h-8 w-8 text-[var(--color-primary)]" />
        </span>
        <h2 className="font-serif text-xl sm:text-3xl font-bold text-[var(--color-accent)] mb-3">
          Stay in the Know
        </h2>
        <p className="text-base sm:text-lg text-[var(--color-foreground)] mb-6 text-center">
          Get industry insights and updates from Galon Consulting, right to your
          inbox.
        </p>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="w-full flex gap-2">
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            className="
              flex-1 px-5 py-4 rounded-xl border border-[var(--color-border)]
              text-base sm:text-lg focus:outline-none focus:border-[var(--color-primary)]
              bg-[var(--color-background)]/70
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="
              px-7 py-4 rounded-xl font-semibold text-base sm:text-lg
              bg-[var(--color-primary)] text-[var(--color-background)]
              hover:bg-[var(--color-accent)] transition-colors
              shadow
            "
          >
            Sign Up
          </button>
        </div>
        <div className="text-sm sm:text-base text-[var(--color-foreground)] mt-4 opacity-70">
          No spam. Unsubscribe anytime.
        </div>
      </form>
    </section>
  );
}
