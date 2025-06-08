"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/data/index";
import { useEffect, useState } from "react";

// Optional: Tailwind's sr-only for accessible, hidden title
const srOnly = "sr-only";

// Navbar height (for hero top padding)
const NAV_HEIGHT = 72;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect on mount
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Conditional classes based on scroll position
  const navClass = scrolled
    ? "bg-white/90 border-b border-[var(--color-border)] shadow-lg"
    : "bg-transparent border-b border-transparent shadow-none";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 backdrop-blur-sm transition-all duration-300
        ${navClass}
      `}
      style={{ minHeight: NAV_HEIGHT }}
    >
      <div className="w-full flex items-center min-h-[72px] px-4">
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
            className="h-20 w-20 object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-x-8 xl:gap-x-12 ml-auto">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  text-base xl:text-lg font-sans transition-colors px-3 py-2 rounded-md
                  ${
                    pathname === link.href
                      ? "text-[var(--color-primary)] font-semibold"
                      : scrolled
                      ? "text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
                      : "text-black hover:text-[var(--color-primary)]"
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
        <div className="hidden md:block ml-6">
          <Link
            href="/booking"
            className={`
              inline-flex items-center font-sans font-semibold rounded-2xl shadow
              px-5 xl:px-7 py-2 xl:py-3
              ${
                scrolled
                  ? "bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-accent)]"
                  : "bg-white text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white"
              }
              transition-colors text-base xl:text-lg
            `}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger (Sheet) */}
        <div className="md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className={`
                  flex items-center p-2
                  ${scrolled ? "text-[var(--color-foreground)]" : "text-white"}
                `}
                aria-label="Open menu"
              >
                <Menu className="h-7 w-7 text-[var(--color-foreground)]" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 bg-[var(--color-background)] pt-8 px-6"
            >
              <SheetTitle className={srOnly}>Navigation Menu</SheetTitle>
              <div className="mb-8 flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Galon Consulting Services Logo"
                  width={36}
                  height={36}
                  className="h-12 w-12 object-contain"
                  priority
                />
                <span className="font-serif font-bold text-lg text-[var(--color-accent)]">
                  Galon Consulting
                </span>
              </div>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      text-lg font-sans px-3 py-2 rounded
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
                ))}
                <Link
                  href="/booking"
                  className="
                    mt-5 inline-block px-4 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-semibold text-center
                    hover:bg-[var(--color-accent)] transition-colors
                  "
                >
                  Book Now
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
