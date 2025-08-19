'use client';

import HeroSection from '@/components/sections/HeroSection';
import VehicleCategoriesSection from '@/components/sections/VehicleCategoriesSection';
import PriceCalculatorSection from '@/components/sections/PriceCalculatorSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FooterSection from '@/components/sections/FooterSection';
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VehicleCategoriesSection />
      <PriceCalculatorSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
