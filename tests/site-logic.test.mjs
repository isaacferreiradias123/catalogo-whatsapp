import assert from 'node:assert/strict'
import { test } from 'node:test'
import { content } from '../src/content.ts'
import { renderSite } from '../src/site.ts'

test('renderSite gera HTML válido com conteúdo padrão', () => {
  const html = renderSite(content, {
    origin: 'https://isaacferreiradias123.github.io',
    path: '/catalogo-whatsapp/'
  })

  assert.ok(html.startsWith('<!DOCTYPE html>'))
  assert.ok(html.includes('CatáloGO'))
  assert.ok(html.includes('uema-logo-recortado.png'))
  assert.ok(html.includes('uema-logo-dark.png'))
})

test('renderSite lida com caracteres especiais e previne XSS em campos de texto', () => {
  const maliciousContent = {
    ...content,
    settings: {
      ...content.settings,
      companyName: '<script>alert("xss")</script> & "Empresa"',
      description: 'Teste com <img src=x onerror=alert(1)> e aspas "duplas"'
    },
    hero: {
      enabled: true,
      title: 'Título com <script>malicioso</script>',
      subtitle: 'Subtítulo com aspas "especiais" & ampersand'
    }
  }

  const html = renderSite(maliciousContent)

  // Deve sanitizar tags HTML e aspas
  assert.doesNotMatch(html, /<script>alert\("xss"\)<\/script>/)
  assert.ok(html.includes('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'))
  assert.ok(html.includes('&amp; &quot;Empresa&quot;'))
  assert.doesNotMatch(html, /<img src=x onerror=alert\(1\)>/)
})

test('renderSite suporta desativação de seções opcionais (edge cases)', () => {
  const minimalContent = {
    settings: {
      companyName: 'Negócio Teste',
      whatsapp: '5599999999999',
      whatsappDisplay: '(99) 99999-9999'
    },
    topbar: { enabled: false },
    hero: { enabled: false },
    problems: { enabled: false },
    authority: { enabled: false },
    servicesSection: { enabled: false },
    plansSection: { enabled: false },
    stepsSection: { enabled: false },
    faqSection: { enabled: false },
    finalCta: { enabled: false },
    testimonialsSection: { enabled: false },
    contactSection: { enabled: false },
    whatsappWidget: { floatingEnabled: false, mobileBarEnabled: false }
  }

  const html = renderSite(minimalContent)

  assert.doesNotMatch(html, /id="top-bar"/)
  assert.doesNotMatch(html, /id="hero-section"/)
  assert.doesNotMatch(html, /id="problemas"/)
  assert.doesNotMatch(html, /id="autoridade"/)
  assert.doesNotMatch(html, /id="servicos"/)
  assert.doesNotMatch(html, /id="planos"/)
  assert.doesNotMatch(html, /id="como-funciona"/)
  assert.doesNotMatch(html, /id="faq"/)
  assert.doesNotMatch(html, /id="cta-final"/)
  assert.doesNotMatch(html, /class="wa-float"/)
  assert.doesNotMatch(html, /id="mobile-bar"/)
  assert.ok(html.includes('Negócio Teste'))
})

test('renderSite gera dados estruturados Schema.org JSON-LD válidos', () => {
  const html = renderSite(content, { origin: 'https://exemplo.com', path: '/' })
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1]
  
  assert.ok(jsonLdMatch, 'Tag JSON-LD deve existir')
  const data = JSON.parse(jsonLdMatch)
  assert.equal(data['@context'], 'https://schema.org')
  assert.equal(data['@type'], 'ProfessionalService')
  assert.equal(data.name, content.settings.companyName)
  assert.equal(data.url, 'https://exemplo.com/')
  assert.ok(Array.isArray(data.hasOfferCatalog?.itemListElement))
  assert.equal(data.hasOfferCatalog.itemListElement.length, content.services.length)
})

test('renderSite gera links do WhatsApp com formatação e codificação corretas', () => {
  const customContent = {
    settings: {
      companyName: 'CatáloGO',
      whatsapp: '+55 (99) 98168-7603',
      whatsappDefaultMessage: 'Olá! Gostaria de saber mais sobre o pacote.'
    },
    hero: {
      enabled: true,
      ctaPrimary: 'Chamar no WhatsApp'
    }
  }

  const html = renderSite(customContent)

  // Deve formatar o número apenas com dígitos (5599981687603) e codificar a mensagem
  assert.ok(html.includes('https://wa.me/5599981687603?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20pacote.'))
})
