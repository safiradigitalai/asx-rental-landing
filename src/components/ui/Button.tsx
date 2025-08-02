'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  icon
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-accent text-white hover:shadow-md focus:ring-accent-blue disabled:hover:shadow-none',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500',
    outline: 'bg-transparent text-accent-blue border border-accent-blue hover:bg-accent-blue hover:text-white focus:ring-accent-blue',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2'
  };

  return (
    <motion.button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}