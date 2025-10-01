// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // Usa "class" si quieres poder forzar dark con .dark en <html>
  darkMode: "class",
  theme: {
    // Breakpoints afinados para Samsung, tablets y Mac 13/14/15/16
    screens: {
      xs: "360px",     // Samsung S (med)
      sm: "390px",     // Samsung S (large) / teléfonos comunes
      md: "768px",     // tablet portrait
      lg: "1024px",    // tablet landscape / Mac 13"
      xl: "1280px",    // Mac 14"
      "2xl": "1440px", // Mac 15"
      "3xl": "1680px"  // Mac 16"+ / desktop wide
    },
    extend: {
      // Mapea las variables de next/font que definimos en layout.tsx
      fontFamily: {
        bebas: "var(--font-bebas)",   // Titulares (Bebas Neue)
        bodoni: "var(--font-bodoni)", // Subtítulos/acento (Bodoni Moda)
        mont: "var(--font-mont)"      // UI / textos (Montserrat)
      },

      // Escala tipográfica responsiva (usa md: para subir un nivel)
      fontSize: {
        h1:  ["2.25rem", { lineHeight: "1.1", letterSpacing: "0.02em" }], // 36px
        h2:  ["1.75rem", { lineHeight: "1.15" }], // 28px
        h3:  ["1.5rem",  { lineHeight: "1.2" }],  // 24px
        lgp: ["1.125rem",{ lineHeight: "1.7" }],  // 18px
        base:["1rem",    { lineHeight: "1.7" }],  // 16px
        sm:  ["0.875rem",{ lineHeight: "1.6" }],  // 14px
      },

      // ===============================
      // 🎯 COLORES CLAVE DEL CLIENTE
      // ===============================
      colors: {
        // Base de marca y superficies
        brand: { ink: "#0B0F19", fg: "#101010", bg: "#FFFFFF" },

        // ⚑ ¡USAR ESTOS PARA EL LOOK & FEEL!
        betaturquesa: {
          DEFAULT: "#14B8A6", // turquesa principal
          600: "#0D9488",
          700: "#0F766E"
        },
        betadorado: {
          DEFAULT: "#D4AF37", // dorado clásico
          600: "#B8961F",
          700: "#967C12"
        },

        // Paleta extendida (NY + estados) — la mantenemos por si la necesitas
        tertiary: {
          50:"#FFF0FA",100:"#FCE7F3",200:"#FBCFE8",300:"#F9A8D4",
          400:"#F472B6",500:"#EC4899",600:"#DB2777",700:"#BE185D",800:"#9D174D",900:"#831843",
          DEFAULT:"#EC4899"
        },
        accent: {
          blue:"#1C7DD6", cyan:"#2CB0E0", green:"#58C66B",
          yellow:"#F8E16C", orange:"#E99C42", red:"#D84537"
        },
        success:{50:"#ECFDF5",100:"#D1FAE5",200:"#A7F3D0",400:"#34D399",500:"#10B981",600:"#059669"},
        warning:{50:"#FFFBEB",100:"#FEF3C7",200:"#FDE68A",400:"#F59E0B",500:"#D97706",600:"#B45309"},
        danger:{50:"#FEF2F2",100:"#FEE2E2",200:"#FECACA",400:"#F87171",500:"#EF4444",600:"#DC2626"},

        surface: {
          base:"#FFFFFF",     // tarjetas
          muted:"#F7F7F7",    // secciones suaves
          elevated:"#FFFFFF", // con sombra
          invert:"#0B0F19"    // hero oscuro
        }
      },

      boxShadow: {
        card: "0 10px 30px rgba(2,6,23,.12)",
        soft: "0 6px 18px rgba(0,0,0,.08)",
        hover: "0 12px 36px rgba(2,6,23,.16)"
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" }
    }
  },
  plugins: []
} satisfies Config;
