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
  Sparkles,
  MessageCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { differenceInDays, addDays, format } from 'date-fns';
import { dailyPrices } from '@/lib/supabase';

export default function PriceCalculatorSection() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof dailyPrices | ''>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [passengers, setPassengers] = useState(0);
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showQuickDates, setShowQuickDates] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [needsCarSeat, setNeedsCarSeat] = useState(false);
  const [carSeatQuantity, setCarSeatQuantity] = useState(1);
  const [modalStep, setModalStep] = useState(1); // 1: Summary, 2: Client Data
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Quick date suggestions
  const quickDateOptions = [
    { label: '3 dias', days: 3 },
    { label: '1 semana', days: 7 },
    { label: '2 semanas', days: 14 },
    { label: '1 mês', days: 30 }
  ];

  // Enhanced smooth scroll to step function with offset
  const scrollToStep = (stepNumber: number) => {
    const stepElement = document.getElementById(`calculator-step-${stepNumber}`);
    if (stepElement) {
      // Different offset for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      const yOffset = isMobile ? -100 : -120;
      const y = stepElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      // Add visual feedback pulse to the step (more subtle on mobile)
      setTimeout(() => {
        stepElement.style.transform = isMobile ? 'scale(1.01)' : 'scale(1.02)';
        stepElement.style.transition = 'transform 0.3s ease-out';
        setTimeout(() => {
          stepElement.style.transform = 'scale(1)';
        }, 300);
      }, 500);
    }
  };

  // Listen for vehicle category selection from other sections
  useEffect(() => {
    const handleVehicleSelection = (event: CustomEvent) => {
      const { category, delay } = event.detail;
      
      if (delay) {
        // Coming from vehicle cards section - use long delay with animation
        setIsExternalSelection(true);
        
        const categoryButton = document.querySelector(`[data-category="${category}"]`) as HTMLElement;
        if (categoryButton) {
          // Add dramatic highlight animation
          categoryButton.style.transform = 'scale(1.08)';
          categoryButton.style.boxShadow = '0 0 30px rgba(245,158,11,0.6)';
          categoryButton.style.transition = 'all 0.4s ease-out';
          categoryButton.style.zIndex = '10';
          
          // Flash effect
          setTimeout(() => {
            categoryButton.style.transform = 'scale(1.03)';
            categoryButton.style.boxShadow = '0 0 20px rgba(245,158,11,0.4)';
          }, 200);
          
          setTimeout(() => {
            categoryButton.style.transform = 'scale(1)';
            categoryButton.style.boxShadow = '';
            categoryButton.style.zIndex = '';
          }, 600);
        }
        
        // Long delay for animation from vehicle cards
        setTimeout(() => {
          setSelectedCategory(category);
        }, 700);
      } else {
        // Direct selection in calculator - immediate response
        setIsExternalSelection(false);
        setSelectedCategory(category);
      }
      
      // Reset step to show the category selection is complete
      setStep(1);
    };

    window.addEventListener('selectVehicleCategory', handleVehicleSelection as EventListener);

    return () => {
      window.removeEventListener('selectVehicleCategory', handleVehicleSelection as EventListener);
    };
  }, []);

  // Track if selection came from external source (vehicle cards)
  const [isExternalSelection, setIsExternalSelection] = useState(false);

  // Auto-advance steps based on completion with smooth scroll
  useEffect(() => {
    if (selectedCategory && step === 1) {
      // Use different timing based on selection origin
      const delay = isExternalSelection ? 1500 : 800; // Long delay for external, normal for direct
      setTimeout(() => {
        setStep(2);
        setTimeout(() => scrollToStep(2), 100);
        // Reset external selection flag after use
        setIsExternalSelection(false);
      }, delay);
    }
    if (checkInDate && checkOutDate && step === 2) {
      setTimeout(() => {
        setStep(3);
        setTimeout(() => scrollToStep(3), 100);
      }, 600); // Back to normal timing
    }
    if (passengers > 0 && step === 3) {
      setTimeout(() => {
        setStep(4);
        setTimeout(() => scrollToStep(4), 100);
      }, 600); // Back to normal timing
    }
  }, [selectedCategory, checkInDate, checkOutDate, passengers, step, isExternalSelection]);


  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate || !selectedCategory) return { days: 0, total: 0, daily: 0 };
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    // Ensure checkout is after checkin
    if (checkOut <= checkIn) return { days: 0, total: 0, daily: 0 };
    
    const days = differenceInDays(checkOut, checkIn);
    const daily = dailyPrices[selectedCategory as keyof typeof dailyPrices] || 0;
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
      features: ['Luxo', 'Couro', 'Entretenimento'],
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
      features: ['Alta performance', 'Design único', 'Experiência exclusiva']
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
      setShowReservationModal(true);
    }
  };

  // Scroll modal to form start
  const scrollToFormStart = () => {
    const modalContent = document.querySelector('.modal-content');
    const modalHeader = document.querySelector('.modal-header') as HTMLElement;
    if (modalContent && modalHeader) {
      const headerHeight = modalHeader.offsetHeight;
      modalContent.scrollTo({ top: headerHeight, behavior: 'smooth' });
    }
  };

  // Move to client data step
  const proceedToClientData = () => {
    setModalStep(2);
    setTimeout(scrollToFormStart, 100);
  };

  // Go back to summary
  const backToSummary = () => {
    setModalStep(1);
    setTimeout(scrollToFormStart, 100);
  };

  // Validate client data
  const validateClientData = () => {
    return clientName.trim() && clientEmail.trim() && clientPhone.trim();
  };

  // Send to WhatsApp with complete data
  const sendToWhatsApp = () => {
    if (!validateClientData()) return;

    const checkInFormatted = new Date(checkInDate + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const checkOutFormatted = new Date(checkOutDate + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const categoryDetails = {
      'Sedan': '🚗 Sedan - Econômico e confortável',
      'SUV': '🚙 SUV - Espaçoso e versátil',
      'SUV Luxo': '🚙 SUV Luxo - Premium e espaçoso', 
      'Minivan Regular': '🚐 Minivan Regular - Ideal para grupos',
      'Minivan Luxo': '🚐 Minivan Luxo - Máximo conforto para grupos',
      'Esportivo': '🏎️ Esportivo - Performance e estilo',
      'Suburban': '🚛 Suburban - SUV grande premium'
    };

    const whatsappMessage = `🚗 *NOVA RESERVA ASX RENTAL*\n` +
      `══════════════════════════════════════\n\n` +
      `👤 *DADOS DO CLIENTE*\n` +
      `• Nome: ${clientName}\n` +
      `• WhatsApp: ${clientPhone}\n` +
      `• Email: ${clientEmail}\n\n` +
      `🚙 *DETALHES DA RESERVA*\n` +
      `• Veículo: ${selectedCategory ? (categoryDetails[selectedCategory as keyof typeof categoryDetails] || selectedCategory) : 'Não selecionado'}\n` +
      `• Passageiros: ${passengers} ${passengers === 1 ? 'pessoa' : 'pessoas'}\n` +
      `• Cadeirinha: ${needsCarSeat ? `Sim (${carSeatQuantity}x)` : 'Não necessário'}\n\n` +
      `📅 *PERÍODO DA LOCAÇÃO*\n` +
      `• Check-in: ${checkInFormatted}\n` +
      `• Check-out: ${checkOutFormatted}\n` +
      `• Duração: ${days} ${days === 1 ? 'dia' : 'dias'}\n\n` +
      `💰 *RESUMO FINANCEIRO*\n` +
      `• Valor da diária: $${daily.toFixed(2)} USD\n` +
      `• Quantidade de dias: ${days}x\n` +
      `• Subtotal: $${total.toFixed(2)} USD\n` +
      `• Taxa de serviço: $0.00 USD\n` +
      `• **TOTAL FINAL: $${total.toFixed(2)} USD**\n\n` +
      `📋 *PRÓXIMOS PASSOS DA EQUIPE*\n` +
      `✅ Confirmar disponibilidade para as datas\n` +
      `✅ Enviar fotos detalhadas do veículo\n` +
      `✅ Confirmar local de retirada/devolução\n` +
      `✅ Gerar link de pagamento seguro\n` +
      `✅ Enviar contrato digital\n\n` +
      `🔒 *DIFERENCIAIS INCLUÍDOS*\n` +
      `• ✅ Pagamento só após receber as chaves\n` +
      `• ✅ Zero bloqueio no cartão de crédito\n` +
      `• ✅ Quilometragem 100% ilimitada\n` +
      `• ✅ Seguro completo incluído\n` +
      `• ✅ Suporte 24/7 em português\n` +
      `• ✅ Combustível: cliente devolve como recebeu\n\n` +
      `⏰ Reserva realizada em: ${new Date().toLocaleString('pt-BR')}\n` +
      `🌐 Origem: Sistema de Reservas ASX\n` +
      `══════════════════════════════════════\n\n` +
      `*Cliente aguarda confirmação e próximos passos!* 📞`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/5584999194580?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form and show success feedback
    setShowReservationModal(false);
    setModalStep(1);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNeedsCarSeat(false);
    setCarSeatQuantity(1);
    
    // Show success toast
    setTimeout(() => {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 500);
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
              <span>Reserva já ASX</span>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-md text-gray-900 tracking-tighter"
              style={{ marginBottom: 'var(--space-2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              RESERVE AGORA{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text">
                COM A ASX
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
              Reserve agora com total segurança. Pagamento só após receber as chaves, quilometragem ilimitada e suporte especializado em português.
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
                    className="flex justify-center items-center mb-8 sticky top-4 z-20 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10"
                    style={{ padding: 'var(--space-4)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      {[
                        { num: 1, label: 'Veículo', icon: Car, active: step >= 1, current: step === 1 },
                        { num: 2, label: 'Datas', icon: Calendar, active: step >= 2, current: step === 2 },
                        { num: 3, label: 'Pessoas', icon: Users, active: step >= 3, current: step === 3 },
                        { num: 4, label: 'Orçamento', icon: Calculator, active: step >= 4, current: step === 4 }
                      ].map((stepItem, index) => (
                        <motion.div
                          key={stepItem.num}
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.div 
                            className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                              stepItem.active 
                                ? 'bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-400/30' 
                                : 'bg-white/10 border-white/30 text-white/60'
                            }`}
                            animate={stepItem.current ? { 
                              scale: [1, 1.1, 1],
                              boxShadow: stepItem.active 
                                ? ['0 0 0 rgba(245,158,11,0.3)', '0 0 20px rgba(245,158,11,0.6)', '0 0 0 rgba(245,158,11,0.3)']
                                : 'none'
                            } : {}}
                            transition={{ 
                              duration: 2, 
                              repeat: stepItem.current ? Infinity : 0,
                              ease: 'easeInOut'
                            }}
                          >
                            <stepItem.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            {stepItem.current && stepItem.active && (
                              <motion.div
                                className="absolute inset-0 rounded-full border-2 border-amber-300"
                                animate={{
                                  scale: [1, 1.4, 1],
                                  opacity: [0.8, 0, 0.8]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut'
                                }}
                              />
                            )}
                          </motion.div>
                          <span className={`text-xs sm:text-sm font-medium hidden sm:block transition-colors duration-300 ${
                            stepItem.active ? 'text-amber-300' : 'text-white/60'
                          }`}>
                            {stepItem.label}
                          </span>
                          {index < 3 && (
                            <motion.div 
                              className={`w-4 sm:w-8 h-px mx-1 sm:mx-2 transition-all duration-500 ${
                                step > stepItem.num ? 'bg-amber-400' : 'bg-white/20'
                              }`}
                              animate={{
                                scaleX: step > stepItem.num ? 1 : 0.3
                              }}
                              transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  {/* Category Selection */}
                  <motion.div 
                    id="calculator-step-1"
                    className="editorial-rhythm"
                    style={{ marginBottom: 'var(--space-2)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                  >
                    <div className="editorial-stack-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold text-xl tracking-wide">
                            Escolha seu Veículo Ideal
                          </div>
                          {!selectedCategory && (
                            <motion.div 
                              className="text-amber-300/80 text-sm font-light mt-2 flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                            >
                              <ArrowRight className="w-4 h-4" />
                              <span>Selecione uma categoria para começar</span>
                            </motion.div>
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          <span className="text-transparent bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text">
                            Passo 1 de 4
                          </span>
                        </div>
                      </div>
                      
                      {/* Categories Display */}
                      <div className="space-y-8">
                        {/* Desktop - Always show all */}
                        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-3 gap-8">
                          {categories.map((category, index) => (
                          <motion.button
                            key={category.key}
                            data-category={category.key}
                            className={`relative overflow-hidden transition-all duration-300 text-left group cursor-pointer ${
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
                              data-category={category.key}
                              className={`relative overflow-hidden transition-all duration-300 text-left group cursor-pointer ${
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
                                    data-category={category.key}
                                    className={`relative overflow-hidden transition-all duration-300 text-left group cursor-pointer ${
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
                        id="calculator-step-2"
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
                              <div className="text-sm font-medium">
                                <span className="text-transparent bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text">
                                  Passo 2 de 4
                                </span>
                              </div>
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
                        id="calculator-step-3"
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
                            <div className="text-sm font-medium">
                              <span className="text-transparent bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text">
                                Passo 3 de 4
                              </span>
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
                                <option value={0} className="bg-gray-800 text-gray-400">
                                  Escolha a quantidade
                                </option>
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
                          {passengers > 0 && (
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
                    {step >= 4 && days > 0 && total > 0 && passengers > 0 && (
                      <motion.div 
                        id="calculator-step-4"
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
                            Sua Reserva Está Quase Pronta!
                          </div>
                          <div className="flex items-center justify-center gap-3 text-sm font-medium">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-300 bg-clip-text">
                              Passo 4 de 4 - Concluído
                            </span>
                          </div>
                        </div>

                        {/* Clean Price Summary */}
                        <div className="space-y-12">
                          
                          {/* Summary Card */}
                          <motion.div 
                            className="bg-gradient-to-br from-white/10 via-white/6 to-white/8 backdrop-blur-md border border-white/25 rounded-2xl overflow-hidden"
                            style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', marginTop: 'var(--space-2)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-2)' }}>
                              <div>
                                <h3 className="text-white font-bold text-lg sm:text-2xl tracking-wide">Resumo da Reserva</h3>
                              </div>
                              <motion.div 
                                className="w-3 h-3 bg-emerald-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                            
                            {/* Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8 mb-6 sm:mb-8">
                              {[
                                { label: 'Categoria', value: selectedCategory, icon: Car, color: 'text-amber-300' },
                                { label: 'Passageiros', value: `${passengers} ${passengers === 1 ? 'pessoa' : 'pessoas'}`, icon: Users, color: 'text-purple-300' },
                                { label: 'Check-in', value: new Date(checkInDate + 'T12:00:00').toLocaleDateString('pt-BR'), icon: Calendar, color: 'text-green-300' },
                                { label: 'Check-out', value: new Date(checkOutDate + 'T12:00:00').toLocaleDateString('pt-BR'), icon: Calendar, color: 'text-red-300' },
                                { label: 'Período', value: `${days} ${days === 1 ? 'dia' : 'dias'}`, icon: Calendar, color: 'text-blue-300' },
                                { label: 'Diária', value: `$${daily.toFixed(2)}`, icon: CreditCard, color: 'text-amber-300' }
                              ].map((item, index) => (
                                <motion.div 
                                  key={index}
                                  className="flex items-center justify-between bg-white/5 rounded-lg border border-white/10"
                                  style={{ padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1rem, 3vw, 1.25rem)' }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                                >
                                  <div className="flex items-center gap-3">
                                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
                                    <span className="text-white/70 font-medium text-sm sm:text-base">{item.label}</span>
                                  </div>
                                  <span className={`font-semibold text-sm sm:text-base ${item.color}`}>{item.value}</span>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Total Price */}
                            <motion.div 
                              className="bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border-2 border-emerald-400/30 rounded-xl"
                              style={{ marginTop: 'var(--space-2)', padding: 'clamp(1.25rem, 4vw, 2rem) clamp(1.5rem, 4vw, 2.25rem)' }}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.8 }}
                            >
                              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 xs:gap-0">
                                <div>
                                  <div className="text-emerald-300 text-lg xs:text-xl font-bold mb-2">TOTAL DA LOCAÇÃO</div>
                                  <div className="text-white/60 text-xs xs:text-sm">Pagamento apenas após receber o veículo</div>
                                  <div className="text-white/50 text-xs mt-1">Zero bloqueio • Cancelamento gratuito</div>
                                </div>
                                <motion.div
                                  key={total}
                                  initial={{ scale: 1.1 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                  className="text-right"
                                >
                                  <div className="text-emerald-300 font-black text-4xl xs:text-5xl sm:text-5xl">
                                    ${isCalculating ? '...' : total.toFixed(2)}
                                  </div>
                                  <div className="text-white/50 text-xs xs:text-sm">USD</div>
                                </motion.div>
                              </div>
                            </motion.div>
                          </motion.div>

                          {/* Payment Options */}
                          <motion.div 
                            className="bg-gradient-to-br from-white/8 via-white/4 to-white/6 backdrop-blur-md border border-white/20 rounded-2xl"
                            style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', marginTop: 'var(--space-2)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <h4 className="text-white font-bold text-lg sm:text-xl" style={{ marginBottom: 'var(--space-2)' }}>
                              Formas de Pagamento
                            </h4>
                            
                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                              {[
                                { label: 'À Vista', value: total.toFixed(2), desc: '5% desconto', color: 'emerald' },
                                { label: '3x sem juros', value: (total / 3).toFixed(2), desc: 'por parcela', color: 'amber' },
                                { label: '6x sem juros', value: (total / 6).toFixed(2), desc: 'por parcela', color: 'blue' }
                              ].map((option, index) => (
                                <motion.div 
                                  key={index}
                                  className={`p-3 sm:p-4 bg-white/5 border border-white/10 rounded-lg text-center hover:bg-white/8 transition-colors cursor-pointer`}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <div className={`text-${option.color}-300 font-bold text-base sm:text-lg mb-1`}>
                                    ${option.value}
                                  </div>
                                  <div className="text-white font-medium text-xs sm:text-sm mb-1">{option.label}</div>
                                  <div className="text-white/60 text-xs">{option.desc}</div>
                                </motion.div>
                              ))}
                            </div>

                            {/* CTA Button */}
                            <motion.button
                              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 group"
                              style={{ padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1.5rem, 4vw, 2rem)', marginTop: 'var(--space-2)' }}
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
                                <MessageCircle className="hidden sm:block w-5 h-5" />
                                <span className="text-sm sm:text-base">FINALIZAR RESERVA</span>
                                <ArrowRight className="hidden sm:block w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </motion.button>

                            {/* Security Info */}
                            <div className="border-t border-white/10" style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)' }}>
                              <div className="flex items-center justify-center gap-4 sm:gap-8 text-white/60 text-xs sm:text-sm">
                                <div className="flex items-center gap-3">
                                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                                  <span>100% Seguro</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
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

        {/* Sophisticated Reservation Modal */}
        <AnimatePresence>
          {showReservationModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReservationModal(false)}
              />
              
              {/* Modal Content */}
              <motion.div
                className="modal-content relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 overflow-hidden w-full max-h-[95vh] overflow-y-auto"
                style={{ 
                  borderRadius: window.innerWidth <= 420 ? '16px' : '24px',
                  maxWidth: window.innerWidth <= 420 ? '100%' : '64rem',
                  margin: window.innerWidth <= 420 ? '0.5rem' : 'auto'
                }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {/* Editorial Pattern Background */}
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
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: 'var(--space-12) var(--space-12), var(--space-6) var(--space-6)'
                  }}
                />
                
                {/* Ambient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-emerald-500/8" />
                
                {/* Content */}
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                  onClick={() => setShowReservationModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
                
                <div className="relative z-10" style={{ 
                  padding: window.innerWidth <= 420 ? '1.25rem 0.75rem 0.5rem 0.75rem' : 'var(--space-6)'
                }}>
                  {/* Editorial Header */}
                  <motion.header
                    className="modal-header editorial-rhythm text-center"
                    style={{ marginBottom: 'var(--space-8)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                  >
                    {/* Issue Badge */}
                    <motion.div 
                      className="inline-flex items-center bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-medium tracking-[0.25em] uppercase"
                      style={{ 
                        padding: 'var(--space-2) var(--space-4)',
                        marginBottom: 'var(--space-6)',
                        borderRadius: '20px'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span>ETAPA {modalStep} DE 2</span>
                    </motion.div>
                    
                    {/* Editorial Headline */}
                    <motion.h2 
                      className="text-editorial-md text-white tracking-tighter"
                      style={{ marginBottom: 'var(--space-2)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {modalStep === 1 ? (
                        <>
                          CONFIRME SUA{' '}
                          <span className="text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text">
                            RESERVA
                          </span>
                        </>
                      ) : (
                        <>
                          SEUS{' '}
                          <span className="text-transparent bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text">
                            DADOS
                          </span>
                        </>
                      )}
                    </motion.h2>
                    
                    {/* Editorial Subtext */}
                    <motion.p 
                      className="text-lg text-white/75 max-w-2xl mx-auto font-light text-center"
                      style={{ lineHeight: '1.6' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {modalStep === 1 
                        ? 'Revise cuidadosamente todos os detalhes da sua reserva antes de prosseguir para a próxima etapa.'
                        : 'Complete suas informações para que possamos finalizar sua reserva com total segurança.'
                      }
                    </motion.p>
                    
                    {/* Editorial Progress Indicator */}
                    <motion.div 
                      className="flex items-center justify-center"
                      style={{ gap: 'var(--space-3)', marginTop: 'var(--space-8)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className={`w-4 h-4 rounded-full transition-all duration-500 ${modalStep >= 1 ? 'bg-gradient-to-r from-amber-400 to-amber-300 shadow-lg shadow-amber-400/30' : 'bg-white/20'}`} />
                      <div className={`h-0.5 transition-all duration-500 ${modalStep >= 2 ? 'bg-gradient-to-r from-amber-400 to-emerald-400 w-16' : 'bg-white/20 w-12'}`} />
                      <div className={`w-4 h-4 rounded-full transition-all duration-500 ${modalStep >= 2 ? 'bg-gradient-to-r from-emerald-400 to-emerald-300 shadow-lg shadow-emerald-400/30' : 'bg-white/20'}`} />
                    </motion.div>
                  </motion.header>
                  
                  {/* Content based on step */}
                  {modalStep === 1 ? (
                    /* Step 1: Editorial Reservation Summary */
                    <div className="editorial-stack-lg">
                      <motion.article 
                        className="relative overflow-hidden"
                        style={{ 
                          padding: window.innerWidth <= 420 ? '0.5rem 0.25rem' : 'var(--space-5)',
                          borderRadius: window.innerWidth <= 420 ? '16px' : '20px'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {/* Editorial Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/6 backdrop-blur-sm border border-white/10" />
                        
                        {/* Subtle Pattern */}
                        <div 
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                            backgroundSize: 'var(--space-6) var(--space-6)'
                          }}
                        />
                        
                        <div className="relative z-10">
                          <h3 className="text-white font-bold tracking-tight text-center" style={{ 
                            fontSize: window.innerWidth <= 420 ? '1.125rem' : 'clamp(1.125rem, 4vw, 2rem)',
                            marginBottom: window.innerWidth <= 420 ? '0.5rem' : 'var(--space-4)'
                          }}>
                            Resumo da Reserva
                          </h3>
                        
                          {/* Editorial Details Grid */}
                          {/* Mobile-First Simple Layout */}
                          <div style={{ 
                            display: window.innerWidth <= 420 ? 'block' : 'block',
                            maxWidth: window.innerWidth <= 420 ? '100%' : '80%',
                            margin: window.innerWidth <= 420 ? '0' : '0 auto'
                          }}>
                            {/* Unified Details List - Mobile Optimized */}
                            <div style={{ 
                              display: 'flex', 
                              flexDirection: 'column',
                              gap: window.innerWidth <= 420 ? '0.5rem' : '0.75rem'
                            }}>
                              {[
                                { label: window.innerWidth <= 420 ? 'Categoria' : 'Categoria do Veículo', value: selectedCategory, icon: Car, color: 'amber' },
                                { label: window.innerWidth <= 420 ? 'Passageiros' : 'Número de Passageiros', value: `${passengers} ${passengers === 1 ? 'pessoa' : 'pessoas'}`, icon: Users, color: 'amber' },
                                { label: window.innerWidth <= 420 ? 'Período' : 'Período da Locação', value: `${days} ${days === 1 ? 'dia' : 'dias'}`, icon: Calendar, color: 'amber' },
                                { label: window.innerWidth <= 420 ? 'Retirada' : 'Data de Retirada', value: new Date(checkInDate + 'T12:00:00').toLocaleDateString('pt-BR'), icon: Calendar, color: 'emerald' },
                                { label: window.innerWidth <= 420 ? 'Devolução' : 'Data de Devolução', value: new Date(checkOutDate + 'T12:00:00').toLocaleDateString('pt-BR'), icon: Calendar, color: 'emerald' },
                                { label: window.innerWidth <= 420 ? 'Diária' : 'Valor da Diária', value: window.innerWidth <= 420 ? `$${daily.toFixed(2)}` : `$${daily.toFixed(2)} USD`, icon: CreditCard, color: 'emerald' }
                              ].map((item, index) => {
                                const Icon = item.icon;
                                const colorClass = item.color === 'amber' ? 'text-amber-400' : 'text-emerald-400';
                                
                                return (
                                  <div key={index} className="flex items-center justify-between bg-white/5 border border-white/10" style={{ 
                                    padding: window.innerWidth <= 420 ? '0.75rem' : '0.75rem 1rem',
                                    borderRadius: window.innerWidth <= 420 ? '8px' : '12px',
                                    minHeight: window.innerWidth <= 420 ? '40px' : '48px'
                                  }}>
                                    <div className="flex items-center" style={{ gap: window.innerWidth <= 420 ? '0.75rem' : '0.75rem' }}>
                                      <Icon className={colorClass} style={{ 
                                        width: window.innerWidth <= 420 ? '12px' : '16px', 
                                        height: window.innerWidth <= 420 ? '12px' : '16px' 
                                      }} />
                                      <span className="text-white/70 font-medium" style={{
                                        fontSize: window.innerWidth <= 420 ? '0.8rem' : '0.875rem'
                                      }}>{item.label}</span>
                                    </div>
                                    <span className="text-white font-semibold" style={{
                                      fontSize: window.innerWidth <= 420 ? '0.875rem' : '1rem'
                                    }}>{item.value}</span>
                                  </div>
                                );
                              })}
                            </div>
                            
                          </div>
                          
                          {/* Editorial Total Section */}
                          <div className="bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border-2 border-emerald-400/30" style={{ 
                            marginTop: window.innerWidth <= 420 ? '0.5rem' : 'var(--space-4)', 
                            padding: window.innerWidth <= 420 ? '0.5rem' : 'var(--space-4)', 
                            borderRadius: window.innerWidth <= 420 ? '12px' : '16px' 
                          }}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-emerald-300 font-bold uppercase tracking-wide" style={{
                                  fontSize: window.innerWidth <= 420 ? '0.875rem' : 'clamp(1rem, 4vw, 1.5rem)'
                                }}>{window.innerWidth <= 420 ? 'Total' : 'Total da Reserva'}</div>
                                <div className="text-white/60" style={{
                                  fontSize: window.innerWidth <= 420 ? '0.65rem' : 'clamp(0.75rem, 2.5vw, 0.875rem)'
                                }}>{window.innerWidth <= 420 ? 'Pague só ao receber' : 'Pagamento apenas após receber o veículo'}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-emerald-300 font-black" style={{
                                  fontSize: window.innerWidth <= 420 ? '1.5rem' : 'clamp(1.5rem, 6vw, 2.5rem)'
                                }}>${total.toFixed(2)}</div>
                                <div className="text-white/50" style={{
                                  fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)'
                                }}>USD</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </div>
                  ) : (
                    /* Step 2: Editorial Client Form */
                    <div className="editorial-stack-lg">
                      <motion.article 
                        className="relative overflow-hidden"
                        style={{ 
                          padding: window.innerWidth <= 420 ? '0.5rem 0.25rem' : 'var(--space-5)',
                          borderRadius: window.innerWidth <= 420 ? '16px' : '20px'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {/* Editorial Form Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/6 backdrop-blur-sm border border-white/10" />
                        
                        <div className="relative z-10">
                          <h3 className="text-white font-bold tracking-tight flex items-center" style={{ 
                            fontSize: window.innerWidth <= 420 ? '1rem' : 'clamp(1.125rem, 4vw, 1.5rem)',
                            gap: window.innerWidth <= 420 ? '0.5rem' : 'var(--space-3)', 
                            marginBottom: window.innerWidth <= 420 ? '0.5rem' : 'var(--space-4)'
                          }}>
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center" style={{
                              width: window.innerWidth <= 420 ? '28px' : '40px',
                              height: window.innerWidth <= 420 ? '28px' : '40px'
                            }}>
                              <Users className="text-black" style={{ 
                                width: window.innerWidth <= 420 ? '14px' : '20px', 
                                height: window.innerWidth <= 420 ? '14px' : '20px' 
                              }} />
                            </div>
                            Informações de Contato
                          </h3>
                        
                          {/* Editorial Form Fields */}
                          <div className="editorial-stack-lg">
                            {[
                              { label: 'Nome Completo', type: 'text', value: clientName, setter: setClientName, placeholder: 'Digite seu nome completo', required: true },
                              { label: 'WhatsApp', type: 'tel', value: clientPhone, setter: setClientPhone, placeholder: '(11) 99999-9999', required: true },
                              { label: 'E-mail', type: 'email', value: clientEmail, setter: setClientEmail, placeholder: 'seu@email.com', required: true }
                            ].map((field, index) => (
                              <div key={index} className="editorial-stack-sm">
                                <label className="block text-white/80 font-medium tracking-wide">
                                  {field.label} {field.required && <span className="text-amber-400">*</span>}
                                </label>
                                <input
                                  type={field.type}
                                  value={field.value}
                                  onChange={(e) => field.setter(e.target.value)}
                                  className="w-full bg-white/8 backdrop-blur-sm border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 focus:bg-white/12 transition-all duration-300"
                                  style={{ 
                                    padding: 'var(--space-4) var(--space-5)',
                                    borderRadius: '12px',
                                    fontSize: '16px'
                                  }}
                                  placeholder={field.placeholder}
                                />
                              </div>
                            ))}
                            
                            {/* Car Seat Section */}
                            <div className="editorial-stack-sm">
                              <label className="block text-white/80 font-medium tracking-wide" style={{
                                fontSize: window.innerWidth <= 420 ? '0.75rem' : '1rem',
                                marginBottom: window.innerWidth <= 420 ? '0.5rem' : '0.75rem'
                              }}>
                                Precisa de cadeirinha para criança?
                              </label>
                              
                              {/* Car Seat Toggle */}
                              <div className="flex items-center" style={{ gap: window.innerWidth <= 420 ? '0.75rem' : '1rem', marginBottom: window.innerWidth <= 420 ? '0.75rem' : '1rem' }}>
                                <motion.button
                                  type="button"
                                  onClick={() => setNeedsCarSeat(true)}
                                  className={`relative inline-flex items-center justify-center font-medium transition-all duration-300 ${
                                    needsCarSeat 
                                      ? 'bg-emerald-500 text-white border-2 border-emerald-500' 
                                      : 'bg-white/8 text-white/70 border border-white/20 hover:bg-white/12'
                                  }`}
                                  style={{
                                    padding: window.innerWidth <= 420 ? '0.5rem 1rem' : '0.75rem 1.25rem',
                                    borderRadius: window.innerWidth <= 420 ? '6px' : '8px',
                                    fontSize: window.innerWidth <= 420 ? '0.75rem' : '0.875rem',
                                    minHeight: window.innerWidth <= 420 ? '36px' : '44px'
                                  }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {needsCarSeat ? '✓ Sim' : 'Sim'}
                                </motion.button>
                                
                                <motion.button
                                  type="button"
                                  onClick={() => setNeedsCarSeat(false)}
                                  className={`relative inline-flex items-center justify-center font-medium transition-all duration-300 ${
                                    !needsCarSeat 
                                      ? 'bg-emerald-500 text-white border-2 border-emerald-500' 
                                      : 'bg-white/8 text-white/70 border border-white/20 hover:bg-white/12'
                                  }`}
                                  style={{
                                    padding: window.innerWidth <= 420 ? '0.5rem 1rem' : '0.75rem 1.25rem',
                                    borderRadius: window.innerWidth <= 420 ? '6px' : '8px',
                                    fontSize: window.innerWidth <= 420 ? '0.75rem' : '0.875rem',
                                    minHeight: window.innerWidth <= 420 ? '36px' : '44px'
                                  }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {!needsCarSeat ? '✓ Não' : 'Não'}
                                </motion.button>
                              </div>
                              
                              {/* Quantity Selector - Only show if needsCarSeat is true */}
                              <AnimatePresence>
                                {needsCarSeat && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <label className="block text-white/70 font-medium" style={{
                                      fontSize: window.innerWidth <= 420 ? '0.7rem' : '0.8rem',
                                      marginBottom: window.innerWidth <= 420 ? '0.375rem' : '0.5rem',
                                      marginTop: window.innerWidth <= 420 ? '0.5rem' : '0.75rem'
                                    }}>
                                      Quantas cadeirinhas?
                                    </label>
                                    <div className="flex items-center" style={{ gap: window.innerWidth <= 420 ? '0.5rem' : '0.75rem' }}>
                                      <motion.button
                                        type="button"
                                        onClick={() => setCarSeatQuantity(Math.max(1, carSeatQuantity - 1))}
                                        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                                        style={{
                                          width: window.innerWidth <= 420 ? '32px' : '36px',
                                          height: window.innerWidth <= 420 ? '32px' : '36px',
                                          fontSize: window.innerWidth <= 420 ? '0.875rem' : '1rem'
                                        }}
                                        disabled={carSeatQuantity <= 1}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        -
                                      </motion.button>
                                      
                                      <span className="text-white font-semibold" style={{
                                        fontSize: window.innerWidth <= 420 ? '1rem' : '1.125rem',
                                        minWidth: window.innerWidth <= 420 ? '32px' : '40px',
                                        textAlign: 'center'
                                      }}>
                                        {carSeatQuantity}
                                      </span>
                                      
                                      <motion.button
                                        type="button"
                                        onClick={() => setCarSeatQuantity(Math.min(4, carSeatQuantity + 1))}
                                        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-white transition-all duration-300"
                                        style={{
                                          width: window.innerWidth <= 420 ? '32px' : '36px',
                                          height: window.innerWidth <= 420 ? '32px' : '36px',
                                          fontSize: window.innerWidth <= 420 ? '0.875rem' : '1rem'
                                        }}
                                        disabled={carSeatQuantity >= 4}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        +
                                      </motion.button>
                                      
                                      <span className="text-white/60" style={{
                                        fontSize: window.innerWidth <= 420 ? '0.7rem' : '0.75rem',
                                        marginLeft: window.innerWidth <= 420 ? '0.5rem' : '0.75rem'
                                      }}>
                                        (máx. 4)
                                      </span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        
                          {/* Editorial Security Notice */}
                          <motion.div 
                            className="bg-gradient-to-r from-amber-500/10 to-amber-400/5 border border-amber-400/25 backdrop-blur-sm"
                            style={{ 
                              marginTop: window.innerWidth <= 420 ? '0.75rem' : 'var(--space-8)',
                              padding: window.innerWidth <= 420 ? '1rem' : 'var(--space-6)',
                              borderRadius: '16px'
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="flex items-start" style={{ gap: window.innerWidth <= 420 ? '0.75rem' : 'var(--space-4)' }}>
                              <div className="bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                                width: window.innerWidth <= 420 ? '28px' : '32px',
                                height: window.innerWidth <= 420 ? '28px' : '32px'
                              }}>
                                <Shield className="text-amber-300" style={{
                                  width: window.innerWidth <= 420 ? '14px' : '16px',
                                  height: window.innerWidth <= 420 ? '14px' : '16px'
                                }} />
                              </div>
                              <div>
                                <h4 className="text-amber-200 font-semibold tracking-wide" style={{ 
                                  fontSize: window.innerWidth <= 420 ? '0.875rem' : '1rem',
                                  marginBottom: window.innerWidth <= 420 ? '0.375rem' : 'var(--space-1)',
                                  lineHeight: '1.3'
                                }}>
                                  Seus dados estão protegidos
                                </h4>
                                <p className="text-amber-200/75 leading-relaxed" style={{
                                  fontSize: window.innerWidth <= 420 ? '0.75rem' : '0.875rem',
                                  lineHeight: window.innerWidth <= 420 ? '1.4' : '1.5'
                                }}>
                                  Utilizamos suas informações exclusivamente para processar sua reserva e manter contato sobre seu aluguel. Seus dados são tratados com total segurança e confidencialidade.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.article>
                    </div>
                  )}
                  
                  {/* Editorial Benefits Section - Only show in step 1 */}
                  {modalStep === 1 && (
                    <motion.article 
                      className="relative overflow-hidden"
                      style={{ 
                        padding: 'var(--space-8)',
                        borderRadius: '20px',
                        marginTop: 'var(--space-10)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      {/* Benefits Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/12 to-emerald-400/8 border border-emerald-400/25" />
                      
                      <div className="relative z-10">
                        <h3 className="text-title text-emerald-300 font-bold tracking-tight flex items-center" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-black" />
                          </div>
                          Seus Benefícios ASX
                        </h3>
                        
                        <div className="magazine-grid" style={{ gap: 'var(--space-4)' }}>
                          {[
                            { text: 'Pagamento só após receber o veículo', icon: CreditCard },
                            { text: 'Zero bloqueio no cartão de crédito', icon: Shield },
                            { text: 'Quilometragem 100% ilimitada', icon: CheckCircle },
                            { text: 'Suporte 24/7 em português', icon: MessageCircle }
                          ].map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                              <div key={index} className="col-span-12 lg:col-span-6">
                                <div className="flex items-center" style={{ gap: 'var(--space-3)' }}>
                                  <div className="w-6 h-6 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-3 h-3 text-emerald-300" />
                                  </div>
                                  <span className="text-white/85 font-medium text-sm">{benefit.text}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.article>
                  )}
                  
                  {/* Editorial Action Buttons */}
                  <motion.div 
                    className="flex flex-col lg:flex-row"
                    style={{ gap: 'var(--space-4)', marginTop: 'var(--space-12)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {/* Secondary Button */}
                    <motion.button
                      onClick={modalStep === 1 ? () => setShowReservationModal(false) : backToSummary}
                      className="group relative bg-white/8 backdrop-blur-sm border border-white/20 text-white font-semibold tracking-wide uppercase overflow-hidden transition-all duration-400"
                      style={{ 
                        padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2rem)',
                        borderRadius: '12px',
                        fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
                        letterSpacing: '0.1em',
                        minHeight: 'clamp(44px, 12vw, 56px)'
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        transition: { type: 'spring', stiffness: 400, damping: 17 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{modalStep === 1 ? 'Cancelar' : 'Voltar'}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </motion.button>
                    
                    {/* Primary CTA Button */}
                    <motion.button
                      onClick={modalStep === 1 ? proceedToClientData : sendToWhatsApp}
                      disabled={modalStep === 2 && !validateClientData()}
                      className={`group relative font-bold tracking-wide uppercase overflow-hidden transition-all duration-400 flex items-center justify-center cursor-pointer flex-1 ${
                        modalStep === 2 && !validateClientData()
                          ? 'bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-300 text-white shadow-lg shadow-emerald-500/25'
                      }`}
                      style={{ 
                        padding: 'clamp(1rem, 4vw, 1.25rem) clamp(2rem, 6vw, 2.5rem)',
                        borderRadius: '12px',
                        fontSize: 'clamp(0.875rem, 3.5vw, 1rem)',
                        letterSpacing: '0.1em',
                        gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                        minHeight: 'clamp(50px, 14vw, 64px)'
                      }}
                      whileHover={modalStep === 2 && !validateClientData() ? {} : { 
                        scale: 1.02,
                        y: -2,
                        boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)',
                        transition: { type: 'spring', stiffness: 400, damping: 17 }
                      }}
                      whileTap={modalStep === 2 && !validateClientData() ? {} : { scale: 0.98 }}
                    >
                      {modalStep === 1 ? (
                        <>
                          <span className="relative z-10 font-black">Continuar</span>
                          <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" style={{ width: 'clamp(16px, 4vw, 20px)', height: 'clamp(16px, 4vw, 20px)' }} />
                        </>
                      ) : (
                        <>
                          <MessageCircle className="relative z-10" style={{ width: 'clamp(16px, 4vw, 20px)', height: 'clamp(16px, 4vw, 20px)' }} />
                          <span className="relative z-10 font-black">Finalizar no WhatsApp</span>
                        </>
                      )}
                      {!(modalStep === 2 && !validateClientData()) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Success Toast */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none"
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 30,
                duration: 0.4 
              }}
            >
              <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 border border-emerald-400/30 backdrop-blur-md shadow-2xl" style={{
                borderRadius: '16px',
                padding: window.innerWidth <= 420 ? '1rem 1.5rem' : '1.25rem 2rem',
                maxWidth: window.innerWidth <= 420 ? '320px' : '480px',
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3), 0 8px 16px rgba(16, 185, 129, 0.2)'
              }}>
                {/* Animated Background Pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-10"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                    borderRadius: '16px'
                  }}
                />
                
                <div className="relative z-10 flex items-start" style={{ gap: window.innerWidth <= 420 ? '0.75rem' : '1rem' }}>
                  {/* Success Icon */}
                  <motion.div
                    className="flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center"
                    style={{
                      width: window.innerWidth <= 420 ? '40px' : '48px',
                      height: window.innerWidth <= 420 ? '40px' : '48px'
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  >
                    <CheckCircle className="text-white" style={{
                      width: window.innerWidth <= 420 ? '20px' : '24px',
                      height: window.innerWidth <= 420 ? '20px' : '24px'
                    }} />
                  </motion.div>
                  
                  {/* Success Content */}
                  <div className="flex-1">
                    <motion.h3 
                      className="text-white font-bold tracking-tight"
                      style={{
                        fontSize: window.innerWidth <= 420 ? '1rem' : '1.125rem',
                        marginBottom: window.innerWidth <= 420 ? '0.25rem' : '0.375rem'
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Reserva Enviada com Sucesso!
                    </motion.h3>
                    
                    <motion.p 
                      className="text-emerald-50/90 font-medium leading-relaxed"
                      style={{
                        fontSize: window.innerWidth <= 420 ? '0.8rem' : '0.875rem',
                        lineHeight: '1.4'
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Nosso especialista entrará em contato em breve com todos os detalhes da sua reserva.
                    </motion.p>
                    
                    {/* Progress Bar */}
                    <motion.div 
                      className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="h-full bg-white/60 rounded-full"
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 4, ease: 'linear' }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    className="flex-shrink-0 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 pointer-events-auto"
                    onClick={() => setShowSuccessToast(false)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}