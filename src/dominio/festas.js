// Regras do simulador de montagem e do pedido de orçamento da Casa de Festas Encanto (site de exemplo).
import { emailValido } from '@/components/exemplos/utilitarios';

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

const dataLocalIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Valida o pedido de orçamento da versão Profissional.
 * Entrada: nome, e-mail, tipo, data no formato aaaa-mm-dd e convidados (texto digitado).
 * Saída: objeto com a mensagem de erro de cada campo inválido (vazio quando está tudo certo).
 */
export const validarPedidoOrcamento = ({ nome, email, tipo, data, convidados }, hoje = new Date()) => {
  const erros = {};
  const quantidade = Number(convidados);
  if (nome.trim().length < 2) erros.nome = 'Conte seu nome para sabermos com quem falar.';
  if (!emailValido(email)) erros.email = 'Confira o e-mail. Exemplo: voce@email.com.';
  if (!tipo) erros.tipo = 'Escolha o tipo de evento.';
  if (!data) erros.data = 'Escolha a data da festa.';
  else if (data < dataLocalIso(hoje)) erros.data = 'Essa data já passou. Escolha uma data a partir de hoje.';
  if (!Number.isInteger(quantidade) || quantidade < CONVIDADOS_MINIMO || quantidade > CONVIDADOS_MAXIMO) {
    erros.convidados = `Informe de ${CONVIDADOS_MINIMO} a ${CONVIDADOS_MAXIMO} convidados.`;
  }
  return erros;
};

export const hojeIso = () => dataLocalIso(new Date());
