// Regras do pedido de agendamento da Odonto Sorriso Rio (site de exemplo).
import { telefoneValido } from '@/components/exemplos/utilitarios';

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
