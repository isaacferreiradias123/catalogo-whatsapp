# Checklist da load page

## Conteúdo

- [ ] Textos, preço de R$ 49,99, limite de 10 itens, até 6 respostas e prazo de 48 horas conferem com o PDF CataloGO.
- [ ] Não há promessas de aumento de vendas nem informações inventadas.
- [ ] O escopo e o que não está incluído estão claros.

## Funcionalidade

- [ ] `npm run typecheck` conclui sem erros.
- [ ] `npm run build` conclui sem erros.
- [ ] Menu desktop navega para as âncoras corretas.
- [ ] Menu mobile abre, fecha pelo botão, por um link e pela tecla Esc.
- [ ] FAQ abre e fecha com teclado e toque.
- [ ] Tema claro/escuro é lembrado no navegador.
- [ ] Todos os CTAs e o botão flutuante abrem o WhatsApp com mensagem pré-preenchida.
- [ ] Não há chamadas `fetch`, `/api/`, banco ou login.

## Responsividade

- [ ] 320–480 px: sem rolagem horizontal, CTA legível e barra mobile sem sobreposição.
- [ ] 481–768 px: cards e navegação bem distribuídos.
- [ ] 769–1440 px: conteúdo centralizado e com boa densidade.
- [ ] 1920 px ou mais: sem estiramento visual excessivo.

## Acessibilidade e segurança

- [ ] Primeiro Tab mostra “Pular para o conteúdo principal”.
- [ ] Todos os controles têm foco visível e área de toque adequada.
- [ ] Imagens possuem texto alternativo quando informativas.
- [ ] O HTML não injeta dados externos não sanitizados.
- [ ] O projeto não contém segredos, credenciais ou dados de clientes.

## Publicação

- [ ] A pasta `dist/` contém `index.html`, JS, CSS, favicon e imagens.
- [ ] Os assets carregam em domínio raiz e em subpasta do GitHub Pages.
- [ ] Testar a URL publicada em celular e desktop.
