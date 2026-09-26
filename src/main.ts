import { content } from './content'
import { renderSite } from './site'
import './styles/app.css'

const root = document.querySelector<HTMLDivElement>('#app')
if (!root) throw new Error('Elemento #app não encontrado.')

root.innerHTML = renderSite(content, { path: window.location.pathname })

// Scripts inseridos via innerHTML não são executados pelo navegador.
// Recriamos cada script para ativar menu, tema, FAQ, animações e demais interações.
root.querySelectorAll('script').forEach((oldScript) => {
  const script = document.createElement('script')
  for (const attribute of oldScript.attributes) script.setAttribute(attribute.name, attribute.value)
  script.textContent = oldScript.textContent
  oldScript.replaceWith(script)
})
