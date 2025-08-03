import { format, differenceInDays } from 'date-fns';
import { LeadCapture, dailyPrices } from './supabase';

export const WHATSAPP_NUMBER = '5584999194580';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const formatWhatsAppMessage = (lead: LeadCapture) => {
  const dias = differenceInDays(lead.dataSaida, lead.dataChegada);
  const dailyPrice = dailyPrices[lead.categoriaVeiculo];
  const totalPrice = dailyPrice * dias;
  
  return `🚗 *NOVO LEAD ASX GROUP*

👤 *Nome:* ${lead.nome}
📧 *Email:* ${lead.email}
📱 *WhatsApp:* ${lead.telefone}

📅 *Chegada:* ${format(lead.dataChegada, 'dd/MM/yyyy')}
📅 *Saída:* ${format(lead.dataSaida, 'dd/MM/yyyy')}
⏰ *Período:* ${dias} dias

🚙 *Veículo:* ${lead.categoriaVeiculo}
👥 *Passageiros:* ${lead.numeroPassageiros}
💰 *Diária:* $${dailyPrice.toFixed(2)}
💳 *Total:* $${totalPrice.toFixed(2)}

📍 *Origem:* ${lead.origem}
${lead.observacoes ? `💬 *Obs:* ${lead.observacoes}` : ''}

---
⚡ Lead via Landing Page ASX`;
};

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_LINK}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

// Mensagens personalizadas para cada seção
export const createDiferenciaisMessage = (diferencial: string) => 
  `🔥 Olá! Vi na landing page sobre "${diferencial}" da ASX Rental.

Gostaria de saber mais detalhes sobre:
• Como funciona esse diferencial
• Preços e condições
• Disponibilidade para minhas datas

Podem me ajudar?`;

export const createCategoriasMessage = (categoria: string) => 
  `🚙 Olá! Tenho interesse na categoria "${categoria}" da ASX Rental.

Gostaria de informações sobre:
• Preços por dia
• Disponibilidade
• Quilometragem ilimitada
• Processo de reserva

Aguardo contato!`;

export const createCalculadoraMessage = (dias: number, categoria: string, passageiros: number) => 
  `💰 Olá! Fiz uma simulação na calculadora da ASX Rental:

📊 *Minha Simulação:*
• ${dias} dias de aluguel
• Categoria: ${categoria}
• ${passageiros} passageiros

Gostaria de:
• Confirmar esse preço
• Fazer a reserva
• Saber sobre o pagamento só após receber

Podem me ajudar?`;

export const whatsappMessages = {
  hero: `🚗 Olá! Vi a landing page da ASX Rental e gostaria de alugar um carro em Orlando.

Preciso de mais informações sobre:
• Pagamento só após receber as chaves
• Preços e disponibilidade
• Processo de reserva

Aguardo contato!`,

  testemunhos: `⭐ Olá! Vi os depoimentos incríveis na landing page da ASX Rental!

Gostaria de ter a mesma experiência premium:
• Pagamento só após receber
• Suporte em português 24/7
• Quilometragem ilimitada

Podem me enviar mais informações?`,

  vehiculos: `🚙 Olá! Vi as categorias de veículos na ASX Rental e preciso da ajuda de um especialista!

Gostaria de saber sobre:
• Qual veículo ideal para minha viagem
• Disponibilidade nas minhas datas
• Preços detalhados com taxa zerada
• Processo de reserva e pagamento

Nossos especialistas podem me ajudar a escolher o melhor carro para Orlando?`,

  footer: `📞 Olá! Acessei o site da ASX Rental e quero saber mais!

Preciso de informações sobre:
• Aluguel de carros em Orlando
• Preços e condições
• Como fazer a reserva

Aguardo o contato de vocês!`
};

// Funções helper para abrir WhatsApp com mensagens específicas
export const openWhatsAppDiferenciais = (diferencial: string) => {
  openWhatsApp(createDiferenciaisMessage(diferencial));
};

export const openWhatsAppCategorias = (categoria: string) => {
  openWhatsApp(createCategoriasMessage(categoria));
};

export const openWhatsAppCalculadora = (dias: number, categoria: string, passageiros: number) => {
  openWhatsApp(createCalculadoraMessage(dias, categoria, passageiros));
};

export const openWhatsAppMessage = (messageKey: keyof typeof whatsappMessages) => {
  openWhatsApp(whatsappMessages[messageKey]);
};