'use client';

import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  Star,
  Shield,
  CreditCard,
  ArrowRight,
  MessageCircle,
  Heart
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="editorial-section bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Editorial Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: 'var(--space-12) var(--space-12), var(--space-6) var(--space-6)'
        }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-[0.06]"
        animate={{ 
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 98%, rgba(212, 165, 116, 0.15) 100%)',
          backgroundSize: 'var(--space-20) 100%'
        }}
      />

      {/* Ambient Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="editorial-container relative z-10">
        {/* Editorial Header - Magazine Style */}
        <motion.header
          className="magazine-grid editorial-rhythm"
          style={{ marginBottom: 'var(--space-16)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            {/* Issue Header - Like Hero Section */}
            <motion.div
              className="flex items-center justify-center"
              style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-amber-400/90 font-light tracking-[0.3em] text-sm uppercase">
                Final Edition
              </div>
              <div className="bg-gradient-to-r from-white/40 to-transparent" style={{ width: 'var(--space-12)', height: '1px' }} />
              <div className="text-white/50 font-light tracking-[0.25em] text-sm uppercase">
                Your Orlando Experience
              </div>
            </motion.div>
            
            {/* Editorial Headline */}
            <motion.h2 
              className="text-editorial-lg text-white tracking-tighter"
              style={{ marginBottom: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              SUA JORNADA{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text">
                COMEÇA AQUI
              </span>
            </motion.h2>
            
            {/* Editorial Subtext */}
            <motion.p 
              className="text-xl text-white/85 max-w-3xl mx-auto font-light"
              style={{ lineHeight: 'var(--baseline)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Entre em contato conosco e garanta seu veículo premium para uma experiência inesquecível em Orlando.
            </motion.p>
          </div>
        </motion.header>

        {/* Main Footer Content - Editorial Layout 7-5 Split */}
        <div className="magazine-grid align-start" style={{ marginBottom: 'var(--space-16)' }}>
          {/* Left Column - Company & Contact (7/12) */}
          <motion.article 
            className="col-span-12 lg:col-span-7 editorial-stack-lg editorial-rhythm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Company Identity */}
            <motion.section
              className="editorial-stack-lg"
              style={{ marginBottom: 'var(--space-10)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <Logo size="lg" variant="light" />
              
              <motion.p 
                className="text-xl md:text-2xl text-white/75 max-w-2xl font-light"
                style={{ lineHeight: 'var(--baseline)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                A locadora de confiança dos brasileiros em Orlando.{' '}
                <span className="text-amber-400 font-medium">Mais de 10.000 clientes satisfeitos</span> desde 2020.
              </motion.p>
            </motion.section>

            {/* Editorial Contact Grid */}
            <motion.section
              className="grid grid-cols-1 sm:grid-cols-2"
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
                { 
                  icon: MessageCircle, 
                  label: "WhatsApp", 
                  value: "Fale Conosco", 
                  accent: true,
                  href: "https://wa.me/message/2Z77HXH2TB3DO1"
                },
                { icon: Phone, label: "Telefone", value: "+1 (407) 123-4567" },
                { icon: Mail, label: "Email", value: "contato@asxgroup.com" },
                { icon: Clock, label: "Atendimento", value: "24/7 em Português" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className={`border-l-2 ${contact.accent ? 'border-amber-400' : 'border-white/20'} bg-white/3 backdrop-blur-sm hover:bg-white/5 transition-all duration-300 cursor-pointer`}
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
                  onClick={() => contact.href && scrollToSection(contact.href)}
                >
                  <div className="flex items-center" style={{ gap: 'var(--space-3)' }}>
                    <div className={`w-8 h-8 ${contact.accent ? 'bg-amber-500/20 text-amber-400 border-amber-400/30' : 'bg-white/10 text-white/70'} rounded-full flex items-center justify-center border`}>
                      <contact.icon className="w-4 h-4" />
                    </div>
                    <div className={`${contact.accent ? 'text-amber-400' : 'text-white/60'} text-xs font-medium tracking-[0.25em] uppercase`}>
                      {contact.label}
                    </div>
                  </div>
                  <div className="text-white text-base font-light leading-relaxed pl-11">
                    {contact.value}
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Trust Badges Inline */}
            <motion.section 
              className="flex flex-wrap items-center"
              style={{ gap: 'var(--space-8)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[
                { icon: Shield, text: 'Segurança Total' },
                { icon: CreditCard, text: 'Pagamento Seguro' },
                { icon: Star, text: '4.9★ Avaliação' }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-white/60 hover:text-amber-400 transition-colors duration-300"
                  style={{ gap: 'var(--space-2)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <badge.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </motion.section>
          </motion.article>

          {/* Right Column - Navigation & Social (5/12) */}
          <div className="col-span-12 lg:col-span-5 editorial-stack-lg" style={{ paddingLeft: 'var(--space-8)' }}>
            {/* Quick Navigation */}
            <motion.nav
              className="editorial-stack-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="border-l-4 border-amber-400/60 editorial-stack-lg" style={{ paddingLeft: 'var(--space-6)' }}>
                <h3 className="text-2xl font-bold text-white leading-none mb-6">
                  Navegação Rápida
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { section: 'Serviços', links: ['Aluguel de Carros', 'Calculadora', 'Depoimentos'] },
                    { section: 'Veículos', links: ['Sedan', 'Minivan', 'SUV', 'Esportivos'] }
                  ].map((column, columnIndex) => (
                    <motion.div
                      key={columnIndex}
                      className="editorial-stack"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + (columnIndex * 0.15) }}
                    >
                      <h4 className="text-amber-400 font-semibold text-sm tracking-wide uppercase mb-3">
                        {column.section}
                      </h4>
                      <ul className="space-y-2">
                        {column.links.map((link, linkIndex) => (
                          <motion.li key={linkIndex}>
                            <motion.button
                              className="group flex items-center text-white/70 hover:text-amber-300 transition-all duration-300 text-sm"
                              style={{ gap: 'var(--space-2)' }}
                              whileHover={{ x: 4 }}
                              onClick={() => scrollToSection('#categorias')}
                            >
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <span>{link}</span>
                            </motion.button>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>

            {/* Social & Legal */}
            <motion.aside
              className="relative overflow-hidden group"
              style={{ borderRadius: '16px' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/15" />
              
              <div className="relative z-10 text-white" style={{ padding: 'var(--space-6)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-amber-400 font-semibold text-sm tracking-[0.2em] uppercase">
                    Conecte-se
                  </h4>
                  <Heart className="w-4 h-4 text-amber-400/60" />
                </div>
                
                {/* Social Links */}
                <div className="flex items-center mb-6" style={{ gap: 'var(--space-3)' }}>
                  {[
                    { icon: Facebook, color: 'hover:text-blue-400' },
                    { icon: Instagram, color: 'hover:text-pink-400' },
                    { icon: Twitter, color: 'hover:text-sky-400' }
                  ].map((social, index) => (
                    <motion.button
                      key={index}
                      className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/15 hover:bg-white/10 hover:border-white/25 text-white/70 ${social.color} transition-all duration-300 flex items-center justify-center group`}
                      style={{ borderRadius: '12px' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </motion.button>
                  ))}
                </div>

                {/* Legal Links */}
                <div className="space-y-2">
                  {['Política de Privacidade', 'Termos de Uso'].map((link, index) => (
                    <motion.button
                      key={index}
                      className="text-white/50 hover:text-amber-300 transition-colors duration-300 text-xs block"
                      whileHover={{ x: 2 }}
                      onClick={() => scrollToSection('#')}
                    >
                      {link}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>

        {/* Editorial Bottom Bar */}
        <motion.footer 
          className="magazine-grid border-t border-white/10"
          style={{ paddingTop: 'var(--space-8)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12">
            <div className="flex flex-col lg:flex-row items-center justify-between" style={{ gap: 'var(--space-6)' }}>
              <div className="text-white/60 text-sm font-light">
                © {currentYear} ASX Group Rental Cars. Todos os direitos reservados.
              </div>
              
              <div className="flex items-center text-white/60 text-sm font-light" style={{ gap: 'var(--space-2)' }}>
                <span>Desenvolvido com</span>
                <Heart className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>pela</span>
                <span className="text-amber-400 font-semibold">Safira Digital</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </footer>
  );
}