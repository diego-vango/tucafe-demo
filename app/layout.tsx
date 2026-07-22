import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tu Café en La Serena | Tostaduría de Café de Especialidad',
  description: 'Tostaduría de café de especialidad local en La Serena y Coquimbo. Granos 100% Arábica seleccionados. Reparto gratis por compras sobre $20.000.',
  keywords: 'café de especialidad, la serena, coquimbo, tostaduría de café, café en grano, molienda, café colombia, café brasil, despacho gratis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#2C1A1D] antialiased selection:bg-[#D4A373]/30 font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
