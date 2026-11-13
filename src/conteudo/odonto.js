// Dados fictícios da Odonto Sorriso Rio, usados pelas três versões do exemplo.

export const contato = {
  marca: 'Sorriso Rio',
  nome: 'Odonto Sorriso Rio',
  endereco: 'Rua das Palmeiras, 210, Rio das Ostras, RJ',
  telefone: '(22) 99999-9999',
  telefoneLink: 'tel:+5522999999999',
  horario: [
    ['Segunda a sexta', '8h às 20h'],
    ['Sábado', '8h às 13h'],
  ],
  convenios: ['Amil Dental', 'Bradesco Dental', 'OdontoPrev', 'SulAmérica Odonto'],
};

export const tratamentos = [
  { id: 'clareamento', nome: 'Clareamento', titulo: 'Um tom de cada vez', texto: 'Avaliamos seus dentes antes de começar e ajustamos o clareamento para evitar sensibilidade.' },
  { id: 'ortodontia', nome: 'Ortodontia', titulo: 'Alinhar sem pressa', texto: 'Aparelho fixo ou alinhador transparente. Você vê o plano completo e o prazo antes de decidir.' },
  { id: 'implantes', nome: 'Implantes', titulo: 'Repor o que faltou', texto: 'Planejamento com tomografia para devolver a mastigação e o dente com aparência natural.' },
  { id: 'limpeza', nome: 'Limpeza', titulo: 'Prevenir é mais simples', texto: 'Remoção de tártaro e orientação de escovação, para evitar tratamentos maiores no futuro.' },
];

export const depoimentos = [
  { nome: 'Marina S.', texto: 'O ambiente não parece uma clínica tradicional. Nunca me senti tão tranquila em um dentista.' },
  { nome: 'Carlos M.', texto: 'Profissionais que realmente escutam. Explicaram cada etapa do plano antes de começar.' },
  { nome: 'Juliana R.', texto: 'Da recepção até a cadeira, senti cuidado em cada detalhe. Perdi o medo de voltar.' },
];

export const QUALQUER_HORARIO = 'Qualquer horário';
export const PERIODOS = ['Manhã', 'Tarde', 'Noite', QUALQUER_HORARIO];

export const perguntas = [
  { pergunta: 'A primeira consulta tem custo?', resposta: 'A avaliação inicial é gratuita. Nela, o dentista examina, explica o que encontrou e entrega o orçamento por escrito.' },
  { pergunta: 'Tenho muito medo de dentista. E agora?', resposta: 'Conte isso no agendamento. Reservamos um horário mais longo, combinamos um sinal para pausar e começamos só pela conversa.' },
  { pergunta: 'Vocês atendem convênio?', resposta: 'Sim. Atendemos os convênios listados nesta página. Para os outros, emitimos recibo para reembolso.' },
  { pergunta: 'Dá para parcelar o tratamento?', resposta: 'Sim. Tratamentos acima de R$ 800,00 podem ser parcelados em até 10 vezes sem juros no cartão.' },
];
