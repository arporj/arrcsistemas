// Regras de horário e de encomenda da Padaria do Seu Antônio (site de exemplo).
import { ABRE, FECHA, fornadas } from '@/conteudo/padaria';

export const horaEmSaoPaulo = () => Number(new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', hourCycle: 'h23', timeZone: 'America/Sao_Paulo' }).format(new Date()));

/**
 * Diz se a padaria está aberta e qual é a próxima fornada.
 * Entrada: hora cheia de 0 a 23, no fuso de São Paulo.
 * Saída: { aberto, texto }.
 */
export const situacaoAgora = (hora) => {
  const aberto = hora >= ABRE && hora < FECHA;
  const proxima = fornadas.find((f) => f.hora > hora);
  return {
    aberto,
    texto: proxima
      ? `Próxima fornada às ${proxima.hora}h: ${proxima.nome}`
      : `Próxima fornada amanhã às ${fornadas[0].hora}h: ${fornadas[0].nome}`,
  };
};

export const QUANTIDADE_MAXIMA = 99;

/** Soma a quantidade nova ao item, sem passar de 0 a 99. */
export const ajustarQuantidade = (atual, delta) => Math.max(0, Math.min(QUANTIDADE_MAXIMA, (atual || 0) + delta));

/**
 * Resume a encomenda.
 * Entrada: itens do cardápio e mapa { id: quantidade }.
 * Saída: linhas escolhidas, número de itens e total em reais (arredondado em centavos).
 */
export const resumirEncomenda = (itensCardapio, quantidades) => {
  const linhas = itensCardapio
    .filter((c) => quantidades[c.id] > 0)
    .map((c) => ({ ...c, quantidade: quantidades[c.id], subtotal: quantidades[c.id] * c.preco }));
  return {
    linhas,
    itens: linhas.reduce((soma, l) => soma + l.quantidade, 0),
    total: Math.round(linhas.reduce((soma, l) => soma + l.subtotal, 0) * 100) / 100,
  };
};
