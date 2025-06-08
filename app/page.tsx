import About from "@/components/About";
import CTABanner from "@/components/CTABanner";
import EmailSignup from "@/components/EmailSignUp";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ServicesPreview />
      <Testimonials />
      <FAQ />
      <EmailSignup />
      <CTABanner />
      {/* Add more sections as you go */}
    </>
  );
}
