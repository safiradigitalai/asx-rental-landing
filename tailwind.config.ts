import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-corporate': '#0066CC',
        'azul-accent': '#1E90FF',
        'amarelo-gold': '#FFD700',
        'vermelho-cta': '#FF4444',
        'branco-pure': '#FFFFFF',
        'preto-text': '#1A202C',
        'cinza-glass': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0066CC 0%, #1E90FF 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInFromLeft 0.6s ease-out',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glass-hover': '0 12px 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'glass': '16px',
        'glass-sm': '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;