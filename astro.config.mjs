import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://blog.derepenteautista.com.br',
  output: 'static',
  integrations: [tailwind(), mdx()],
});
