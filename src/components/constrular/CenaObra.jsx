import React from 'react';
import { motion, useTransform } from 'framer-motion';

const ESCALA = 30;
const ORIGEM = { x: 335, y: 200 };
const COS = 0.866;
const SEN = 0.5;
const BASE = 0.5;
const TOPO_PAREDE = 3.5;
const CUMEEIRA = 5.7;
const BEIRAL = 0.35;

// Faixas da rolagem em que cada etapa entra na cena.
export const JANELAS_ETAPAS = [[0.12, 0.28], [0.3, 0.46], [0.48, 0.64], [0.66, 0.82]];

const iso = (x, y, z = 0) => [ORIGEM.x + (x - y) * ESCALA * COS, ORIGEM.y + (x + y) * ESCALA * SEN - z * ESCALA];
const caminho = (pontos) => `M${pontos.map(([x, y, z]) => iso(x, y, z).map((n) => n.toFixed(1)).join(' ')).join('L')}Z`;

const caixa = (material, x, y, z, l, p, a) => [
  { d: caminho([[x, y, z + a], [x + l, y, z + a], [x + l, y + p, z + a], [x, y + p, z + a]]), classe: `co-f co-f--${material}-topo` },
  { d: caminho([[x, y + p, z], [x + l, y + p, z], [x + l, y + p, z + a], [x, y + p, z + a]]), classe: `co-f co-f--${material}-esq` },
  { d: caminho([[x + l, y, z], [x + l, y + p, z], [x + l, y + p, z + a], [x + l, y, z + a]]), classe: `co-f co-f--${material}-dir` },
];

const faceFrente = (classe, x1, x2, z1, z2) => ({ d: caminho([[x1, 8, z1], [x2, 8, z1], [x2, 8, z2], [x1, 8, z2]]), classe: `co-f ${classe}` });
const faceLado = (classe, y1, y2, z1, z2) => ({ d: caminho([[10, y1, z1], [10, y2, z1], [10, y2, z2], [10, y1, z2]]), classe: `co-f ${classe}` });

const fundacao = caixa('concreto', -0.6, -0.6, 0, 11.2, 9.2, BASE);

const alvenaria = [
  ...caixa('tijolo', 0, 0, BASE, 0.25, 8, 3),
  ...caixa('tijolo', 0, 0, BASE, 10, 0.25, 3),
  ...caixa('tijolo', 5, 0, BASE, 0.2, 8, 3),
  ...caixa('tijolo', 0, 7.75, BASE, 10, 0.25, 3),
  ...caixa('tijolo', 9.75, 0, BASE, 0.25, 8, 3),
];
const fiadas = [1, 1.5, 2, 2.5, 3].flatMap((z) => [
  { d: `M${iso(0, 8, z).join(' ')}L${iso(10, 8, z).join(' ')}` },
  { d: `M${iso(10, 8, z).join(' ')}L${iso(10, 0, z).join(' ')}` },
]);

const cobertura = [
  { d: caminho([[-BEIRAL, -BEIRAL, TOPO_PAREDE], [10 + BEIRAL, -BEIRAL, TOPO_PAREDE], [10 + BEIRAL, 4, CUMEEIRA], [-BEIRAL, 4, CUMEEIRA]]), classe: 'co-f co-f--telhado-tras' },
  { d: caminho([[10, 0, TOPO_PAREDE], [10, 8, TOPO_PAREDE], [10, 4, CUMEEIRA]]), classe: 'co-f co-f--tijolo-dir' },
  { d: caminho([[-BEIRAL, 8 + BEIRAL, TOPO_PAREDE], [10 + BEIRAL, 8 + BEIRAL, TOPO_PAREDE], [10 + BEIRAL, 4, CUMEEIRA], [-BEIRAL, 4, CUMEEIRA]]), classe: 'co-f co-f--telhado-frente' },
];
const linhasTelha = [0.2, 0.4, 0.6, 0.8].map((t) => {
  const y = 8 + BEIRAL - t * (4 + BEIRAL);
  const z = TOPO_PAREDE + t * (CUMEEIRA - TOPO_PAREDE);
  return { d: `M${iso(-BEIRAL, y, z).join(' ')}L${iso(10 + BEIRAL, y, z).join(' ')}` };
});

const acabamento = [
  faceFrente('co-f--reboco-esq', 0, 10, BASE, TOPO_PAREDE),
  faceLado('co-f--reboco-dir', 0, 8, BASE, TOPO_PAREDE),
  { d: caminho([[10, 0, TOPO_PAREDE], [10, 8, TOPO_PAREDE], [10, 4, CUMEEIRA]]), classe: 'co-f co-f--reboco-dir' },
  faceFrente('co-f--vidro', 1, 3, 1.4, 2.8),
  faceFrente('co-f--vidro', 4, 5.6, 1.4, 2.8),
  faceFrente('co-f--porta', 6.8, 8, BASE, 2.7),
  faceLado('co-f--vidro', 1.2, 3, 1.4, 2.8),
  faceLado('co-f--vidro', 4.8, 6.8, 1.4, 2.8),
];
const jardim = caixa('jardim', -1.8, -1.8, -0.3, 13.6, 11.6, 0.3);
const calcada = { d: caminho([[6.6, 8.6, 0.01], [8.2, 8.6, 0.01], [8.2, 9.8, 0.01], [6.6, 9.8, 0.01]]), classe: 'co-f co-f--concreto-topo' };

const contornos = [...fundacao, ...alvenaria.slice(9), ...cobertura.slice(1), faceFrente('', 1, 3, 1.4, 2.8), faceFrente('', 6.8, 8, BASE, 2.7), faceLado('', 1.2, 3, 1.4, 2.8)];

const Arvore = ({ x, y, altura }) => {
  const [cx, cy] = iso(x, y, 0);
  return (
    <g>
      <path d={`M${cx} ${cy}V${cy - altura * 0.6}`} className="co-arvore__tronco" />
      <circle cx={cx} cy={cy - altura} r={altura * 0.5} className="co-arvore__copa" />
    </g>
  );
};

const Camada = ({ progresso, janela, reduzido, children }) => {
  const [inicio, fim] = janela;
  const y = useTransform(progresso, [inicio, fim], [-100, 0]);
  const opacity = useTransform(progresso, [inicio, inicio + 0.04], [0, 1]);
  return <motion.g style={reduzido ? undefined : { y, opacity }}>{children}</motion.g>;
};

const Faces = ({ lista }) => lista.map((f) => <path key={`${f.classe}-${f.d}`} d={f.d} className={f.classe} />);

const Cota = ({ de, ate, texto }) => {
  const [x1, y1] = iso(...de);
  const [x2, y2] = iso(...ate);
  return (
    <g className="co-cota">
      <path d={`M${x1} ${y1}L${x2} ${y2}`} />
      <circle cx={x1} cy={y1} r="2.5" />
      <circle cx={x2} cy={y2} r="2.5" />
      <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 16} textAnchor="middle">{texto}</text>
    </g>
  );
};

/** Casa isométrica: nasce como desenho técnico e ganha material etapa por etapa, conforme a rolagem. */
const CenaObra = ({ progresso, reduzido }) => {
  const opacidadeDesenho = useTransform(progresso, [0.7, 0.84], [1, 0]);
  const opacidadeJardim = useTransform(progresso, [JANELAS_ETAPAS[3][0], JANELAS_ETAPAS[3][1]], [0, 1]);

  return (
    <svg viewBox="0 0 720 560" className="co-cena" role="img" aria-label="Desenho de uma casa em perspectiva, construída etapa por etapa">
      <motion.g style={reduzido ? undefined : { opacity: opacidadeJardim }}>
        <Faces lista={jardim} />
        <path d={calcada.d} className={calcada.classe} />
      </motion.g>

      <Camada progresso={progresso} janela={JANELAS_ETAPAS[0]} reduzido={reduzido}><Faces lista={fundacao} /></Camada>
      <Camada progresso={progresso} janela={JANELAS_ETAPAS[1]} reduzido={reduzido}>
        <Faces lista={alvenaria} />
        {fiadas.map((f) => <path key={f.d} d={f.d} className="co-fiada-linha" />)}
      </Camada>
      <Camada progresso={progresso} janela={JANELAS_ETAPAS[3]} reduzido={reduzido}><Faces lista={acabamento} /></Camada>
      <Camada progresso={progresso} janela={JANELAS_ETAPAS[2]} reduzido={reduzido}>
        <Faces lista={cobertura} />
        {linhasTelha.map((f) => <path key={f.d} d={f.d} className="co-telha-linha" />)}
      </Camada>

      <motion.g style={reduzido ? undefined : { opacity: opacidadeJardim }}>
        <Arvore x={12} y={1.5} altura={62} />
        <Arvore x={1} y={10.4} altura={48} />
      </motion.g>

      {!reduzido && (
        <motion.g style={{ opacity: opacidadeDesenho }}>
          {contornos.map((f, i) => (
            <motion.path
              key={`${f.d}-${i}`}
              d={f.d}
              className="co-traco"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 + i * 0.05, ease: 'easeInOut' }}
            />
          ))}
          <Cota de={[0, 9.8, 0]} ate={[10, 9.8, 0]} texto="10,00 m" />
          <Cota de={[11.8, 0, 0]} ate={[11.8, 8, 0]} texto="8,00 m" />
        </motion.g>
      )}
    </svg>
  );
};

export default CenaObra;
