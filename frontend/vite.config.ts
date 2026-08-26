import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './', // ou remova a propriedade base para usar a raiz padrão '/'
  plugins: [react(), tailwindcss()],
});