# 🚗 ASX Group Rental Car - Landing Page Premium

Landing page premium para locadora de carros ASX Group em Orlando, desenvolvida seguindo a **Metodologia Safira Digital**.

## ✨ Características

### 🎨 Design System
- **Glassmorphism 2025**: Efeitos de vidro modernos com blur e transparência
- **Bento Grid Layout**: Layout organizacional inspirado em bento boxes japonesas
- **Paleta ASX**: Cores corporativas azul (#0066CC), dourado (#FFD700) e vermelho (#FF4444)
- **Mobile-First**: Design responsivo nativo, não adaptação

### 🚀 Tecnologias
- **Next.js 15+** (App Router)
- **React 18+** (Server Components)
- **TypeScript 5.3+** (Strict mode)
- **Tailwind CSS 3.4+**
- **Framer Motion 11+** (Animações 60fps)
- **Lucide React** (Ícones)
- **WhatsApp Integration** (Direct messaging)
- **React Hook Form + Zod** (Validação)

### 📱 Seções Implementadas
1. **Hero Section Premium** - Com imagem Orlando e CTAs principais
2. **Diferenciais ASX** - Bento Grid glassmorphism destacando vantagens
3. **Categorias Veículos** - Galeria com 6 categorias e preços
4. **Calculadora Preços** - Cálculo automático com datas e categoria

### 🎯 Funcionalidades
- ✅ Cálculo automático de preços por diária
- ✅ Integração WhatsApp direta para leads
- ✅ Animações suaves 60fps
- ✅ Design glassmorphism premium
- ✅ Mensagens personalizadas por seção
- ✅ Sistema de reserva via WhatsApp

## 🛠️ Configuração

### 1. Instalação
```bash
npm install
```

### 2. Desenvolvimento
```bash
npm run dev
```

### 3. Build
```bash
npm run build
npm start
```

## 🎨 Design Tokens

### Cores ASX
```css
--azul-corporate: #0066CC;
--azul-accent: #1E90FF;
--amarelo-gold: #FFD700;
--vermelho-cta: #FF4444;
--branco-pure: #FFFFFF;
--preto-text: #1A202C;
```

### Classes Glassmorphism
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## 💰 Preços das Categorias
```typescript
const dailyPrices = {
  'Sedan': 44.99,
  'Minivan Regular': 54.99,
  'Minivan Luxo': 64.99,
  'Esportivo': 49.99,
  'SUV': 54.99,
  'SUV Luxo': 149.90
};
```

## 🚀 Performance Targets
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle Size**: < 100KB inicial
- **Lighthouse Score**: > 90 todas métricas

## 📱 Próximas Implementações
- [ ] Seção Orlando Experience
- [ ] Carousel de Depoimentos
- [ ] Footer Premium
- [ ] Otimizações de Performance
- [ ] Testes Responsivos

## 💎 Metodologia Safira Digital
Este projeto segue rigorosamente a **Metodologia Safira Digital**:
1. **PESQUISE**: Referências atuais implementadas
2. **PLANEJE**: Estrutura técnica definida
3. **IMPLEMENTE**: Código limpo e otimizado
4. **TESTE**: Build e funcionalidades verificadas
5. **ITERE**: Baseado em best practices 2025

---

**🏆 Padrão de Qualidade Premium - Cada pixel tem propósito, cada animação encanta.**
