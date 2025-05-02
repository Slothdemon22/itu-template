import React from 'react';
import HeroSection from '@/components/landingPage/Hero';
import ServicesSection from '@/components/landingPage/Services';
import TestimonialsSection from '@/components/landingPage/Testimonials';
import PricingSection from '@/components/landingPage/Pricing';
import Footer from '@/components/landingPage/Footer';
import ScrollReveal from '@/utils/scrollRevel';

import { testimonials, pricingTiers, footerLinks } from '@/data/mockData';

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <ScrollReveal delay={100}>
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <TestimonialsSection  />
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <PricingSection  />
      </ScrollReveal>

      <Footer />
    </div>
  );
}

export default App;
