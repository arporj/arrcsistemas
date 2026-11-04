import React from 'react';
import { motion } from 'framer-motion';

const TOTAL = 14;
const DENTE_IMPLANTE = 4;
const CENTRO = { x: 180, y: 244 };
const RAIO = { x: 150, y: 196 };

const dentes = Array.from({ length: TOTAL }, (_, i) => {
  const angulo = (Math.PI * (i + 0.5)) / TOTAL;
  return {
    x: CENTRO.x - RAIO.x * Math.cos(angulo),
    y: CENTRO.y - RAIO.y * Math.sin(angulo),
    rotacao: (angulo * 180) / Math.PI - 90,
    // Desalinhamento usado antes do tratamento de ortodontia.
    desvio: i % 2 === 0 ? 11 : -13,
    recuo: i % 3 === 0 ? 7 : -4,
  };
});

const fio = dentes.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.x.toFixed(1)} ${d.y.toFixed(1)}`).join(' ');

const brilhos = [1, 4, 6, 9, 12];

/** Arcada desenhada em SVG, com uma animação para cada tratamento. */
const Arcada = ({ tratamento, reduzido }) => {
  const orto = tratamento === 'ortodontia';
  const transicao = reduzido ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 13 };

  return (
    <svg viewBox="0 0 360 270" className={`od-arcada od-arcada--${tratamento}`} aria-hidden="true">
      {dentes.map((d, i) => {
        const oculto = tratamento === 'implantes' && i === DENTE_IMPLANTE;
        return (
          <motion.g
            key={i}
            initial={false}
            animate={{
              x: d.x + (orto ? 0 : 0),
              y: d.y + (orto ? 0 : (tratamento === 'implantes' || tratamento === 'clareamento' || tratamento === 'limpeza' ? 0 : d.recuo)),
              rotate: d.rotacao,
            }}
            transition={transicao}
          >
            {!oculto && (
              <rect
                x="-13"
                y="-17"
                width="26"
                height="34"
                rx="10"
                className="od-dente"
                style={{ transitionDelay: tratamento === 'clareamento' ? `${i * 0.09}s` : '0s' }}
              />
            )}
            {tratamento === 'limpeza' && i % 2 === 0 && <circle cx="3" cy="6" r="2.6" className="od-tartaro" style={{ animationDelay: `${i * 0.12}s` }} />}
            {orto && (
              <motion.rect
                x="-5"
                y="-5"
                width="10"
                height="10"
                rx="2"
                className="od-braquete"
                initial={reduzido ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: reduzido ? 0 : i * 0.05 }}
              />
            )}
          </motion.g>
        );
      })}

      {orto && <motion.path d={fio} className="od-fio" initial={reduzido ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduzido ? 0 : 1.1, delay: reduzido ? 0 : 0.4 }} />}

      {tratamento === 'implantes' && (
        <g transform={`translate(${dentes[DENTE_IMPLANTE].x} ${dentes[DENTE_IMPLANTE].y}) rotate(${dentes[DENTE_IMPLANTE].rotacao})`}>
          <motion.g initial={reduzido ? false : { y: 46, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduzido ? 0 : 0.7 }}>
            <rect x="-5" y="4" width="10" height="26" rx="2" className="od-pino" />
            <path d="M-7 10h14M-7 16h14M-7 22h14" className="od-pino__rosca" />
          </motion.g>
          <motion.rect
            x="-13"
            y="-17"
            width="26"
            height="30"
            rx="10"
            className="od-coroa"
            initial={reduzido ? false : { y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={reduzido ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 11, delay: 0.75 }}
          />
        </g>
      )}

      {tratamento === 'limpeza' && brilhos.map((i, ordem) => (
        <path
          key={i}
          d="M0 -9 C1 -2 2 -1 9 0 C2 1 1 2 0 9 C-1 2 -2 1 -9 0 C-2 -1 -1 -2 0 -9Z"
          transform={`translate(${dentes[i].x} ${dentes[i].y - 2})`}
          className="od-brilho"
          style={{ animationDelay: `${0.5 + ordem * 0.35}s` }}
        />
      ))}
    </svg>
  );
};

export default Arcada;
