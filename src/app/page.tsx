'use client';

import HeroSection from '@/components/sections/HeroSection';
import DiferenciaisSection from '@/components/sections/DiferenciaisSection';
import VehicleCategoriesSection from '@/components/sections/VehicleCategoriesSection';
import PriceCalculatorSection from '@/components/sections/PriceCalculatorSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FooterSection from '@/components/sections/FooterSection';
import LeadCaptureModal from '@/components/ui/LeadCaptureModal';
import { useLeadModal } from '@/hooks/useLeadModal';

export default function Home() {
  const { isOpen, modalData, closeModal } = useLeadModal();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <DiferenciaisSection />
      <VehicleCategoriesSection />
      <PriceCalculatorSection />
      <TestimonialsSection />
      <FooterSection />
      
      <LeadCaptureModal 
        isOpen={isOpen}
        onClose={closeModal}
        initialData={modalData}
      />
    </main>
  );
}
