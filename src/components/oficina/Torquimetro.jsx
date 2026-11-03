import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';

const TORQUE_ALVO = 110;

/** Mostrador fixo: a rolagem da página "aperta" o torquímetro até o ponto certo, no fim do site. */
const Torquimetro = () => {
  const { scrollYProgress } = useScroll();
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const angulo = useTransform(suave, [0, 1], [-130, 130]);
  const valor = useTransform(suave, (p) => Math.round(Math.min(Math.max(p, 0), 1) * TORQUE_ALVO));
  const [atingido, setAtingido] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (p) => setAtingido(p > 0.985));

  return (
    <div className={`of-torque${atingido ? ' of-torque--ok' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" className="of-torque__fundo" />
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1="50" y1="9" x2="50" y2={i % 13 === 0 ? 18 : 14} transform={`rotate(${-130 + i * 20} 50 50)`} className="of-torque__marca" />
        ))}
        <motion.g style={{ rotate: angulo, originX: '50px', originY: '50px' }}>
          <line x1="50" y1="56" x2="50" y2="17" className="of-torque__ponteiro" />
        </motion.g>
        <circle cx="50" cy="50" r="4" className="of-torque__eixo" />
      </svg>
      <div className="of-torque__leitura">
        <motion.span>{valor}</motion.span>
        <small>{atingido ? 'no ponto' : 'N·m'}</small>
      </div>
    </div>
  );
};

export default Torquimetro;
