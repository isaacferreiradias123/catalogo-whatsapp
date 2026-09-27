import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const html = readFileSync(join('dist', 'index.html'), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1]
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]

test('a página publicada já contém o conteúdo principal sem executar JavaScript', () => {
  assert.ok(head && body)
  assert.match(body, /<h1\b[^>]*>Deixe seu WhatsApp/)
  assert.match(body, /id="como-funciona"/)
  assert.match(body, /id="faq"/)
  assert.doesNotMatch(body, /<div id="app"><\/div>/)
})

test('metadados de busca e compartilhamento estão no head com URLs absolutas', () => {
  assert.match(head, /<title>CatáloGO \| WhatsApp Vendas Express por R\$ 49,99<\/title>/)
  assert.match(head, /<meta name="description"/)
  assert.match(head, /<link rel="canonical" href="https:\/\/isaacferreiradias123\.github\.io\/catalogo-whatsapp\/"/)
  assert.match(head, /<meta property="og:url" content="https:\/\//)
  assert.match(head, /<meta property="og:image" content="https:\/\//)
  assert.doesNotMatch(body, /<meta (?:name|property)=/)
})
