import { format, differenceInDays } from 'date-fns';
import { LeadCapture, dailyPrices } from './supabase';

export const WHATSAPP_LINK = 'https://wa.me/message/2Z77HXH2TB3DO1';

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
  const whatsappUrl = `${WHATSAPP_LINK}&text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};