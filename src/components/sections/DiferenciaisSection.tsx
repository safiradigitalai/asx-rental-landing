'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, 
  Shield, 
  Car, 
  Users, 
  Plane, 
  Baby,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { openWhatsAppDiferenciais } from '@/lib/whatsapp';

interface DiferencialCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function DiferenciaisSection() {
  // Tags específicas que descrevem cada benefício (na ordem correta dos diferenciais)
  const customTags = ['Pague na Entrega', 'Cartão Liberado', 'Rode à Vontade', 'Suporte BR', 'Pegue Direto', 'Incluso Grátis'];
  
  // Estado para controlar o slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const diferenciais: DiferencialCard[] = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Pagamento após receber",
      description: "Você só paga quando estiver com as chaves na mão. Zero risco, máxima segurança.",
      highlight: true
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Zero bloqueio no cartão",
      description: "Sem pré-autorização. Seu limite permanece livre para outras compras."
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Milhas ilimitadas",
      description: "Rode o quanto quiser sem taxa extra. Explore Orlando sem limites."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Atendimento em português",
      description: "Suporte completo em português 24/7. Sem barreiras de idioma.",
      highlight: true
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Entrega no aeroporto",
      description: "Retire seu carro direto no aeroporto, sem filas ou esperas."
    },
    {
      icon: <Baby className="w-6 h-6" />,
      title: "Cadeirinha grátis",
      description: "Cadeirinhas para crianças incluídas sem custo adicional."
    }
  ];

  // Slides para o mobile (apenas os 5 diferenciais, sem o primeiro que é o hero)
  const mobileSlides = diferenciais.slice(1);
  const totalSlides = mobileSlides.length;

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Detectar mudança de scroll manual e manter sincronização
  useEffect(() => {
    const container = sliderRef.current;
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
      const clampedIndex = Math.max(0, Math.min(approximateIndex, mobileSlides.length - 1));
      
      if (clampedIndex !== currentSlide) {
        setCurrentSlide(clampedIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSlide, isScrolling, mobileSlides.length]);

  // Garantir centralização em todas as situações
  useEffect(() => {
    const ensureCentered = () => {
      if (sliderRef.current) {
        const newPosition = getScrollPosition(currentSlide);
        sliderRef.current.scrollLeft = newPosition;
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
      if (sliderRef.current) {
        const newPosition = getScrollPosition(currentSlide);
        sliderRef.current.scrollLeft = newPosition;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide]);

  // Scroll para o slide atual
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = 320; // largura do card
      const gap = 24; // var(--space-4) = 24px
      
      // Calcula posição do slide
      const scrollPosition = currentSlide * (slideWidth + gap);
      
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  // Função para calcular a posição de scroll para centralizar um card
  const getScrollPosition = (index: number) => {
    if (!sliderRef.current) return 0;
    
    const cardWidth = 320; // Largura fixa dos cards (clamp mínimo)
    const gap = 24; // var(--space-6) = 24px
    
    // Posição do card específico no scroll
    const cardPosition = index * (cardWidth + gap);
    
    // A posição de scroll necessária para centralizar o card
    const scrollPosition = cardPosition;
    
    return Math.max(0, scrollPosition);
  };

  // Navegar para um slide específico com transição suave
  const goToSlide = (index: number) => {
    if (isScrolling || !sliderRef.current) return;
    
    setIsScrolling(true);
    setIsTransitioning(true);
    setIsAutoPlaying(false); // Para o autoplay quando usuário interage
    
    // Fade out suave
    setTimeout(() => {
      const scrollPosition = getScrollPosition(index);
      
      sliderRef.current?.scrollTo({
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
    
    // Retoma autoplay após 8 segundos de inatividade
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  // Pausar autoplay quando hover nos cards
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section id="diferenciais" className="editorial-section bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Editorial Parallax Background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(45deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: 'var(--space-12) var(--space-12), var(--space-6) var(--space-6)'
        }}
      />
      
      {/* Editorial Lines Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        animate={{ 
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 98%, rgba(212, 165, 116, 0.1) 100%)',
          backgroundSize: 'var(--space-20) 100%'
        }}
      />

      <div className="editorial-container relative z-10">
        {/* Editorial Header */}
        <motion.header
          className="editorial-rhythm"
          style={{ marginBottom: 'var(--space-16)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
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
              <CheckCircle className="w-4 h-4" />
              <span>Por que somos diferentes</span>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-md text-gray-900 tracking-tighter"
              style={{ marginBottom: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A MELHOR EXPERIÊNCIA DE{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text">
                LOCAÇÃO
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
              Cada detalhe foi pensado para oferecer segurança, conveniência e tranquilidade premium na sua viagem a Orlando.
            </motion.p>
            </div>
          </div>
        </motion.header>

        {/* Editorial Features Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured Differential - Hero Card */}
          <motion.article
            className="col-span-12 relative overflow-hidden group cursor-pointer"
            style={{ marginBottom: 'var(--space-16)', borderRadius: '20px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Premium Blue Background Layer */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
            {/* Animated Pattern Overlay */}
            <motion.div 
              className="absolute inset-0 opacity-8"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                backgroundSize: 'var(--space-6) var(--space-6)'
              }}
            />
            
            {/* Blue Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-blue-300/5" />
            
            {/* Desktop Layout */}
            <motion.div 
              className="relative z-10 text-white editorial-stack-lg hidden md:block"
              style={{ padding: 'var(--space-12)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Premium Badge - Enhanced Blue + Gold */}
              <motion.div 
                className="inline-flex items-center backdrop-blur-sm text-xs font-medium tracking-[0.25em] uppercase"
                style={{ 
                  gap: 'var(--space-2)', 
                  padding: 'var(--space-2) var(--space-4)',
                  marginBottom: 'var(--space-8)',
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.15) 50%, rgba(0,102,204,0.1) 100%)',
                  border: '1px solid rgba(245,158,11,0.4)',
                  color: '#FCD34D'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(245,158,11,0.25)',
                  borderColor: 'rgba(251,191,36,0.5)'
                }}
              >
                <CreditCard className="w-4 h-4" />
                <span>Segurança Total</span>
              </motion.div>
              
              <h3 className="text-editorial-md leading-tight" style={{ marginBottom: 'var(--space-6)' }}>
                PAGAMENTO SÓ APÓS{' '}
                <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text">
                  RECEBER
                </span>
              </h3>
              
              <p className="text-xl font-light leading-relaxed text-white/85" style={{ 
                marginBottom: 'var(--space-8)',
                maxWidth: '500px'
              }}>
                Você só paga quando estiver com as chaves na mão. Zero risco, máxima segurança e total tranquilidade para sua viagem.
              </p>
              
              <motion.div 
                className="flex items-center text-amber-300 font-medium group-hover:text-amber-100 transition-colors duration-300 cursor-pointer"
                style={{ gap: 'var(--space-3)' }}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={() => openWhatsAppDiferenciais('Pagamento só após receber')}
              >
                <span className="text-base tracking-wide">Descobrir mais vantagens</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Mobile Layout - Compact Design */}
            <motion.div 
              className="relative z-10 text-white md:hidden flex flex-col items-center text-center"
              style={{ 
                padding: 'var(--space-4) var(--space-4) var(--space-4) var(--space-4)' 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Mobile Premium Badge */}
              <motion.div 
                className="inline-flex items-center bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm text-amber-300 text-xs font-medium tracking-[0.25em] uppercase"
                style={{ 
                  gap: 'var(--space-1)', 
                  padding: 'var(--space-1) var(--space-3)',
                  marginBottom: 'var(--space-3)'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CreditCard className="w-3 h-3" />
                <span>Seguro</span>
              </motion.div>
              
              {/* Mobile Hero Title - Simplified */}
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ marginBottom: 'var(--space-3)' }}>
                <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text">
                  PAGAMENTO
                </span>
                <br />
                <span className="text-white">SÓ APÓS RECEBER</span>
              </h3>
              
              {/* Mobile Description - Concise */}
              <p className="text-sm sm:text-base font-light leading-relaxed text-white/85 max-w-xs" style={{ marginBottom: 'var(--space-4)' }}>
                Zero risco. Máxima segurança. Você só paga com as chaves na mão.
              </p>
              
              {/* Mobile CTA - Touch Optimized */}
              <motion.div 
                className="flex items-center text-amber-300 font-medium text-sm cursor-pointer"
                style={{ gap: 'var(--space-2)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={() => openWhatsAppDiferenciais('Pagamento só após receber')}
              >
                <span className="tracking-wide">Ver mais vantagens</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.article>

          {/* Desktop: Premium Cards Grid / Mobile: Swipe Slider */}
          <div className="col-span-12">
            {/* Desktop Grid - First Row: 2 Large Cards */}
            <div className="hidden lg:block" style={{ marginBottom: 'var(--space-8)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {diferenciais.slice(1, 3).map((diferencial, index) => {
                  const isHighlight = diferencial.highlight;
                  return (
                    <motion.article
                      key={`row1-${index + 1}`}
                      className="col-span-12 lg:col-span-6 relative overflow-hidden group cursor-pointer"
                      style={{ 
                        borderRadius: '16px',
                        minHeight: '420px'
                      }}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.15,
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }}
                      whileHover={{ 
                        y: -12,
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 300, damping: 20 }
                      }}
                    >
                      {/* Premium Background Layer */}
                      <motion.div 
                        className={`absolute inset-0 ${
                          isHighlight 
                            ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900' 
                            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />

                      <motion.div 
                        className="absolute inset-0 opacity-8"
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 20 + (index * 3),
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${isHighlight ? 'rgba(255,255,255,0.1)' : 'rgba(212,165,116,0.15)'} 1px, transparent 0)`,
                          backgroundSize: 'var(--space-8) var(--space-8)'
                        }}
                      />
                      
                      <div className={`absolute inset-0 ${
                        isHighlight 
                          ? 'bg-gradient-to-br from-blue-400/10 via-transparent to-blue-300/5' 
                          : 'bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5'
                      }`} />

                      <div 
                        className="relative z-10 h-full flex flex-col text-white editorial-stack"
                        style={{ padding: 'var(--space-8)' }}
                      >
                        <div 
                          className={`inline-flex items-center backdrop-blur-sm border text-xs font-medium tracking-[0.2em] uppercase w-fit ${
                            isHighlight 
                              ? 'bg-blue-400/20 border-blue-300/30 text-blue-200' 
                              : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                          }`}
                          style={{ 
                            gap: 'var(--space-2)', 
                            padding: 'var(--space-2) var(--space-4)'
                          }}
                        >
                          {diferencial.icon}
                          <span>{customTags[index + 1]}</span>
                        </div>
                        
                        <div className="flex-1 editorial-stack" style={{ paddingRight: 'var(--space-2)' }}>
                          <h3 className="text-editorial-sm leading-tight" style={{ marginBottom: 'var(--space-3)' }}>
                            {diferencial.title.toUpperCase()}
                          </h3>
                          
                          <p className="text-lg font-light leading-relaxed text-white/85" style={{ lineHeight: '1.6' }}>
                            {diferencial.description}
                          </p>
                        </div>
                        
                        <motion.div 
                          className={`flex items-center font-medium group-hover:text-white transition-colors duration-300 cursor-pointer ${
                            isHighlight ? 'text-blue-300' : 'text-amber-300'
                          }`}
                          style={{ gap: 'var(--space-3)' }}
                          whileHover={{ x: 8 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          onClick={() => openWhatsAppDiferenciais(diferencial.title)}
                        >
                          <span className="text-base tracking-wide">Descobrir vantagem</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
            
            {/* Desktop Grid - Second Row: 2 Large Cards + 1 Full Card */}
            <div className="hidden lg:block">
              {/* First part: 2 Large Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" style={{ marginBottom: 'var(--space-8)' }}>
                {diferenciais.slice(3, 5).map((diferencial, index) => {
                  const isHighlight = diferencial.highlight;
                  return (
                    <motion.article
                      key={`row2-${index + 3}`}
                      className="col-span-12 lg:col-span-6 relative overflow-hidden group cursor-pointer"
                      style={{ 
                        borderRadius: '16px',
                        minHeight: '420px'
                      }}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.3 + (index * 0.1),
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }}
                      whileHover={{ 
                        y: -10,
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 300, damping: 20 }
                      }}
                    >
                      <motion.div 
                        className={`absolute inset-0 ${
                          isHighlight 
                            ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900' 
                            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />

                      <motion.div 
                        className="absolute inset-0 opacity-8"
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 18 + (index * 2),
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${isHighlight ? 'rgba(255,255,255,0.1)' : 'rgba(212,165,116,0.15)'} 1px, transparent 0)`,
                          backgroundSize: 'var(--space-6) var(--space-6)'
                        }}
                      />
                      
                      <div className={`absolute inset-0 ${
                        isHighlight 
                          ? 'bg-gradient-to-br from-blue-400/10 via-transparent to-blue-300/5' 
                          : 'bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5'
                      }`} />

                      <div 
                        className="relative z-10 h-full flex flex-col text-white editorial-stack"
                        style={{ padding: 'var(--space-8)' }}
                      >
                        <div 
                          className={`inline-flex items-center backdrop-blur-sm border text-xs font-medium tracking-[0.2em] uppercase w-fit ${
                            isHighlight 
                              ? 'bg-blue-400/20 border-blue-300/30 text-blue-200' 
                              : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                          }`}
                          style={{ 
                            gap: 'var(--space-1)', 
                            padding: 'var(--space-1) var(--space-3)'
                          }}
                        >
                          {diferencial.icon}
                          <span>{customTags[index + 3]}</span>
                        </div>
                        
                        <div className="flex-1 editorial-stack" style={{ paddingRight: 'var(--space-2)' }}>
                          <h3 className="text-editorial-sm leading-tight" style={{ marginBottom: 'var(--space-3)' }}>
                            {diferencial.title.toUpperCase()}
                          </h3>
                          
                          <p className="text-lg font-light leading-relaxed text-white/85" style={{ lineHeight: '1.6' }}>
                            {diferencial.description}
                          </p>
                        </div>
                        
                        <motion.div 
                          className={`flex items-center font-medium group-hover:text-white transition-colors duration-300 cursor-pointer ${
                            isHighlight ? 'text-blue-300' : 'text-amber-300'
                          }`}
                          style={{ gap: 'var(--space-3)' }}
                          whileHover={{ x: 8 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          onClick={() => openWhatsAppDiferenciais(diferencial.title)}
                        >
                          <span className="text-base tracking-wide">Descobrir vantagem</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
              
              {/* Second part: 1 Full Width Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {diferenciais.slice(5, 6).map((diferencial, index) => {
                  const isHighlight = diferencial.highlight;
                  return (
                    <motion.article
                      key={`row2-full-${index + 5}`}
                      className="col-span-12 relative overflow-hidden group cursor-pointer"
                      style={{ 
                        borderRadius: '16px',
                        minHeight: '420px'
                      }}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.5,
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }}
                      whileHover={{ 
                        y: -12,
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 300, damping: 20 }
                      }}
                    >
                      {/* Premium Background Layer */}
                      <motion.div 
                        className={`absolute inset-0 ${
                          isHighlight 
                            ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900' 
                            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />

                      <motion.div 
                        className="absolute inset-0 opacity-8"
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 22,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${isHighlight ? 'rgba(255,255,255,0.1)' : 'rgba(212,165,116,0.15)'} 1px, transparent 0)`,
                          backgroundSize: 'var(--space-8) var(--space-8)'
                        }}
                      />
                      
                      <div className={`absolute inset-0 ${
                        isHighlight 
                          ? 'bg-gradient-to-br from-blue-400/10 via-transparent to-blue-300/5' 
                          : 'bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5'
                      }`} />

                      <div 
                        className="relative z-10 h-full flex flex-col text-white editorial-stack"
                        style={{ padding: 'var(--space-10)' }}
                      >
                        <div 
                          className={`inline-flex items-center backdrop-blur-sm border text-xs font-medium tracking-[0.2em] uppercase w-fit ${
                            isHighlight 
                              ? 'bg-blue-400/20 border-blue-300/30 text-blue-200' 
                              : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                          }`}
                          style={{ 
                            gap: 'var(--space-2)', 
                            padding: 'var(--space-2) var(--space-4)'
                          }}
                        >
                          {diferencial.icon}
                          <span>{customTags[5]}</span>
                        </div>
                        
                        <div className="flex-1 editorial-stack" style={{ paddingRight: 'var(--space-2)' }}>
                          <h3 className="text-editorial-sm leading-tight" style={{ marginBottom: 'var(--space-3)' }}>
                            {diferencial.title.toUpperCase()}
                          </h3>
                          
                          <p className="text-lg font-light leading-relaxed text-white/85" style={{ lineHeight: '1.6' }}>
                            {diferencial.description}
                          </p>
                        </div>
                        
                        <motion.div 
                          className={`flex items-center font-medium group-hover:text-white transition-colors duration-300 cursor-pointer ${
                            isHighlight ? 'text-blue-300' : 'text-amber-300'
                          }`}
                          style={{ gap: 'var(--space-3)' }}
                          whileHover={{ x: 8 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          onClick={() => openWhatsAppDiferenciais(diferencial.title)}
                        >
                          <span className="text-base tracking-wide">Descobrir vantagem</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile Swipe Slider */}
            <motion.div 
              ref={sliderRef}
              className="lg:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
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
              <div 
                className="flex" 
                style={{ gap: 'var(--space-6)' }}
              >
                {mobileSlides.map((diferencial, index) => {
                  const isHighlight = diferencial.highlight;
                  return (
                    <motion.article
                      key={`mobile-${index + 1}`}
                      className="relative overflow-hidden group cursor-pointer flex-shrink-0 snap-center"
                      style={{ 
                        width: '320px', // Largura fixa para cálculos precisos
                        height: '420px',
                        borderRadius: '16px'
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
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className={`absolute inset-0 ${
                          isHighlight 
                            ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900' 
                            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
                        }`}
                        animate={{
                          boxShadow: index === currentSlide 
                            ? (isHighlight 
                                ? '0 20px 40px rgba(59,130,246,0.15), 0 8px 25px rgba(59,130,246,0.1)'
                                : '0 20px 40px rgba(245,158,11,0.15), 0 8px 25px rgba(245,158,11,0.1)')
                            : '0 8px 25px rgba(0,0,0,0.1)'
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: 'easeOut',
                          boxShadow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                        }}
                      />
                      
                      <motion.div 
                        className="absolute inset-0 opacity-8"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${isHighlight ? 'rgba(255,255,255,0.1)' : 'rgba(212,165,116,0.15)'} 1px, transparent 0)`,
                          backgroundSize: 'var(--space-8) var(--space-8)'
                        }}
                      />
                      
                      <div className={`absolute inset-0 ${
                        isHighlight 
                          ? 'bg-gradient-to-br from-blue-400/10 via-transparent to-blue-300/5' 
                          : 'bg-gradient-to-br from-amber-400/10 via-transparent to-amber-300/5'
                      }`} />
                      
                      <div 
                        className="relative z-10 h-full flex flex-col justify-center text-white"
                        style={{ padding: 'var(--space-6)' }}
                      >
                        {/* Badge */}
                        <div className="mb-6">
                          <div 
                            className={`inline-flex items-center backdrop-blur-sm border text-xs font-medium tracking-[0.2em] uppercase ${
                              isHighlight 
                                ? 'bg-blue-400/20 border-blue-300/30 text-blue-200' 
                                : 'bg-amber-500/20 border-amber-400/30 text-amber-300'
                            }`}
                            style={{ 
                              gap: 'var(--space-1)', 
                              padding: 'var(--space-1) var(--space-3)'
                            }}
                          >
                            {diferencial.icon}
                            <span>{customTags[index + 1]}</span>
                          </div>
                        </div>
                        
                        {/* Conteúdo Central */}
                        <div className="text-left flex-1 flex flex-col justify-center editorial-stack-sm">
                          <h3 className="text-xl font-bold leading-tight tracking-tight">
                            {diferencial.title.toUpperCase()}
                          </h3>
                          
                          <p className="text-sm font-light leading-relaxed text-white/85" style={{ lineHeight: '1.5' }}>
                            {diferencial.description}
                          </p>
                        </div>
                        
                        {/* Botão na base do card */}
                        <div className="mt-6">
                          <div 
                            className={`flex items-center font-medium cursor-pointer ${
                              isHighlight ? 'text-blue-300' : 'text-amber-300'
                            }`}
                            style={{ gap: 'var(--space-2)' }}
                            onClick={() => openWhatsAppDiferenciais(diferencial.title)}
                          >
                            <span className="text-sm tracking-wide">Descobrir</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Mobile Slider Dots - Elegant Indicators */}
            <motion.div 
              className="lg:hidden flex justify-center"
              style={{ marginTop: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex" style={{ gap: 'var(--space-2)' }}>
                {mobileSlides.map((_, index) => (
                  <motion.button
                    key={`dot-${index}`}
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
            </motion.div>
          </div>
        </div>

        {/* Editorial CTA for Categories */}
        <motion.section
          className="relative"
          style={{ marginTop: 'var(--space-16)' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <motion.article 
              className="relative overflow-hidden text-center editorial-stack-lg group cursor-pointer"
              style={{ 
                padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-4)',
                borderRadius: '16px'
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              onClick={() => {
                document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Premium Background Layer */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              
              {/* Animated Pattern Overlay */}
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
                  backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(212,165,116,0.15) 1px, transparent 0)',
                  backgroundSize: 'var(--space-8) var(--space-8)'
                }}
              />
              
              {/* Gradient Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-amber-300/5" />
              
              {/* Desktop Layout */}
              <div className="relative z-10 text-white hidden md:block" style={{ padding: 'var(--space-6)' }}>
                {/* Editorial Title */}
                <motion.h3 
                  className="text-editorial-md leading-tight" 
                  style={{ marginBottom: 'var(--space-6)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  EXPLORE NOSSA{' '}
                  <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text">
                    FROTA
                  </span>
                </motion.h3>
                
                {/* Editorial Description */}
                <p className="text-xl text-white/85 font-light" style={{ 
                  lineHeight: 'var(--baseline)', 
                  marginBottom: 'var(--space-8)',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-8) auto'
                }}>
                  Descubra o veículo perfeito para sua experiência em Orlando. Desde econômicos até luxuosos, todos com seguro completo e quilometragem ilimitada.
                </p>
                
                {/* Premium CTA - Matching Specialist Button Style */}
                <motion.button
                  className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden shadow-2xl"
                  style={{ 
                    padding: 'var(--space-4) var(--space-10)',
                    gap: 'var(--space-3)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 4px 16px rgba(245,158,11,0.2)'
                  }}
                  onClick={() => {
                    document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -6,
                    boxShadow: '0 12px 40px rgba(245,158,11,0.5), 0 6px 20px rgba(245,158,11,0.3)',
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 font-black">Ver Categorias de Veículos</span>
                  <ArrowRight className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                </motion.button>
              </div>

              {/* Mobile Layout - Compact Design */}
              <div className="relative z-10 text-white md:hidden flex flex-col items-center text-center" style={{
                padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-4)'
              }}>
                {/* Mobile Title - Simplified */}
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ marginBottom: 'var(--space-3)' }}>
                  <span className="text-transparent bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text">
                    NOSSA FROTA
                  </span>
                  <br />
                  <span className="text-white">COMPLETA</span>
                </h3>
                
                {/* Mobile Description - Concise */}
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/85 max-w-xs" style={{ marginBottom: 'var(--space-4)' }}>
                  Econômicos até luxuosos. Seguro completo e quilometragem ilimitada.
                </p>
                
                {/* Premium CTA - Matching Specialist Button Style */}
                <motion.button
                  className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm sm:text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden shadow-2xl"
                  style={{ 
                    padding: 'var(--space-3) var(--space-8)',
                    gap: 'var(--space-3)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(245,158,11,0.4), 0 4px 16px rgba(245,158,11,0.2)'
                  }}
                  onClick={() => {
                    document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -6,
                    boxShadow: '0 12px 40px rgba(245,158,11,0.5), 0 6px 20px rgba(245,158,11,0.3)',
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 font-black">Ver Veículos</span>
                  <ArrowRight className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800" />
                </motion.button>
              </div>
            </motion.article>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}