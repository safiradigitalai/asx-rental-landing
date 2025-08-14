'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  whiteFilter?: boolean;
}

export default function Logo({ className = '', size = 'md', whiteFilter = false }: LogoProps) {

  const imageSize = {
    sm: { width: 120, height: 120 },
    md: { width: 160, height: 160 },
    lg: { width: 200, height: 200 }
  };

  return (
    <motion.div 
      className={`${className} flex items-center gap-3`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Logo Image */}
      <motion.div
        className="relative flex-shrink-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Image
          src="/logo.png"
          alt="ASX Group Rental Logo"
          width={imageSize[size].width}
          height={imageSize[size].height}
          className={`object-contain ${whiteFilter ? 'filter brightness-0 invert' : ''}`}
          priority
        />
      </motion.div>
    </motion.div>
  );
}