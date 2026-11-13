// Dados fictícios da Padaria do Seu Antônio, usados pelas três versões do exemplo.

export const ABRE = 5;
export const FECHA = 20;

export const contato = {
  marca: 'Seu Antônio',
  nome: 'Padaria do Seu Antônio',
  endereco: 'Rua Bonfim, 899',
  cidade: 'Rio das Ostras, RJ',
  telefone: '(22) 99999-9999',
  telefoneLink: 'tel:+5522999999999',
  horario: `Todos os dias, das ${ABRE}h às ${FECHA}h`,
};

export const fornadas = [
  { hora: 5, nome: 'pão de fermentação natural' },
  { hora: 7, nome: 'pão francês' },
  { hora: 10, nome: 'broa de milho' },
  { hora: 15, nome: 'pão de queijo' },
  { hora: 17, nome: 'pão francês' },
];

export const CATEGORIAS = ['Pães', 'Lanches', 'Doces', 'Bebidas'];

// "encomenda: true" marca os itens que aparecem na encomenda da versão Premium.
export const cardapio = [
  { id: 'fermentacao', categoria: 'Pães', nome: 'Pão de fermentação natural', detalhe: 'Unidade de 800 g, com 24 horas de fermentação', preco: 22, encomenda: true },
  { id: 'frances', categoria: 'Pães', nome: 'Pão francês', detalhe: 'Fornadas às 7h e às 17h, preço por unidade', preco: 0.9 },
  { id: 'broa', categoria: 'Pães', nome: 'Broa de milho', detalhe: 'Receita da família, unidade de 400 g', preco: 14 },
  { id: 'chapa', categoria: 'Lanches', nome: 'Pão na chapa', detalhe: 'Com manteiga, feito na hora', preco: 5, encomenda: true },
  { id: 'misto', categoria: 'Lanches', nome: 'Misto quente', detalhe: 'Presunto e queijo no pão francês', preco: 8, encomenda: true },
  { id: 'bauru', categoria: 'Lanches', nome: 'Bauru', detalhe: 'Rosbife, queijo, tomate e picles', preco: 12, encomenda: true },
  { id: 'queijo', categoria: 'Lanches', nome: 'Pão de queijo', detalhe: 'Porção com 6 unidades, sai às 15h', preco: 9.5 },
  { id: 'sonho', categoria: 'Doces', nome: 'Sonho de creme', detalhe: 'Creme de baunilha feito aqui', preco: 7.5 },
  { id: 'bolo', categoria: 'Doces', nome: 'Bolo de fubá com goiabada', detalhe: 'Fatia generosa', preco: 6 },
  { id: 'cafe', categoria: 'Bebidas', nome: 'Café coado', detalhe: 'Xícara de 150 ml', preco: 4.5 },
  { id: 'acai', categoria: 'Bebidas', nome: 'Açaí na tigela', detalhe: 'Copo de 300 ml', preco: 15, encomenda: true },
];

export const depoimento = {
  texto: 'O melhor pão na chapa de toda a Região dos Lagos. É o gosto da minha infância.',
  autor: 'Cliente desde 1995',
};
