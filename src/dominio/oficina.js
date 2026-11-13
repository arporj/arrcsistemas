// Regras do pedido de orçamento do Auto Center Bom Torque (site de exemplo).
import { telefoneValido } from '@/components/exemplos/utilitarios';

/**
 * Valida o pedido de orçamento.
 * Entrada: nome, WhatsApp e veículo digitados.
 * Saída: objeto com a mensagem de erro de cada campo inválido (vazio quando está tudo certo).
 */
export const validarOrcamento = ({ nome, whatsapp, veiculo }) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = 'Escreva seu nome para sabermos com quem falar.';
  if (!telefoneValido(whatsapp)) erros.whatsapp = 'Confira o número: faltam dígitos. Exemplo: (22) 99999-9999.';
  if (veiculo.trim().length < 2) erros.veiculo = 'Conte qual é o carro. Exemplo: Onix 2019.';
  return erros;
};
