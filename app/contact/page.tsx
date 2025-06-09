/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import { businessInfo } from "@/data/index";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[var(--color-background)] min-h-screen">
      {/* Header */}
      <header className="relative min-h-[480px] flex items-center justify-center mb-12 mt-16">
        <Image
          src="/cta-bg.png"
          alt="Contact background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-top xl:object-center"
          style={{ zIndex: 1 }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white/10"
          style={{ zIndex: 2 }}
        />
        <div className="relative z-10 w-full max-w-2xl mx-auto px-8 py-6 bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col items-center text-center">
          <Mail className="mx-auto h-10 w-10 text-[var(--color-accent)] mb-2" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-accent)] mb-2 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="max-w-xl mx-auto text-lg sm:text-xl text-[var(--color-foreground)]/90 drop-shadow mb-2">
            We're here to help. Reach out with questions, requests, or to
            schedule a consultation.
          </p>
        </div>
      </header>

      <section className="max-w-3xl mx-auto w-full px-4 flex flex-col gap-12 pb-20">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 bg-white/50 rounded-2xl shadow-inner backdrop-blur-sm px-6 py-5">
            <span className="flex items-center gap-3 text-lg font-medium">
              <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
              <span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {businessInfo.address.street}
                  <br />
                  {businessInfo.address.city}, {businessInfo.address.state}{" "}
                  {businessInfo.address.zip}
                </a>
              </span>
            </span>
            <span className="flex items-center gap-3 text-lg font-medium">
              <Phone className="h-5 w-5 text-[var(--color-accent)]" />
              <a href={`tel:${businessInfo.phone}`} className="hover:underline">
                {businessInfo.phone}
              </a>
            </span>
            <span className="flex items-center gap-3 text-lg font-medium">
              <Mail className="h-5 w-5 text-[var(--color-accent)]" />
              <a
                href={`mailto:${businessInfo.email}`}
                className="hover:underline"
              >
                {businessInfo.email}
              </a>
            </span>
            <span className="flex items-center gap-3 text-lg font-medium">
              <Clock className="h-5 w-5 text-[var(--color-accent)]" />
              <span>{businessInfo.hours}</span>
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md h-60">
            <iframe
              title="Business Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${businessInfo.address.street}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`
              )}&output=embed`}
            />
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="w-full bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl px-8 py-10 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-accent)] text-center mb-1">
            Send Us a Message
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name <span className="text-[var(--color-accent)]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email <span className="text-[var(--color-accent)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block font-medium mb-1">
                Message <span className="text-[var(--color-accent)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md bg-white/60 px-4 py-2 text-lg border border-[var(--color-muted)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none resize-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || submitted}
            className={`
              mt-2 w-full sm:w-auto px-8 py-3 rounded-2xl font-semibold text-lg transition
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
      </section>
    </main>
  );
}
