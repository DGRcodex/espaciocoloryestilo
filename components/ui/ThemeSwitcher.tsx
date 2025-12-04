"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

const palettes = [
    {
        name: "Original",
        colors: {
            primary: "15 118 110", // #0F766E
            secondary: "197 160 40", // #C5A028
            bg: "255 255 255",
            ink: "11 15 25",
            surface: "247 247 247",
        },
    },
    {
        name: "Elegant Dark",
        colors: {
            primary: "212 175 55", // Gold
            secondary: "255 255 255", // White
            bg: "20 20 20", // Dark Gray
            ink: "240 240 240", // Light Gray
            surface: "30 30 30", // Slightly lighter gray
        },
    },
    {
        name: "Soft Rose",
        colors: {
            primary: "190 24 93", // Pink 700
            secondary: "219 39 119", // Pink 600
            bg: "255 241 242", // Rose 50
            ink: "136 19 55", // Rose 900
            surface: "255 228 230", // Rose 100
        },
    },
    {
        name: "Minimalist",
        colors: {
            primary: "0 0 0", // Black
            secondary: "100 100 100", // Gray
            bg: "255 255 255",
            ink: "0 0 0",
            surface: "245 245 245",
        },
    },
    {
        name: "Vibrant",
        colors: {
            primary: "124 58 237", // Violet 600
            secondary: "236 72 153", // Pink 500
            bg: "255 255 255",
            ink: "17 24 39", // Gray 900
            surface: "243 244 246", // Gray 100
        },
    },
];

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePalette, setActivePalette] = useState("Original");

    const applyPalette = (palette: typeof palettes[0]) => {
        const root = document.documentElement;
        Object.entries(palette.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        setActivePalette(palette.name);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl p-4 border border-black/10 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
                    <h3 className="font-bebas text-lg text-brand-ink mb-3">Elige un estilo</h3>
                    <div className="flex flex-col gap-2">
                        {palettes.map((palette) => (
                            <button
                                key={palette.name}
                                onClick={() => applyPalette(palette)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-mont ${activePalette === palette.name
                                        ? "bg-black/5 text-brand-ink font-semibold"
                                        : "hover:bg-black/5 text-brand-ink/70"
                                    }`}
                            >
                                <div className="flex gap-1">
                                    <div
                                        className="w-4 h-4 rounded-full border border-black/10"
                                        style={{ backgroundColor: `rgb(${palette.colors.primary})` }}
                                    />
                                    <div
                                        className="w-4 h-4 rounded-full border border-black/10"
                                        style={{ backgroundColor: `rgb(${palette.colors.bg})` }}
                                    />
                                </div>
                                {palette.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 rounded-full bg-brand-ink text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                aria-label="Cambiar tema"
            >
                <Palette className="h-6 w-6" />
            </button>
        </div>
    );
}
