'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Car, 
  Users, 
  Calculator, 
  CreditCard, 
  CheckCircle, 
  Shield, 
  ArrowRight, 
  Clock, 
  Sparkles,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { differenceInDays, addDays, format } from 'date-fns';
import { dailyPrices } from '@/lib/supabase';

export default function PriceCalculatorSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof dailyPrices>('Sedan');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showQuickDates, setShowQuickDates] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Quick date suggestions
  const quickDateOptions = [
    { label: '3 dias', days: 3 },
    { label: '1 semana', days: 7 },
    { label: '2 semanas', days: 14 },
    { label: '1 mês', days: 30 }
  ];

  // Auto-advance steps based on completion
  useEffect(() => {
    if (selectedCategory && step === 1) {
      setStep(2);
    }
    if (checkInDate && checkOutDate && step === 2) {
      setStep(3);
    }
    if (passengers && step === 3) {
      setStep(4);
    }
  }, [selectedCategory, checkInDate, checkOutDate, passengers, step]);


  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return { days: 0, total: 0, daily: 0 };
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    // Ensure checkout is after checkin
    if (checkOut <= checkIn) return { days: 0, total: 0, daily: 0 };
    
    const days = differenceInDays(checkOut, checkIn);
    const daily = dailyPrices[selectedCategory] || 0;
    const total = daily * Math.max(days, 1);
    
    return { 
      days: Math.max(days, 1), 
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      daily 
    };
  };

  const { days, total, daily } = calculateTotal();

  const categories = [
    { 
      key: 'Sedan' as const, 
      name: 'Sedan', 
      description: 'Ideal para casais e viagens econômicas',
      passengers: '1-4 pessoas',
      features: ['Econômico', 'Fácil estacionamento', 'Baixo consumo'],
      popular: true
    },
    { 
      key: 'Minivan Regular' as const, 
      name: 'Minivan Regular', 
      description: 'Perfeita para famílias pequenas',
      passengers: '5-7 pessoas',
      features: ['Espaçosa', 'Confortável', 'Bagageiro amplo'],
      popular: true
    },
    { 
      key: 'Minivan Luxo' as const, 
      name: 'Minivan Luxo', 
      description: 'Máximo conforto para grupos',
      passengers: '5-8 pessoas',
      features: ['Premium', 'Couro', 'Entretenimento'],
      popular: true
    },
    { 
      key: 'SUV' as const, 
      name: 'SUV', 
      description: 'Versatilidade e robustez',
      passengers: '5-7 pessoas',
      features: ['4x4', 'Robusto', 'Alto desempenho']
    },
    { 
      key: 'Esportivo' as const, 
      name: 'Esportivo', 
      description: 'Experiência única de dirigir',
      passengers: '2-4 pessoas',
      features: ['Alta performance', 'Design único', 'Experiência premium']
    },
    { 
      key: 'SUV Luxo' as const, 
      name: 'SUV Luxo', 
      description: 'O máximo em luxo e tecnologia',
      passengers: '5-7 pessoas',
      features: ['Topo de linha', 'Tecnologia avançada', 'Máximo luxo']
    }
  ];

  // Filter categories for display
  const popularCategories = categories.filter(cat => cat.popular);
  const otherCategories = categories.filter(cat => !cat.popular);
  const categoriesToShow = showAllCategories ? categories : popularCategories;

  // Handle quick date selection
  const handleQuickDate = (days: number) => {
    const today = new Date();
    const checkIn = format(addDays(today, 1), 'yyyy-MM-dd');
    const checkOut = format(addDays(today, days + 1), 'yyyy-MM-dd');
    
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setShowQuickDates(false);
    
    // Trigger calculation animation
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // Handle reservation
  const handleReservation = () => {
    if (total > 0) {
      const modalData = {
        categoria: selectedCategory,
        dataChegada: checkInDate,
        dataSaida: checkOutDate,
        passageiros: passengers,
        origem: 'calculadora',
        precoDiaria: daily,
        precoTotal: total,
        diasLocacao: days
      };

      // Dispatch custom event to open modal
      window.dispatchEvent(new CustomEvent('openLeadModal', { detail: modalData }));
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <section id="calculadora" className="editorial-section bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Editorial Parallax Background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
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
      
      {/* Editorial Lines Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.01]"
        animate={{ 
          backgroundPosition: ['0% 0%', '300% 0%'],
        }}
        transition={{
          duration: 90,
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
          className="magazine-grid editorial-rhythm text-center"
          style={{ marginBottom: 'var(--space-16)' }}
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
              <Calculator className="w-4 h-4" />
              <span>Calculadora Premium</span>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-md text-gray-900 tracking-tighter"
              style={{ marginBottom: 'var(--space-2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              CALCULE SUA{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text">
                LOCAÇÃO PREMIUM
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
              Preços transparentes, sem taxas ocultas. Você só paga quando estiver com as chaves na mão, com total segurança e tranquilidade.
            </motion.p>

          </div>
        </motion.header>

        {/* Editorial Calculator */}
        <div className="magazine-grid">
          <div className="col-span-12">
            <motion.article 
              className="relative overflow-hidden"
              style={{ 
                borderRadius: '20px'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              {/* Premium Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
              
              {/* Animated Pattern Overlay */}
              <motion.div 
                className="absolute inset-0 opacity-8"
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
              
              {/* Gradient Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5" />

              <div 
                className="relative z-10 text-white"
                style={{ padding: 'var(--space-12)' }}
              >
                <div className="editorial-stack-lg" style={{ gap: 'var(--space-12)' }}>

                  {/* Step Progress Indicators */}
                  <motion.div 
                    className="flex justify-center items-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-4">
                      {[
                        { num: 1, label: 'Veículo', icon: Car, active: step >= 1 },
                        { num: 2, label: 'Datas', icon: Calendar, active: step >= 2 },
                        { num: 3, label: 'Pessoas', icon: Users, active: step >= 3 },
                        { num: 4, label: 'Orçamento', icon: Calculator, active: step >= 4 }
                      ].map((stepItem, index) => (
                        <motion.div
                          key={stepItem.num}
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            stepItem.active 
                              ? 'bg-amber-400 border-amber-400 text-black' 
                              : 'bg-white/10 border-white/30 text-white/60'
                          }`}>
                            <stepItem.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-sm font-medium hidden sm:block ${
                            stepItem.active ? 'text-amber-300' : 'text-white/60'
                          }`}>
                            {stepItem.label}
                          </span>
                          {index < 3 && (
                            <div className={`w-8 h-px mx-2 ${
                              step > stepItem.num ? 'bg-amber-400' : 'bg-white/20'
                            }`} />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  {/* Category Selection */}
                  <motion.div 
                    className="editorial-rhythm"
                    style={{ marginBottom: 'var(--space-2)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                  >
                    <div className="editorial-stack-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-white font-semibold text-xl tracking-wide">
                          Escolha seu Veículo Premium
                        </div>
                        <div className="text-amber-300 text-sm font-medium">
                          Passo 1 de 4
                        </div>
                      </div>
                      
                      {/* Categories Display */}
                      <div className="space-y-8">
                        {/* Desktop - Always show all */}
                        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-3 gap-8">
                          {categories.map((category, index) => (
                          <motion.button
                            key={category.key}
                            className={`relative overflow-hidden transition-all duration-300 text-left group ${
                              selectedCategory === category.key
                                ? 'bg-gradient-to-br from-amber-500/15 to-amber-400/8 border-2 border-amber-400/50 text-white'
                                : 'bg-white/4 border border-white/15 text-white/85 hover:bg-white/8 hover:border-white/30'
                            }`}
                            style={{ 
                              padding: '2rem', 
                              borderRadius: '16px',
                              minHeight: '200px'
                            }}
                            onClick={() => setSelectedCategory(category.key)}
                            whileHover={{ 
                              scale: 1.01,
                              y: -2,
                              transition: { type: 'spring', stiffness: 400, damping: 20 }
                            }}
                            whileTap={{ scale: 0.99 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                          >
                            {/* Price Header */}
                            <div className="flex items-start justify-between mb-6">
                              <div className={`w-3 h-3 rounded-full transition-all duration-300 mt-1 ${
                                selectedCategory === category.key ? 'bg-amber-400' : 'bg-white/30'
                              }`} />
                              <div className={`text-right ${
                                selectedCategory === category.key ? 'text-amber-300' : 'text-white/70'
                              }`}>
                                <div className="text-2xl font-bold tracking-tight">
                                  ${dailyPrices[category.key]}
                                </div>
                                <div className="text-xs font-light mt-1 opacity-80">/dia</div>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-bold text-lg mb-2 tracking-tight">
                                  {category.name}
                                </h4>
                                <p className="text-sm text-white/70 font-light leading-relaxed mb-3">
                                  {category.description}
                                </p>
                                <div className="text-xs text-amber-300/80 font-medium">
                                  <Users className="w-3 h-3 inline mr-1" />
                                  {category.passengers}
                                </div>
                              </div>
                              
                              {/* Features */}
                              <div className="flex flex-wrap gap-2">
                                {category.features.map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-white/8 text-white/70 px-2 py-1 rounded-md font-light"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Selection Indicator */}
                            {selectedCategory === category.key && (
                              <motion.div 
                                className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              >
                                <CheckCircle className="w-4 h-4 text-black" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                        </div>
                        
                        {/* Mobile - Accordion */}
                        <div className="lg:hidden">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {popularCategories.map((category, index) => (
                            <motion.button
                              key={category.key}
                              className={`relative overflow-hidden transition-all duration-300 text-left group ${
                                selectedCategory === category.key
                                  ? 'bg-gradient-to-br from-amber-500/15 to-amber-400/8 border-2 border-amber-400/50 text-white'
                                  : 'bg-white/4 border border-white/15 text-white/85 hover:bg-white/8 hover:border-white/30'
                              }`}
                              style={{ 
                                padding: '2rem', 
                                borderRadius: '16px',
                                minHeight: '200px'
                              }}
                              onClick={() => setSelectedCategory(category.key)}
                              whileHover={{ 
                                scale: 1.01,
                                y: -2,
                                transition: { type: 'spring', stiffness: 400, damping: 20 }
                              }}
                              whileTap={{ scale: 0.99 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.08 }}
                            >
                              {/* Price Header */}
                              <div className="flex items-start justify-between mb-6">
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 mt-1 ${
                                  selectedCategory === category.key ? 'bg-amber-400' : 'bg-white/30'
                                }`} />
                                <div className={`text-right ${
                                  selectedCategory === category.key ? 'text-amber-300' : 'text-white/70'
                                }`}>
                                  <div className="text-2xl font-bold tracking-tight">
                                    ${dailyPrices[category.key]}
                                  </div>
                                  <div className="text-xs font-light mt-1 opacity-80">/dia</div>
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-bold text-lg mb-2 tracking-tight">
                                    {category.name}
                                  </h4>
                                  <p className="text-sm text-white/70 font-light leading-relaxed mb-3">
                                    {category.description}
                                  </p>
                                  <div className="text-xs text-amber-300/80 font-medium">
                                    <Users className="w-3 h-3 inline mr-1" />
                                    {category.passengers}
                                  </div>
                                </div>
                                
                                {/* Features */}
                                <div className="flex flex-wrap gap-2">
                                  {category.features.map((feature, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-white/8 text-white/70 px-2 py-1 rounded-md font-light"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Selection Indicator */}
                              {selectedCategory === category.key && (
                                <motion.div 
                                  className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                  <CheckCircle className="w-4 h-4 text-black" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                          </div>
                          
                          {/* Additional Categories - Animated */}
                          <AnimatePresence>
                            {showAllCategories && (
                              <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                style={{ marginTop: 'var(--space-8)' }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ 
                                  duration: 0.5,
                                  ease: [0.4, 0.0, 0.2, 1],
                                  opacity: { duration: 0.3 },
                                  height: { duration: 0.5 }
                                }}
                              >
                                {otherCategories.map((category, index) => (
                                  <motion.button
                                    key={category.key}
                                    className={`relative overflow-hidden transition-all duration-300 text-left group ${
                                      selectedCategory === category.key
                                        ? 'bg-gradient-to-br from-amber-500/15 to-amber-400/8 border-2 border-amber-400/50 text-white'
                                        : 'bg-white/4 border border-white/15 text-white/85 hover:bg-white/8 hover:border-white/30'
                                    }`}
                                    style={{ 
                                      padding: '2rem', 
                                      borderRadius: '16px',
                                      minHeight: '200px'
                                    }}
                                    onClick={() => setSelectedCategory(category.key)}
                                    whileHover={{ 
                                      scale: 1.01,
                                      y: -2,
                                      transition: { type: 'spring', stiffness: 400, damping: 20 }
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                  >
                                    {/* Price Header */}
                                    <div className="flex items-start justify-between mb-6">
                                      <div className={`w-3 h-3 rounded-full transition-all duration-300 mt-1 ${
                                        selectedCategory === category.key ? 'bg-amber-400' : 'bg-white/30'
                                      }`} />
                                      <div className={`text-right ${
                                        selectedCategory === category.key ? 'text-amber-300' : 'text-white/70'
                                      }`}>
                                        <div className="text-2xl font-bold tracking-tight">
                                          ${dailyPrices[category.key]}
                                        </div>
                                        <div className="text-xs font-light mt-1 opacity-80">/dia</div>
                                      </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-bold text-lg mb-2 tracking-tight">
                                          {category.name}
                                        </h4>
                                        <p className="text-sm text-white/70 font-light leading-relaxed mb-3">
                                          {category.description}
                                        </p>
                                        <div className="text-xs text-amber-300/80 font-medium">
                                          <Users className="w-3 h-3 inline mr-1" />
                                          {category.passengers}
                                        </div>
                                      </div>
                                      
                                      {/* Features */}
                                      <div className="flex flex-wrap gap-2">
                                        {category.features.map((feature, idx) => (
                                          <span
                                            key={idx}
                                            className="text-xs bg-white/8 text-white/70 px-2 py-1 rounded-md font-light"
                                          >
                                            {feature}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Selection Indicator */}
                                    {selectedCategory === category.key && (
                                      <motion.div 
                                        className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                      >
                                        <CheckCircle className="w-4 h-4 text-black" />
                                      </motion.div>
                                    )}
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Show More/Less Button - Only Mobile */}
                        {otherCategories.length > 0 && (
                          <motion.div 
                            className="flex justify-center lg:hidden"
                            style={{ marginTop: 'var(--space-10)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                            <motion.button
                              className="relative overflow-hidden bg-gradient-to-r from-white/10 via-white/8 to-white/10 backdrop-blur-sm border border-white/25 hover:border-amber-400/40 text-white font-medium transition-all duration-300 group"
                              style={{ 
                                padding: 'var(--space-2) var(--space-5)',
                                gap: 'var(--space-2)',
                                borderRadius: '8px'
                              }}
                              onClick={() => setShowAllCategories(!showAllCategories)}
                              whileHover={{ 
                                scale: 1.02,
                                y: -2,
                                transition: { type: 'spring', stiffness: 400, damping: 20 }
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Subtle Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-transparent to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              <div className="relative z-10 flex items-center gap-3">
                                <span className="text-sm tracking-[0.1em] uppercase">
                                  {showAllCategories 
                                    ? 'Ver Menos'
                                    : 'Ver Todos os Veículos'
                                  }
                                </span>
                                <motion.div
                                  animate={{ rotate: showAllCategories ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-amber-300"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Date Selection */}
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.div 
                        className="editorial-rhythm"
                        style={{ marginBottom: 'var(--space-2)' }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                      >
                        <div className="editorial-stack-lg">
                          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                            <div className="text-white font-semibold text-xl tracking-wide">
                              Quando será sua viagem?
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-blue-300 text-sm font-medium">
                                Passo 2 de 4
                              </div>
                              <motion.button
                                className="text-amber-300 text-sm font-medium hover:text-amber-200 transition-colors flex items-center gap-2"
                                onClick={() => setShowQuickDates(!showQuickDates)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Clock className="w-4 h-4" />
                                Seleção Rápida
                              </motion.button>
                            </div>
                          </div>

                          {/* Quick Date Options */}
                          <AnimatePresence>
                            {showQuickDates && (
                              <motion.div
                                className="mb-8 p-6 bg-white/5 border border-white/20 rounded-2xl"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="text-white font-medium mb-4 text-center">
                                  Escolha um período popular:
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {quickDateOptions.map((option, index) => (
                                    <motion.button
                                      key={option.days}
                                      className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/50 transition-all duration-300 text-sm font-medium"
                                      onClick={() => handleQuickDate(option.days)}
                                      whileHover={{ scale: 1.02, y: -2 }}
                                      whileTap={{ scale: 0.98 }}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                      <div className="flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        {option.label}
                                      </div>
                                    </motion.button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Check-in Date */}
                            <motion.div
                              className="space-y-6"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <div className="flex items-center text-white font-semibold text-lg tracking-wide gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-green-400" />
                                </div>
                                Data de Retirada
                              </div>
                              
                              <div className="relative">
                                <input
                                  type="date"
                                  value={checkInDate}
                                  onChange={(e) => {
                                    setCheckInDate(e.target.value);
                                    if (checkOutDate && new Date(checkOutDate) <= new Date(e.target.value)) {
                                      setCheckOutDate('');
                                    }
                                    setIsCalculating(true);
                                    setTimeout(() => setIsCalculating(false), 800);
                                  }}
                                  min={today}
                                  max={maxDateString}
                                  className="w-full bg-white/8 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:border-green-400/60 focus:bg-white/12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20 [&::-webkit-calendar-picker-indicator]:filter-invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                  style={{ 
                                    padding: '1rem 1.25rem', 
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    height: '56px'
                                  }}
                                />
                                {/* Invisible mobile trigger over native icon */}
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 md:hidden opacity-0"
                                  onClick={() => {
                                    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
                                    if (input?.showPicker) input.showPicker();
                                  }}
                                />
                              </div>
                              
                              {checkInDate && (
                                <motion.div
                                  className="p-4 bg-green-500/10 border border-green-400/30 rounded-lg"
                                  style={{ marginTop: 'var(--space-1)' }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <div className="flex items-center gap-3 text-green-300 text-sm font-medium">
                                    <CheckCircle className="w-5 h-5" />
                                    Retirada confirmada para {new Date(checkInDate + 'T12:00:00').toLocaleDateString('pt-BR', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>

                            {/* Check-out Date */}
                            <motion.div
                              className="space-y-6"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              <div className="flex items-center text-white font-semibold text-lg tracking-wide gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-red-400" />
                                </div>
                                Data de Devolução
                              </div>
                              
                              <div className="relative">
                                <input
                                  type="date"
                                  value={checkOutDate}
                                  onChange={(e) => {
                                    setCheckOutDate(e.target.value);
                                    setIsCalculating(true);
                                    setTimeout(() => setIsCalculating(false), 800);
                                  }}
                                  min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : today}
                                  max={maxDateString}
                                  disabled={!checkInDate}
                                  className="w-full bg-white/8 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:border-red-400/60 focus:bg-white/12 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400/20 [&::-webkit-calendar-picker-indicator]:filter-invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                  style={{ 
                                    padding: '1rem 1.25rem', 
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    height: '56px'
                                  }}
                                />
                                {/* Invisible mobile trigger over native icon */}
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 md:hidden opacity-0"
                                  disabled={!checkInDate}
                                  onClick={() => {
                                    const inputs = document.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
                                    const input = inputs[1];
                                    if (input?.showPicker && !input.disabled) input.showPicker();
                                  }}
                                />
                              </div>
                              
                              {checkOutDate && (
                                <motion.div
                                  className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg"
                                  style={{ marginTop: 'var(--space-1)' }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <div className="flex items-center gap-3 text-red-300 text-sm font-medium">
                                    <CheckCircle className="w-5 h-5" />
                                    Devolução confirmada para {new Date(checkOutDate + 'T12:00:00').toLocaleDateString('pt-BR', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                </motion.div>
                              )}
                              
                              {!checkInDate && (
                                <div className="p-4 bg-white/5 border border-white/10 rounded-lg" style={{ marginTop: 'var(--space-1)' }}>
                                  <div className="flex items-center gap-3 text-white/50 text-sm">
                                    <AlertCircle className="w-5 h-5" />
                                    Selecione primeiro a data de retirada
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>

                          {/* Period Summary */}
                          {checkInDate && checkOutDate && days > 0 && (
                            <motion.div
                              className="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 border border-blue-400/30 rounded-xl text-center"
                              style={{ marginTop: 'var(--space-2)' }}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="text-blue-300 font-bold text-xl mb-2">
                                {days} {days === 1 ? 'dia' : 'dias'} de aventura em Orlando
                              </div>
                              <div className="text-white/70 text-base">
                                De {new Date(checkInDate + 'T12:00:00').toLocaleDateString('pt-BR', { 
                                  day: 'numeric', 
                                  month: 'long' 
                                })} até {new Date(checkOutDate + 'T12:00:00').toLocaleDateString('pt-BR', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Passengers */}
                  <AnimatePresence>
                    {step >= 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                      >
                        <div className="space-y-10">
                          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                            <div className="text-white font-semibold text-xl tracking-wide">
                              Quantas pessoas viajam?
                            </div>
                            <div className="text-purple-300 text-sm font-medium">
                              Passo 3 de 4
                            </div>
                          </div>
                          
                          {/* Elegant Select */}
                          <div className="w-full">
                            <div className="relative">
                              <select
                                value={passengers}
                                onChange={(e) => setPassengers(Number(e.target.value))}
                                className="w-full bg-white/8 backdrop-blur-sm border border-white/20 text-white focus:border-purple-400/60 focus:bg-white/12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/20 appearance-none cursor-pointer"
                                style={{ 
                                  padding: '1.25rem 3rem 1.25rem 1.25rem', 
                                  borderRadius: '12px',
                                  fontSize: '18px',
                                  height: '64px'
                                }}
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                  <option key={num} value={num} className="bg-gray-800 text-white">
                                    {num} {num === 1 ? 'pessoa' : 'pessoas'}
                                  </option>
                                ))}
                              </select>
                              
                              {/* Custom Arrow */}
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <div className="w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-purple-400" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Passenger Summary */}
                          {passengers && (
                            <motion.div
                              className="p-6 bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-purple-500/10 border border-purple-400/30 rounded-xl text-center mx-auto"
                              style={{ marginTop: 'var(--space-1)' }}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="text-purple-300 font-bold text-xl mb-2">
                                Perfeito! {passengers} {passengers === 1 ? 'pessoa confirmada' : 'pessoas confirmadas'}
                              </div>
                              <div className="text-white/70 text-base">
                                Seu <span className="text-purple-300 font-medium">{selectedCategory}</span> comporta confortavelmente este grupo
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Price Summary & Final Step */}
                  <AnimatePresence>
                    {step >= 4 && days > 0 && total > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                      >
                        {/* Final Step Header */}
                        <div className="text-center" style={{ marginBottom: 'var(--space-2)' }}>
                          <div className="flex items-center justify-center text-white font-semibold text-2xl tracking-wide mb-6 gap-4">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/30">
                              <Calculator className="w-6 h-6 text-emerald-400" />
                            </div>
                            Seu Orçamento Premium Está Pronto!
                          </div>
                          <div className="flex items-center justify-center gap-3 text-emerald-300 text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Passo 4 de 4 - Concluído</span>
                          </div>
                        </div>

                        {/* Clean Price Summary */}
                        <div className="space-y-12">
                          
                          {/* Summary Card */}
                          <motion.div 
                            className="bg-gradient-to-br from-white/10 via-white/6 to-white/8 backdrop-blur-md border border-white/25 rounded-2xl overflow-hidden"
                            style={{ padding: '3rem', marginTop: 'var(--space-2)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                              <div>
                                <h3 className="text-white font-bold text-2xl tracking-wide">Resumo da Reserva</h3>
                              </div>
                              <motion.div 
                                className="w-3 h-3 bg-emerald-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                            
                            {/* Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                              {[
                                { label: 'Categoria', value: selectedCategory, icon: Car, color: 'text-amber-300' },
                                { label: 'Passageiros', value: `${passengers} ${passengers === 1 ? 'pessoa' : 'pessoas'}`, icon: Users, color: 'text-purple-300' },
                                { label: 'Check-in', value: new Date(checkInDate + 'T12:00:00').toLocaleDateString('pt-BR'), icon: Calendar, color: 'text-green-300' },
                                { label: 'Check-out', value: new Date(checkOutDate + 'T12:00:00').toLocaleDateString('pt-BR'), icon: Calendar, color: 'text-red-300' },
                                { label: 'Período', value: `${days} ${days === 1 ? 'dia' : 'dias'}`, icon: Clock, color: 'text-blue-300' },
                                { label: 'Diária', value: `$${daily.toFixed(2)}`, icon: CreditCard, color: 'text-amber-300' }
                              ].map((item, index) => (
                                <motion.div 
                                  key={index}
                                  className="flex items-center justify-between bg-white/5 rounded-lg border border-white/10"
                                  style={{ padding: '1rem 1.25rem' }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                                >
                                  <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4 text-white/70" />
                                    <span className="text-white/70 font-medium">{item.label}</span>
                                  </div>
                                  <span className={`font-semibold ${item.color}`}>{item.value}</span>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Total Price */}
                            <motion.div 
                              className="bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border-2 border-emerald-400/30 rounded-xl"
                              style={{ marginTop: 'var(--space-2)', padding: '2rem 2.25rem' }}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.8 }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-emerald-300 text-xl font-bold mb-2">TOTAL DA LOCAÇÃO</div>
                                  <div className="text-white/60 text-sm">Pagamento apenas após receber o veículo</div>
                                  <div className="text-white/50 text-xs mt-1">Zero bloqueio • Cancelamento gratuito</div>
                                </div>
                                <motion.div
                                  key={total}
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                  className="text-right"
                                >
                                  <div className="text-emerald-300 font-black text-5xl">
                                    ${isCalculating ? '...' : total.toFixed(2)}
                                  </div>
                                  <div className="text-white/50 text-sm">USD</div>
                                </motion.div>
                              </div>
                            </motion.div>
                          </motion.div>

                          {/* Payment Options */}
                          <motion.div 
                            className="bg-gradient-to-br from-white/8 via-white/4 to-white/6 backdrop-blur-md border border-white/20 rounded-2xl"
                            style={{ padding: '2rem', marginTop: 'var(--space-2)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <h4 className="text-white font-bold text-xl" style={{ marginBottom: 'var(--space-2)' }}>
                              Formas de Pagamento
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                              {[
                                { label: 'À Vista', value: total.toFixed(2), desc: '5% desconto', color: 'emerald' },
                                { label: '3x sem juros', value: (total / 3).toFixed(2), desc: 'por parcela', color: 'amber' },
                                { label: '6x sem juros', value: (total / 6).toFixed(2), desc: 'por parcela', color: 'blue' }
                              ].map((option, index) => (
                                <motion.div 
                                  key={index}
                                  className={`p-4 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/8 transition-colors cursor-pointer`}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <div className={`text-${option.color}-300 font-bold text-lg mb-1`}>
                                    ${option.value}
                                  </div>
                                  <div className="text-white font-medium text-sm mb-1">{option.label}</div>
                                  <div className="text-white/60 text-xs">{option.desc}</div>
                                </motion.div>
                              ))}
                            </div>

                            {/* CTA Button */}
                            <motion.button
                              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 group"
                              style={{ padding: '1.25rem 2rem', marginTop: 'var(--space-2)' }}
                              onClick={handleReservation}
                              whileHover={{ 
                                scale: 1.01,
                                y: -2,
                                transition: { type: 'spring', stiffness: 400, damping: 20 }
                              }}
                              whileTap={{ scale: 0.99 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 1 }}
                            >
                              <div className="flex items-center justify-center gap-3">
                                <MessageCircle className="w-5 h-5" />
                                <span>FINALIZAR RESERVA NO WHATSAPP</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </motion.button>

                            {/* Security Info */}
                            <div className="border-t border-white/10" style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)' }}>
                              <div className="flex items-center justify-center gap-8 text-white/60 text-sm">
                                <div className="flex items-center gap-3">
                                  <Shield className="w-5 h-5 text-emerald-400" />
                                  <span>100% Seguro</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="w-5 h-5 text-blue-400" />
                                  <span>Sem Taxas</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          </div>
        </div>

        {/* Editorial Features */}
        <motion.section
          className="magazine-grid"
          style={{ marginTop: 'var(--space-20)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'var(--space-6)' }}>
              {[
                { icon: CreditCard, title: 'Pague Depois', desc: 'Só pague quando estiver com o carro na mão' },
                { icon: Shield, title: 'Sem Bloqueios', desc: 'Zero bloqueio no seu cartão de crédito' },
                { icon: CheckCircle, title: 'Seguro Incluso', desc: 'Proteção completa já incluída no preço' }
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={idx}
                    className="relative overflow-hidden group cursor-pointer text-center"
                    style={{ 
                      borderRadius: '16px',
                      minHeight: '280px'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: idx * 0.1,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 300, damping: 20 }
                    }}
                  >
                    {/* Clean Background */}
                    <div className="absolute inset-0 bg-white border border-gray-200 group-hover:border-gray-300 transition-colors duration-300" />
                    
                    <div 
                      className="relative z-10 h-full flex flex-col justify-center items-center text-gray-900"
                      style={{ padding: 'var(--space-8)' }}
                    >
                      <div 
                        className="flex items-center justify-center bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20 transition-colors duration-300 mx-auto"
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          borderRadius: '16px',
                          marginBottom: 'var(--space-2)'
                        }}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-900 tracking-tight" style={{ marginBottom: 'var(--space-3)' }}>
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-base font-light leading-relaxed max-w-xs">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}