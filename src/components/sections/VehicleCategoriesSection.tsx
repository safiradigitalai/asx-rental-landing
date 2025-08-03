'use client';

import { motion } from 'framer-motion';
import { Users, Star, ArrowRight, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  
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

  const nextSlide = () => {
    const newSlide = currentSlide === categories.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const prevSlide = () => {
    const newSlide = currentSlide === 0 ? categories.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollToSlide(index);
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = 320; // clamp max width
      const gap = 16; // var(--space-4) in pixels
      const scrollPosition = index * (cardWidth + gap);
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

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
                gap: 'var(--space-2)', 
                padding: 'var(--space-2) var(--space-4)',
                marginBottom: 'var(--space-8)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Car className="w-4 h-4" />
              <span>Frota Premium</span>
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
                      gap: 'var(--space-1)', 
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: '20px'
                    }}
                  >
                    <Car className="w-3 h-3" />
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

        {/* Mobile Slider with Navigation */}
        <div className="lg:hidden">
          {/* Navigation Arrows */}
          <div className="flex items-center justify-center mb-6" style={{ gap: 'var(--space-4)' }}>
            <motion.button
              className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-gray-600 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-300"
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px' 
              }}
              onClick={prevSlide}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 tracking-[0.1em] uppercase">
                {String(currentSlide + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {categories[currentSlide]?.name}
              </div>
            </div>
            
            <motion.button
              className="flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-gray-600 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-300"
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px' 
              }}
              onClick={nextSlide}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide" ref={sliderRef}>
            <div className="flex" style={{ gap: 'var(--space-4)', paddingLeft: 'var(--space-4)', paddingRight: 'var(--space-4)' }}>
              {categories.map((category, index) => (
                <motion.article
                  key={`mobile-${category.id}`}
                  className="relative overflow-hidden group cursor-pointer flex-shrink-0"
                  style={{ 
                    width: 'clamp(280px, 85vw, 320px)',
                    height: '520px',
                    borderRadius: '16px'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCategorySelect}
                >
                  {/* Clean Premium Background - Same as Desktop */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                    whileTap={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />

                  {/* Subtle Animated Pattern - Same as Desktop */}
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
                  
                  {/* Elegant Gradient Overlay - Same as Desktop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/8 via-transparent to-amber-300/4" />

                  {/* Popular Badge - Same as Desktop */}
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

                  {/* Editorial Content Layer - Same Pattern as Desktop */}
                  <div 
                    className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center"
                    style={{ padding: 'var(--space-6)' }}
                  >
                    {/* Content Block - Centralized - Same as Desktop */}
                    <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
                      {/* Vehicle Category Badge */}
                      <div 
                        className="inline-flex items-center backdrop-blur-sm border bg-amber-500/20 border-amber-400/30 text-amber-300 text-xs font-medium tracking-[0.2em] uppercase"
                        style={{ 
                          gap: 'var(--space-1)', 
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: '20px'
                        }}
                      >
                        <Car className="w-3 h-3" />
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
                      <div className="flex items-center justify-center w-full" style={{ gap: 'var(--space-4)' }}>
                        <div className="flex items-center text-white/60 text-sm" style={{ gap: 'var(--space-2)' }}>
                          <Users className="w-4 h-4" />
                          <span>{category.passengers} pessoas</span>
                        </div>
                        <div className="text-amber-300 font-bold text-lg">
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
                        style={{ gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <span className="text-sm tracking-wide">Reservar Veículo</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
          
          {/* Mobile Slider Dots */}
          <motion.div 
            className="flex justify-center"
            style={{ marginTop: 'var(--space-8)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2" style={{ gap: 'var(--space-2)' }}>
              {categories.map((_, index) => (
                <motion.button
                  key={`dot-${index}`}
                  className="relative cursor-pointer"
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-400/40" />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: index === currentSlide ? 1 : 0,
                      opacity: index === currentSlide ? 1 : 0
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.3 
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400/60"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: 1.5, 
                      opacity: 0.6,
                      transition: { duration: 0.2 }
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
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
                
                {/* Premium CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: 'var(--space-4)' }}>
                  <motion.button
                    className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden"
                    style={{ 
                      padding: 'var(--space-4) var(--space-10)',
                      gap: 'var(--space-3)',
                      borderRadius: '8px'
                    }}
                    onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ 
                      scale: 1.05,
                      y: -3,
                      transition: { type: 'spring', stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Calcular Orçamento</span>
                    <ArrowRight className="w-5 h-5 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </motion.button>
                  
                  <motion.button
                    className="inline-flex items-center border-2 border-white/80 hover:border-white text-white hover:bg-white hover:text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer"
                    style={{ 
                      padding: 'var(--space-4) var(--space-10)',
                      gap: 'var(--space-3)',
                      borderRadius: '8px'
                    }}
                    onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ 
                      scale: 1.05,
                      y: -3,
                      transition: { type: 'spring', stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Falar com Especialista</span>
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