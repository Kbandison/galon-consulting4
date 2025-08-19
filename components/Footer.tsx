import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
      w-full bg-[var(--color-background)] border-t border-[var(--color-border)]
      pt-10 pb-6 px-[var(--section-padding)]
      flex flex-col gap-8 items-center
      text-[var(--color-foreground)]
    "
    >
      {/* Logo and contact */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between w-full max-w-5xl">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Galon Consulting Services logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-serif font-bold text-xl text-[var(--color-accent)]">
            Galon Consulting Services, LLC
          </span>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col gap-1 text-sm text-[var(--color-foreground)] text-center sm:text-right">
          <span>3355 SWEETWATER RD APT 4303, LAWRENCEVILLE, GA 30044</span>
          <span>
            Email:{" "}
            <a
              href="mailto:galonconsulting@outlook.com"
              className="underline hover:text-[var(--color-primary)]"
            >
              galonconsulting@outlook.com
            </a>
          </span>
          <span>
            Phone:{" "}
            <a
              href="tel:7702563765"
              className="underline hover:text-[var(--color-primary)]"
            >
              (770) 256-3765
            </a>
          </span>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex gap-5 flex-wrap justify-center">
        <Link href="/" className="hover:text-[var(--color-primary)] transition">
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-[var(--color-primary)] transition"
        >
          About
        </Link>
        <Link
          href="/services"
          className="hover:text-[var(--color-primary)] transition"
        >
          Services
        </Link>
        <Link
          href="/booking"
          className="hover:text-[var(--color-primary)] transition"
        >
          Booking
        </Link>
        <Link
          href="/faq"
          className="hover:text-[var(--color-primary)] transition"
        >
          FAQ
        </Link>
        <Link
          href="/privacy"
          className="hover:text-[var(--color-primary)] transition"
        >
          Privacy Policy
        </Link>
      </nav>

      {/* Copyright */}
      <div className="text-xs text-[var(--color-foreground)] opacity-80 text-center">
        &copy; {new Date().getFullYear()} Galon Consulting Services, LLC. All
        rights reserved.
      </div>
    </footer>
  );
}
