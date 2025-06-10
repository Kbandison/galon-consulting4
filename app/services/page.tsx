/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Stethoscope,
  DollarSign,
  ShieldCheck,
  UserCog,
  Cpu,
  Users,
  Settings,
  Megaphone,
  Scale,
  BarChart2,
} from "lucide-react";
import { serviceCategories } from "@/data/index";
import Image from "next/image";

// Subtitles and Icons
const categorySubtitles: Record<string, string> = {
  billing: "Optimize revenue and cash flow for your healthcare business.",
  compliance: "Stay compliant with regulations and reduce risk.",
  "care-coordination": "Empower patients with efficient care management.",
  "it-services": "Modern, secure technology tailored for healthcare.",
  hr: "Build and support your healthcare team.",
  financial: "Financial planning, reporting, and tax compliance.",
  operations: "Streamline everyday operations for quality care.",
  marketing: "Grow your practice and enhance patient acquisition.",
  legal: "Navigate healthcare law with expert guidance.",
  analytics: "Leverage data to improve outcomes and efficiency.",
};

const categoryIcons: Record<string, React.ReactNode> = {
  billing: <DollarSign className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
  compliance: (
    <ShieldCheck className="h-7 w-7 text-[var(--color-primary)] mr-2" />
  ),
  "care-coordination": (
    <UserCog className="h-7 w-7 text-[var(--color-primary)] mr-2" />
  ),
  "it-services": <Cpu className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
  hr: <Users className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
  financial: (
    <DollarSign className="h-7 w-7 text-[var(--color-primary)] mr-2" />
  ),
  operations: <Settings className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
  marketing: <Megaphone className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
  legal: <Scale className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
  analytics: <BarChart2 className="h-7 w-7 text-[var(--color-primary)] mr-2" />,
};

const bandColors = ["bg-white/90", "bg-[var(--color-background)]/80"];

// Responsive hook for "xl" breakpoint
function useIsXL() {
  const [isXL, setIsXL] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const listener = () => setIsXL(media.matches);
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  return isXL;
}

export default function ServicesPage() {
  const isXL = useIsXL();
  const [openItem, setOpenItem] = useState<string | undefined>(
    serviceCategories[0]?.id
  );

  // Sticky nav/scroll spy
  const [activeId, setActiveId] = useState(serviceCategories[0]?.id);
  const categoryRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 150;
      let current = serviceCategories[0]?.id;
      for (let i = 0; i < serviceCategories.length; i++) {
        const ref = categoryRefs.current[i];
        if (ref && ref.offsetTop <= scrollY) {
          current = serviceCategories[i].id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (id: string) => {
    const ref = document.getElementById(id);
    if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-[var(--color-background)] min-h-screen pt-16 pb-20">
      {/* Page Title & Subtext */}
      <header className="relative min-h-[480px] flex items-center justify-center mb-16 mt-0">
        {/* Background image */}
        <Image
          src="/services-bg.png" // Replace with your image path
          alt="Healthcare background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />

        {/* Optional: gradient overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white/10"
          style={{ zIndex: 2 }}
        />

        {/* Glass card (rounded, centered, big) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-8 py-4 bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col items-center text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-[var(--color-accent)] mb-5" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-accent)] mb-4 drop-shadow-lg">
            Healthcare Services
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-[var(--color-foreground)]/90 drop-shadow mb-4">
            Comprehensive consulting for every aspect of your practice.
          </p>
        </div>
      </header>

      {/* Sticky Anchor Nav with NO horizontal padding */}
      <div className="mx-auto max-w-[90vw]">
        <nav
          className="
            sticky top-[80px] z-40 bg-[var(--color-background)]/80 backdrop-blur
            flex flex-wrap justify-center gap-2 py-3 rounded-xl shadow-sm border border-[var(--color-border)]
            mt-14 mb-14
          "
          aria-label="Service categories"
        >
          {serviceCategories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => handleAnchorClick(category.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer
                flex items-center gap-2
                ${
                  activeId === category.id
                    ? "bg-[var(--color-primary)] text-white shadow"
                    : "bg-white/80 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
                }
              `}
            >
              {categoryIcons[category.id] || null}
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content area with NO horizontal padding */}
      <div className="mx-auto max-w-[90vw]">
        {isXL ? (
          // XL and up: All sections always open in a 2-col grid
          <div className="grid grid-cols-2 gap-8">
            {serviceCategories.map((category, i) => (
              <section
                key={category.id}
                id={category.id}
                // @ts-ignore
                ref={(el) => (categoryRefs.current[i] = el)}
                className={`
                  transition-all duration-300
                  ${bandColors[i % bandColors.length]}
                  shadow-xl border border-[var(--color-border)]
                  rounded-2xl px-6 pt-10 pb-8
                `}
              >
                <div className="flex items-center gap-4 mb-1">
                  <span className="flex items-center pointer-events-none">
                    {categoryIcons[category.id]}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                      {category.name}
                    </span>
                    {categorySubtitles[category.id] && (
                      <span
                        className={`
                          text-base sm:text-lg font-medium text-[var(--color-foreground)]/90
                          mt-0.5
                          ${bandColors[i % bandColors.length]}
                        `}
                      >
                        {categorySubtitles[category.id]}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="grid gap-6 sm:grid-cols-2 mt-4">
                  {category.services.map((service) => (
                    <li
                      key={service.id}
                      className="
                        bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-xl
                        p-5 shadow-sm flex flex-col gap-1
                        hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-accent)]
                        transition
                      "
                      tabIndex={0}
                    >
                      <div className="font-semibold text-lg text-[var(--color-foreground)] mb-1">
                        {service.name}
                      </div>
                      <div className="text-base text-[var(--color-foreground)]/90 leading-relaxed">
                        {service.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          // Below XL: Accordion pattern
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="flex flex-col gap-8"
          >
            {serviceCategories.map((category, i) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                id={category.id}
                // @ts-ignore
                ref={(el) => (categoryRefs.current[i] = el)}
                className={`
                  transition-all duration-300 overflow-hidden
                  ${bandColors[i % bandColors.length]}
                  shadow-xl border border-[var(--color-border)]
                  rounded-2xl
                `}
              >
                <AccordionTrigger
                  className={`
                    group
                    flex gap-4 items-center w-full
                    bg-transparent rounded-t-2xl cursor-pointer
                    hover:bg-[var(--color-primary)]/10 hover:shadow-lg focus:outline-none
                    min-h-[80px] px-6 py-6
                    transition-all duration-300
                  `}
                >
                  <span className="flex items-center pointer-events-none group-data-[state=open]:rotate-0">
                    {categoryIcons[category.id]}
                  </span>
                  <div className="flex flex-col items-start flex-1">
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                      {category.name}
                    </span>
                    {categorySubtitles[category.id] && (
                      <span
                        className={`
                          text-base sm:text-lg font-medium text-[var(--color-foreground)]/90
                          mt-0.5
                        `}
                      >
                        {categorySubtitles[category.id]}
                      </span>
                    )}
                  </div>
                  {/* Chevron handled by shadcn/ui */}
                </AccordionTrigger>
                <AccordionContent className="bg-transparent px-6 pb-8">
                  <ul className="grid gap-6 sm:grid-cols-2 mt-2">
                    {category.services.map((service) => (
                      <li
                        key={service.id}
                        className="
                          bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-xl
                          p-5 shadow-sm flex flex-col gap-1
                          hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--color-accent)]
                          transition
                        "
                        tabIndex={0}
                      >
                        <div className="font-semibold text-lg text-[var(--color-foreground)] mb-1">
                          {service.name}
                        </div>
                        <div className="text-base text-[var(--color-foreground)]/90 leading-relaxed">
                          {service.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </main>
  );
}
