import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import icon from "astro-icon";
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
import partytown from "@astrojs/partytown";

const env = loadEnv('production', process.cwd(), '');

export default defineConfig({
  integrations: [
    react({
      // Optimizando React para producción
      include: ['**/*.tsx', '**/*.jsx'],
    }),
    tailwind({
      // Asegurando que Tailwind se aplique correctamente
      config: { path: './tailwind.config.mjs' }
    }),
    partytown({
      // Configuración para scripts de terceros
      config: {
        forward: ["dataLayer.push"],
      }
    }),
    icon({
      include: {
        mdi: ["*"], // Manteniendo tu configuración de MDI icons
      },
    })
  ],
  output: "server",
  adapter: vercel({
    analytics: true,
    webAnalytics: true, // Habilitando Web Analytics de Vercel
    speedInsights: true, // Habilitando Speed Insights
    imageService: true, // Optimización de imágenes con Vercel
  }),
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // Optimizaciones adicionales de Vite
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      sourcemap: false,
    },
    // Mejorando el manejo de variables de entorno
    define: {
      'process.env': env
    },
  },
});