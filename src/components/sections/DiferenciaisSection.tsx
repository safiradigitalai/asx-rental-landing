'use client';

import { motion } from 'framer-motion';
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

interface DiferencialCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function DiferenciaisSection() {
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
            {/* Parallax Background Layer */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
            {/* Animated Pattern Overlay */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: 'var(--space-6) var(--space-6)'
              }}
            />
            
            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-400/10" />
            
            {/* Desktop Layout */}
            <motion.div 
              className="relative z-10 text-white editorial-stack-lg hidden md:block"
              style={{ padding: 'var(--space-12)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Premium Badge */}
              <motion.div 
                className="inline-flex items-center bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm text-amber-300 text-xs font-medium tracking-[0.25em] uppercase"
                style={{ 
                  gap: 'var(--space-2)', 
                  padding: 'var(--space-2) var(--space-4)',
                  marginBottom: 'var(--space-8)'
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(245, 158, 11, 0.3)' }}
              >
                <CreditCard className="w-4 h-4" />
                <span>Exclusivo Premium</span>
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
                className="flex items-center text-amber-300 font-medium group-hover:text-amber-200 transition-colors duration-300 cursor-pointer"
                style={{ gap: 'var(--space-3)' }}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
                <span>Premium</span>
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
                          <span>Premium</span>
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
                          <span>Premium</span>
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
                          <span>Premium</span>
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
            <div className="lg:hidden overflow-x-auto scrollbar-hide">
              <div className="flex" style={{ gap: 'var(--space-4)', paddingLeft: 'var(--space-4)', paddingRight: 'var(--space-4)' }}>
                {diferenciais.slice(1).map((diferencial, index) => {
                  const isHighlight = diferencial.highlight;
                  return (
                    <motion.article
                      key={`mobile-${index + 1}`}
                      className="relative overflow-hidden group cursor-pointer flex-shrink-0"
                      style={{ 
                        width: '300px',
                        height: '380px',
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
                    >
                      <motion.div 
                        className={`absolute inset-0 ${
                          isHighlight 
                            ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900' 
                            : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
                        }`}
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
                        className="relative z-10 h-full flex flex-col text-white editorial-stack"
                        style={{ padding: 'var(--space-6)' }}
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
                          <span>Premium</span>
                        </div>
                        
                        <div className="flex-1 editorial-stack" style={{ paddingRight: 'var(--space-1)' }}>
                          <h3 className="text-headline font-bold leading-tight tracking-tight" style={{ marginBottom: 'var(--space-2)' }}>
                            {diferencial.title.toUpperCase()}
                          </h3>
                          
                          <p className="text-sm font-light leading-relaxed text-white/85" style={{ lineHeight: '1.5' }}>
                            {diferencial.description}
                          </p>
                        </div>
                        
                        <div 
                          className={`flex items-center font-medium cursor-pointer ${
                            isHighlight ? 'text-blue-300' : 'text-amber-300'
                          }`}
                          style={{ gap: 'var(--space-2)' }}
                        >
                          <span className="text-sm tracking-wide">Descobrir</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile Slider Dots - Elegant Indicators */}
            <motion.div 
              className="lg:hidden flex justify-center"
              style={{ marginTop: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2" style={{ gap: 'var(--space-2)' }}>
                {diferenciais.slice(1).map((_, index) => (
                  <motion.div
                    key={`dot-${index}`}
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    {/* Dot Background */}
                    <div className="w-2 h-2 rounded-full bg-gray-400/40" />
                    
                    {/* Active Dot Indicator */}
                    <motion.div
                      className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: index === 0 ? 1 : 0,
                        opacity: index === 0 ? 1 : 0
                      }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 20,
                        duration: 0.3 
                      }}
                    />
                    
                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400/60"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ 
                        scale: 1.5, 
                        opacity: 0.6,
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>
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
                    FROTA PREMIUM
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
                
                {/* Premium CTA */}
                <motion.div
                  className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-black font-bold text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer relative overflow-hidden"
                  style={{ 
                    padding: 'var(--space-4) var(--space-10)',
                    gap: 'var(--space-3)',
                    borderRadius: '8px'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Ver Categorias de Veículos</span>
                  <ArrowRight className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </motion.div>
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
                  <span className="text-white">PREMIUM</span>
                </h3>
                
                {/* Mobile Description - Concise */}
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/85 max-w-xs" style={{ marginBottom: 'var(--space-4)' }}>
                  Econômicos até luxuosos. Seguro completo e quilometragem ilimitada.
                </p>
                
                {/* Mobile CTA - Touch Optimized */}
                <motion.div
                  className="inline-flex items-center bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm sm:text-base tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer"
                  style={{ 
                    padding: 'var(--space-3) var(--space-6)',
                    gap: 'var(--space-2)',
                    borderRadius: '8px'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <span>Ver Veículos</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.article>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}