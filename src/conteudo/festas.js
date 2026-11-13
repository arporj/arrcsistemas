// Dados fictícios da Casa de Festas Encanto, usados pelas três versões do exemplo.

const FOTOS = '/images/exemplos/casa-de-festas';

export const contato = {
  marca: 'Encanto',
  nome: 'Casa de Festas Encanto',
  endereco: 'Avenida Atlântica, 560, Rio das Ostras, RJ',
  telefone: '(22) 99999-9999',
  telefoneLink: 'tel:+5522999999999',
  email: 'contato@casadefestasencanto.com.br',
  visitas: 'Visitas de terça a sábado, das 10h às 18h',
};

export const foto = {
  salao: { src: `${FOTOS}/salao.jpg`, alt: 'Salão de festas decorado, com mesas postas e iluminação suave' },
  claro: { src: `${FOTOS}/salao-claro.jpg`, alt: 'Salão claro com mesas redondas, cadeiras brancas e lustres' },
  branca: { src: `${FOTOS}/mesa-branca.jpg`, alt: 'Mesa branca com velas azuis e arranjo de folhas' },
  menu: { src: `${FOTOS}/menu-velas.jpg`, alt: 'Cardápio impresso sobre prato dourado, com velas flutuantes' },
  velas: { src: `${FOTOS}/mesa-velas.jpg`, alt: 'Mesa longa de banquete com velas e orquídeas' },
  luzes: { src: `${FOTOS}/salao-luzes.jpg`, alt: 'Mesa posta com sousplat dourado e flores em salão iluminado' },
  moderno: { src: `${FOTOS}/salao-moderno.jpg`, alt: 'Salão moderno com lírios, mesas de toalha branca e iluminação de palco' },
  baloes: { src: `${FOTOS}/baloes.jpg`, alt: 'Balões coloridos sobre confetes' },
};

export const eventos = [
  { id: 'casamento', nome: 'Casamentos', texto: 'Cerimônia e recepção no mesmo lugar, com uma equipe do ensaio ao último brinde.', foto: foto.velas },
  { id: 'corporativo', nome: 'Corporativo', texto: 'Lançamentos e jantares de empresa, com som, projeção e serviço no horário da pauta.', foto: foto.moderno },
  { id: 'formatura', nome: 'Formaturas', texto: 'Baile completo, com pista, luz e gastronomia para a família inteira da turma.', foto: foto.luzes },
  { id: 'aniversario', nome: 'Aniversários', texto: 'Festas particulares com a cara de quem faz aniversário, dos 15 aos 80 anos.', foto: foto.baloes },
];

export const incluso = [
  'Equipe de salão e cerimonial no dia',
  'Buffet com cardápio de degustação',
  'Som, luz de pista e projeção',
  'Mesas, cadeiras, louças e toalhas',
  'Estacionamento com manobrista',
];

export const depoimento = {
  texto: 'O serviço foi invisível e impecável. Meus convidados só precisaram aproveitar a festa.',
  autor: 'Família Monteiro',
};
