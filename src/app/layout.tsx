import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASX Group - Aluguel de Carros Premium em Orlando",
  description: "A melhor experiência de locação de veículos em Orlando. Pagamento só após receber, zero bloqueio no cartão e atendimento especializado em português 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
