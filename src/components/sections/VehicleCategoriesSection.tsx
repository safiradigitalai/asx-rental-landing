'use client';

import { motion } from 'framer-motion';
import { Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { openWhatsAppMessage } from '@/lib/whatsapp';

interface VehicleCategory {
  id: string;
  name: string;
  model: string;
  year: number;
  color: string;
  passengers: number;
  priceRange: string;
  dailyPrice: number;
  imageUrl: string;
  features: string[];
  popular?: boolean;
}

export default function VehicleCategoriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const categories: VehicleCategory[] = [
    {
      id: 'esportivo',
      name: 'Esportivo',
      model: 'Dodge Challenger',
      year: 2020,
      color: 'Laranja',
      passengers: 2,
      priceRange: '$95-140/dia',
      dailyPrice: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2340&auto=format&fit=crop',
      features: ['Motor V6', 'Esportivo', 'Som Premium', 'Performance']
    },
    {
      id: 'minivan-luxo',
      name: 'Minivan Luxo',
      model: 'Chrysler Pacifica',
      year: 2024,
      color: 'Branca/Preta/Prata',
      passengers: 8,
      priceRange: '$85-120/dia',
      dailyPrice: 64.99,
      imageUrl: 'https://images.unsplash.com/photo-1520446266423-b915a1f7b994?q=80&w=2340&auto=format&fit=crop',
      features: ['8 Lugares', 'Couro', 'Tela Touchscreen', 'Câmera de Ré']
    },
    {
      id: 'minivan-regular',
      name: 'Minivan Regular',
      model: 'Dodge Grand Caravan',
      year: 2020,
      color: 'Branca/Preta',
      passengers: 7,
      priceRange: '$65-85/dia',
      dailyPrice: 54.99,
      imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2340&auto=format&fit=crop',
      features: ['7 Lugares', 'Porta Traseira Automática', 'Espaço Bagagem', 'GPS']
    },
    {
      id: 'sedan',
      name: 'Sedan',
      model: 'Hyundai Elantra',
      year: 2020,
      color: 'Azul',
      passengers: 5,
      priceRange: '$45-65/dia',
      dailyPrice: 44.99,
      imageUrl: 'https://images.unsplash.com/photo-1550355191-aa8a80b41353?q=80&w=2340&auto=format&fit=crop',
      features: ['Econômico', 'Ar Condicionado', 'Direção Elétrica', 'Bluetooth']
    },
    {
      id: 'suv',
      name: 'SUV',
      model: 'Chevrolet Equinox',
      year: 2022,
      color: 'Preta',
      passengers: 7,
      priceRange: '$70-95/dia',
      dailyPrice: 54.99,
      imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2340&auto=format&fit=crop',
      features: ['AWD', 'Porta-Bagagem Elétrica', 'Sensores', 'Apple CarPlay']
    },
    {
      id: 'suburban',
      name: 'Suburban',
      model: 'Chevrolet Suburban',
      year: 2023,
      color: 'Preta/Azul',
      passengers: 8,
      priceRange: '$120-160/dia',
      dailyPrice: 149.90,
      imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2340&auto=format&fit=crop',
      features: ['8 Lugares', 'Luxo Premium', '4WD', 'Teto Solar']
    }
  ];

  const handleCategorySelect = () => {
    // Scroll to calculator section
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Função para calcular a posição de scroll para centralizar um card
  const getScrollPosition = (index: number) => {
    if (!scrollRef.current) return 0;
    
    const cardWidth = 320; // Largura fixa dos cards
    const gap = 24; // var(--space-6) = 24px
    
    // Posição do card específico no scroll
    const cardPosition = index * (cardWidth + gap);
    
    // A posição de scroll necessária para centralizar o card
    const scrollPosition = cardPosition;
    
    return Math.max(0, scrollPosition);
  };

  // Navegar para um slide específico com transição suave
  const goToSlide = (index: number) => {
    if (isScrolling || !scrollRef.current) return;
    
    setIsScrolling(true);
    setIsTransitioning(true);
    
    // Fade out suave
    setTimeout(() => {
      const scrollPosition = getScrollPosition(index);
      
      scrollRef.current?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      // Atualizar o estado durante a transição
      setCurrentSlide(index);
      
      // Fade in após posicionamento
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
      
    }, 100);
    
    // Reset scrolling flag after animation completa
    setTimeout(() => setIsScrolling(false), 800);
  };

  // Navegar para próximo/anterior
  const goToPrevious = () => {
    const newIndex = currentSlide > 0 ? currentSlide - 1 : categories.length - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentSlide < categories.length - 1 ? currentSlide + 1 : 0;
    goToSlide(newIndex);
  };

  // Detectar mudança de scroll manual e manter sincronização
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling) return; // Ignora se estivermos fazendo scroll programático
      
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cardWidth = 320;
      const gap = 24;
      const padding = containerWidth / 2 - cardWidth / 2; // Padding dinâmico
      
      // Calcular qual card está mais próximo do centro da tela
      const adjustedScroll = scrollLeft + padding;
      const approximateIndex = Math.round(adjustedScroll / (cardWidth + gap));
      const clampedIndex = Math.max(0, Math.min(approximateIndex, categories.length - 1));
      
      if (clampedIndex !== currentSlide) {
        setCurrentSlide(clampedIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSlide, isScrolling, categories.length]);

  // Garantir centralização em todas as situações
  useEffect(() => {
    const ensureCentered = () => {
      if (scrollRef.current) {
        const newPosition = getScrollPosition(currentSlide);
        scrollRef.current.scrollLeft = newPosition;
      }
    };

    // Tentar centralizar imediatamente
    ensureCentered();
    
    // Tentar novamente após um pequeno delay (para garantir que o DOM esteja pronto)
    const timer1 = setTimeout(ensureCentered, 50);
    const timer2 = setTimeout(ensureCentered, 150);
    const timer3 = setTimeout(ensureCentered, 300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentSlide]); // Executa sempre que currentSlide mudar

  // Reposicionar quando a tela mudar de tamanho
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const newPosition = getScrollPosition(currentSlide);
        scrollRef.current.scrollLeft = newPosition;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide]);




  return (
    <section id="categorias" className="editorial-section bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Editorial Parallax Background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(45deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: 'var(--space-16) var(--space-16), var(--space-8) var(--space-8)'
        }}
      />
      
      {/* Editorial Lines Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.01]"
        animate={{ 
          backgroundPosition: ['0% 0%', '300% 0%'],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 98%, rgba(212, 165, 116, 0.08) 100%)',
          backgroundSize: 'var(--space-20) 100%'
        }}
      />

      <div className="editorial-container relative z-10">
        {/* Editorial Header */}
        <motion.header
          className="editorial-rhythm text-center"
          style={{ marginBottom: 'var(--space-16)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            {/* Issue Label */}
            <motion.div 
              className="inline-flex items-center bg-amber-500/10 border border-amber-500/20 text-amber-700 text-sm font-medium tracking-[0.2em] uppercase"
              style={{ 
                padding: 'var(--space-2) var(--space-4)',
                marginBottom: 'var(--space-8)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Frota ASX</span>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-md text-gray-900 tracking-tighter"
              style={{ marginBottom: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              ESCOLHA SEU{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text">
                VEÍCULO IDEAL
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
              Desde econômicos até premium. Cada veículo com seguro completo, quilometragem ilimitada e atendimento especializado em português.
            </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Desktop Grid - 2 Columns Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              className="col-span-12 lg:col-span-6 relative overflow-hidden group cursor-pointer"
              style={{ 
                borderRadius: '16px',
                height: '580px'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              onClick={() => handleCategorySelect()}
            >
              {/* Clean Premium Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* Subtle Animated Pattern */}
              <motion.div 
                className="absolute inset-0 opacity-[0.06]"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 30 + (index * 5),
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,165,116,0.4) 1px, transparent 0)',
                  backgroundSize: 'var(--space-8) var(--space-8)'
                }}
              />
              
              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 via-transparent to-amber-300/4" />

              {/* Popular Badge */}
              {category.popular && (
                <motion.div 
                  className="absolute top-4 right-4 z-20 inline-flex items-center bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm text-amber-300 text-xs font-medium tracking-[0.25em] uppercase"
                  style={{ 
                    gap: 'var(--space-1)', 
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: '20px'
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(245, 158, 11, 0.3)' }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>Popular</span>
                </motion.div>
              )}

              {/* Editorial Content Layer */}
              <div 
                className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center"
                style={{ padding: 'var(--space-8)' }}
              >
                {/* Content Block - Centralized */}
                <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
                  {/* Vehicle Category Badge */}
                  <div 
                    className="inline-flex items-center backdrop-blur-sm border bg-amber-500/20 border-amber-400/30 text-amber-300 text-xs font-medium tracking-[0.2em] uppercase"
                    style={{ 
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: '20px'
                    }}
                  >
                    <span>{category.name}</span>
                  </div>
                  
                  {/* Vehicle Title */}
                  <h3 className="text-editorial-sm leading-tight">
                    {category.model.toUpperCase()}
                  </h3>
                  
                  {/* Vehicle Details */}
                  <p className="text-white/70 text-base font-light">
                    {category.year} • {category.color}
                  </p>
                  
                  {/* Capacity & Price */}
                  <div className="flex items-center justify-center w-full" style={{ gap: 'var(--space-6)' }}>
                    <div className="flex items-center text-white/60 text-base" style={{ gap: 'var(--space-2)' }}>
                      <Users className="w-5 h-5" />
                      <span>{category.passengers} pessoas</span>
                    </div>
                    <div className="text-amber-300 font-bold text-xl">
                      ${category.dailyPrice}
                      <span className="text-white/60 text-sm font-light">/dia</span>
                    </div>
                  </div>
                  
                  {/* Editorial Features List */}
                  <div>
                    <div className="text-white/50 text-xs font-medium tracking-[0.15em] uppercase" style={{ marginBottom: 'var(--space-1)' }}>
                      Características
                    </div>
                    <div className="text-white/70 text-sm font-light leading-relaxed">
                      {category.features.slice(0, 3).join(' • ')}
                      {category.features.length > 3 && (
                        <span className="text-white/50"> • +{category.features.length - 3} mais</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Premium CTA */}
                  <motion.div 
                    className="flex items-center text-amber-300 font-medium group-hover:text-white transition-colors duration-300 cursor-pointer"
                    style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span className="text-base tracking-wide">Reservar Veículo</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="lg:hidden">
          {/* Cards Container */}
          <div className="relative">

            {/* Scroll Container */}
            <motion.div 
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ 
                gap: 'var(--space-6)', 
                paddingTop: 'var(--space-4)',
                paddingBottom: 'var(--space-4)',
                paddingLeft: 'calc(50vw - 160px)', // Centralizar primeiro card
                paddingRight: 'calc(50vw - 160px)'  // Centralizar último card
              }}
              animate={{
                opacity: isTransitioning ? 0.8 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {categories.map((category, index) => (
                <motion.article
                  key={category.id}
                  className="relative overflow-hidden group cursor-pointer flex-shrink-0 snap-center"
                  style={{ 
                    width: '320px', // Largura fixa para cálculos precisos
                    height: '580px',
                    borderRadius: '20px'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: index === currentSlide ? 1.03 : 1,
                    y: index === currentSlide ? -4 : 0,
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.6, -0.05, 0.01, 0.99],
                    scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    y: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                  onClick={handleCategorySelect}
                >
                  {/* Premium Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                    animate={{
                      boxShadow: index === currentSlide 
                        ? '0 20px 40px rgba(245,158,11,0.15), 0 8px 25px rgba(245,158,11,0.1)'
                        : '0 8px 25px rgba(0,0,0,0.1)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: 'easeOut',
                      boxShadow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    }}
                  />

                  {/* Animated Pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-[0.06]"
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 30 + (index * 3),
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,165,116,0.4) 1px, transparent 0)',
                      backgroundSize: 'var(--space-8) var(--space-8)'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 via-transparent to-amber-300/4" />

                  {/* Popular Badge */}
                  {category.popular && (
                    <motion.div 
                      className="absolute top-4 right-4 z-20"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '700',
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: '16px',
                        boxShadow: '0 6px 20px rgba(59,130,246,0.3)',
                        letterSpacing: '0.08em',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1), type: 'spring', stiffness: 350, damping: 20 }}
                    >
                      ★ POPULAR
                    </motion.div>
                  )}

                  {/* Content */}
                  <div 
                    className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center"
                    style={{ padding: 'var(--space-8)' }}
                  >
                    <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
                      {/* Category Badge */}
                      <div 
                        className="inline-flex items-center backdrop-blur-sm border bg-amber-500/20 border-amber-400/30 text-amber-300 text-xs font-medium tracking-[0.2em] uppercase"
                        style={{ 
                          padding: 'var(--space-2) var(--space-4)',
                          borderRadius: '20px'
                        }}
                      >
                        <span>{category.name}</span>
                      </div>
                      
                      {/* Vehicle Title */}
                      <h3 className="text-editorial-sm leading-tight">
                        {category.model.toUpperCase()}
                      </h3>
                      
                      {/* Vehicle Details */}
                      <p className="text-white/70 text-lg font-light">
                        {category.year} • {category.color}
                      </p>
                      
                      {/* Capacity & Price */}
                      <div className="flex items-center justify-center w-full" style={{ gap: 'var(--space-6)' }}>
                        <div className="flex items-center text-white/60 text-base" style={{ gap: 'var(--space-2)' }}>
                          <Users className="w-5 h-5" />
                          <span>{category.passengers} pessoas</span>
                        </div>
                        <div className="text-amber-300 font-bold text-xl">
                          ${category.dailyPrice}
                          <span className="text-white/60 text-base font-light">/dia</span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div>
                        <div className="text-white/50 text-xs font-medium tracking-[0.15em] uppercase" style={{ marginBottom: 'var(--space-2)' }}>
                          Características
                        </div>
                        <div className="text-white/70 text-base font-light leading-relaxed">
                          {category.features.slice(0, 3).join(' • ')}
                          {category.features.length > 3 && (
                            <span className="text-white/50"> • +{category.features.length - 3} mais</span>
                          )}
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <motion.div 
                        className="flex items-center text-amber-300 font-bold text-base cursor-pointer"
                        style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}
                        whileHover={{ x: 8, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <span className="tracking-wide">RESERVAR VEÍCULO</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
            
            {/* Enhanced Navigation Indicators */}
            <motion.div 
              className="flex justify-center items-center"
              style={{ gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Navigation Arrows */}
              <motion.button
                className="flex items-center text-gray-500 hover:text-amber-600 transition-colors"
                style={{ gap: 'var(--space-1)' }}
                onClick={goToPrevious}
                whileHover={{ x: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs font-medium">Anterior</span>
              </motion.button>
              
              {/* Interactive Dots */}
              <div className="flex" style={{ gap: 'var(--space-2)' }}>
                {categories.map((_, index) => (
                  <motion.button
                    key={index}
                    className="rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: index === currentSlide ? '24px' : '8px',
                      height: '8px',
                      background: index === currentSlide 
                        ? 'linear-gradient(135deg, #F59E0B, #FBBF24)' 
                        : 'rgba(156, 163, 175, 0.4)',
                      boxShadow: index === currentSlide 
                        ? '0 4px 12px rgba(245,158,11,0.3)'
                        : 'none'
                    }}
                    onClick={() => goToSlide(index)}
                    whileHover={{ 
                      scale: 1.2,
                      background: index === currentSlide 
                        ? 'linear-gradient(135deg, #F59E0B, #FBBF24)' 
                        : 'rgba(156, 163, 175, 0.6)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <motion.button
                className="flex items-center text-gray-500 hover:text-amber-600 transition-colors"
                style={{ gap: 'var(--space-1)' }}
                onClick={goToNext}
                whileHover={{ x: 2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs font-medium">Próximo</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Editorial Call-to-Action */}
        <motion.section
          className="relative"
          style={{ marginTop: 'var(--space-20)' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <motion.article 
              className="relative overflow-hidden text-center editorial-stack-lg group cursor-pointer"
              style={{ 
                padding: 'var(--space-12)',
                borderRadius: '16px'
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
            >
              {/* Parallax Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              
              {/* Animated Pattern */}
              <motion.div 
                className="absolute inset-0 opacity-10"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(255,255,255,0.3) 1px, transparent 0)',
                  backgroundSize: 'var(--space-8) var(--space-8)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-400/10" />
              
              <div className="relative z-10 text-white">
                {/* Enhanced Title */}
                <motion.h3 
                  className="text-editorial-md leading-tight" 
                  style={{ marginBottom: 'var(--space-6)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  NÃO ENCONTROU O{' '}
                  <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text">
                    IDEAL?
                  </span>
                </motion.h3>
                
                {/* Editorial Description */}
                <p className="text-xl text-white/85 font-light" style={{ 
                  lineHeight: 'var(--baseline)', 
                  marginBottom: 'var(--space-10)',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-10) auto'
                }}>
                  Temos uma frota com mais de 50 modelos premium. Nossos especialistas encontrarão o veículo perfeito para sua experiência em Orlando.
                </p>
                
                {/* Premium CTA - Destaque para Especialista */}
                <div className="flex justify-center">
                  <motion.button
                    className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-lg tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden shadow-2xl"
                    style={{ 
                      padding: 'var(--space-5) var(--space-12)',
                      gap: 'var(--space-4)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 4px 16px rgba(245,158,11,0.2)'
                    }}
                    onClick={() => openWhatsAppMessage('hero')}
                    whileHover={{ 
                      scale: 1.08,
                      y: -6,
                      boxShadow: '0 12px 40px rgba(245,158,11,0.5), 0 6px 20px rgba(245,158,11,0.3)',
                      transition: { type: 'spring', stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 font-black">FALAR COM ESPECIALISTA</span>
                    <ArrowRight className="w-6 h-6 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}