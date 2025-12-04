import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Montserrat, Bodoni_Moda } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  adjustFontFallback: false,
});

const mont = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
  adjustFontFallback: false,
});

const bodoni = Bodoni_Moda({
  // Usa pesos fijos; evita variable axis para que next/font no intente overrides raros
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coloryestilo.pro"),
  applicationName: "Spazio Color y Estilo",
  title: "Spazio Color y Estilo — Color de autor y cortes precisos",
  description:
    "Salón y barbería: colorimetría avanzada, balayage, highlights y cortes de precisión. Reserva online.",
  keywords: [
    "peluquería",
    "salón de belleza",
    "barbería",
    "balayage",
    "colorimetría",
    "corte de pelo",
    "Santiago",
  ],
  authors: [
    { name: "Sambalab", url: "https://sambalab.pro" },
    { name: "dgrcodex (Daniel Garcia Rojas)", url: "https://dgrcodex.sambalab.pro" },
  ],
  creator: "dgrcodex",
  publisher: "Sambalab",
  other: {
    "Programado y diseñado por": "dgrcodex (Daniel Garcia Rojas)",
    "GitHub autor": "https://github.com/dgrcodex",
  },
  alternates: { canonical: "https://www.coloryestilo.pro" },
  openGraph: {
    type: "website",
    url: "https://www.coloryestilo.pro",
    title: "Spazio Color y Estilo — Color de autor y cortes precisos",
    description:
      "Reserva tu hora. Color saludable, cortes con carácter, atención para señoras, jóvenes y caballeros.",
    siteName: "Spazio Color y Estilo",
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Spazio Color y Estilo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Spazio Color y Estilo",
    description: "Color de autor y cortes precisos — reserva online.",
    // images: ["/og.jpg"]
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Spazio Color y Estilo",
    url: "https://www.coloryestilo.pro",
    image: "https://www.coloryestilo.pro/og.jpg",
    sameAs: ["https://sambalab.pro", "https://dgrcodex.me", "https://github.com/dgrcodex"],
    creator: { "@type": "Organization", name: "Sambalab", url: "https://sambalab.pro" },
    author: { "@type": "Person", name: "Daniel Garcia Rojas", url: "https://dgrcodex.me", sameAs: ["https://github.com/dgrcodex"] },
  };

  return (
    <html
      lang="es"
      className={`${bebas.variable} ${mont.variable} ${bodoni.variable}`}
    >
      <head>
        <link rel="author" href="https://dgrcodex.me" />
        <link rel="me" href="https://github.com/dgrcodex" />
        <link rel="publisher" href="https://sambalab.pro" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-mont bg-brand-bg text-brand-fg antialiased">
        <Navbar />
        <div className="container-p">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
