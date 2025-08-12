'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array de imagens do background - Orlando/Disney theme
  const backgroundImages = [
    {
      src: "https://images.unsplash.com/photo-1661231134432-bebf986499a8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Disney Castle Orlando"
    },
    {
      src: "https://images.unsplash.com/photo-1588882929086-51acd6e39954?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Orlando Theme Park"
    },
    {
      src: "https://images.unsplash.com/photo-1618945372420-2470ece5277c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Orlando Adventure"
    }
  ];

  // Auto-advance background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Troca a cada 8 segundos

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-r from-amber-500 to-amber-400">
      {/* Editorial Magazine-Style Background Carousel */}
      <div className="absolute inset-0">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <Image
                src={backgroundImages[currentImageIndex].src}
                alt={backgroundImages[currentImageIndex].alt}
                fill
                className="object-cover object-center opacity-90"
                priority
                quality={95}
              />
            </motion.div>
          </AnimatePresence>
          
        </div>

        {/* Premium Corporate Blue Indicators - Matching Site Pattern */}
        <div className="absolute bottom-8 left-8 z-20 flex" style={{ gap: 'var(--space-2)' }}>
          {backgroundImages.map((_, index) => (
            <motion.button
              key={index}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: index === currentImageIndex ? '24px' : '8px',
                height: '8px',
                background: index === currentImageIndex 
                  ? 'linear-gradient(135deg, #0066CC, #3B82F6)' 
                  : 'rgba(59, 130, 246, 0.4)',
                boxShadow: index === currentImageIndex 
                  ? '0 4px 12px rgba(0,102,204,0.4)'
                  : 'none'
              }}
              onClick={() => setCurrentImageIndex(index)}
              whileHover={{ 
                scale: 1.2,
                background: index === currentImageIndex 
                  ? 'linear-gradient(135deg, #0066CC, #3B82F6)' 
                  : 'rgba(59, 130, 246, 0.6)'
              }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Orlando Sky Elements - Corporate Blue Theme */}
        <motion.div 
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0,102,204,0.25) 0%, rgba(30,144,255,0.15) 40%, rgba(245,158,11,0.08) 100%)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,138,0.3) 0%, rgba(59,130,246,0.2) 50%, rgba(0,102,204,0.1) 100%)'
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.15, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Corporate Blue Orb */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full blur-2xl"
          style={{
            background: 'linear-gradient(45deg, rgba(0,102,204,0.2) 0%, rgba(59,130,246,0.15) 50%, rgba(245,158,11,0.05) 100%)'
          }}
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Editorial Navigation */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="editorial-container" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-4)' }}>
          <div className="flex items-center justify-between">
            <Logo size="md" variant="light" />
            
            <motion.button
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-blue-900 font-bold text-xs sm:text-sm tracking-[0.1em] uppercase transition-all duration-400 flex items-center cursor-pointer relative overflow-hidden shadow-2xl border border-amber-300/30"
              style={{ 
                padding: 'var(--space-2) var(--space-3)',
                gap: 'var(--space-2)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(245,158,11,0.3), 0 2px 8px rgba(0,102,204,0.1)'
              }}
              onClick={() => scrollToSection('calculadora')}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 6px 20px rgba(245,158,11,0.4), 0 3px 10px rgba(0,102,204,0.2)',
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hidden sm:inline relative z-10 font-black">Faça sua Reserva</span>
              <span className="sm:hidden relative z-10 font-black">Reservar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Cinematic Hero Section - Maximum Image Prominence */}
      <div className="relative z-40 flex items-center justify-center" style={{ minHeight: '120vh', paddingTop: 'var(--space-20)' }}>
        <div className="editorial-container w-full">
          <div className="flex flex-col items-center justify-center min-h-[100vh]">
            
            {/* Modern Glass Tag - Mobile Responsive */}
            <motion.div 
              className="text-center absolute left-1/2 transform -translate-x-1/2 px-4 sm:px-0"
              style={{ 
                top: '55%',
                transform: 'translateX(-50%) translateY(-50%)'
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Glass Tag Container */}
              <motion.div
                className="backdrop-blur-xl border rounded-2xl shadow-2xl mx-auto w-full max-w-md sm:max-w-none"
                style={{
                  padding: 'var(--space-5) var(--space-6)',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 4px 16px rgba(59, 130, 246, 0.1) inset, 0 2px 8px rgba(147, 197, 253, 0.15) inset'
                }}
                whileHover={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.12) 50%, rgba(255, 255, 255, 0.08) 100%)',
                  borderColor: 'rgba(59, 130, 246, 0.4)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 6px 20px rgba(59, 130, 246, 0.15) inset, 0 3px 12px rgba(147, 197, 253, 0.2) inset',
                  transition: { duration: 0.4 }
                }}
              >
                {/* Single Line Headline */}
                <motion.h1 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center leading-tight"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    letterSpacing: '0.01em',
                    fontWeight: '300',
                    fontFamily: 'Inter, Helvetica Neue, system-ui, -apple-system, sans-serif',
                    marginBottom: 'var(--space-2)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  Alugue seu carro em Orlando{' '}
                  <span 
                    className="text-blue-100"
                    style={{ 
                      fontWeight: '200',
                      fontStyle: 'italic'
                    }}
                  >
                    com a ASX Group
                  </span>
                </motion.h1>

                {/* Centralized Compact CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-center items-center"
                  style={{ gap: 'var(--space-2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <motion.button
                    className="group relative bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-blue-900 font-bold text-xs tracking-[0.1em] uppercase transition-all duration-400 flex items-center justify-center overflow-hidden cursor-pointer shadow-lg border border-amber-300/40"
                    style={{ 
                      padding: 'var(--space-2) var(--space-4)',
                      gap: 'var(--space-2)',
                      borderRadius: '6px',
                      boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
                    }}
                    onClick={() => scrollToSection('categorias')}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -2,
                      boxShadow: '0 6px 16px rgba(245,158,11,0.4)',
                      transition: { type: 'spring', stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10 font-black">Ver Categorias</span>
                    <ArrowRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                  </motion.button>
                  
                  <motion.button
                    className="group border border-white/30 hover:border-white/50 text-white/90 hover:bg-white hover:text-blue-900 font-medium text-xs tracking-[0.1em] uppercase transition-all duration-400 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                    style={{ 
                      padding: 'var(--space-2) var(--space-4)',
                      gap: 'var(--space-2)',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                    onClick={() => scrollToSection('calculadora')}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -1,
                      background: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 3px 12px rgba(255, 255, 255, 0.2)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Fazer Reserva</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Editorial Scroll Indicator */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 z-50"
        style={{ bottom: 'var(--space-6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.button
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
          onClick={() => scrollToSection('diferenciais')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </section>
  );
}