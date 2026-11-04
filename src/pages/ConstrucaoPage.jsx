
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ClipboardList, Minus, Plus, X } from 'lucide-react';
import CenaObra, { JANELAS_ETAPAS } from '@/components/constrular/CenaObra';
import Planejador from '@/components/constrular/Planejador';
import { catalogo } from '@/dominio/construcao';
import { formatarReais, irPara, mascararTelefone, telefoneValido } from '@/components/exemplos/utilitarios';
import './ConstrucaoPage.css';

const etapas = [
  { nome: 'Fundação', titulo: 'Primeiro, a base firme.', itens: ['cimento', 'areia'] },
  { nome: 'Alvenaria', titulo: 'Parede sobe no prumo.', itens: ['tijolo'] },
  { nome: 'Cobertura', titulo: 'Telhado antes da chuva.', itens: ['telha'] },
  { nome: 'Acabamento', titulo: 'A parte que todo mundo vê.', itens: ['porcelanato', 'tinta'] },
];

const fortes = [
  { valor: '24h', titulo: 'Entrega na obra', texto: 'Para pedidos confirmados até as 15h, na região metropolitana.' },
  { valor: '2h', titulo: 'Cotação respondida', texto: 'Mande a lista e receba o preço fechado, com frete.' },
  { valor: 'ISO', titulo: 'Fornecedor conferido', texto: 'Trabalhamos com fabricantes certificados na ISO 9001.' },
];

const produto = (id) => catalogo.find((p) => p.id === id);
const destaques = catalogo.filter((p) => p.foto);
const demais = catalogo.filter((p) => !p.foto);

const LinhaProduto = ({ id, aoAdicionar }) => {
  const p = produto(id);
  return (
    <li className="co-etapa__item">
      <span>{p.nome}<small>{formatarReais(p.preco)} por {p.unidade}</small></span>
      <button type="button" onClick={() => aoAdicionar([{ id, quantidade: 1 }])} aria-label={`Colocar na lista: ${p.nome}`}><Plus size={18} /></button>
    </li>
  );
};

const PainelEtapa = ({ indice, aoAdicionar }) => {
  const etapa = etapas[indice];
  return (
    <>
      <p className="co-rotulo">Etapa {indice + 1} de {etapas.length}: {etapa.nome}</p>
      <h2 className="co-etapa__titulo">{etapa.titulo}</h2>
      <ul>{etapa.itens.map((id) => <LinhaProduto key={id} id={id} aoAdicionar={aoAdicionar} />)}</ul>
    </>
  );
};

const AberturaTexto = () => (
  <>
    <p className="co-rotulo">Materiais de construção</p>
    <h1>Toda obra começa no papel.</h1>
    <p className="co-abertura__apoio">A Constrular entrega o material de cada etapa, com preço fechado e direto na sua obra.</p>
    <p className="co-abertura__dica"><ArrowDown size={18} aria-hidden="true" /> Role para ver a casa subir</p>
  </>
);

const Obra = ({ aoAdicionar, reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const concluida = useMotionValue(1);
  const [atual, setAtual] = useState(-1);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let indice = -1;
    JANELAS_ETAPAS.forEach(([inicio], i) => {
      if (p >= inicio) indice = i;
    });
    setAtual(indice);
  });

  if (reduzido) {
    return (
      <header className="co-obra co-obra--estatica">
        <div className="co-obra__texto"><AberturaTexto /></div>
        <CenaObra progresso={concluida} reduzido />
        <div className="co-obra__lista">
          {etapas.map((_, i) => <div key={etapas[i].nome}><PainelEtapa indice={i} aoAdicionar={aoAdicionar} /></div>)}
        </div>
      </header>
    );
  }

  return (
    <header ref={ref} className="co-obra">
      <div className="co-obra__fixo">
        <div className="co-obra__texto">
          <AnimatePresence mode="wait">
            <motion.div
              key={atual}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
            >
              {atual < 0 ? <AberturaTexto /> : <PainelEtapa indice={atual} aoAdicionar={aoAdicionar} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="co-obra__cena"><CenaObra progresso={scrollYProgress} reduzido={false} /></div>
        <ol className="co-obra__regua" aria-hidden="true">
          {etapas.map((e, i) => <li key={e.nome} className={i <= atual ? 'co-obra__marca co-obra__marca--feita' : 'co-obra__marca'}>{e.nome}</li>)}
        </ol>
      </div>
    </header>
  );
};

const CasaPronta = ({ reduzido }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const margem = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const recorte = useMotionTemplate`inset(${margem}% ${margem}% ${margem}% ${margem}%)`;
  const escala = useTransform(scrollYProgress, [0, 1], [1.22, 1]);

  return (
    <figure ref={ref} className="co-casa">
      <motion.div className="co-casa__janela" style={reduzido ? undefined : { clipPath: recorte }}>
        <motion.img src="/images/exemplos/constrular/casa-pronta.jpg" alt="Casa moderna cinza com portas de vidro e gramado" loading="lazy" width="1600" height="1068" style={reduzido ? undefined : { scale: escala }} />
        <figcaption>Do papel para a <em>sua casa.</em></figcaption>
      </motion.div>
    </figure>
  );
};

const Materiais = ({ aoAdicionar }) => (
  <section id="co-materiais" className="co-materiais">
    <header className="co-secao-topo">
      <p className="co-rotulo">Materiais</p>
      <h2>Da fundação ao acabamento.</h2>
    </header>
    <div className="co-destaques">
      {destaques.map((p) => (
        <motion.article key={p.id} className="co-destaque" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <div className="co-destaque__foto"><img src={p.foto} alt={p.alt} loading="lazy" /></div>
          <div className="co-destaque__linha">
            <div>
              <h3>{p.nome}</h3>
              <p>{p.medida} · {formatarReais(p.preco)} por {p.unidade}</p>
            </div>
            <button type="button" className="co-mais" onClick={() => aoAdicionar([{ id: p.id, quantidade: 1 }])} aria-label={`Colocar na lista: ${p.nome}`}><Plus size={20} /></button>
          </div>
        </motion.article>
      ))}
    </div>
    <ul className="co-tabela">
      {demais.map((p) => (
        <li key={p.id}>
          <span className="co-tabela__nome">{p.nome}</span>
          <span className="co-tabela__medida">{p.medida}</span>
          <span className="co-tabela__preco">{formatarReais(p.preco)}<small> por {p.unidade}</small></span>
          <button type="button" className="co-mais" onClick={() => aoAdicionar([{ id: p.id, quantidade: 1 }])} aria-label={`Colocar na lista: ${p.nome}`}><Plus size={20} /></button>
        </li>
      ))}
    </ul>
  </section>
);

const validarCotacao = ({ nome, whatsapp }) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = 'Escreva seu nome ou o nome da obra.';
  if (!telefoneValido(whatsapp)) erros.whatsapp = 'Confira o número. Exemplo: (22) 99999-9999.';
  return erros;
};

const ListaLateral = ({ aberta, aoFechar, lista, aoAlterar }) => {
  const [form, setForm] = useState({ nome: '', whatsapp: '' });
  const [erros, setErros] = useState({});
  const [enviada, setEnviada] = useState(false);
  const fecharRef = useRef(null);

  const itens = Object.entries(lista).filter(([, q]) => q > 0).map(([id, quantidade]) => ({ ...produto(id), quantidade }));
  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

  useEffect(() => {
    if (!aberta) return undefined;
    fecharRef.current?.focus();
    const aoTeclar = (e) => {
      if (e.key === 'Escape') aoFechar();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aberta, aoFechar]);

  const enviar = (e) => {
    e.preventDefault();
    const encontrados = validarCotacao(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) setEnviada(true);
  };

  return (
    <AnimatePresence>
      {aberta && (
        <>
          <motion.div className="co-fundo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={aoFechar} />
          <motion.aside className="co-lista" role="dialog" aria-modal="true" aria-label="Sua lista de cotação" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 34 }}>
            <div className="co-lista__topo">
              <h2>Sua lista</h2>
              <button ref={fecharRef} type="button" onClick={aoFechar} aria-label="Fechar a lista"><X size={22} /></button>
            </div>
            {itens.length === 0 ? (
              <p className="co-lista__vazia">A lista está vazia. Use o planejador ou escolha produtos nos materiais.</p>
            ) : (
              <>
                <ul className="co-lista__itens">
                  {itens.map((i) => (
                    <li key={i.id}>
                      <div><strong>{i.nome}</strong><span>{formatarReais(i.preco * i.quantidade)}</span></div>
                      <div className="co-contador">
                        <button type="button" onClick={() => aoAlterar(i.id, -1)} aria-label={`Tirar um: ${i.nome}`}><Minus size={16} /></button>
                        <span>{i.quantidade}</span>
                        <button type="button" onClick={() => aoAlterar(i.id, 1)} aria-label={`Colocar mais um: ${i.nome}`}><Plus size={16} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="co-lista__total"><span>Total estimado</span>{formatarReais(total)}</p>
                {enviada ? (
                  <p className="co-lista__enviada" role="status">Este é um site de demonstração, então a lista não foi enviada. No site de verdade, a cotação chegaria à loja com seus dados.</p>
                ) : (
                  <form onSubmit={enviar} noValidate className="co-lista__form">
                    <label htmlFor="co-nome">Seu nome ou nome da obra</label>
                    <input id="co-nome" type="text" autoComplete="name" value={form.nome} aria-invalid={Boolean(erros.nome)} aria-describedby={erros.nome ? 'co-nome-erro' : undefined} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                    {erros.nome && <p id="co-nome-erro" className="co-erro" role="alert">{erros.nome}</p>}
                    <label htmlFor="co-whats">WhatsApp</label>
                    <input id="co-whats" type="tel" inputMode="tel" autoComplete="tel" value={form.whatsapp} aria-invalid={Boolean(erros.whatsapp)} aria-describedby={erros.whatsapp ? 'co-whats-erro' : undefined} onChange={(e) => setForm({ ...form, whatsapp: mascararTelefone(e.target.value) })} />
                    {erros.whatsapp && <p id="co-whats-erro" className="co-erro" role="alert">{erros.whatsapp}</p>}
                    <button type="submit" className="co-botao co-botao--inteiro">Pedir cotação</button>
                  </form>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

const ConstrucaoPage = () => {
  const reduzido = useReducedMotion();
  const [lista, setLista] = useState({});
  const [aberta, setAberta] = useState(false);
  const fechar = useCallback(() => setAberta(false), []);
  const totalItens = Object.values(lista).reduce((s, q) => s + q, 0);

  const adicionar = useCallback((itens) => {
    setLista((atual) => {
      const nova = { ...atual };
      itens.forEach(({ id, quantidade }) => { nova[id] = (nova[id] || 0) + quantidade; });
      return nova;
    });
  }, []);
  const alterar = (id, delta) => setLista((atual) => ({ ...atual, [id]: Math.max(0, (atual[id] || 0) + delta) }));

  return (
    <div className="constrular-page">
      <Helmet>
        <title>Constrular | Exemplo ARRC Sistemas</title>
        <meta name="description" content="Exemplo de site para loja de materiais de construção, com uma casa que se constrói na rolagem e planejador de medidas, desenvolvido pela ARRC Sistemas." />
      </Helmet>

      <a href="#co-conteudo" className="co-pular">Pular para o conteúdo</a>
      <Link to="/" className="co-voltar"><ArrowLeft size={16} /> ARRC Sistemas</Link>

      <nav className="co-nav" aria-label="Principal">
        <span className="co-nav__marca">Constrular</span>
        <div className="co-nav__links">
          <a href="#co-planejador" onClick={irPara('co-planejador')}>Planejador</a>
          <a href="#co-materiais" onClick={irPara('co-materiais')}>Materiais</a>
        </div>
        <button type="button" className="co-nav__lista" onClick={() => setAberta(true)} aria-label={`Abrir lista de cotação, ${totalItens} itens`}>
          <ClipboardList size={18} aria-hidden="true" />
          <motion.span key={totalItens} initial={reduzido ? false : { scale: 1.5 }} animate={{ scale: 1 }}>{totalItens}</motion.span>
        </button>
      </nav>

      <Obra aoAdicionar={adicionar} reduzido={reduzido} />

      <main id="co-conteudo">
        <CasaPronta reduzido={reduzido} />
        <Planejador aoAdicionar={adicionar} />
        <Materiais aoAdicionar={adicionar} />
        <section className="co-fortes" aria-label="Por que comprar aqui">
          {fortes.map((f) => (
            <div key={f.titulo} className="co-forte">
              <p className="co-forte__valor">{f.valor}</p>
              <h3>{f.titulo}</h3>
              <p>{f.texto}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="co-rodape">
        <p className="co-rotulo">Fale com a loja</p>
        <a href="tel:08005550199" className="co-rodape__telefone">0800 555 0199</a>
        <p><a href="mailto:projetos@constrular.ind.br">projetos@constrular.ind.br</a></p>
        <p>Site de exemplo. A loja, os preços, os prazos e os contatos são fictícios. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
      </footer>

      <ListaLateral aberta={aberta} aoFechar={fechar} lista={lista} aoAlterar={alterar} />
    </div>
  );
};

export default ConstrucaoPage;
