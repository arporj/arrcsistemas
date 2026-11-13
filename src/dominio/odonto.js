// Regras do pedido de agendamento da Odonto Sorriso Rio (site de exemplo).
import { telefoneValido } from '@/components/exemplos/utilitarios';
import { QUALQUER_HORARIO } from '@/conteudo/odonto';

/**
 * Valida os dados de contato do agendamento.
 * Entrada: nome e WhatsApp digitados.
 * Saída: objeto com a mensagem de erro de cada campo inválido (vazio quando está tudo certo).
 */
export const validarContatoAgendamento = ({ nome, whatsapp }) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = 'Escreva como podemos chamar você.';
  if (!telefoneValido(whatsapp)) erros.whatsapp = 'Confira o número. Exemplo: (22) 99999-9999.';
  return erros;
};

/**
 * Escreve o período escolhido para a frase de confirmação.
 * Exemplos: 'Manhã' vira 'no período da manhã'; 'Qualquer horário' vira 'em qualquer horário'.
 */
export const descreverPeriodo = (periodo) => (periodo === QUALQUER_HORARIO ? 'em qualquer horário' : `no período da ${periodo.toLowerCase()}`);
