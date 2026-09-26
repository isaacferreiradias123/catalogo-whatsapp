import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    sourcemap: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  server: { host: '0.0.0.0', port: 3000 },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true }
})
