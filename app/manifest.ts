import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Spazio Color y Estilo",
        short_name: "Spazio",
        description: "Salón de belleza y barbería: colorimetría, balayage y cortes.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0F766E",
        icons: [
            {
                src: "/icon.png",
                sizes: "any",
                type: "image/png",
            },
            {
                src: "/icons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
