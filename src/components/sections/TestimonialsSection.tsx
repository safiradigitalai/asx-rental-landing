'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  vehicleCategory: string;
  testimonial: string;
  highlight: string;
  trip: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maria Silva",
      location: "São Paulo, SP",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      date: "Dezembro 2024",
      vehicleCategory: "Minivan Luxo",
      testimonial: "Experiência incrível! O pagamento só após receber o carro realmente faz a diferença. Fomos em família para Disney e o espaço da minivan foi perfeito. Atendimento em português facilitou muito, especialmente para meus pais.",
      highlight: "Pagamento após receber foi um diferencial",
      trip: "Família Disney World - 8 dias"
    },
    {
      id: 2,
      name: "Carlos Santos",
      location: "Rio de Janeiro, RJ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      date: "Janeiro 2025",
      vehicleCategory: "SUV",
      testimonial: "Fui com amigos para Universal e o SUV foi a escolha perfeita. Zero bloqueio no cartão permitiu que eu usasse o limite para compras. Entrega no aeroporto foi super rápida, sem filas. Recomendo!",
      highlight: "Zero bloqueio no cartão foi essencial",
      trip: "Universal Studios - 5 dias"
    },
    {
      id: 3,
      name: "Ana Oliveira",
      location: "Belo Horizonte, MG",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      date: "Novembro 2024",
      vehicleCategory: "Sedan",
      testimonial: "Primeira viagem internacional e estava nervosa, mas o atendimento em português da ASX me tranquilizou completamente. O sedan foi econômico e perfeito para eu e meu marido. Milhas ilimitadas nos deu total liberdade!",
      highlight: "Atendimento em português foi fundamental",
      trip: "Lua de mel Orlando - 7 dias"
    },
    {
      id: 4,
      name: "Roberto Lima",
      location: "Porto Alegre, RS",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      date: "Dezembro 2024",
      vehicleCategory: "Suburban",
      testimonial: "Viagem com toda família estendida - 12 pessoas! O Suburban comportou perfeitamente nosso grupo. Cadeirinhas gratuitas para as crianças foi um alívio no orçamento. Serviço impecável do início ao fim.",
      highlight: "Cadeirinhas gratuitas economizaram muito",
      trip: "Família estendida - 10 dias"
    },
    {
      id: 5,
      name: "Patricia Costa",
      location: "Brasília, DF",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      date: "Janeiro 2025",
      vehicleCategory: "Esportivo",
      testimonial: "Comemoração dos meus 30 anos com as amigas! O Challenger laranja foi o máximo, chamou atenção em todo lugar. Experiência única, desde a reserva até a devolução. ASX superou todas expectativas!",
      highlight: "Experiência única e inesquecível",
      trip: "Aniversário com amigas - 4 dias"
    }
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="depoimentos" className="editorial-section bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Editorial Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(45deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: 'var(--space-16) var(--space-16), var(--space-8) var(--space-8)'
        }}
      />

      <div className="editorial-container relative z-10">
        {/* Editorial Header */}
        <motion.header
          className="magazine-grid editorial-rhythm text-center"
          style={{ marginBottom: 'var(--space-12)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            {/* Issue Label */}
            <motion.div 
              className="inline-flex items-center bg-amber-500/10 border border-amber-500/20 text-amber-700 text-sm font-medium tracking-[0.2em] uppercase"
              style={{ 
                gap: 'var(--space-2)', 
                padding: 'var(--space-2) var(--space-4)',
                marginBottom: 'var(--space-8)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Depoimentos</span>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-md text-gray-900 tracking-tighter"
              style={{ marginBottom: 'var(--space-2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              O QUE NOSSOS{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text">
                CLIENTES DIZEM
              </span>
            </motion.h2>
            
            {/* Editorial Subtext */}
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light"
              style={{ lineHeight: '1.7', paddingLeft: 'var(--space-4)', paddingRight: 'var(--space-4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Mais de 10.000 brasileiros já viveram experiências incríveis em Orlando com nossos veículos premium.
            </motion.p>
          </div>
        </motion.header>

        {/* Main Testimonial Card */}
        <div className="magazine-grid" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative overflow-hidden"
                  style={{ 
                    borderRadius: '20px',
                    minHeight: '400px'
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Premium Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
                  
                  {/* Animated Pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-[0.08]"
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,165,116,0.15) 1px, transparent 0)',
                      backgroundSize: 'var(--space-8) var(--space-8)'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5" />

                  <div 
                    className="relative z-10 text-white h-full flex flex-col justify-center"
                    style={{ padding: 'var(--space-10)' }}
                  >
                    {/* Rating */}
                    <div className="flex items-center justify-center" style={{ gap: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating 
                              ? 'text-amber-300 fill-current' 
                              : 'text-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
                      <p className="text-xl text-white/90 leading-relaxed font-light" style={{ 
                        lineHeight: '1.6',
                        maxWidth: '700px',
                        margin: '0 auto'
                      }}>
                        &ldquo;{currentTestimonial.testimonial}&rdquo;
                      </p>
                    </blockquote>

                    {/* Highlight Badge */}
                    <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
                      <div className="inline-flex items-center bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm font-medium" style={{ 
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: '8px'
                      }}>
                        {currentTestimonial.highlight}
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="flex flex-col md:flex-row items-center justify-center" style={{ gap: 'var(--space-6)' }}>
                      {/* Avatar */}
                      <div className="relative">
                        <div 
                          className="rounded-full overflow-hidden border-2 border-amber-400/50"
                          style={{ width: '64px', height: '64px' }}
                        >
                          <Image 
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="text-center md:text-left">
                        <h4 className="text-white font-bold text-lg" style={{ marginBottom: 'var(--space-1)' }}>{currentTestimonial.name}</h4>
                        <p className="text-white/60 text-sm font-light">{currentTestimonial.location}</p>
                        <div className="text-xs text-white/50" style={{ marginTop: 'var(--space-1)' }}>
                          {currentTestimonial.date} • {currentTestimonial.vehicleCategory}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Enhanced Navigation Indicators - Matching Vehicle Slider Design */}
        <motion.div 
          className="flex justify-center items-center"
          style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Interactive Dots */}
          <div className="flex" style={{ gap: 'var(--space-2)' }}>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: index === currentIndex ? '24px' : '8px',
                  height: '8px',
                  background: index === currentIndex 
                    ? 'linear-gradient(135deg, #F59E0B, #FBBF24)' 
                    : 'rgba(156, 163, 175, 0.4)',
                  boxShadow: index === currentIndex 
                    ? '0 4px 12px rgba(245,158,11,0.3)'
                    : 'none'
                }}
                onClick={() => goToTestimonial(index)}
                whileHover={{ 
                  scale: 1.2,
                  background: index === currentIndex 
                    ? 'linear-gradient(135deg, #F59E0B, #FBBF24)' 
                    : 'rgba(156, 163, 175, 0.6)'
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Statistics - Redesigned */}
        <motion.section
          className="magazine-grid"
          style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-12)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {[
            { number: "10.000+", label: "Clientes Satisfeitos" },
            { number: "4.9", label: "Avaliação Média" },
            { number: "95%", label: "Indicariam para Amigos" }
          ].map((stat, index) => (
            <motion.article
              key={index}
              className="col-span-12 lg:col-span-4 relative overflow-hidden text-center"
              style={{ 
                borderRadius: '16px',
                minHeight: '160px'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              whileHover={{ 
                y: -4,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
            >
              {/* Clean Background */}
              <div className="absolute inset-0 bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-300" />
              
              <div 
                className="relative z-10 h-full flex flex-col justify-center items-center text-gray-900"
                style={{ padding: 'var(--space-6)' }}
              >
                <div className="text-4xl font-bold text-amber-600" style={{ marginBottom: 'var(--space-2)' }}>{stat.number}</div>
                <div className="text-gray-600 text-base font-medium">{stat.label}</div>
              </div>
            </motion.article>
          ))}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="magazine-grid"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <motion.article 
              className="relative overflow-hidden text-center"
              style={{ 
                padding: 'clamp(1rem, 4vw, var(--space-10))',
                borderRadius: 'clamp(16px, 4vw, 20px)'
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
            >
              {/* Premium Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
              
              {/* Pattern */}
              <motion.div 
                className="absolute inset-0 opacity-[0.06]"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(255,255,255,0.4) 1px, transparent 0)',
                  backgroundSize: 'var(--space-8) var(--space-8)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-400/10" />
              
              <div className="relative z-10 text-white">
                {/* Title */}
                <motion.h3 
                  className="text-editorial-sm md:text-editorial-md leading-tight tracking-tighter" 
                  style={{ 
                    marginBottom: 'clamp(0.75rem, 2vw, var(--space-4))',
                    fontFamily: 'ui-serif, Georgia, serif'
                  }}
                >
                  PRONTO PARA CRIAR{' '}
                  <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text">
                    SUA HISTÓRIA?
                  </span>
                </motion.h3>
                
                {/* Description */}
                <p className="text-white/85 font-light" style={{ 
                  fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
                  lineHeight: 'clamp(1.4, 0.2vw, var(--baseline))', 
                  marginBottom: 'clamp(1rem, 3vw, var(--space-8))',
                  maxWidth: 'clamp(100%, 10vw, 600px)',
                  margin: '0 auto clamp(1rem, 3vw, var(--space-8)) auto',
                  padding: 'clamp(0px, 1vw, 0px) clamp(0.5rem, 2vw, 0px)'
                }}>
                  Junte-se a milhares de brasileiros que já escolheram a ASX para suas aventuras em Orlando.
                </p>
                
                {/* CTA Button */}
                <motion.button
                  className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden shadow-2xl"
                  style={{ 
                    padding: 'clamp(0.875rem, 3vw, var(--space-4)) clamp(1.25rem, 5vw, var(--space-10))',
                    borderRadius: '8px',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 4px 16px rgba(245,158,11,0.2)'
                  }}
                  onClick={() => scrollToSection('calculadora')}
                  whileHover={{ 
                    scale: 1.08,
                    y: -6,
                    boxShadow: '0 12px 40px rgba(245,158,11,0.5), 0 6px 20px rgba(245,158,11,0.3)',
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 font-black">
                    <span className="hidden xs:inline">Começar Minha Aventura</span>
                    <span className="xs:hidden">Começar Aventura</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                </motion.button>
              </div>
            </motion.article>
          </div>
        </motion.section>
      </div>
    </section>
  );
}