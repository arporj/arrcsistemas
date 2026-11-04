import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Move } from 'lucide-react';
import { estimarMaterial } from '@/dominio/construcao';
import { formatarReais } from '@/components/exemplos/utilitarios';

const LARGURA_MAXIMA = 12;
const ALTURA_MAXIMA = 8;
const MEDIDA_MINIMA = 1;

const ABAS = [
  { id: 'piso', nome: 'Piso', rotulos: ['Comprimento', 'Largura'], nota: 'com 10% de perda' },
  { id: 'parede', nome: 'Parede', rotulos: ['Comprimento', 'Altura'], nota: 'com 10% de perda' },
  { id: 'pintura', nome: 'Pintura', rotulos: ['Comprimento', 'Altura'], nota: 'em duas demãos' },
];

const limitar = (valor, maximo) => Math.min(maximo, Math.max(MEDIDA_MINIMA, valor));

/** Área de medidas: arraste o canto ou digite os valores. Entrega o material estimado ao chamador. */
const Planejador = ({ aoAdicionar }) => {
  const [aba, setAba] = useState('piso');
  const [largura, setLargura] = useState('6');
  const [altura, setAltura] = useState('4.5');
  const [adicionado, setAdicionado] = useState(false);
  const [metro, setMetro] = useState(40);
  const areaRef = useRef(null);
  const arrastando = useRef(false);

  const config = ABAS.find((a) => a.id === aba);
  const resultado = useMemo(() => estimarMaterial(aba, largura, altura), [aba, largura, altura]);
  const invalido = resultado.itens.length === 0;
  const larguraVisivel = limitar(Number(largura) || MEDIDA_MINIMA, LARGURA_MAXIMA);
  const alturaVisivel = limitar(Number(altura) || MEDIDA_MINIMA, ALTURA_MAXIMA);

  useEffect(() => {
    const area = areaRef.current;
    const medir = () => setMetro(area.clientWidth / LARGURA_MAXIMA);
    const observador = new ResizeObserver(medir);
    observador.observe(area);
    medir();
    return () => observador.disconnect();
  }, []);

  useEffect(() => setAdicionado(false), [aba, largura, altura]);

  const mover = (e) => {
    if (!arrastando.current) return;
    const r = areaRef.current.getBoundingClientRect();
    setLargura(limitar((e.clientX - r.left) / metro, LARGURA_MAXIMA).toFixed(1));
    setAltura(limitar((r.bottom - e.clientY) / metro, ALTURA_MAXIMA).toFixed(1));
  };
  const iniciar = (e) => {
    arrastando.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const soltar = () => {
    arrastando.current = false;
  };

  return (
    <section id="co-planejador" className="co-planejador">
      <header className="co-secao-topo">
        <p className="co-rotulo">Planejador</p>
        <h2>Arraste. Veja quanto custa.</h2>
      </header>

      <div className="co-plan">
        <div className="co-plan__prancheta">
          <div
            ref={areaRef}
            className="co-plan__area"
            style={{ '--co-metro': `${metro}px`, aspectRatio: `${LARGURA_MAXIMA} / ${ALTURA_MAXIMA}` }}
          >
            <motion.div
              className={`co-plan__comodo co-plan__comodo--${aba}`}
              animate={{ width: larguraVisivel * metro, height: alturaVisivel * metro }}
              transition={{ type: 'spring', stiffness: 700, damping: 45, mass: 0.4 }}
            >
              <span className="co-plan__cota co-plan__cota--largura">{larguraVisivel.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} m</span>
              <span className="co-plan__cota co-plan__cota--altura">{alturaVisivel.toLocaleString('pt-BR', { minimumFractionDigits: 1 })} m</span>
              <button
                type="button"
                className="co-plan__alca"
                onPointerDown={iniciar}
                onPointerMove={mover}
                onPointerUp={soltar}
                onPointerCancel={soltar}
                aria-label="Arraste para mudar as medidas. Você também pode digitar nos campos ao lado."
                tabIndex={-1}
              >
                <Move size={18} aria-hidden="true" />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="co-plan__painel">
          <div className="co-abas" role="group" aria-label="O que você vai fazer">
            {ABAS.map((a) => (
              <button type="button" key={a.id} aria-pressed={aba === a.id} className={aba === a.id ? 'co-aba co-aba--ativa' : 'co-aba'} onClick={() => setAba(a.id)}>{a.nome}</button>
            ))}
          </div>
          <div className="co-medidas">
            <label>
              {config.rotulos[0]} (m)
              <input type="number" inputMode="decimal" min="0" max="100" step="0.1" value={largura} onChange={(e) => setLargura(e.target.value)} />
            </label>
            <label>
              {config.rotulos[1]} (m)
              <input type="number" inputMode="decimal" min="0" max="100" step="0.1" value={altura} onChange={(e) => setAltura(e.target.value)} />
            </label>
          </div>
          {invalido ? (
            <p className="co-plan__aviso" role="status">Preencha as duas medidas com números maiores que zero para ver a conta.</p>
          ) : (
            <div aria-live="polite">
              <p className="co-plan__area-texto">{resultado.area.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m², {config.nota}</p>
              <ul className="co-plan__itens">
                {resultado.itens.map((i) => (
                  <li key={i.id}>
                    <span><strong>{i.quantidade.toLocaleString('pt-BR')}</strong> {i.medida}<small>{i.nome}</small></span>
                    <span>{formatarReais(i.subtotal)}</span>
                  </li>
                ))}
              </ul>
              <p className="co-plan__total">{formatarReais(resultado.total)}</p>
              <button
                type="button"
                className="co-botao co-botao--inteiro"
                onClick={() => {
                  aoAdicionar(resultado.itens.map((i) => ({ id: i.id, quantidade: i.quantidade })));
                  setAdicionado(true);
                }}
              >
                {adicionado ? 'Colocado na lista' : 'Colocar na lista'}
              </button>
            </div>
          )}
          <p className="co-plan__nota">Estimativa com médias de mercado. Confirme as medidas com o responsável pela obra.</p>
        </div>
      </div>
    </section>
  );
};

export default Planejador;
