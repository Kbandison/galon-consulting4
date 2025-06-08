import Link from "next/link";
import { ClipboardList, ShieldCheck, UserPlus } from "lucide-react"; // swap for any icons
import { serviceCategories } from "@/data/index";

// Pick 3 "featured" services (1 from each top category, or your choice)
const featured = [
  {
    ...serviceCategories[0].services[0], // Billing & Revenue
    icon: ClipboardList,
  },
  {
    ...serviceCategories[1].services[0], // Compliance
    icon: ShieldCheck,
  },
  {
    ...serviceCategories[2].services[0], // Care Coordination
    icon: UserPlus,
  },
];

export default function ServicesPreview() {
  return (
    <section
      id="services"
      className="
        w-full py-[var(--section-gap)] px-[var(--section-padding)]
        bg-[var(--color-background)]
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--color-accent)] mb-4">
          Our Services
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-[var(--color-foreground)] text-center mb-10">
          Comprehensive solutions for every aspect of healthcare
          operations—tailored to your practice’s needs.
        </p>

        {/* Responsive card grid */}
        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {featured.map(({ id, name, description, icon: Icon }) => (
            <div
              key={id}
              className="
                bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition
              "
            >
              <span className="mb-4 inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)]/10 p-3">
                <Icon className="h-8 w-8 text-[var(--color-accent)]" />
              </span>
              <h3 className="font-serif text-xl font-semibold mb-2 text-[var(--color-accent)]">
                {name}
              </h3>
              <p className="text-base text-[var(--color-foreground)] mb-4">
                {description}
              </p>
              <Link
                href="/services"
                className="mt-auto inline-block text-[var(--color-primary)] font-semibold hover:underline"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        {/* View All button */}
        <Link
          href="/services"
          className="
            inline-block px-10 py-4 rounded-xl
            bg-[var(--color-primary)] text-[var(--color-background)] font-sans font-semibold
            hover:bg-[var(--color-accent)] transition-colors
            shadow
          "
        >
          View All Services
        </Link>
      </div>
    </section>
  );
}
