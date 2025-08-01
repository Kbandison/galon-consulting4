import Link from "next/link";
import { businessInfo } from "@/data/index";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative w-full min-h-[80vh] flex items-center
        bg-[var(--color-background)]
        overflow-hidden
      "
      style={{ minHeight: "100dvh" }}
    >
      {/* Background Image */}
      <Image
        src="/Hospital Team Meeting_remix_01k1hnad7ten2se6wmg3a9r98e.png"
        alt="Smiling healthcare team"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      {/* Optional: soft gradient for polish */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-tr from-white/20 via-white/5 to-transparent"
        aria-hidden="true"
      />

      {/* Responsive Card */}
      <div
        className="
          relative z-20
          w-full
          max-w-[97vw] sm:max-w-[85vw] md:max-w-xl lg:max-w-2xl xl:max-w-3xl
          mx-auto md:mx-0 md:ml-[5vw] xl:ml-[8vw] mr-auto
          px-4 sm:px-10 lg:px-14
          py-14 sm:py-14 xl:py-16
          bg-white/30
          backdrop-blur-sm
          rounded-xl
          shadow
          flex flex-col items-start
          mt-16 sm:mt-0
        "
      >
        <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-bold text-[var(--color-accent)] mb-5 leading-tight text-left drop-shadow-sm">
          Elevate your healthcare business.
          <br />
          Experience expert consulting.
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl xl:text-2xl text-[var(--color-foreground)] mb-8 text-left drop-shadow-sm">
          {businessInfo.name} provides world-class solutions in billing,
          compliance, and patient care for practices of all sizes.
        </p>
        <Link
          href="/booking"
          className="
            inline-block px-7 sm:px-10 py-3 sm:py-4 rounded-2xl
            bg-[var(--color-primary)] text-[var(--color-background)] font-sans font-semibold text-base sm:text-lg
            hover:bg-[var(--color-accent)] transition-colors
            shadow
          "
        >
          Book Your Consultation
        </Link>
      </div>
    </section>
  );
}
