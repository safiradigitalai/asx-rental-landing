'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', size = 'md', variant = 'light' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10', 
    lg: 'h-12'
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const accentColor = variant === 'light' ? 'text-amber-400' : 'text-amber-600';

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className} flex items-center gap-4`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Editorial Typography Logo */}
      <div className="flex items-baseline gap-1">
        <motion.div 
          className={`font-black text-4xl tracking-tighter ${textColor} leading-none`}
          style={{ fontFamily: 'ui-serif, Georgia, serif' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          ASX
        </motion.div>
        
        <motion.div 
          className={`${accentColor} text-2xl font-light leading-none`}
          style={{ fontFamily: 'ui-serif, Georgia, serif' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          •
        </motion.div>
      </div>

      {/* Editorial Subtext */}
      <motion.div 
        className="flex flex-col justify-center"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className={`text-xs font-medium tracking-[0.2em] uppercase ${textColor} opacity-80 leading-none`}>
          RENTAL
        </div>
        <div className={`text-xs font-light tracking-[0.15em] uppercase ${textColor} opacity-60 leading-none mt-0.5`}>
          ORLANDO
        </div>
      </motion.div>

      {/* Luxury Accent Line */}
      <motion.div 
        className={`w-8 h-px ${variant === 'light' ? 'bg-white/30' : 'bg-gray-900/30'} ml-2`}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 32, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />
    </motion.div>
  );
}