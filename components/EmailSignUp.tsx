/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function ContactBanner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
        return;
      }
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-[520px] flex items-center justify-center py-14 overflow-hidden">
      {/* Background image */}
      <Image
        src="/cta-bg.png" // Replace with your image path
        alt="Healthcare background"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />
      {/* Optional: Gradient overlay for extra legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white/10"
        style={{ zIndex: 2 }}
      />
      {/* Glassy contact form card */}
      <div className="relative z-10 w-full max-w-lg mx-auto bg-white/50 backdrop-blur-lg shadow-2xl rounded-3xl px-10 py-10 flex flex-col items-center">
        <Mail className="h-10 w-10 text-[var(--color-accent)] mb-4" />
        <h2 className="text-3xl font-bold font-serif text-[var(--color-accent)] mb-2 text-center">
          Get In Touch
        </h2>
        <p className="mb-6 text-lg text-[var(--color-foreground)]/80 text-center">
          Reach out for a consultation or to learn more about our services.
        </p>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name <span className="text-[var(--color-accent)]">*</span>
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email <span className="text-[var(--color-accent)]">*</span>
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message <span className="text-[var(--color-accent)]">*</span>
            </label>
            <textarea
              required
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || submitted}
            className={`
              w-full px-8 py-3 rounded-2xl font-semibold text-lg transition
              ${
                submitting || submitted
                  ? "bg-[var(--color-muted)] text-white cursor-not-allowed"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]"
              }
            `}
          >
            {submitting
              ? "Sending..."
              : submitted
                ? "Message Sent!"
                : "Send Message"}
          </button>
          {error && (
            <div className="text-red-600 font-semibold text-center mt-2">
              {error}
            </div>
          )}
          {submitted && (
            <div className="text-green-600 font-semibold text-center mt-2">
              Thank you for reaching out! We will respond as soon as possible.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
