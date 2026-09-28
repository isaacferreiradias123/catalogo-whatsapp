import { defineConfig } from 'vite'
import { content } from './src/content.ts'
import { renderSite } from './src/site.ts'

export default defineConfig({
  base: './',
  plugins: [{
    name: 'catalogo-static-html',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        // O conteúdo e os metadados já fazem parte do HTML servido pelo Pages.
        return renderSite(content, {
          origin: 'https://isaacferreiradias123.github.io',
          path: '/catalogo-whatsapp/'
        }).replace('</body>', '<script type="module" src="/src/main.ts"></script>\n</body>')
      }
    }
  }],
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
  server: { host: '0.0.0.0', port: 3000, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true }
})
