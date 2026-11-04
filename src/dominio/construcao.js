// Regras de estimativa de material da Constrular (site de exemplo).
// Valores de consumo e rendimento são médias de mercado usadas só para a demonstração.

const PERDA_PADRAO = 0.1;

export const catalogo = [
  { id: 'tijolo', categoria: 'Alvenaria', nome: 'Tijolo cerâmico 8 furos', medida: '9 × 19 × 19 cm', preco: 1.15, unidade: 'unidade', foto: '/images/exemplos/constrular/tijolo-obra.jpg', alt: 'Mão com luva assentando um tijolo cerâmico' },
  { id: 'cimento', categoria: 'Alvenaria', nome: 'Cimento CP II', medida: 'Saco de 50 kg', preco: 39.9, unidade: 'saco' },
  { id: 'areia', categoria: 'Alvenaria', nome: 'Areia média lavada', medida: 'Entrega em m³', preco: 165, unidade: 'm³' },
  { id: 'telha', categoria: 'Cobertura', nome: 'Telha cerâmica romana', medida: '40 × 21 cm', preco: 3.4, unidade: 'unidade' },
  { id: 'porcelanato', categoria: 'Acabamento', nome: 'Porcelanato Slate Ultra', medida: '90 × 90 cm, PEI 5', preco: 185.9, unidade: 'm²', foto: '/images/exemplos/constrular/piso.jpg', alt: 'Piso de porcelanato branco com veios cinza' },
  { id: 'tinta', categoria: 'Acabamento', nome: 'Tinta acrílica premium', medida: 'Lata de 18 L', preco: 289, unidade: 'lata', foto: '/images/exemplos/constrular/tintas.jpg', alt: 'Latas de tinta abertas em várias cores' },
  { id: 'furadeira', categoria: 'Ferramentas', nome: 'Furadeira Titan Pro 20V', medida: '120 Nm, 2100 RPM', preco: 1240, unidade: 'unidade' },
];

const precoDe = (id) => catalogo.find((p) => p.id === id).preco;

export const areaEmM2 = (largura, altura) => {
  const l = Number(largura);
  const a = Number(altura);
  if (!Number.isFinite(l) || !Number.isFinite(a) || l <= 0 || a <= 0) return 0;
  return l * a;
};

const TIJOLOS_POR_M2 = 25;
const SACOS_CIMENTO_POR_M2 = 0.12;
const AREIA_M3_POR_M2 = 0.02;
const M2_POR_LATA = 180;

/**
 * Estima o material de uma parede, de um piso ou de uma pintura.
 * Entrada: tipo ('parede' | 'piso' | 'pintura') e medidas em metros.
 * Saída: área, itens com quantidade inteira e total em reais. Medidas inválidas geram lista vazia.
 */
export const estimarMaterial = (tipo, largura, altura) => {
  const area = areaEmM2(largura, altura);
  if (area === 0) return { area: 0, itens: [], total: 0 };

  const linha = (id, quantidade, medida) => {
    const inteira = Math.ceil(quantidade);
    return { id, nome: catalogo.find((p) => p.id === id).nome, quantidade: inteira, medida, subtotal: inteira * precoDe(id) };
  };

  let itens;
  if (tipo === 'parede') {
    itens = [
      linha('tijolo', area * TIJOLOS_POR_M2 * (1 + PERDA_PADRAO), 'tijolos'),
      linha('cimento', area * SACOS_CIMENTO_POR_M2, 'sacos'),
      linha('areia', area * AREIA_M3_POR_M2, 'm³'),
    ];
  } else if (tipo === 'piso') {
    itens = [linha('porcelanato', area * (1 + PERDA_PADRAO), 'm²')];
  } else if (tipo === 'pintura') {
    itens = [linha('tinta', (area * 2) / M2_POR_LATA, 'latas')];
  } else {
    throw new Error(`Tipo de estimativa desconhecido: ${tipo}`);
  }

  const total = itens.reduce((soma, i) => soma + i.subtotal, 0);
  return { area, itens, total: Math.round(total * 100) / 100 };
};
