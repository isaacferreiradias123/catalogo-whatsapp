import assert from 'node:assert/strict'
import { test } from 'node:test'
import { content } from '../src/content.ts'
import { renderSite } from '../src/site.ts'

test('JSON-LD não permite encerrar a tag script por conteúdo malicioso', () => {
  const maliciousName = '</script><script>globalThis.__xss = true</script>'
  const html = renderSite({
    ...content,
    settings: { ...content.settings, companyName: maliciousName }
  })

  assert.doesNotMatch(html, /<\/script><script>globalThis\.__xss/)
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1]
  assert.ok(jsonLd)
  assert.equal(JSON.parse(jsonLd).name, maliciousName)
})

test('links de navegação inseguros são descartados', () => {
  const html = renderSite({
    ...content,
    navbar: {
      ...content.navbar,
      links: [
        { label: 'Seguro', href: '#servicos' },
        { label: 'Inseguro', href: 'https://example.com/"onclick="alert(1)' },
        { label: 'JavaScript', href: 'javascript:alert(1)' }
      ]
    }
  })

  assert.match(html, />Seguro<\/a>/)
  assert.doesNotMatch(html, />Inseguro<\/a>/)
  assert.doesNotMatch(html, />JavaScript<\/a>/)
  assert.doesNotMatch(html, /onclick="alert\(1\)"/)
})

test('links internos de seções desativadas não ficam quebrados e CTA usa fallback existente', () => {
  const html = renderSite({
    ...content,
    navbar: {
      ...content.navbar,
      links: [
        { label: 'FAQ oculto', href: '#faq' },
        { label: 'Serviços', href: '#servicos' }
      ]
    },
    faqSection: { ...content.faqSection, enabled: false },
    stepsSection: { ...content.stepsSection, enabled: false }
  })

  assert.doesNotMatch(html, />FAQ oculto<\/a>/)
  assert.match(html, />Serviços<\/a>/)
  assert.match(html, /href="#servicos" class="w-full sm:w-auto/)
})

test('origem e caminho inválidos não contaminam canonical ou Open Graph', () => {
  const html = renderSite(content, {
    origin: 'javascript:alert(1)',
    path: '//evil.example'
  })

  assert.match(html, /<link rel="canonical" href="\/"/)
  assert.doesNotMatch(html, /evil\.example/)
  assert.doesNotMatch(html, /javascript:alert/)
})

test('IDs inválidos de analytics não são injetados como scripts', () => {
  const html = renderSite({
    ...content,
    analytics: {
      gtmId: 'GTM-X</script><script>alert(1)</script>',
      googleAnalyticsId: '" onerror="alert(1)',
      metaPixelId: '<script>alert(1)</script>'
    }
  })

  assert.doesNotMatch(html, /googletagmanager\.com\/(?:gtm|gtag)/)
  assert.doesNotMatch(html, /connect\.facebook\.net/)
  assert.doesNotMatch(html, /alert\(1\)/)
})

test('WhatsApp sem número configurado degrada para link local seguro', () => {
  const html = renderSite({
    ...content,
    settings: { ...content.settings, whatsapp: '' }
  })

  assert.doesNotMatch(html, /https:\/\/wa\.me\/\?/)
  assert.match(html, /href="#"/)
})
