// Dados fictícios do Auto Center Bom Torque, usados pelas três versões do exemplo.

export const contato = {
  marca: 'Bom Torque',
  nome: 'Auto Center Bom Torque',
  endereco: 'Rua das Garagens, 1020, Rio das Ostras, RJ',
  telefone: '(22) 99999-9999',
  telefoneLink: 'tel:+5522999999999',
  horario: [
    ['Segunda a sexta', '8h às 18h'],
    ['Sábado', '8h às 12h'],
  ],
};

export const servicos = [
  { n: '01', arte: 'revisao', titulo: 'Revisão completa', resumo: '40 pontos verificados com scanner.', texto: 'Olhamos 40 pontos do carro com scanner e seguimos o aperto indicado no manual do fabricante. Você recebe a lista do que está bom e do que precisa de atenção.' },
  { n: '02', arte: 'freios', titulo: 'Freios', resumo: 'Pastilhas, discos, fluido e pinças.', texto: 'Troca de pastilhas, sangria do fluido, retífica de discos e avaliação das pinças, para o pedal voltar a responder como deve.' },
  { n: '03', arte: 'suspensao', titulo: 'Suspensão e direção', resumo: 'Alinhamento 3D e balanceamento.', texto: 'Alinhamento 3D, balanceamento e inspeção de amortecedores, buchas e terminais. O carro para de puxar e de bater em lombada.' },
  { n: '04', arte: 'eletrica', titulo: 'Parte elétrica', resumo: 'Diagnóstico eletrônico e bateria.', texto: 'Diagnóstico eletrônico, reparo de chicotes e teste de bateria, alternador e módulos, para achar a causa da luz acesa no painel.' },
  { n: '05', arte: 'oleo', titulo: 'Troca de óleo', resumo: 'Óleo sintético e filtros originais.', texto: 'Óleo sintético e filtros originais, com limpeza do motor quando necessária e análise do óleo usado.' },
];

export const tiposServico = ['Revisão programada', 'Diagnóstico de falha', 'Manutenção corretiva', 'Melhoria de desempenho'];

export const perguntas = [
  { pergunta: 'Preciso marcar horário?', resposta: 'Para revisão e troca de óleo, sim: assim o carro sai no mesmo dia. Para barulho ou luz no painel, pode trazer sem marcar que fazemos o diagnóstico na hora.' },
  { pergunta: 'A revisão mantém a garantia de fábrica?', resposta: 'Sim. Seguimos o plano do manual do fabricante, usamos peças com nota fiscal e registramos tudo no manual do carro.' },
  { pergunta: 'Vocês trocam peça sem avisar?', resposta: 'Não. Antes de qualquer troca, mandamos foto da peça e o valor pelo WhatsApp. Só seguimos depois da sua resposta.' },
  { pergunta: 'Quais formas de pagamento vocês aceitam?', resposta: 'Pix, cartão de débito e cartão de crédito em até 6 vezes sem juros nos serviços acima de R$ 600,00.' },
];
