# CatáloGO — WhatsApp Vendas Express

Página pública estática do serviço CatáloGO. Textos, preço e links de contato ficam em `src/content.ts`.

## Executar e conferir

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm test
```

`npm test` verifica o HTML gerado em `dist/`, então rode `npm run build` antes. O fluxo em `.github/workflows/pages.yml` executa essas verificações antes de publicar no GitHub Pages.

O HTML completo é gerado por `src/site.ts` durante o build, por meio do plugin em `vite.config.ts`. Isso mantém conteúdo e metadados disponíveis mesmo antes da execução de JavaScript no navegador.
