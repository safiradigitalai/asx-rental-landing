'use client';

import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  Star,
  Shield,
  CreditCard,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicos: [
      { name: 'Aluguel de Carros', href: '#categorias' },
      { name: 'Calculadora de Preços', href: '#calculadora' },
      { name: 'Orlando Experience', href: '#orlando-experience' },
      { name: 'Depoimentos', href: '#depoimentos' }
    ],
    veiculos: [
      { name: 'Sedan Econômico', href: '#categorias' },
      { name: 'Minivan Familiar', href: '#categorias' },
      { name: 'SUV Conforto', href: '#categorias' },
      { name: 'Esportivos', href: '#categorias' }
    ],
    destinos: [
      { name: 'Disney World', href: '#orlando-experience' },
      { name: 'Universal Studios', href: '#orlando-experience' },
      { name: 'Premium Outlets', href: '#orlando-experience' },
      { name: 'Downtown Orlando', href: '#orlando-experience' }
    ],
    suporte: [
      { name: 'FAQ', href: '#' },
      { name: 'Contato', href: '#' },
      { name: 'Termos de Uso', href: '#' },
      { name: 'Política de Privacidade', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', name: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Twitter, href: '#', name: 'Twitter', color: 'hover:text-sky-400' }
  ];

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
        {/* Editorial Header */}
        <motion.header
          className="magazine-grid text-center"
          style={{ marginBottom: 'var(--space-16)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <motion.div 
              className="inline-flex items-center bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium tracking-[0.2em] uppercase"
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
              <span>Sua Experiência Premium Começa Aqui</span>
            </motion.div>
            
            <motion.h2 
              className="text-editorial-lg text-white tracking-tighter"
              style={{ marginBottom: 'var(--space-6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              PRONTO PARA{' '}
              <span className="text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text">
                ORLANDO?
              </span>
            </motion.h2>
            
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

        {/* Main Footer Content - Editorial Layout */}
        <div className="magazine-grid" style={{ marginBottom: 'var(--space-16)' }}>
          {/* Company Info - Editorial Featured Column */}
          <motion.article 
            className="col-span-12 lg:col-span-6 relative overflow-hidden group"
            style={{ borderRadius: '20px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/6 backdrop-blur-md border border-white/20" />
            
            <motion.div 
              className="absolute inset-0 opacity-[0.06]"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(212,165,116,0.4) 1px, transparent 0)',
                backgroundSize: 'var(--space-8) var(--space-8)'
              }}
            />
            
            <div className="relative z-10 text-white" style={{ padding: 'var(--space-10)' }}>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <Logo size="lg" variant="light" />
              </div>
              
              <div className="editorial-stack-lg" style={{ marginBottom: 'var(--space-8)' }}>
                <h3 className="text-title font-bold text-amber-400" style={{ marginBottom: 'var(--space-4)' }}>
                  A locadora de confiança dos brasileiros
                </h3>
                <p className="text-white/80 font-light leading-relaxed max-w-md">
                  Oferecemos veículos premium com atendimento diferenciado em português desde 2020. Mais de 10.000 clientes satisfeitos.
                </p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
                {[
                  { icon: Phone, text: '+1 (407) 123-4567', label: 'Telefone' },
                  { icon: Mail, text: 'contato@asxgroup.com', label: 'Email' },
                  { icon: MapPin, text: 'Orlando Airport, FL', label: 'Localização' },
                  { icon: Clock, text: '24/7 Português', label: 'Atendimento' }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                    style={{ 
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      borderRadius: '12px'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-400/30">
                      <contact.icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs font-medium tracking-wide uppercase">{contact.label}</div>
                      <div className="text-white/90 text-sm font-medium">{contact.text}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase" style={{ marginBottom: 'var(--space-4)' }}>
                  Nos acompanhe
                </h4>
                <div className="flex items-center" style={{ gap: 'var(--space-3)' }}>
                  {socialLinks.map((social, index) => (
                    <motion.button
                      key={index}
                      className={`w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/15 hover:bg-white/10 hover:border-white/25 text-white/70 ${social.color} transition-all duration-300 flex items-center justify-center group`}
                      style={{ borderRadius: '16px' }}
                      onClick={() => scrollToSection(social.href)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Navigation Links - Editorial Grid */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--space-6)' }}>
            {[
              { title: 'Nossos Serviços', links: footerLinks.servicos, icon: Star },
              { title: 'Nossos Veículos', links: footerLinks.veiculos, icon: CreditCard },
              { title: 'Destinos Orlando', links: footerLinks.destinos, icon: MapPin },
              { title: 'Suporte', links: footerLinks.suporte, icon: Shield }
            ].map((section, sectionIndex) => (
              <motion.nav
                key={sectionIndex}
                className="relative overflow-hidden group"
                style={{ borderRadius: '16px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (sectionIndex * 0.1),
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-white/1 to-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300" />
                
                <div className="relative z-10 text-white" style={{ padding: 'var(--space-6)' }}>
                  <div className="flex items-center text-amber-400 font-bold text-base tracking-wide" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-400/30">
                      <section.icon className="w-4 h-4" />
                    </div>
                    <span>{section.title}</span>
                  </div>
                  
                  <ul style={{ gap: 'var(--space-3)' }}>
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={linkIndex}
                        style={{ marginBottom: 'var(--space-3)' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                      >
                        <motion.button
                          onClick={() => scrollToSection(link.href)}
                          className="group/link flex items-center text-white/70 hover:text-amber-300 transition-all duration-300 text-sm w-full text-left"
                          style={{ gap: 'var(--space-2)' }}
                          whileHover={{ x: 4 }}
                        >
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                          <span>{link.name}</span>
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.nav>
            ))}
          </div>
        </div>

        {/* Trust Badges - Editorial Premium */}
        <motion.section
          className="magazine-grid"
          style={{ marginBottom: 'var(--space-16)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {[
            { icon: Shield, title: 'Segurança Garantida', desc: 'Todos os veículos com seguro completo', color: 'green' },
            { icon: CreditCard, title: 'Pagamento Seguro', desc: 'Só pague após receber o veículo', color: 'blue' },
            { icon: Star, title: '10.000+ Clientes', desc: 'Avaliação média de 4.9 estrelas', color: 'amber' }
          ].map((badge, index) => (
            <motion.article
              key={index}
              className="col-span-12 lg:col-span-4 relative overflow-hidden group cursor-pointer text-center"
              style={{ 
                borderRadius: '16px',
                minHeight: '220px'
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
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/6 backdrop-blur-sm border border-white/15 group-hover:bg-white/12 group-hover:border-white/25 transition-all duration-300" />
              
              <div 
                className="relative z-10 h-full flex flex-col justify-center items-center text-white"
                style={{ padding: 'var(--space-8)' }}
              >
                <div 
                  className={`flex items-center justify-center bg-${badge.color}-500/10 text-${badge.color}-400 border border-${badge.color}-400/30 group-hover:bg-${badge.color}-500/20 transition-colors duration-300 mx-auto`}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '16px',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  <badge.icon className="w-8 h-8" />
                </div>
                <h4 className="text-white font-bold text-xl" style={{ marginBottom: 'var(--space-3)' }}>{badge.title}</h4>
                <p className="text-white/60 text-base font-light leading-relaxed max-w-xs">{badge.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.section>

        {/* Bottom Bar - Editorial Clean */}
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
              
              <nav className="flex items-center text-sm" style={{ gap: 'var(--space-6)' }}>
                {['Política de Privacidade', 'Termos de Uso', 'Cookies'].map((link, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection('#')}
                    className="text-white/50 hover:text-amber-300 transition-colors duration-300 font-medium"
                    whileHover={{ y: -1 }}
                  >
                    {link}
                  </motion.button>
                ))}
              </nav>
              
              <div className="text-white/60 text-sm font-light">
                Desenvolvido com 💙 pela{' '}
                <span className="text-amber-400 font-semibold">Safira Digital</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </footer>
  );
}