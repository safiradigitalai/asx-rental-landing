'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Editorial Magazine-Style Background */}
      <div className="absolute inset-0">
        {/* Main Hero Image - Magazine Style */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2340&auto=format&fit=crop"
            alt="Orlando Skyline"
            fill
            className="object-cover object-center opacity-60"
            priority
            quality={95}
          />
          {/* Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        {/* Abstract Geometric Elements */}
        <motion.div 
          className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Editorial Navigation */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="editorial-container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
          <div className="flex items-center justify-between">
            <Logo size="lg" variant="light" />
            
            <motion.button
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs sm:text-sm tracking-[0.1em] uppercase transition-all duration-400 flex items-center cursor-pointer relative overflow-hidden shadow-2xl"
              style={{ 
                padding: 'var(--space-2) var(--space-3)',
                gap: 'var(--space-2)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(245,158,11,0.3), 0 2px 8px rgba(245,158,11,0.2)'
              }}
              onClick={() => scrollToSection('calculadora')}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 6px 20px rgba(245,158,11,0.4), 0 3px 10px rgba(245,158,11,0.3)',
                transition: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hidden sm:inline relative z-10 font-black">Faça sua Reserva</span>
              <span className="sm:hidden relative z-10 font-black">Reservar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Editorial Main Content */}
      <div className="relative z-40 min-h-screen flex items-center" style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-20)' }}>
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Main Content - Full width on mobile, 7 cols on desktop */}
            <div className="lg:col-span-7 editorial-stack-lg editorial-rhythm">
              {/* Issue Header - Hidden on Mobile */}
              <motion.header
                className="hidden lg:flex items-center"
                style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-amber-400/90 font-light tracking-[0.3em] text-sm uppercase">
                  Issue #01
                </div>
                <div className="bg-gradient-to-r from-white/40 to-transparent" style={{ width: 'var(--space-12)', height: '1px' }} />
                <div className="text-white/50 font-light tracking-[0.25em] text-sm uppercase">
                  Premium Rental Experience
                </div>
              </motion.header>

              {/* Main Editorial Headline */}
              <motion.section
                className="editorial-stack-lg"
                style={{ marginBottom: 'var(--space-10)' }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <h1 className="text-editorial-md sm:text-editorial-lg lg:text-editorial-xl text-white tracking-tighter">
                  ALUGUE
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text">
                    SEU CARRO
                  </span>
                  <br />
                  EM ORLANDO
                </h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/75 max-w-3xl font-light"
                  style={{ lineHeight: 'var(--baseline)', paddingRight: 'var(--space-6)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  A experiência premium que você merece.{' '}
                  <span className="text-amber-400 font-medium">Pagamento só após receber</span>, 
                  sem bloqueios no cartão e atendimento especializado em português.
                </motion.p>
              </motion.section>

              {/* Editorial Features Grid */}
              <motion.section
                className="grid grid-cols-1 sm:grid-cols-3"
                style={{ 
                  gap: 'var(--space-6)', 
                  marginTop: 'var(--space-8)',
                  marginBottom: 'var(--space-10)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { label: "PAGAMENTO", value: "Após receber", accent: true },
                  { label: "BLOQUEIO", value: "Zero no cartão" },
                  { label: "SUPORTE", value: "24/7 português" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`border-l-2 ${feature.accent ? 'border-amber-400' : 'border-white/20'} bg-white/3 backdrop-blur-sm`}
                    style={{ 
                      padding: 'var(--space-4)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 'var(--space-2)' 
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', x: 4 }}
                  >
                    <div className={`${feature.accent ? 'text-amber-400' : 'text-white/60'} text-xs font-medium tracking-[0.25em] uppercase`}>
                      {feature.label}
                    </div>
                    <div className="text-white text-base font-light leading-relaxed">
                      {feature.value}
                    </div>
                  </motion.div>
                ))}
              </motion.section>

              {/* Editorial CTAs */}
              <motion.section 
                className="flex flex-col sm:flex-row"
                style={{ 
                  gap: 'var(--space-4)', 
                  marginTop: 'var(--space-12)' 
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.button
                  className="group relative bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 flex items-center justify-center overflow-hidden cursor-pointer shadow-2xl"
                  style={{ 
                    padding: 'var(--space-3) var(--space-8)',
                    gap: 'var(--space-3)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 4px 16px rgba(245,158,11,0.2)'
                  }}
                  onClick={() => scrollToSection('categorias')}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -6,
                    boxShadow: '0 12px 40px rgba(245,158,11,0.5), 0 6px 20px rgba(245,158,11,0.3)',
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 font-black">Ver Veículos</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                </motion.button>
                
                <motion.button
                  className="group border-2 border-white/80 hover:border-white text-white hover:bg-white hover:text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 flex items-center justify-center cursor-pointer"
                  style={{ 
                    padding: 'var(--space-3) var(--space-8)',
                    gap: 'var(--space-3)',
                    borderRadius: '8px'
                  }}
                  onClick={() => scrollToSection('calculadora')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Fazer Reserva Agora</span>
                </motion.button>
              </motion.section>
            </div>

            {/* Right Column - Stats & Social Proof - Hidden on Mobile */}
            <div className="hidden lg:block lg:col-span-5 editorial-stack-lg" style={{ paddingLeft: 'var(--space-8)' }}>
              {/* Statistics Section */}
              <motion.section
                className="editorial-stack-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="border-l-4 border-amber-400/60" style={{ paddingLeft: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                  {[
                    { number: "10,000+", label: "Clientes Satisfeitos", description: "Brasileiros atendidos" },
                    { number: "50+", label: "Modelos Disponíveis", description: "Frota premium" },
                    { number: "24/7", label: "Suporte Especializado", description: "Em português" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + (index * 0.15) }}
                      whileHover={{ x: 8 }}
                    >
                      <div className="text-4xl lg:text-5xl font-black text-white leading-none">
                        {stat.number}
                      </div>
                      <div className="text-white/80 text-base font-medium leading-tight">
                        {stat.label}
                      </div>
                      <div className="text-white/50 text-sm font-light tracking-wide">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Testimonial Card */}
              <motion.article
                className="bg-white/5 backdrop-blur-md border border-white/15 editorial-stack hover:bg-white/8 hover:border-white/25 transition-all duration-400"
                style={{ padding: 'var(--space-6)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-xl">5.0</span>
                </div>
                
                <blockquote className="text-white/80 text-base leading-relaxed italic">
                  &ldquo;Melhor experiência de locação que já tive. Processo transparente, veículo impecável e atendimento excepcional em português.&rdquo;
                </blockquote>
                
                <footer className="flex items-center justify-between border-t border-white/10" style={{ paddingTop: 'var(--space-3)' }}>
                  <div>
                    <div className="text-amber-400 font-medium text-sm">
                      Maria Santos
                    </div>
                    <div className="text-white/50 text-xs tracking-wide">
                      Cliente Verificado • São Paulo
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </footer>
              </motion.article>
            </div>
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
          style={{ gap: 'var(--space-1)' }}
          onClick={() => scrollToSection('diferenciais')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}