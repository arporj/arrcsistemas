// Dados fictícios da Constrular, usados pelas três versões do exemplo.
// O catálogo com preços fica em src/dominio/construcao.js, junto das regras de estimativa.

export const contato = {
  marca: 'Constrular',
  nome: 'Constrular Materiais de Construção',
  endereco: 'Rodovia Amaral Peixoto, km 162, Rio das Ostras, RJ',
  telefone: '0800 555 0199',
  telefoneLink: 'tel:08005550199',
  email: 'projetos@constrular.ind.br',
  horario: [
    ['Segunda a sexta', '7h às 18h'],
    ['Sábado', '7h às 13h'],
  ],
};

export const fortes = [
  { valor: '24h', titulo: 'Entrega na obra', texto: 'Para pedidos confirmados até as 15h, na região metropolitana.' },
  { valor: '2h', titulo: 'Cotação respondida', texto: 'Mande a lista e receba o preço fechado, com frete.' },
  { valor: 'ISO', titulo: 'Fornecedor conferido', texto: 'Trabalhamos com fabricantes certificados na ISO 9001.' },
];
