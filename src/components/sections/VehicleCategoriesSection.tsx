'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, Star, ArrowRight, ChevronLeft, ChevronRight, Car } from 'lucide-react';
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
  const isAutoScrollingRef = useRef(false);
  
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
      imageUrl: 'https://moparinsiders.com/wp-content/uploads/2022/11/2008-Dodge-Challenger-SRT8-in-HEMI-Orange.-Mecum-1.jpg',
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
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2020_Chrysler_Pacifica_Touring-L_in_Bright_White%2C_front_left.jpg/960px-2020_Chrysler_Pacifica_Touring-L_in_Bright_White%2C_front_left.jpg',
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
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/16q2/667349/2016-dodge-grand-caravan-review-car-and-driver-photo-669240-s-original.jpg?fill=1:1&resize=1200:*',
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
      imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/41138/elantra-exterior-right-front-three-quarter.jpeg?q=80',
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
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Chevrolet_Equinox_LT_%28III%2C_Facelift%29_%E2%80%93_f_05102022.jpg/1200px-Chevrolet_Equinox_LT_%28III%2C_Facelift%29_%E2%80%93_f_05102022.jpg',
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
      imageUrl: '/suburban-certa.jpeg',
      features: ['8 Lugares', 'Luxo Premium', '4WD', 'Teto Solar']
    }
  ];

  const handleCategorySelect = (category: VehicleCategory) => {
    // Map vehicle category IDs to calculator category keys
    const categoryMap: Record<string, string> = {
      'esportivo': 'Esportivo',
      'minivan-luxo': 'Minivan Luxo',
      'minivan-regular': 'Minivan Regular',
      'sedan': 'Sedan',
      'suv': 'SUV',
      'suburban': 'SUV Luxo'
    };

    // Dispatch custom event to pre-select category in calculator with delay
    const calculatorCategory = categoryMap[category.id];
    if (calculatorCategory) {
      // First scroll, then select after user sees the step
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('selectVehicleCategory', {
          detail: {
            category: calculatorCategory,
            // Remove passengers auto-selection - user should choose manually
            origem: 'categoria',
            delay: true // Flag to indicate this should have visual animation
          }
        }));
      }, 800); // Delay to allow scroll completion
    }

    // Scroll directly to step 1 (vehicle selection) in calculator
    setTimeout(() => {
      document.getElementById('calculator-step-1')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
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

  // Navegar para um slide específico (simplificado)
  const goToSlide = (index: number) => {
    if (isScrolling || !scrollRef.current) return;
    
    setIsScrolling(true);
    setCurrentSlide(index);
    
    const scrollPosition = getScrollPosition(index);
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    // Reset scrolling flag
    setTimeout(() => setIsScrolling(false), 300);
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

  // Detectar mudança de scroll manual (simplificado)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling || isAutoScrollingRef.current) return;
      
      const scrollLeft = container.scrollLeft;
      const cardWidth = 320;
      const gap = 24;
      
      // Simples detecção de índice atual
      const approximateIndex = Math.round(scrollLeft / (cardWidth + gap));
      const clampedIndex = Math.max(0, Math.min(approximateIndex, categories.length - 1));
      
      if (clampedIndex !== currentSlide) {
        setCurrentSlide(clampedIndex);
      }
    };

    // Debounce para evitar múltiplos triggers
    let timeoutId: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    container.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [currentSlide, isScrolling, categories.length]);

  // Centralização inicial apenas
  useEffect(() => {
    if (scrollRef.current && currentSlide === 0) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []); // Apenas na montagem inicial

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
    <section id="categorias" className="editorial-section bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-400 relative overflow-hidden">
      {/* Editorial Parallax Background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(45deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: 'var(--space-16) var(--space-16), var(--space-8) var(--space-8)'
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
              className="inline-flex items-center bg-black/20 border border-black/30 text-white text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-sm"
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
              <span>Frota ASX</span>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-md text-black tracking-tighter font-black"
              style={{ 
                marginBottom: 'var(--space-6)',
                textShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              ESCOLHA SUA{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text">
                CATEGORIA IDEAL
              </span>
            </motion.h2>
            
            {/* Editorial Subtext */}
            <motion.p 
              className="text-xl text-black/80 max-w-3xl mx-auto font-medium"
              style={{ 
                lineHeight: '1.7', 
                paddingLeft: 'var(--space-4)', 
                paddingRight: 'var(--space-4)',
                textShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Diferentes categorias para cada necessidade. Econômicos para cidade, familiares espaçosos, esportivos e SUVs. Todos com seguro completo e quilometragem ilimitada.
            </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Desktop Grid - Category Showcase Cards */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              className="col-span-12 lg:col-span-6 relative group cursor-pointer bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col"
              style={{ 
                minHeight: '500px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.15)'
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
                scale: 1.03,
                boxShadow: '0 35px 70px rgba(0,0,0,0.25), 0 15px 30px rgba(0,0,0,0.2)',
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              onClick={() => handleCategorySelect(category)}
            >
              {/* Vehicle Image */}
              <div 
                className="relative overflow-hidden flex-shrink-0"
                style={{ height: '280px' }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full h-full"
                >
                  <Image
                    src={category.imageUrl}
                    alt={`${category.model} - Categoria ${category.name}`}
                    fill
                    className="object-cover object-center"
                    quality={95}
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                
                {category.popular && (
                  <motion.div 
                    className="absolute top-4 right-4 z-20 inline-flex items-center backdrop-blur-md bg-amber-500/90 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full"
                    style={{ 
                      gap: 'var(--space-1)', 
                      padding: 'var(--space-2) var(--space-3)',
                      boxShadow: '0 4px 12px rgba(245,158,11,0.4)'
                    }}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1), type: 'spring', stiffness: 350, damping: 20 }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>Popular</span>
                  </motion.div>
                )}
              </div>

              {/* Glass Content Box */}
              <div 
                className="backdrop-blur-xl bg-white/95 border-t border-white/20 flex-1 flex flex-col"
                style={{ 
                  borderRadius: '0 0 16px 16px',
                  padding: 'var(--space-5)'
                }}
              >
                {/* Top Section - Info */}
                <div className="flex-1">
                  <div 
                    className="inline-flex items-center bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-[0.2em] uppercase rounded-full"
                    style={{ 
                      padding: 'var(--space-2) var(--space-4)',
                      marginBottom: '2rem'
                    }}
                  >
                    <span>{category.name}</span>
                  </div>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight" style={{ marginBottom: '0.75rem' }}>
                      {category.name.toUpperCase()}
                    </h3>
                    
                    <p className="text-gray-500 text-sm font-light" style={{ marginBottom: '1rem' }}>
                      Exemplo: {category.model} {category.year}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600" style={{ gap: 'var(--space-2)' }}>
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Até {category.passengers} pessoas</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Section - CTA */}
                <motion.button 
                  className="w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-white font-bold text-sm tracking-wide uppercase rounded-lg cursor-pointer transition-all duration-300"
                  style={{ 
                    padding: 'var(--space-3) var(--space-6)',
                    gap: 'var(--space-2)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 8px 20px rgba(245,158,11,0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Fazer Reserva</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile: Category Showcase Cards */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Scroll Container */}
            <motion.div 
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ 
                gap: 'var(--space-6)', 
                paddingTop: 'var(--space-4)',
                paddingBottom: 'var(--space-4)',
                paddingLeft: 'calc(50vw - 160px)',
                paddingRight: 'calc(50vw - 160px)'
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {categories.map((category, index) => (
                <motion.article
                  key={category.id}
                  className="relative group cursor-pointer flex-shrink-0 snap-center bg-white rounded-2xl shadow-sm border border-black/10 overflow-hidden flex flex-col"
                  style={{ 
                    width: '320px',
                    minHeight: '450px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 1px 6px rgba(0,0,0,0.03)'
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.6, -0.05, 0.01, 0.99],
                    scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    y: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                  }}
                  whileHover={{ 
                    y: -6,
                    scale: 1.03,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                  onClick={() => handleCategorySelect(category)}
                >
                  {/* Vehicle Image Showcase */}
                  <motion.div 
                    className="relative overflow-hidden flex-shrink-0"
                    style={{ height: '200px' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Image
                      src={category.imageUrl}
                      alt={`${category.model} - Categoria ${category.name}`}
                      fill
                      className="object-cover object-center"
                      quality={95}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                    
                    {/* Popular Badge */}
                    {category.popular && (
                      <motion.div 
                        className="absolute top-3 right-3 z-20 inline-flex items-center backdrop-blur-md bg-amber-500/90 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-full"
                        style={{ 
                          gap: 'var(--space-1)', 
                          padding: 'var(--space-1) var(--space-2)',
                          boxShadow: '0 4px 12px rgba(245,158,11,0.4)'
                        }}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1), type: 'spring', stiffness: 350, damping: 20 }}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        <span>Popular</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Glass Content Box */}
                  <motion.div 
                    className="backdrop-blur-xl bg-white/95 border-t border-white/20 flex-1 flex flex-col"
                    style={{ 
                      padding: 'var(--space-4)',
                      borderRadius: '0 0 16px 16px'
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(255,255,255,0.98)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Category Header */}
                    <div className="flex-1">
                      <motion.div 
                        className="inline-flex items-center bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-[0.2em] uppercase rounded-full self-start"
                        style={{ 
                          padding: 'var(--space-1) var(--space-3)',
                          marginBottom: '1.5rem'
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>{category.name}</span>
                      </motion.div>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight" style={{ marginBottom: '0.5rem' }}>
                          {category.name.toUpperCase()}
                        </h3>
                        
                        <p className="text-gray-500 text-xs font-light" style={{ marginBottom: '0.75rem' }}>
                          Exemplo: {category.model} {category.year}
                        </p>
                        
                        <div className="flex items-center text-xs text-gray-600" style={{ gap: 'var(--space-1)' }}>
                          <Users className="w-3 h-3 text-blue-500" />
                          <span>Até {category.passengers} pessoas</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <motion.div 
                      className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-white font-bold text-xs tracking-wide uppercase rounded-lg cursor-pointer transition-all duration-300"
                      style={{ 
                        padding: 'var(--space-2) var(--space-4)',
                        gap: 'var(--space-2)'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 8px 20px rgba(245,158,11,0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Fazer Reserva</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
            
            {/* Enhanced Navigation Indicators */}
            <motion.div 
              className="flex justify-center items-center backdrop-blur-sm rounded-2xl bg-black/10 border border-black/10"
              style={{ 
                gap: 'var(--space-4)', 
                marginTop: 'var(--space-6)',
                padding: 'var(--space-4)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 1px 6px rgba(0,0,0,0.03)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)',
                background: 'rgba(0,0,0,0.15)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Navigation Arrows */}
              <motion.button
                className="flex items-center text-white hover:text-white/80 transition-colors"
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
                        ? 'linear-gradient(135deg, #0066CC, #3B82F6)' 
                        : 'rgba(156, 163, 175, 0.4)',
                      boxShadow: index === currentSlide 
                        ? '0 4px 12px rgba(0,102,204,0.4)'
                        : 'none'
                    }}
                    onClick={() => goToSlide(index)}
                    whileHover={{ 
                      scale: 1.2,
                      background: index === currentSlide 
                        ? 'linear-gradient(135deg, #0066CC, #3B82F6)' 
                        : 'rgba(156, 163, 175, 0.6)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <motion.button
                className="flex items-center text-white hover:text-white/80 transition-colors"
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
              {/* Premium Dark Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              
              {/* Animated Pattern */}
              <motion.div 
                className="absolute inset-0 opacity-8"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: 'var(--space-8) var(--space-8)'
                }}
              />
              
              {/* Amber Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5" />
              
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
                  lineHeight: '1.8', 
                  marginBottom: 'var(--space-10)',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-10) auto'
                }}>
                  Temos uma frota com mais de 50 modelos premium. Nossos especialistas encontrarão o veículo perfeito para sua experiência em Orlando.
                </p>
                
                {/* Premium CTA - Destaque para Especialista */}
                <div className="flex justify-center">
                  <motion.button
                    className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-blue-900 font-bold text-lg tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden shadow-2xl border border-amber-300/40"
                    style={{ 
                      padding: 'var(--space-5) var(--space-12)',
                      gap: 'var(--space-4)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 4px 16px rgba(0,102,204,0.15)'
                    }}
                    onClick={() => openWhatsAppMessage('hero')}
                    whileHover={{ 
                      scale: 1.08,
                      y: -6,
                      boxShadow: '0 12px 40px rgba(245,158,11,0.5), 0 6px 20px rgba(0,102,204,0.2)',
                      transition: { type: 'spring', stiffness: 400, damping: 17 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 font-black">FAZER RESERVA</span>
                    <ArrowRight className="w-6 h-6 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
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