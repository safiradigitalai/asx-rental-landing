'use client';

import { motion } from 'framer-motion';
import { 
  Instagram,
  MessageCircle
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ paddingTop: 'var(--space-12)' }}>
      {/* Premium Blue Background - Matching Diferencial Cards */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />

      {/* Animated Pattern - Matching Diferencial Cards */}
      <motion.div 
        className="absolute inset-0 opacity-8"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: 'var(--space-8) var(--space-8)'
        }}
      />
      
      {/* Blue Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-blue-300/5" />

      <div className="editorial-container relative z-10">

        {/* Ultra-Minimalist Editorial Footer */}
        <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
          
          {/* Editorial Header with Logo Integration */}
          <motion.section
            className="flex flex-col items-center"
            style={{ marginBottom: 'var(--space-8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo */}
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <Logo size="lg" variant="light" />
            </div>
            
            {/* Elegant Tagline */}
            <div className="text-blue-200 text-sm font-light tracking-[0.2em] uppercase">
              Orlando Rental Experience
            </div>
          </motion.section>

          {/* Essential Contact - Inline Editorial Style */}
          <motion.section
            className="flex items-center justify-center"
            style={{ 
              gap: 'var(--space-8)', 
              marginBottom: 'var(--space-6)' 
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* WhatsApp */}
            <motion.button
              className="flex items-center text-blue-200 hover:text-amber-300 transition-colors duration-300 cursor-pointer"
              style={{ gap: 'var(--space-2)' }}
              onClick={() => scrollToSection('https://wa.me/message/2Z77HXH2TB3DO1')}
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-light tracking-wide">WhatsApp</span>
            </motion.button>

            {/* Divider */}
            <div className="w-px h-4 bg-blue-300/30" />

            {/* Instagram */}
            <motion.button
              className="flex items-center text-blue-200 hover:text-amber-300 transition-colors duration-300 cursor-pointer"
              style={{ gap: 'var(--space-2)' }}
              onClick={() => window.open('https://instagram.com/asxgroup.rental', '_blank')}
              whileHover={{ scale: 1.05 }}
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-light tracking-wide">@asxgroup.rental</span>
            </motion.button>
          </motion.section>

          {/* Trust Line - Enhanced with Blue Background */}
          <motion.section
            className="text-blue-100/70 text-sm font-light"
            style={{ marginBottom: 'var(--space-6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text font-medium">1.000+</span> brasileiros • <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text font-medium">4.9★</span> avaliação
          </motion.section>

        </div>

        {/* Editorial Bottom Bar */}
        <motion.footer 
          className="magazine-grid"
          style={{ 
            paddingTop: 'var(--space-4)', 
            paddingBottom: 'var(--space-4)',
            borderTop: '1px solid transparent',
            borderImage: 'linear-gradient(90deg, rgba(0,102,204,0.2) 0%, rgba(59,130,246,0.3) 25%, rgba(245,158,11,0.3) 75%, rgba(251,191,36,0.2) 100%) 1'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12">
            <div className="flex flex-col lg:flex-row items-center justify-between" style={{ gap: 'var(--space-4)' }}>
              <div className="text-blue-100/60 text-sm font-light">
                © {currentYear} ASX Group Rental Cars. Todos os direitos reservados.
              </div>
              
              <div className="text-blue-100/60 text-sm font-light">
                by: <span className="text-amber-300 font-semibold">Safira Digital</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </footer>
  );
}