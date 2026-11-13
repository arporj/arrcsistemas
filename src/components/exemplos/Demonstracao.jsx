import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Título e descrição das versões Essencial e Profissional.
 * Ficam fora da busca do Google (noindex) para não concorrer com a versão Premium,
 * que é a que já está publicada e indexada.
 */
export const MetaVersao = ({ titulo, descricao }) => (
  <Helmet>
    <title>{`${titulo} | Exemplo ARRC Sistemas`}</title>
    <meta name="description" content={descricao} />
    <meta name="robots" content="noindex, follow" />
  </Helmet>
);

/**
 * Botão de WhatsApp dos sites de exemplo. Não abre conversa nenhuma: o número é fictício
 * e poderia pertencer a uma pessoa real. Mostra um aviso explicando o que aconteceria.
 */
export const BotaoWhatsDemo = ({ className, classeAviso, children }) => {
  const [avisando, setAvisando] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setAvisando(true)}>{children}</button>
      {avisando && (
        <span className={classeAviso} role="status">
          Site de demonstração: no site de verdade, este botão abre a conversa no WhatsApp da empresa.
        </span>
      )}
    </>
  );
};

/** Faz o bloco subir e aparecer quando entra na tela. Respeita quem pediu menos movimento. */
export const Revelar = ({ children, atraso = 0, className, como = 'div' }) => {
  const reduzido = useReducedMotion();
  const Elemento = motion[como];
  return (
    <Elemento
      className={className}
      initial={reduzido ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Elemento>
  );
};
