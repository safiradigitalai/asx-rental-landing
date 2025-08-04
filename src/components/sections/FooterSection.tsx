'use client';

import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Clock, 
  Instagram,
  Star,
  Shield,
  CreditCard,
  ArrowRight,
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
    <footer className="bg-gray-950 relative overflow-hidden" style={{ paddingTop: 'var(--space-12)' }}>
      {/* Subtle Editorial Pattern - Like Paper Texture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Minimal Gradient - Very Subtle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

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
            <div className="text-white/60 text-sm font-light tracking-[0.2em] uppercase">
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
              className="flex items-center text-white/70 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
              style={{ gap: 'var(--space-2)' }}
              onClick={() => scrollToSection('https://wa.me/message/2Z77HXH2TB3DO1')}
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-light tracking-wide">WhatsApp</span>
            </motion.button>

            {/* Divider */}
            <div className="w-px h-4 bg-white/20" />

            {/* Instagram */}
            <motion.button
              className="flex items-center text-white/70 hover:text-pink-400 transition-colors duration-300 cursor-pointer"
              style={{ gap: 'var(--space-2)' }}
              onClick={() => window.open('https://instagram.com/asxgroup', '_blank')}
              whileHover={{ scale: 1.05 }}
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-light tracking-wide">@asxgroup</span>
            </motion.button>
          </motion.section>

          {/* Trust Line - Subtle */}
          <motion.section
            className="text-white/50 text-sm font-light"
            style={{ marginBottom: 'var(--space-6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-amber-400 font-medium">10.000+</span> brasileiros • <span className="text-amber-400 font-medium">4.9★</span> avaliação
          </motion.section>

        </div>

        {/* Editorial Bottom Bar */}
        <motion.footer 
          className="magazine-grid border-t border-white/10"
          style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-4)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12">
            <div className="flex flex-col lg:flex-row items-center justify-between" style={{ gap: 'var(--space-4)' }}>
              <div className="text-white/60 text-sm font-light">
                © {currentYear} ASX Group Rental Cars. Todos os direitos reservados.
              </div>
              
              <div className="text-white/60 text-sm font-light">
                by: <span className="text-amber-400 font-semibold">Safira Digital</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </footer>
  );
}