import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseKey);

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

export interface LeadRecord {
  id?: string;
  created_at?: string;
  nome: string;
  email: string;
  telefone: string;
  data_chegada: string;
  data_saida: string;
  categoria_veiculo: string;
  numero_passageiros: number;
  observacoes: string | null;
  origem: string;
  preco_diaria: number;
  preco_total: number;
  dias_locacao: number;
  status?: string;
}

export const dailyPrices = {
  'Sedan': 44.99,
  'Minivan Regular': 54.99,
  'Minivan Luxo': 64.99,
  'Esportivo': 49.99,
  'SUV': 54.99,
  'SUV Luxo': 149.90
} as const;

export const calculateTotal = (category: keyof typeof dailyPrices, days: number) => {
  return dailyPrices[category] * days;
};