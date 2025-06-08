"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { navLinks } from "@/data/index";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-[var(--color-background)]/90 backdrop-blur-sm border-b border-[var(--color-border)] shadow-sm"
            : "bg-transparent"
        }
      `}
      style={{ willChange: "background, box-shadow" }}
    >
      <div className="w-full flex items-center min-h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center min-w-0 mr-auto"
          aria-label="Home"
        >
          <Image
            src="/logo.svg"
            alt="Galon Consulting Services Logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
        </Link>

        {/* Nav + CTA */}
        <div className="flex items-center justify-end gap-x-8 xl:gap-x-12 ml-auto pr-2 sm:pr-6 xl:pr-12">
          <ul className="hidden md:flex items-center gap-x-8 xl:gap-x-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    text-base xl:text-lg font-sans transition-colors px-3 py-2 rounded-md
                    ${
                      pathname === link.href
                        ? "text-[var(--color-primary)] font-semibold"
                        : "text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
                    }
                  `}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="
                inline-flex items-center font-sans font-semibold rounded-2xl shadow
                px-5 xl:px-7 py-2 xl:py-3
                bg-[var(--color-primary)] text-[var(--color-background)]
                hover:bg-[var(--color-accent)] transition-colors
                text-base xl:text-lg
              "
            >
              Book Now
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center p-2 text-[var(--color-foreground)]"
            aria-label="Open menu"
            // ...mobile menu logic...
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>
    </nav>
  );
}
