import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        resolve(__dirname, 'index.html'),
        resolve(__dirname, 'meal.html'),
        resolve(__dirname, 'recipe.html'),
        resolve(__dirname, 'trening.html'),
      ],
    },
  },
});
