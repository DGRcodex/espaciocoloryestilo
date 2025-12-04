import type { Metadata, Viewport } from "next";
import "./globals.css";
// IMPORTANTE: El nombre correcto es Bebas_Neue (con 'e' al final)
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
  // Se suele usar una selección de pesos para evitar cargar demasiados si no es necesario,
  // pero tu selección está bien si usas todos esos pesos en el diseño.
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
  adjustFontFallback: false,
});

const bodoni = Bodoni_Moda({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: false,
});

// En Next.js 14+, el themeColor y configuraciones de escala van en "viewport"
export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
    {
      name: "dgrcodex (Daniel Garcia Rojas)",
      url: "https://dgrcodex.sambalab.pro",
    },
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
    images: [
      {
        url: "https://www.coloryestilo.pro/og.jpg",
        width: 1200,
        height: 630,
        alt: "Spazio Color y Estilo Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spazio Color y Estilo",
    description: "Color de autor y cortes precisos — reserva online.",
    images: ["https://www.coloryestilo.pro/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/android-chrome-192x192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Spazio Color y Estilo",
    url: "https://www.coloryestilo.pro",
    image: "https://www.coloryestilo.pro/og.jpg",
    sameAs: [
      "https://sambalab.pro",
      "https://dgrcodex.me",
      "https://github.com/dgrcodex",
    ],
    creator: {
      "@type": "Organization",
      name: "Sambalab",
      url: "https://sambalab.pro",
    },
    author: {
      "@type": "Person",
      name: "Daniel Garcia Rojas",
      url: "https://dgrcodex.me",
      sameAs: ["https://github.com/dgrcodex"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
  };

  return (
    <html
      lang="es"
      // Aquí se inyectan las variables CSS de las fuentes
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
        <main className="container-p">{children}</main>
        <Footer />
      </body>
    </html>
  );
}