import Link from "next/link";
// import Image from "next/image";

export default function CTABanner() {
  return (
    <section
      className="
        relative w-full overflow-hidden shadow-xl
        min-h-[340px] xl:min-h-[400px]
        flex items-center justify-center bg-[var(--color-background)] 
      "
    >
      {/* Centered Text Content */}
      <div
        className="
        relative z-20 flex flex-col items-center justify-center w-full px-6 py-10 sm:px-12 xl:px-20 text-center
      "
      >
        <h2 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold text-[var(--color-accent)] mb-2 drop-shadow">
          Ready to streamline your healthcare business?
        </h2>
        <p className="text-base sm:text-lg font-medium text-[var(--color-accent)] mb-6 max-w-md drop-shadow mx-auto">
          Let Galon Consulting Services simplify your operations—so you can
          focus on patient care.
        </p>
        <Link
          href="/booking"
          className="
            px-7 py-3 rounded-2xl font-semibold
            bg-[var(--color-primary)] text-[var(--color-background)]
            hover:bg-[var(--color-accent)] hover:text-white
            shadow transition-colors text-lg
          "
        >
          Book Your Consultation
        </Link>
      </div>
    </section>
  );
}
