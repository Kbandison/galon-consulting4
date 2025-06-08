"use client";

import Image from "next/image";
import { faqs } from "@/data/index";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  ShieldCheck,
  Users,
  HeartPulse,
  CalendarCheck,
  FileText,
} from "lucide-react";

// Array of static icons (no rotate class needed)
const icons = [
  HelpCircle,
  ShieldCheck,
  Users,
  HeartPulse,
  CalendarCheck,
  FileText,
];

export default function FAQPage() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen">
      {/* Header Section */}
      <header className="relative min-h-[480px] flex items-center justify-center mb-16 mt-16">
        <Image
          src="/cta-bg.png"
          alt="FAQ background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-top xl:object-center"
          style={{ zIndex: 1 }}
        />
        {/* Glassy Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white/10"
          style={{ zIndex: 2 }}
        />
        {/* Centered glass card */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 py-6 bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col items-center text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-[var(--color-accent)] mb-3" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-accent)] mb-2 drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-[var(--color-foreground)]/90 drop-shadow mb-2">
            Find answers to our most common questions.
          </p>
        </div>
      </header>

      {/* FAQ Accordion */}
      <section className="max-w-5xl mx-auto w-full px-2 pb-24">
        <Accordion type="single" collapsible className="space-y-15">
          {faqs.map((faq, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white/50 backdrop-blur-lg border border-[var(--color-muted)]/40 rounded-2xl shadow-md transition-all duration-300"
              >
                <AccordionTrigger
                  className="
        flex flex-col sm:flex-row
        items-center sm:items-start
        gap-3 sm:gap-4
        text-xl sm:text-2xl
        px-6 py-5
        font-semibold text-[var(--color-primary)]
        hover:no-underline focus:no-underline
        "
                >
                  {/* Icon, centered on mobile, left on desktop */}
                  <Icon className="faq-icon h-6 w-6 text-[var(--color-accent)] flex-shrink-0 mb-2 sm:mb-0 !rotate-0" />
                  <span className="flex-1 text-center sm:text-left">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-lg text-[var(--color-foreground)]/90 transition-all duration-300 animate-fadein">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
      {/* Fade-in animation for content */}
      <style jsx global>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fadein {
          animation: fadein 0.4s;
        }
      `}</style>
    </main>
  );
}
