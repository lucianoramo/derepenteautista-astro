import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://derepenteautista.com.br',
  output: 'static',
  // Sem sessões (evita criar KV) e sem Cloudflare Images (o site não usa astro:assets).
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  integrations: [mdx(), react(), markdoc(), keystatic()],
  vite: {
    build: {
      // Mantém media queries no formato `min-width` (o Vite novo gera `width>=`, que iOS < 16.4 não entende).
      cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    },
  },
});
