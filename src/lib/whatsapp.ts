import { format, differenceInDays } from 'date-fns';

// Tipos locais para WhatsApp (sem Supabase)
export interface LeadCapture {
  nome: string;
  email: string;
  telefone: string;
  dataChegada: Date;
  dataSaida: Date;
  categoriaVeiculo: 'Sedan' | 'Minivan Regular' | 'Minivan Luxo' | 'Esportivo' | 'SUV' | 'SUV Luxo';
  numeroPassageiros: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  observacoes?: string;
  origem: 'hero' | 'categoria' | 'calculadora' | 'turismo' | 'footer';
}

export const dailyPrices = {
  'Sedan': 44.99,
  'Minivan Regular': 54.99,
  'Minivan Luxo': 64.99,
  'Esportivo': 49.99,
  'SUV': 54.99,
  'SUV Luxo': 149.90
} as const;

export const WHATSAPP_NUMBER = '16893094332';
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
  `🚗 Olá! Gostaria de finalizar minha reserva pela ASX Rental:

📋 *Detalhes da Reserva:*
• ${dias} dias de locação
• Categoria: ${categoria}
• ${passageiros} ${passageiros === 1 ? 'pessoa' : 'pessoas'}

Preciso de:
• Confirmação da disponibilidade
• Detalhes do processo de reserva
• Informações sobre pagamento após receber

Aguardo o contato para finalizar! 🙌`;

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