import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Split chunks so browser can cache vendor libs separately
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy UI libraries in their own chunk
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-motion': ['framer-motion'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-router': ['react-router-dom'],
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
    // Warn if any chunk exceeds 600kb
    chunkSizeWarningLimit: 600,
    // Minify CSS
    cssMinify: true,
    // Source maps off in production (smaller build)
    sourcemap: false,
  },
})
