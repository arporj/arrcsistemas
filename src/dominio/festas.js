// Regras do simulador de montagem da Casa de Festas Encanto (site de exemplo).

export const CONVIDADOS_MINIMO = 50;
export const CONVIDADOS_MAXIMO = 400;

const PESSOAS_POR_MESA = { banquete: 8, coquetel: 12 };

const saloes = [
  { nome: 'Salão Jardim', capacidade: 120 },
  { nome: 'Salão Cristal', capacidade: 250 },
  { nome: 'Grande Salão', capacidade: CONVIDADOS_MAXIMO },
];

/**
 * Calcula a montagem de uma festa.
 * Entrada: número de convidados e formato ('banquete' | 'coquetel').
 * Saída: quantidade de mesas e o menor salão em que a festa cabe.
 * Erros: formato desconhecido ou convidados fora do limite.
 */
export const calcularMontagem = (convidados, formato) => {
  const porMesa = PESSOAS_POR_MESA[formato];
  if (!porMesa) throw new Error(`Formato de festa desconhecido: ${formato}`);
  if (!Number.isFinite(convidados) || convidados < CONVIDADOS_MINIMO || convidados > CONVIDADOS_MAXIMO) {
    throw new Error(`Número de convidados fora do limite: ${convidados}`);
  }
  return {
    mesas: Math.ceil(convidados / porMesa),
    pessoasPorMesa: porMesa,
    salao: saloes.find((s) => convidados <= s.capacidade),
  };
};
