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
      noExternal: [
        'lucide-react',
        '@astrojs/*',
        'react-icons',
        '@crossmint/*',
        'firebase',
        'firebase/auth',
        'firebase/firestore',
        'firebase/app'
      ]
    },
    resolve: {
      alias: {
        '@firebase/auth': '@firebase/auth/dist/esm2017/index.js',
        '@firebase/app': '@firebase/app/dist/esm2017/index.js',
        'firebase/auth': 'firebase/auth/dist/esm2017/index.js',
        'firebase/app': 'firebase/app/dist/esm2017/index.js'
      }
    },
    build: {
      rollupOptions: {
        external: ['@astrojs/tailwind/client.js'],
      }
    },
    optimizeDeps: {
      include: ['lucide-react', 'firebase/auth', 'firebase/app']
    }
  }
});