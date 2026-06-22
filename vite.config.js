import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page app: every route is a real folder with its own index.html,
// so the routes match the required navigation paths exactly
// (/diensten, /projecten, /over-tekenbureau-winter, /pakketen, /contact).
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        diensten: resolve(__dirname, 'diensten/index.html'),
        projecten: resolve(__dirname, 'projecten/index.html'),
        over: resolve(__dirname, 'over-tekenbureau-winter/index.html'),
        pakketen: resolve(__dirname, 'pakketen/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
});
