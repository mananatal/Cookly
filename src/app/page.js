'use client'
import { AboutUs } from "@/components/landingPage/AboutUs";
import { FeaturesSection } from "@/components/landingPage/FeaturesSection";
import Footer from "@/components/landingPage/Footer";
import HeroSection from "@/components/landingPage/HeroSection";
import HowItWorksSection from "@/components/landingPage/HowItWorksSection";
import Navbar from "@/components/common/Navbar";
import TestimonialsSection from "@/components/landingPage/TestimonialsSection";


export default function Home() {

  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar handleSmoothScroll={handleSmoothScroll} />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutUs />

      {/* Features Section */}
      <FeaturesSection />

      {/* How it works section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer handleSmoothScroll={handleSmoothScroll} />
    </div>
  );
}
