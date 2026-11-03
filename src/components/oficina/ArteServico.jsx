import React from 'react';

const Revisao = () => (
  <svg viewBox="0 0 240 240" className="of-art of-art--revisao">
    {Array.from({ length: 40 }, (_, i) => (
      <line
        key={i}
        x1="120"
        y1="14"
        x2="120"
        y2="34"
        transform={`rotate(${i * 9} 120 120)`}
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
    <text x="120" y="128" textAnchor="middle" className="of-art__numero">40</text>
    <text x="120" y="152" textAnchor="middle" className="of-art__legenda">pontos</text>
  </svg>
);

const Freios = () => (
  <svg viewBox="0 0 240 240" className="of-art of-art--freios">
    <g className="of-art__gira">
      <circle cx="120" cy="120" r="96" />
      <circle cx="120" cy="120" r="34" />
      {Array.from({ length: 24 }, (_, i) => {
        const anel = i % 2 === 0 ? 58 : 76;
        return <circle key={i} cx="120" cy={120 - anel} r="3.2" transform={`rotate(${i * 15} 120 120)`} className="of-art__furo" />;
      })}
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={i} cx="120" cy="100" r="4" transform={`rotate(${i * 72} 120 120)`} />
      ))}
    </g>
    <path d="M168 60 h34 a12 12 0 0 1 12 12 v96 a12 12 0 0 1 -12 12 h-34 a10 10 0 0 1 -9 -14 q14 -46 0 -92 a10 10 0 0 1 9 -14 Z" className="of-art__pinca" />
  </svg>
);

const Suspensao = () => (
  <svg viewBox="0 0 240 240" className="of-art of-art--suspensao">
    <rect x="62" y="22" width="116" height="14" rx="3" className="of-art__topo" />
    <g className="of-art__mola">
      <path vectorEffect="non-scaling-stroke" d="M120 36 L170 52 L70 76 L170 100 L70 124 L170 148 L70 172 L120 188" />
    </g>
    <rect x="62" y="188" width="116" height="14" rx="3" className="of-art__base" />
    <path d="M26 218 H214" className="of-art__chao" />
  </svg>
);

const Eletrica = () => (
  <svg viewBox="0 0 240 240" className="of-art of-art--eletrica">
    <path className="of-art__grade" d="M10 60H230M10 120H230M10 180H230M60 20V220M120 20V220M180 20V220" />
    <path className="of-art__onda" d="M8 120 H44 L54 120 L64 62 L78 178 L90 120 H118 L128 120 L138 42 L152 198 L164 120 H232" />
  </svg>
);

const Oleo = () => (
  <div className="of-art of-art--oleo">
    <img
      src="/images/exemplos/oficina/oleo-motor.jpg"
      alt="Óleo dourado escorrendo de um frasco para dentro do motor"
      loading="lazy"
      width="900"
      height="675"
    />
  </div>
);

const artes = { revisao: Revisao, freios: Freios, suspensao: Suspensao, eletrica: Eletrica, oleo: Oleo };

const ArteServico = ({ tipo }) => {
  const Arte = artes[tipo];
  return (
    <div className="of-art-box" aria-hidden={tipo !== 'oleo'}>
      <Arte />
    </div>
  );
};

export default ArteServico;
