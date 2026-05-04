import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "CAP'AUTO — Conseiller Automobile Privilégié",
  description: "Vente de véhicules d'occasion soigneusement sélectionnés. Achat cash, livraison à domicile, garantie incluse. Votre conseiller automobile de confiance.",
  keywords: 'voiture occasion, achat cash, véhicule garanti, livraison domicile, CAP AUTO',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
