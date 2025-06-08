/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/data/index";
import { DayPicker } from "react-day-picker";
import Image from "next/image";
import { Calendar } from "lucide-react";
import "react-day-picker/dist/style.css";

const times = [
  "9:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "1:00 pm",
  "2:00 pm",
  "3:00 pm",
  "4:00 pm",
];

const services = serviceCategories
  .map((cat) => cat.services)
  .flat()
  .map((s) => ({ id: s.id, name: s.name }));

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: undefined as Date | undefined,
    time: "",
  });

  // For fade animation between steps
  const [fade, setFade] = useState(true);
  const nextStep = (n: number) => {
    setFade(false);
    setTimeout(() => {
      setStep(n);
      setFade(true);
    }, 120);
  };

  function updateField(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <main className="bg-[var(--color-background)] min-h-screen">
      {/* Header (matches Services) */}
      <header className="relative min-h-[480px] flex items-center justify-center mb-16 mt-16">
        <Image
          src="/cta-bg.png"
          alt="Healthcare background"
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
        {/* Glass card (rounded, centered, big) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-8 py-4 bg-white/40 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col items-center text-center">
          <Calendar className="mx-auto h-12 w-12 text-[var(--color-accent)] mb-5" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-accent)] mb-4 drop-shadow-lg">
            Book a Consultation
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-[var(--color-foreground)]/90 drop-shadow mb-4">
            Reserve your spot with ease. Choose your service, date, and time—all
            in one place.
          </p>
        </div>
      </header>

      {/* Stepper/Card section */}
      <section className="w-full max-w-xl mx-auto mb-24 px-2">
        <div
          className={`transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          key={step}
        >
          {/* Step 1: Customer Info */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep(2);
              }}
              className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[var(--color-accent)]/30 p-14 sm:p-16 max-w-xl w-full mx-auto flex flex-col gap-7"
            >
              <Calendar className="mx-auto h-10 w-10 text-[var(--color-accent)] mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-1">
                Step 1: Your Information
              </h2>
              <label className="flex flex-col gap-2 font-semibold text-[var(--color-foreground)]">
                Name
                <input
                  name="name"
                  type="text"
                  required
                  autoFocus
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="px-5 py-3 rounded-lg border bg-white/90 text-lg outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                  autoComplete="name"
                />
              </label>
              <label className="flex flex-col gap-2 font-semibold text-[var(--color-foreground)]">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="px-5 py-3 rounded-lg border bg-white/90 text-lg outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                  autoComplete="email"
                />
              </label>
              <label className="flex flex-col gap-2 font-semibold text-[var(--color-foreground)]">
                Phone{" "}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="px-5 py-3 rounded-lg border bg-white/90 text-lg outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                  autoComplete="tel"
                />
              </label>
              <label className="flex flex-col gap-2 font-semibold text-[var(--color-foreground)]">
                Service
                <select
                  name="service"
                  required
                  value={form.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  className="px-5 py-3 rounded-lg border bg-white/90 text-lg outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-3 text-lg rounded-xl"
                >
                  Next: Select Date
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Calendar Day Selection (BIGGER) */}
          {step === 2 && (
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[var(--color-accent)]/30 p-14 sm:p-16 max-w-xl w-full mx-auto flex flex-col gap-7">
              <Calendar className="mx-auto h-10 w-10 text-[var(--color-accent)] mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-10">
                Step 2: Pick a Date
              </h2>
              <div className="flex justify-center">
                <div className="scale-125">
                  <DayPicker
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => updateField("date", date)}
                    disabled={{ before: new Date() }}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => nextStep(1)}
                  className="rounded-lg"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={!form.date}
                  onClick={() => nextStep(3)}
                  className="px-8 py-3 text-lg rounded-xl"
                >
                  Next: Select Time
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Time Slot Selection */}
          {step === 3 && (
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[var(--color-accent)]/30 p-14 sm:p-16 max-w-xl w-full mx-auto flex flex-col gap-7">
              <Calendar className="mx-auto h-10 w-10 text-[var(--color-accent)] mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-1">
                Step 3: Choose a Time
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {times.map((time) => (
                  <Button
                    type="button"
                    key={time}
                    variant={form.time === time ? "default" : "outline"}
                    onClick={() => updateField("time", time)}
                    className="min-w-[120px] py-3 text-lg rounded-xl"
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => nextStep(2)}
                  className="rounded-lg"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  disabled={!form.time}
                  onClick={() => nextStep(4)}
                  className="px-8 py-3 text-lg rounded-xl"
                >
                  Next: Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div
              className="
    backdrop-blur-lg
    rounded-3xl
    shadow-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]
    border border-[var(--color-accent)]/30
    p-16 sm:p-20
    max-w-2xl
    w-full mx-auto
    flex flex-col items-center
    text-center
    gap-8
  "
            >
              <Calendar className="mx-auto h-14 w-14 text-[var(--color-accent)] mb-3 drop-shadow-lg" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-1 drop-shadow">
                Step 4: Review & Confirm
              </h2>
              {/* Glassmorphic summary */}
              <div
                className="
      w-full max-w-md mx-auto
      bg-white/50
      backdrop-blur-sm
      rounded-xl
      shadow-inner
      px-8 py-10
      flex flex-col
      mb-6
      border border-[var(--color-muted)]/20
      divide-y divide-[var(--color-muted)]/30
      text-left
    "
              >
                {[
                  { label: "Name", value: form.name },
                  { label: "Email", value: form.email },
                  {
                    label: "Phone",
                    value: form.phone || (
                      <span className="text-muted-foreground">None</span>
                    ),
                  },
                  { label: "Service", value: form.service },
                  {
                    label: "Date",
                    value: form.date ? form.date.toLocaleDateString() : "",
                  },
                  { label: "Time", value: form.time },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-xl sm:text-2xl py-3"
                  >
                    <span className="font-semibold text-[var(--color-accent)] min-w-[90px]">
                      {item.label}:
                    </span>
                    <span className="flex-1 font-medium text-[var(--color-foreground)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              {/* Action buttons */}
              <div className="flex justify-between w-full gap-4 mt-2">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => nextStep(3)}
                  className="rounded-lg text-lg px-8 py-3"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="px-10 py-4 text-xl rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-primary)] transition"
                  onClick={() => setShowConfirm(true)}
                >
                  Confirm & Book
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Modal, now glassy and bigger */}
        <Dialog
          open={showConfirm}
          onOpenChange={(open) => {
            setShowConfirm(open);
            if (!open) nextStep(1);
          }}
        >
          <DialogContent className="p-16 sm:p-20 max-w-2xl text-center rounded-3xl bg-white/90 backdrop-blur-lg shadow-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[var(--color-accent)]/30">
            <DialogTitle className="mb-6 text-4xl font-bold text-[var(--color-primary)]">
              Appointment Booked!
            </DialogTitle>
            <p className="mb-10 text-2xl">
              Thank you, {form.name}!<br />
              Your appointment for <b>{form.service}</b> on{" "}
              <b>{form.date?.toLocaleDateString()}</b> at <b>{form.time}</b> is
              confirmed.
              <br />
              We’ll email you soon.
            </p>
            <Button
              onClick={() => {
                setShowConfirm(false);
                nextStep(1);
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  service: "",
                  date: undefined,
                  time: "",
                });
                window.location.href = "/";
              }}
              className="px-14 py-4 text-xl rounded-xl"
            >
              Back to Home
            </Button>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}
