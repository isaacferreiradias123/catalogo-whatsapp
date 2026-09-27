import type { SiteContent } from './site.ts'

/**
 * Conteúdo público da load page.
 * Mantido em código para publicação estática no GitHub Pages, sem banco de dados,
 * API ou credenciais no navegador.
 */
export const content: SiteContent = {
  settings: {
    companyName: 'CatáloGO',
    shortName: 'WhatsApp Vendas Express',
    slogan: 'Organização comercial do WhatsApp Business',
    description: 'Organização simples do WhatsApp Business para pequenos negócios, com foco em Pedreiras — MA e atendimento remoto para outros lugares.',
    logoUrl: './static/projeto-logo-recortado.png',
    institutionLogoUrl: './static/uema-logo-recortado.png',
    faviconUrl: './static/projeto-logo-recortado.png',
    whatsapp: '5599981687603',
    whatsappDisplay: '(99) 98168-7603',
    whatsappDefaultMessage: 'Olá! Quero conhecer o WhatsApp Vendas Express da CatáloGO por R$ 49,99.',
    phone: '(99) 98168-7603',
    email: '',
    address: 'Pedreiras — MA | Atendimento remoto',
    city: 'Pedreiras',
    state: 'MA',
    instagram: '',
    facebook: '',
    tiktok: '',
    businessHours: 'Atendimento remoto',
    copyright: 'CatáloGO. Projeto acadêmico UEMA.'
  },
  topbar: {
    enabled: true,
    text: 'Atendimento 100% remoto',
    linkText: 'Falar agora',
    linkEnabled: true
  },
  navbar: {
    badge: 'WhatsApp Vendas Express',
    links: [
      { label: 'O problema', href: '#problemas' },
      { label: 'O que fazemos', href: '#servicos' },
      { label: 'Pacote', href: '#planos' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'FAQ', href: '#faq' }
    ],
    ctaText: 'Falar no WhatsApp'
  },
  hero: {
    enabled: true,
    badge: 'CatáloGO • WhatsApp Vendas Express',
    title: 'Deixe seu WhatsApp mais organizado e fácil de entender.',
    subtitle: 'Ajudamos pequenos negócios, com foco em Pedreiras — MA, a organizar produtos, preços e mensagens. O atendimento é remoto e também pode ser feito para outras cidades.',
    ctaPrimary: 'Quero organizar meu WhatsApp',
    ctaSecondary: 'Ver como funciona',
    mockupLabel: 'Entrega em até 48 horas'
  },
  problems: {
    enabled: true,
    title: 'Seu WhatsApp pode estar dando mais trabalho do que deveria.',
    subtitle: 'Quando as informações ficam espalhadas, o cliente pergunta mais e você perde tempo para responder.'
  },
  problemCards: [
    { id: 1, title: 'Cliente esperando', description: 'Quando a resposta demora, o cliente pode desistir.', icon: 'clock' },
    { id: 2, title: 'Mesmas perguntas', description: 'Você perde tempo repetindo preço, horário e formas de pagamento.', icon: 'keyboard' },
    { id: 3, title: 'Produtos confusos', description: 'Fotos, preços e descrições separados dificultam a escolha.', icon: 'layout' },
    { id: 4, title: 'Perfil incompleto', description: 'Faltam informações básicas para o cliente confiar e chamar.', icon: 'search' }
  ],
  authority: {
    enabled: true,
    title: 'Um serviço criado para a realidade de pequenos negócios.',
    text: 'A CatáloGO nasceu em um projeto de Gestão Comercial da UEMA, com foco em ajudar negócios de Pedreiras — MA a usar melhor o WhatsApp.',
    detail: 'O atendimento é remoto. Por isso, também podemos atender negócios de outras cidades, sem limitar o serviço a uma região.',
    courseName: 'Gestão Comercial',
    institutionName: 'UEMA • Pedreiras — MA'
  },
  servicesSection: {
    enabled: true,
    title: 'O que fazemos para o seu WhatsApp',
    subtitle: 'Organizamos o básico para seu cliente encontrar as informações e falar com você com mais facilidade.'
  },
  services: [
    { id: 1, name: 'Perfil organizado', description: 'Descrição, horário, endereço e informações básicas do seu negócio.', icon: 'id-card' },
    { id: 2, name: 'Catálogo claro', description: 'Até 10 produtos ou serviços com foto, nome, preço e descrição.', icon: 'book-open' },
    { id: 3, name: 'Respostas prontas', description: 'Até 6 respostas para as perguntas que seus clientes mais fazem.', icon: 'message-circle' },
    { id: 4, name: 'Mensagens de atendimento', description: 'Saudação e ausência automáticas, além de uma mensagem pronta de pagamento/Pix.', icon: 'clock' },
    { id: 5, name: 'Fotos e PDF', description: 'Ajuste simples das fotos e PDF com cardápio ou tabela, quando fizer sentido.', icon: 'palette' },
    { id: 6, name: 'Orientação final', description: 'Explicamos tudo em uma chamada de até 15 minutos e fazemos uma correção.', icon: 'list-checks' }
  ],
  plansSection: {
    enabled: true,
    title: 'Um pacote simples, com tudo explicado',
    subtitle: 'Você sabe o que recebe, quanto paga e quando vai receber.'
  },
  plans: [
    {
      id: 1,
      name: 'WhatsApp Vendas Express',
      price: '49,99',
      billing_type: 'Preço único',
      description: 'Organização remota do WhatsApp Business, com entrega em até 48 horas depois que você enviar todas as informações.',
      badge: 'Sem mensalidade',
      highlighted: true,
      features: [
        'Até 10 produtos ou serviços',
        'Títulos e descrições curtas',
        'Até 6 respostas rápidas',
        'Saudação e mensagem de ausência',
        'Mensagem pronta de pagamento/Pix',
        'Tratamento simples das fotos enviadas',
        'Orientação final de até 15 minutos',
        '1 rodada de correção'
      ],
      cta_text: 'Quero falar sobre o pacote',
      whatsapp_message: 'Olá! Tenho interesse no WhatsApp Vendas Express da CatáloGO por R$ 49,99.'
    }
  ],
  stepsSection: {
    enabled: true,
    title: 'Como funciona',
    subtitle: 'Você manda as informações, aprova uma prévia e recebe tudo pronto.'
  },
  steps: [
    { id: 1, title: 'Você chama', description: 'Fale com a gente pelo WhatsApp e explique o que precisa.' },
    { id: 2, title: 'Você envia', description: 'Mande fotos, preços e as informações do seu negócio.' },
    { id: 3, title: 'Nós organizamos', description: 'Preparamos textos, imagens, catálogo e mensagens.' },
    { id: 4, title: 'Você aprova', description: 'Enviamos 1 ou 2 exemplos antes do pagamento.' },
    { id: 5, title: 'Você paga', description: 'Depois de aprovar, o pagamento é feito por Pix.' },
    { id: 6, title: 'Você recebe', description: 'Entregamos os arquivos e explicamos como usar.' },
    { id: 7, title: 'Ajustamos', description: 'Você tem uma rodada de correção dentro do pacote.' }
  ],
  faqSection: {
    enabled: true,
    title: 'Perguntas frequentes',
    subtitle: 'Respostas diretas para você decidir com tranquilidade.'
  },
  faqs: [
    { id: 1, question: 'O que eu recebo?', answer: 'Perfil organizado, até 10 produtos ou serviços, fotos com ajuste simples, nomes e descrições, até 6 respostas prontas, saudação, ausência, mensagem de pagamento/Pix, PDF quando fizer sentido, orientação final e uma correção.' },
    { id: 2, question: 'Quanto custa e existe mensalidade?', answer: 'O pacote único custa R$ 49,99. Não há mensalidade.' },
    { id: 3, question: 'Vocês pedem minha senha ou acessam minhas conversas?', answer: 'Não. A equipe não pega o seu celular, não pede senha, PIN ou e-mail, não acessa conversas e não faz migração de conta.' },
    { id: 4, question: 'Em quanto tempo recebo?', answer: 'Em até 48 horas depois que você enviar todas as informações necessárias.' },
    { id: 5, question: 'O que não está incluído?', answer: 'Não inclui migração de conta, gestão mensal de redes sociais, tráfego pago, fotografia presencial, visita à loja, suporte sem limite de tempo ou atualização contínua de estoque e preços.' },
    { id: 6, question: 'Como é o pagamento?', answer: 'Você recebe uma prévia de 1 ou 2 itens. Se aprovar, faz o Pix de R$ 49,99 e recebe o material completo.' },
    { id: 7, question: 'Vocês atendem só Pedreiras?', answer: 'Pedreiras — MA é o nosso foco, mas o atendimento é remoto e também podemos atender negócios de outras cidades.' }
  ],
  finalCta: {
    enabled: true,
    title: 'Seu WhatsApp não precisa ser complicado.',
    subtitle: 'Tenha informações claras, catálogo organizado e mensagens prontas para atender melhor.',
    ctaText: 'Falar com a CatáloGO'
  },
  testimonialsSection: { enabled: false },
  testimonials: [],
  contactSection: {
    enabled: true,
    title: 'Quer organizar seu WhatsApp?',
    subtitle: 'Fale com a gente pelo WhatsApp. Diga qual é o seu negócio e o que precisa melhorar. O atendimento é remoto e a prévia vem antes do pagamento.'
  },
  footer: {
    description: 'Organização simples do WhatsApp Business para pequenos negócios, com foco em Pedreiras — MA e atendimento remoto para outros lugares.',
    institutionalNote: 'Projeto acadêmico de Gestão Comercial da UEMA. Serviço de responsabilidade própria da CatáloGO, independente da instituição de ensino.'
  },
  seo: {
    title: 'CatáloGO | WhatsApp Vendas Express por R$ 49,99',
    description: 'Organize o WhatsApp Business do seu pequeno negócio com a CatáloGO. Serviço remoto, sem mensalidade e com foco em Pedreiras — MA.',
    keywords: 'CatáloGO, WhatsApp Vendas Express, organização WhatsApp Business, catálogo digital, Pedreiras MA, pequenos negócios',
    ogTitle: 'CatáloGO — WhatsApp Vendas Express',
    ogDescription: 'Organização do WhatsApp Business para pequenos negócios. Serviço por R$ 49,99, sem mensalidade, com foco em Pedreiras — MA e atendimento remoto para outras cidades.'
  },
  analytics: {},
  whatsappWidget: {
    floatingEnabled: true,
    floatingTooltip: 'Fale com a CatáloGO',
    mobileBarEnabled: false,
    mobileBarText: 'Falar no WhatsApp'
  }
}
