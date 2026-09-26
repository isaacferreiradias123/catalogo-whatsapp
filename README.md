# CatáloGO — WhatsApp Vendas Express

Load page estática, responsiva e plug and play para o serviço **WhatsApp Vendas Express**, da CatáloGO.

## O que foi alterado

- Removida a dependência de banco de dados, Hono, Cloudflare D1, APIs e painel administrativo.
- Conteúdo atualizado com base no arquivo **CataloGO_Plano_de_Negocio_WhatsApp_Vendas_Express.pdf**.
- Mantidos o design original, a navegação por âncoras, o menu mobile, tema claro/escuro, FAQ, animações, acessibilidade e botão flutuante.
- O contato agora abre diretamente uma conversa no WhatsApp, sem enviar dados para servidor.
- Código separado em conteúdo (`src/content.ts`), renderização (`src/site.ts`), estilos (`src/styles/app.css`) e entrada (`src/main.ts`).
- Assets locais preservados em `public/static/`, sem dependências de URLs de mídia do banco.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço indicado pelo Vite, normalmente `http://localhost:5173`.

## Validar e gerar produção

```bash
npm run typecheck
npm run build
npm run preview
```

A pasta `dist/` é a versão pronta para publicação.

## Publicar no GitHub Pages

1. Envie o conteúdo deste diretório para um repositório GitHub.
2. Em **Settings → Pages**, escolha **GitHub Actions** ou publique a pasta `dist/` pelo fluxo de sua preferência.
3. Se usar GitHub Actions, configure o workflow para executar `npm ci`, `npm run build` e publicar `dist/`.

O Vite usa `base: './'` e os assets são relativos, então a página funciona na raiz ou em uma subpasta do GitHub Pages.

## Conteúdo e WhatsApp

- Para atualizar textos, preços, benefícios, perguntas ou etapas, edite `src/content.ts`.
- Para alterar o número ou a mensagem padrão, edite `settings.whatsapp`, `settings.whatsappDisplay` e `settings.whatsappDefaultMessage`.
- O número atualmente configurado é o que constava no projeto original: `(99) 98168-7603`.

## Estrutura

```text
index.html              Entrada HTML
src/main.ts             Montagem da página no navegador
src/content.ts          Conteúdo estático atualizado
src/site.ts             Renderizador e interações
src/styles/app.css      CSS compilado
public/static/          Logos, favicon e assets locais
vite.config.ts          Build Vite estático
```
