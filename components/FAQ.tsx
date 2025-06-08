"use client";
import { faqs } from "@/data/index";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="
        w-full py-[var(--section-gap)] px-[var(--section-padding)]
        bg-[var(--color-background)]
      "
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--color-accent)] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="max-w-xl text-base sm:text-lg text-[var(--color-foreground)] text-center mb-8">
          Everything you need to know about working with Galon Consulting
          Services.
        </p>

        <Accordion type="multiple" className="w-full">
          {faqs.slice(0, 7).map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger className="text-left font-semibold text-lg sm:text-xl text-[var(--color-primary)] py-3">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-foreground)] text-base sm:text-lg py-3">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
