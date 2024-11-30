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
      }
    })
  ],
  output: "server",
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['lucide-react', '@astrojs/*', 'react-icons', '@crossmint/*']
    },
    build: {
      rollupOptions: {
        external: ['@astrojs/tailwind/client.js']
      }
    },
    optimizeDeps: {
      include: ['lucide-react']
    }
  }
});