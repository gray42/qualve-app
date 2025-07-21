import React from "react";
import Hero from "../../components/landing/Hero";
import LandingNavbar from "../../components/landing/LandingNavbar";
import Qualve from "../../components/landing/Qualve";
import FAQ from "../../components/landing/FAQ";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="qualve">
        <Qualve />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </div>
  );
}
