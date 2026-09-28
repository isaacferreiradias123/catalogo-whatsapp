import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const html = readFileSync(join('dist', 'index.html'), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1]
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
const css = readdirSync(join('dist', 'assets'))
  .filter((name) => name.endsWith('.css'))
  .map((name) => readFileSync(join('dist', 'assets', name), 'utf8'))
  .join('\n')
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const packageLock = JSON.parse(readFileSync('package-lock.json', 'utf8'))

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


test('CSS publicado contém os utilitários responsivos usados pela landing page', () => {
  const selectors = [
    '.bottom-5',
    '.max-w-md',
    '.max-w-xl',
    '.max-w-\\[220px\\]',
    '.sm\\:flex-col',
    '.sm\\:gap-4',
    '.sm\\:h-12',
    '.sm\\:h-6',
    '.sm\\:max-w-\\[260px\\]',
    '.sm\\:max-w-lg',
    '.sm\\:mb-8',
    '.sm\\:mt-10',
    '.sm\\:mt-6',
    '.sm\\:px-5',
    '.sm\\:py-6',
    '.sm\\:w-12',
    '.sm\\:w-6',
    '.lg\\:max-w-xl'
  ]

  for (const selector of selectors) {
    assert.ok(css.includes(selector), 'Seletor CSS ausente no build: ' + selector)
  }

  assert.match(head, /\.wa-float\{[^}]*bottom:1\.25rem/)
})

test('o site não possui dependências npm de produção', () => {
  assert.deepEqual(packageJson.dependencies || {}, {})
})


test('package-lock está sincronizado com as ferramentas diretas do projeto', () => {
  assert.equal(packageLock.lockfileVersion, 3)
  assert.deepEqual(packageLock.packages?.['']?.devDependencies || {}, packageJson.devDependencies || {})
})
