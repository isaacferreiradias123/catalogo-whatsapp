# Relatório de melhorias — CatáloGO

## Versão entregue

**3.0.0 — load page estática plug and play**

A página foi migrada de um site SSR com Hono e Cloudflare D1 para uma aplicação estática compilada com Vite. O design original foi preservado, enquanto a dependência de banco, API, autenticação, painel administrativo e armazenamento de leads foi removida.

## Atualizações de conteúdo

O conteúdo foi substituído com base no PDF **CatáloGO — WhatsApp Vendas Express**. A oferta agora apresenta preço único de **R$ 49,99**, operação 100% remota, até 10 produtos ou serviços, até 6 respostas rápidas, uma rodada de correção, orientação de até 15 minutos e entrega em até 48 horas após o envio completo das informações. Também foram incorporados os limites do escopo: sem senha, PIN, acesso a conversas, migração de conta, gestão mensal, fotografia presencial ou atualização contínua de estoque.

## Melhorias técnicas

O projeto agora usa `index.html`, `src/main.ts`, `src/content.ts`, `src/site.ts` e os assets locais em `public/static/`. O contato é feito exclusivamente por link `https://wa.me/`, sem cadastro ou envio de dados para servidor. Os caminhos dos assets são relativos para funcionar tanto em domínio raiz quanto em subpasta do GitHub Pages. O CSS é compilado e o build final não depende de CDN do Tailwind.

## Validação executada

`npm run typecheck` passou sem erros. `npm run build` concluiu com sucesso e gerou `dist/` com HTML, CSS, JavaScript, favicon e imagens locais. O código legado de banco, painel e APIs foi removido do projeto publicado. O conteúdo final foi revisado contra o PDF recebido para evitar promessas ou informações não suportadas.
