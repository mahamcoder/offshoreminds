import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'vendor-ui': ['lucide-react', 'react-hot-toast', 'recharts'],
          'vendor-utils': ['axios', 'dompurify', 'html-react-parser']
        },
      },
    },
    // Warn if chunk size > 500kb, but don't fail
    chunkSizeWarningLimit: 1000,
  },
});
