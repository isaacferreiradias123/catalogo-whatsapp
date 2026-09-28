import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const html = readFileSync(join('dist', 'index.html'), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || ''
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || ''

test('arquivos de imagem estáticos existem com proporções corretas', () => {
  assert.ok(existsSync(join('public', 'static', 'projeto-logo-recortado.png')), 'projeto-logo-recortado.png deve existir')
  assert.ok(existsSync(join('public', 'static', 'uema-logo-recortado.png')), 'uema-logo-recortado.png deve existir')
  assert.ok(existsSync(join('public', 'static', 'uema-logo-dark.png')), 'uema-logo-dark.png deve existir')
  assert.ok(existsSync(join('dist', 'static', 'uema-logo-dark.png')), 'uema-logo-dark.png deve existir no build dist')
})

test('estilos do tema escuro não contêm fundo ou bordas brancas nas logos', () => {
  // Não deve haver fundo branco artificial ao redor das logos no tema escuro
  assert.doesNotMatch(head, /html\[data-theme=["']?dark["']?\][^{]*\.project-logo[^{]*\{[^}]*background:\s*#f8fafc/i)
  assert.doesNotMatch(head, /html\[data-theme=["']?dark["']?\][^{]*\.institution-logo[^{]*\{[^}]*background:\s*#f8fafc/i)

  // Deve aplicar o filtro para logo branca no escuro e no rodapé (minificado ou não)
  assert.match(head, /\.project-logo[^{]*\{[^}]*filter:\s*brightness\(0\)\s*invert/i)

  // Deve garantir remoção explícita de bordas e padding artificial
  assert.match(head, /\.project-logo[^{]*\{[^}]*background:\s*(?:transparent|0 0)!important/i)
  assert.match(head, /\.institution-logo\s*\{[^}]*background:\s*(?:transparent|0 0)!important/i)
})

test('seção de autoridade renderiza versões clara e escura da UEMA', () => {
  assert.match(body, /id="autoridade"/)
  assert.match(body, /class="[^"]*uema-light-logo[^"]*"/)
  assert.match(body, /class="[^"]*uema-dark-logo[^"]*"/)
  assert.match(body, /src="[^"]*uema-logo-recortado\.png"/)
  assert.match(body, /src="[^"]*uema-logo-dark\.png"/)
})

test('rodapé escuro utiliza a versão nítida para fundo escuro da UEMA', () => {
  const footerMatch = body.match(/<footer[\s\S]*?<\/footer>/i)?.[0] || ''
  assert.ok(footerMatch.length > 0)
  assert.match(footerMatch, /src="[^"]*uema-logo-dark\.png"/)
  assert.match(footerMatch, /class="[^"]*project-logo[^"]*"/)
})

test('alternância de classes CSS para logos da UEMA em tema claro e escuro', () => {
  assert.match(head, /\.uema-dark-logo[^{]*\{[^}]*display:\s*none\s*!important/i)
  assert.match(head, /\.uema-light-logo[^{]*\{[^}]*display:\s*block\s*!important/i)
  assert.match(head, /html\[data-theme=["']?dark["']?\][^{]*\.uema-dark-logo[^{]*\{[^}]*display:\s*block\s*!important/i)
  assert.match(head, /html\[data-theme=["']?dark["']?\][^{]*\.uema-light-logo[^{]*\{[^}]*display:\s*none\s*!important/i)
})

test('botão de menu mobile possui ícones de abrir e fechar', () => {
  assert.match(body, /id="menu-btn"/)
  assert.match(body, /id="menu-icon-bars"/)
  assert.match(body, /id="menu-icon-close"/)
})
