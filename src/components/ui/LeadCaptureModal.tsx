'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User, Mail, Phone, ArrowRight, Shield, CheckCircle, Star } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    categoria?: string;
    dataChegada?: string;
    dataSaida?: string;
    passageiros?: number;
    origem?: string;
    precoDiaria?: number;
    precoTotal?: number;
    diasLocacao?: number;
  };
}

export default function LeadCaptureModal({ isOpen, onClose, initialData }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    observacoes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Criar mensagem para WhatsApp
    const message = `🌟 *NOVA SOLICITAÇÃO DE RESERVA* 🌟

👤 *DADOS PESSOAIS*
• Nome: ${formData.nome}
• Email: ${formData.email}
• WhatsApp: ${formData.telefone}

🚗 *DETALHES DA RESERVA*
• Categoria: ${initialData?.categoria || 'Não especificada'}
• Check-in: ${initialData?.dataChegada ? new Date(initialData.dataChegada).toLocaleDateString('pt-BR') : 'Não especificado'}
• Check-out: ${initialData?.dataSaida ? new Date(initialData.dataSaida).toLocaleDateString('pt-BR') : 'Não especificado'}
• Passageiros: ${initialData?.passageiros || 'Não especificado'} pessoas
${initialData?.diasLocacao ? `• Período: ${initialData.diasLocacao} ${initialData.diasLocacao === 1 ? 'dia' : 'dias'}` : ''}

💰 *VALOR DA RESERVA*
${initialData?.precoDiaria ? `• Diária: $${initialData.precoDiaria.toFixed(2)}` : ''}
${initialData?.precoTotal ? `• Total: $${initialData.precoTotal.toFixed(2)}` : ''}

${formData.observacoes ? `💬 *OBSERVAÇÕES*\n${formData.observacoes}\n\n` : ''}🔥 *Cliente interessado! Vamos finalizar essa reserva?*

Origem: ${initialData?.origem || 'calculadora'}`;

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/20 shadow-2xl overflow-hidden"
          style={{ borderRadius: '24px', maxHeight: '90vh' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25,
            duration: 0.5
          }}
        >
          {/* Animated Background Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: 'var(--space-8) var(--space-8)'
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-400/5" />

          {/* Header */}
          <div className="relative z-10 border-b border-white/10" style={{ padding: 'var(--space-8)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
                <motion.div 
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Star className="w-3 h-3 text-black fill-current" />
                  </motion.div>
                </motion.div>
                
                <div>
                  <motion.h2 
                    className="text-white font-black text-2xl tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Finalizar Reserva Premium
                  </motion.h2>
                  <motion.p 
                    className="text-green-400 text-base font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Atendimento VIP no WhatsApp • Resposta em 2 min
                  </motion.p>
                </div>
              </div>
              
              <motion.button
                className="w-12 h-12 bg-white/5 hover:bg-red-500/20 border border-white/20 hover:border-red-400/40 text-white/70 hover:text-red-400 transition-all duration-300 flex items-center justify-center group cursor-pointer"
                style={{ borderRadius: '16px' }}
                onClick={onClose}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 100px)' }}>
            {/* Form Section */}
            <div style={{ padding: 'var(--space-8)' }}>
              {/* Reservation Summary */}
              {initialData && (
                <motion.div 
                  className="bg-gradient-to-br from-white/10 via-white/5 to-white/8 backdrop-blur-sm border border-white/20"
                  style={{ padding: 'var(--space-6)', borderRadius: '20px', marginBottom: 'var(--space-2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-amber-400 font-bold text-lg tracking-wide" style={{ marginBottom: 'var(--space-2)' }}>
                    SUA RESERVA PREMIUM
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 p-3 border border-white/10" style={{ borderRadius: '12px' }}>
                      <div className="text-white/60 text-xs uppercase tracking-wide">Categoria Selecionada</div>
                      <div className="text-white font-bold text-base">{initialData.categoria}</div>
                    </div>
                    <div className="bg-white/5 p-3 border border-white/10" style={{ borderRadius: '12px' }}>
                      <div className="text-white/60 text-xs uppercase tracking-wide">Passageiros</div>
                      <div className="text-white font-bold text-base">{initialData.passageiros} pessoas</div>
                    </div>
                    <div className="bg-white/5 p-3 border border-white/10" style={{ borderRadius: '12px' }}>
                      <div className="text-white/60 text-xs uppercase tracking-wide">Check-in</div>
                      <div className="text-white font-bold text-base">{initialData.dataChegada ? new Date(initialData.dataChegada).toLocaleDateString('pt-BR') : 'A definir'}</div>
                    </div>
                    <div className="bg-white/5 p-3 border border-white/10" style={{ borderRadius: '12px' }}>
                      <div className="text-white/60 text-xs uppercase tracking-wide">Check-out</div>
                      <div className="text-white font-bold text-base">{initialData.dataSaida ? new Date(initialData.dataSaida).toLocaleDateString('pt-BR') : 'A definir'}</div>
                    </div>
                  </div>
                  
                  {initialData.precoTotal && (
                    <div className="border-t border-white/20" style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)' }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white/60 text-sm">Valor Total Estimado</div>
                          <div className="text-white/80 text-xs">{initialData.diasLocacao} {initialData.diasLocacao === 1 ? 'dia' : 'dias'} × ${initialData.precoDiaria?.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-300 font-black text-2xl">${initialData.precoTotal.toFixed(2)}</div>
                          <div className="text-white/50 text-xs">Pagamento após receber</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="editorial-stack" style={{ gap: 'var(--space-6)' }}>
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'nome', label: 'Nome Completo', icon: User, type: 'text', required: true, colSpan: 'md:col-span-2' },
                    { name: 'email', label: 'E-mail', icon: Mail, type: 'email', required: true },
                    { name: 'telefone', label: 'WhatsApp', icon: Phone, type: 'tel', required: true }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      className={field.colSpan}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
                    >
                      <label className="text-white font-semibold text-sm tracking-wide" style={{ marginBottom: 'var(--space-2)' }}>
                        {field.label}
                        {field.required && <span className="text-red-400 text-xs ml-1">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full bg-white/8 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:border-amber-400/50 focus:bg-white/12 transition-all duration-300"
                        style={{ 
                          padding: 'var(--space-4)', 
                          borderRadius: '16px',
                          fontSize: '16px'
                        }}
                        placeholder={`Digite seu ${field.label.toLowerCase()}`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Observações */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="text-white font-semibold text-sm tracking-wide" style={{ marginBottom: 'var(--space-2)' }}>
                    Observações Especiais (Opcional)
                  </label>
                  <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-white/8 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:border-blue-400/50 focus:bg-white/12 transition-all duration-300 resize-none"
                    style={{ 
                      padding: 'var(--space-4)', 
                      borderRadius: '16px',
                      fontSize: '16px'
                    }}
                    placeholder="Alguma preferência especial, acessórios extras ou dúvida?"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-black text-lg tracking-[0.05em] transition-all duration-500 cursor-pointer shadow-2xl shadow-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ 
                    padding: 'var(--space-5) var(--space-8)',
                    borderRadius: '20px',
                    border: '2px solid rgba(34, 197, 94, 0.3)'
                  }}
                  whileHover={{ 
                    scale: isSubmitting ? 1 : 1.02,
                    y: isSubmitting ? 0 : -3,
                    boxShadow: isSubmitting ? undefined : '0 25px 50px -12px rgba(34, 197, 94, 0.5)',
                    transition: { type: 'spring', stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center justify-center" style={{ gap: 'var(--space-4)' }}>
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>CONECTANDO COM ESPECIALISTA...</span>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <span>CONVERSAR NO WHATSAPP AGORA</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                  
                  {/* Animated shine effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  )}
                </motion.button>
              </form>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 border-t border-white/10" style={{ padding: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-white font-black text-xl tracking-tight" style={{ marginBottom: 'var(--space-2)' }}>
                  Vantagens Exclusivas ASX
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  {[
                    { icon: Shield, title: 'Pagamento Seguro', desc: 'Só pague após receber o veículo', color: 'emerald' },
                    { icon: CheckCircle, title: 'Zero Bloqueio', desc: 'Seu cartão permanece livre', color: 'blue' },
                    { icon: MessageCircle, title: 'Suporte 24/7', desc: 'Atendimento em português', color: 'amber' },
                    { icon: Star, title: 'Garantia Premium', desc: 'Satisfação 100% garantida', color: 'purple' }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                      style={{ padding: '1rem 1.25rem', borderRadius: '16px' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (index * 0.1) }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="text-white font-semibold text-sm" style={{ marginBottom: 'var(--space-1)' }}>{benefit.title}</div>
                      <div className="text-white/60 text-xs font-light leading-relaxed">{benefit.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Badge */}
                <motion.div 
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20"
                  style={{ marginTop: 'var(--space-4)', padding: '1rem 1.25rem', borderRadius: '16px' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="text-green-400 text-sm font-bold" style={{ marginBottom: 'var(--space-2)' }}>
                    DADOS 100% PROTEGIDOS
                  </div>
                  <div className="text-white/60 text-xs leading-relaxed">
                    Suas informações são criptografadas e jamais compartilhadas com terceiros.
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}