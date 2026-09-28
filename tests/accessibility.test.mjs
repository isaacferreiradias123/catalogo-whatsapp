import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const html = readFileSync(join('dist', 'index.html'), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || ''
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || ''

test('documento possui estrutura semântica, viewport e atalho de acessibilidade', () => {
  assert.match(head, /<meta name="viewport" content="width=device-width, initial-scale=1\.0">/)
  assert.match(body, /class="skip-link"[^>]*>Pular para o conteúdo principal<\/a>/)
  assert.match(body, /<main\b/)
  assert.match(body, /<nav\b[^>]*aria-label="Navegação principal"/)
  assert.equal((body.match(/<h1\b/g) || []).length, 1)
})

test('IDs do HTML são únicos', () => {
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])
  assert.equal(new Set(ids).size, ids.length)
})

test('todo link interno aponta para um alvo existente', () => {
  const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]))
  const internalLinks = [...body.matchAll(/\shref="#([^"]+)"/g)].map((match) => match[1]).filter(Boolean)

  for (const target of internalLinks) {
    assert.ok(ids.has(target), 'Alvo interno inexistente: #' + target)
  }
})

test('imagens possuem atributo alt e links em nova aba usam noopener', () => {
  const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0])
  assert.ok(images.length > 0)
  images.forEach((tag) => assert.match(tag, /\salt="[^"]*"/i))

  const external = [...body.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)].map((match) => match[0])
  assert.ok(external.length > 0)
  external.forEach((tag) => assert.match(tag, /\srel="[^"]*noopener[^"]*"/i))
})

test('FAQ expõe relacionamento acessível entre controles e painéis', () => {
  const triggers = [...body.matchAll(/<button id="faq-trigger-(\d+)"[^>]*aria-controls="faq-panel-\1"[^>]*>/g)]
  assert.ok(triggers.length > 0)
  triggers.forEach((match) => {
    const index = match[1]
    assert.match(body, new RegExp('id="faq-panel-' + index + '"[^>]*role="region"[^>]*aria-labelledby="faq-trigger-' + index + '"'))
  })
})

test('conteúdo continua visível e navegável quando JavaScript não executa', () => {
  assert.match(head, /\.fade-up\{opacity:1;transform:none\}/)
  assert.match(head, /\.js \.fade-up\{opacity:0/)
  assert.match(head, /\.faq-answer\{display:grid;grid-template-rows:1fr\}/)
  assert.match(head, /html:not\(\.js\) #mobile-menu\{display:block!important\}/)
})

test('preferência por movimento reduzido é respeitada', () => {
  assert.match(head, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(head, /\.js \.fade-up\{opacity:1;transform:none;transition:none\}/)
})
