# Deploy estático

Este projeto não usa banco de dados, API, servidor, Cloudflare Workers ou painel administrativo. A saída é uma load page estática compatível com GitHub Pages, Netlify, Vercel e hospedagem comum.

## Build

```bash
npm ci
npm run typecheck
npm run build
```

Publique o conteúdo da pasta `dist/`.

## GitHub Pages com Actions

Crie `.github/workflows/deploy.yml` com um workflow que:

1. faça checkout do repositório;
2. instale Node.js;
3. execute `npm ci`;
4. execute `npm run build`;
5. publique `dist/` usando as Actions oficiais do GitHub Pages.

Também é possível publicar manualmente a pasta `dist/` em **Settings → Pages**.

## Teste local

```bash
npm run dev
# ou
npm run preview
```

## Observações

- O Vite usa `base: './'`, portanto os assets funcionam em domínio raiz e em subpasta.
- O contato é feito exclusivamente por link `https://wa.me/`, sem armazenamento de leads.
- Não existem credenciais, chaves de API, cookies de sessão ou dados de clientes no projeto.
- Para trocar os dados da oferta, edite `src/content.ts` e gere um novo build.
