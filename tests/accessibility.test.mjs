import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const html = readFileSync(join('dist', 'index.html'), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || ''
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || ''

function cssRuleHas(selectorPattern, declarations) {
  const rule = head.match(new RegExp(selectorPattern + '\\{([^}]*)\\}'))?.[1] || ''
  assert.ok(rule, 'Regra CSS não encontrada: ' + selectorPattern)

  for (const declaration of declarations) {
    assert.match(rule, declaration)
  }
}

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
  cssRuleHas('\\.fade-up', [/opacity:1/, /transform:none/])
  cssRuleHas('\\.js \\.fade-up', [/opacity:0/])
  cssRuleHas('\\.faq-answer', [/display:grid/, /grid-template-rows:1fr/])
  cssRuleHas('html:not\\(\\.js\\) #mobile-menu', [/display:block!important/])
  assert.match(body, /id="faq-panel-\\d+"[^>]*aria-hidden="false"/)
})

test('preferência por movimento reduzido é respeitada', () => {
  assert.match(head, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  // O Vite/Lightning CSS pode reordenar declarações durante a minificação.
  // O teste valida o comportamento, não a ordem textual das propriedades.
  const reducedMotionRule = [...head.matchAll(/\.js \.fade-up\{([^}]*)\}/g)]
    .map((match) => match[1])
    .find((rule) => /opacity:1/.test(rule) && /transform:none/.test(rule) && /transition:none/.test(rule))

  assert.ok(reducedMotionRule, 'A regra de movimento reduzido deve desativar animação e transição de .fade-up')
})
