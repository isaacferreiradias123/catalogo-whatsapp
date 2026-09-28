# CatáloGO — WhatsApp Vendas Express

Landing page estática do projeto CatáloGO, publicada no GitHub Pages. O site é gerado com Vite e TypeScript, sem banco de dados, servidor de aplicação ou credenciais no navegador.

## Desenvolvimento

- `npm install`: instala as dependências.
- `npm run dev`: inicia o ambiente local.
- `npm run typecheck`: valida os tipos TypeScript.
- `npm run build`: gera a pasta `dist/`.
- `npm test`: executa toda a suíte de testes.
- `npm run test:unit`: executa testes de lógica, segurança e cenários de borda.
- `npm run test:integration`: gera o build e valida o HTML final, acessibilidade e recursos estáticos.
- `npm run check`: executa typecheck, build e todos os testes; é o comando usado pelo CI.

## Qualidade e estabilidade

O renderizador aplica escape de conteúdo textual, valida URLs antes de inseri-las no HTML, protege o JSON-LD contra encerramento malicioso de tags `script` e só injeta identificadores de analytics com formato permitido. Links internos são filtrados quando a seção correspondente não existe, evitando navegação quebrada.

O site usa aprimoramento progressivo: o conteúdo principal, as respostas do FAQ e a navegação móvel continuam acessíveis quando JavaScript falha ou está desativado. Com JavaScript disponível, entram em ação animações, acordeão, menu móvel, tema e destaque de navegação.

## Acessibilidade e UX

A página possui link de salto para o conteúdo, landmarks semânticos, foco visível, suporte a `prefers-reduced-motion`, alvos de toque adequados, tema claro/escuro e testes automatizados para IDs duplicados, links internos quebrados, textos alternativos e segurança de links externos.

## Implantação

O workflow `.github/workflows/pages.yml` executa `npm run check` antes de publicar `dist/` no GitHub Pages. Se qualquer validação falhar, o deploy não é executado.

Observação: o repositório ainda não possui `package-lock.json`; por isso o CI usa `npm install`. Quando um lockfile passar a ser versionado, é recomendável trocar para `npm ci` e reativar o cache de npm.
