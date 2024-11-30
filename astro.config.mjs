import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from "astro-icon";
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
import partytown from "@astrojs/partytown";

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    partytown(),
    icon({
      include: {
        mdi: ["*"],
      },
    })
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920],
      domains: [],
      minimumCacheTTL: 60,
    },
  }),
  vite: {
    build: {
      minify: false, // Changed from terser to false temporarily
    },
    optimizeDeps: {
      exclude: ['@astrojs/vercel', '@vercel/node']
    },
    ssr: {
      noExternal: ['react-icons', '@astrojs/*']
    }
  }
});