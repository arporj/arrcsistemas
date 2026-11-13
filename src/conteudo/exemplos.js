// Catálogo dos sites de exemplo e das três versões de cada um.
// Usado pela vitrine da home, pelo menu do topo, pela barra de versões e pelas rotas.

export const NIVEIS = [
  { id: 'essencial', nome: 'Essencial', resumo: 'Uma página direta e leve: apresentação, serviços e contato.' },
  { id: 'profissional', nome: 'Profissional', resumo: 'Site completo, com galeria, formulário e um recurso do negócio.' },
  { id: 'premium', nome: 'Premium', resumo: 'Animações avançadas e recursos interativos na página inteira.' },
];

export const exemplos = [
  { slug: 'padaria', nome: 'Padaria do Seu Antônio', segmento: 'Padaria Artesanal', foto: '/images/exemplos/padaria/maos-pao.jpg', fundo: '#f6efe4' },
  { slug: 'casa-de-festas', nome: 'Casa de Festas Encanto', segmento: 'Eventos', foto: '/images/exemplos/casa-de-festas/salao.jpg', fundo: '#f8f4ec' },
  { slug: 'construcao', nome: 'Constrular', segmento: 'Materiais', foto: '/images/exemplos/constrular/tijolos-chao.jpg', fundo: '#0f2c5e' },
  { slug: 'odonto', nome: 'Odonto Sorriso Rio', segmento: 'Saúde', foto: '/images/exemplos/odonto/consultorio.jpg', fundo: '#f1f8f6' },
  { slug: 'oficina', nome: 'Auto Center Bom Torque', segmento: 'Automotivo', foto: '/images/exemplos/oficina/disco-freio.jpg', fundo: '#0d0c0b' },
];

/** O Premium mantém o endereço original, para não quebrar links já enviados. */
export const caminhoVersao = (slug, nivel) => (nivel === 'premium' ? `/exemplos/${slug}` : `/exemplos/${slug}/${nivel}`);

export const exemploPorSlug = (slug) => {
  const exemplo = exemplos.find((e) => e.slug === slug);
  if (!exemplo) throw new Error(`Exemplo desconhecido: ${slug}`);
  return exemplo;
};

export const nomeDoNivel = (nivel) => NIVEIS.find((n) => n.id === nivel)?.nome ?? nivel;
