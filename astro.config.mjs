import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://djeisen642.github.io',
  base: '/aws-developer-associate-prep/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
