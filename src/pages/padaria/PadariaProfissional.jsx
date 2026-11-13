import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Clock, MapPin, Minus, Phone, Plus, ShoppingBag, X } from 'lucide-react';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { MetaVersao, Revelar } from '@/components/exemplos/Demonstracao';
import { formatarReais, irPara } from '@/components/exemplos/utilitarios';
import { CATEGORIAS, cardapio, contato, depoimento, fornadas } from '@/conteudo/padaria';
import { ajustarQuantidade, horaEmSaoPaulo, resumirEncomenda, situacaoAgora } from '@/dominio/padaria';
import './PadariaProfissional.css';

const TODAS = 'Tudo';

const Cardapio = ({ quantidades, aoAlterar }) => {
  const [filtro, setFiltro] = useState(TODAS);
  const reduzido = useReducedMotion();
  const visiveis = filtro === TODAS ? cardapio : cardapio.filter((c) => c.categoria === filtro);

  return (
    <>
      <div className="pdp-filtros" role="group" aria-label="Filtrar o cardápio">
        {[TODAS, ...CATEGORIAS].map((c) => (
          <button key={c} type="button" aria-pressed={filtro === c} onClick={() => setFiltro(c)}>{c}</button>
        ))}
      </div>
      <motion.ul layout={!reduzido} className="pdp-produtos">
        <AnimatePresence initial={false}>
          {visiveis.map((c) => {
            const q = quantidades[c.id] || 0;
            return (
              <motion.li
                key={c.id}
                layout={!reduzido}
                initial={reduzido ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduzido ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={q > 0 ? 'pdp-produto pdp-produto--escolhido' : 'pdp-produto'}
              >
                <p className="pdp-produto__categoria">{c.categoria}</p>
                <h3>{c.nome}</h3>
                <p className="pdp-produto__detalhe">{c.detalhe}</p>
                <div className="pdp-produto__rodape">
                  <span className="pdp-produto__preco">{formatarReais(c.preco)}</span>
                  {q === 0 ? (
                    <button type="button" className="pdp-adicionar" onClick={() => aoAlterar(c.id, 1)} aria-label={`Adicionar ${c.nome}`}>
                      <Plus size={18} aria-hidden="true" /> Adicionar
                    </button>
                  ) : (
                    <div className="pdp-contador">
                      <button type="button" onClick={() => aoAlterar(c.id, -1)} aria-label={`Tirar um: ${c.nome}`}><Minus size={18} /></button>
                      <span aria-live="polite" aria-label={`${q} na sacola: ${c.nome}`}>{q}</span>
                      <button type="button" onClick={() => aoAlterar(c.id, 1)} aria-label={`Colocar mais um: ${c.nome}`}><Plus size={18} /></button>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};

const Sacola = ({ resumo, aberta, aoAbrir, aoFechar, aoLimpar }) => {
  const [enviada, setEnviada] = useState(false);
  if (resumo.itens === 0) return null;

  return (
    <div className="pdp-sacola">
      {aberta ? (
        <div className="pdp-sacola__painel" role="dialog" aria-label="Sua sacola">
          <div className="pdp-sacola__topo">
            <h2>Sua sacola</h2>
            <button type="button" onClick={aoFechar} aria-label="Fechar a sacola"><X size={20} /></button>
          </div>
          <ul>
            {resumo.linhas.map((l) => (
              <li key={l.id}><span>{l.quantidade}× {l.nome}</span><span>{formatarReais(l.subtotal)}</span></li>
            ))}
          </ul>
          <p className="pdp-sacola__total"><span>Total</span><strong>{formatarReais(resumo.total)}</strong></p>
          {enviada ? (
            <p className="pdp-sacola__aviso" role="status">
              Este é um site de demonstração, então o pedido não foi enviado. No site de verdade, ele abriria no WhatsApp da padaria já com a lista e o total.
            </p>
          ) : (
            <button type="button" className="pdp-botao pdp-botao--inteiro" onClick={() => setEnviada(true)}>Enviar pedido pelo WhatsApp</button>
          )}
          <button type="button" className="pdp-link" onClick={() => { setEnviada(false); aoLimpar(); }}>Esvaziar a sacola</button>
        </div>
      ) : (
        <button type="button" className="pdp-sacola__resumo" onClick={aoAbrir}>
          <ShoppingBag size={20} aria-hidden="true" />
          <span>{resumo.itens} {resumo.itens === 1 ? 'item' : 'itens'}</span>
          <strong>{formatarReais(resumo.total)}</strong>
        </button>
      )}
    </div>
  );
};

const PadariaProfissional = () => {
  const [situacao] = useState(() => situacaoAgora(horaEmSaoPaulo()));
  const [quantidades, setQuantidades] = useState({});
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const resumo = resumirEncomenda(cardapio, quantidades);

  const alterar = (id, delta) => setQuantidades((atuais) => ({ ...atuais, [id]: ajustarQuantidade(atuais[id], delta) }));

  return (
    <div className="pdp">
      <MetaVersao titulo={contato.nome} descricao="Versão Profissional do site de exemplo para padaria: cardápio com filtro, sacola com total e pedido pelo WhatsApp." />
      <a href="#pdp-conteudo" className="pdp-pular">Pular para o conteúdo</a>

      <nav className="pdp-nav" aria-label="Principal">
        <span className="pdp-nav__marca">Seu Antônio</span>
        <div className="pdp-nav__links">
          <a href="#pdp-cardapio" onClick={irPara('pdp-cardapio')}>Cardápio</a>
          <a href="#pdp-historia" onClick={irPara('pdp-historia')}>História</a>
          <a href="#pdp-visita" onClick={irPara('pdp-visita')}>Visitar</a>
        </div>
      </nav>

      <header className="pdp-abertura">
        <Revelar className="pdp-abertura__texto">
          <p className={`pdp-agora${situacao.aberto ? ' pdp-agora--aberta' : ''}`}>
            <Clock size={16} aria-hidden="true" />
            <span><strong>{situacao.aberto ? 'Aberto agora.' : 'Fechado agora.'}</strong> {situacao.texto}</span>
          </p>
          <h1>Pão de fermentação natural e o pão na chapa <em>mais pedido da cidade.</em></h1>
          <p>Escolha no cardápio, monte a sacola e mande o pedido. Separamos para você retirar no balcão.</p>
          <a href="#pdp-cardapio" onClick={irPara('pdp-cardapio')} className="pdp-botao">Ver o cardápio</a>
        </Revelar>
        <div className="pdp-abertura__fotos">
          <img src="/images/exemplos/padaria/pao-farinha.jpg" alt="Pão artesanal dourado, com farinha e cortes na casca" width="1300" height="1900" />
          <img src="/images/exemplos/padaria/fornada.jpg" alt="Pães artesanais recém-saídos do forno" width="1600" height="1067" />
        </div>
      </header>

      <main id="pdp-conteudo">
        <section className="pdp-fornadas" aria-label="Horário das fornadas">
          {fornadas.map((f) => <p key={`${f.hora}-${f.nome}`}><strong>{f.hora}h</strong> {f.nome}</p>)}
        </section>

        <section id="pdp-cardapio" className="pdp-secao">
          <Revelar className="pdp-secao__topo">
            <h2>Cardápio</h2>
            <p>Preços de balcão. A sacola mostra o total enquanto você escolhe.</p>
          </Revelar>
          <Cardapio quantidades={quantidades} aoAlterar={alterar} />
        </section>

        <section id="pdp-historia" className="pdp-secao pdp-historia">
          <Revelar como="figure">
            <img src="/images/exemplos/padaria/maos-pao.jpg" alt="Mãos de padeiro segurando um pão de casca dourada" loading="lazy" width="1600" height="1067" />
          </Revelar>
          <Revelar atraso={0.1}>
            <h2>Desde 1980 no mesmo endereço</h2>
            <p>A padaria nasceu com um forno a lenha no coração de Rio das Ostras. As receitas continuam as mesmas, e cada massa ainda fermenta o tempo que precisa.</p>
            <blockquote>
              <p>“{depoimento.texto}”</p>
              <cite>{depoimento.autor}</cite>
            </blockquote>
          </Revelar>
        </section>

        <section id="pdp-visita" className="pdp-secao pdp-visita">
          <h2>Venha buscar quentinho</h2>
          <div className="pdp-visita__dados">
            <p><MapPin aria-hidden="true" /> <span>{contato.endereco}<br />{contato.cidade}</span></p>
            <p><Clock aria-hidden="true" /> <span>{contato.horario}</span></p>
            <p><Phone aria-hidden="true" /> <a href={contato.telefoneLink}>{contato.telefone}</a></p>
          </div>
        </section>
      </main>

      <footer className="pdp-rodape">
        <p>Site de exemplo. A padaria, os preços, os horários e os contatos são fictícios. Fotos: Pexels.</p>
        <Link to="/">Criado pela ARRC Sistemas</Link>
      </footer>

      <Sacola
        resumo={resumo}
        aberta={sacolaAberta}
        aoAbrir={() => setSacolaAberta(true)}
        aoFechar={() => setSacolaAberta(false)}
        aoLimpar={() => { setQuantidades({}); setSacolaAberta(false); }}
      />
      <BarraVersoes slug="padaria" nivel="profissional" />
    </div>
  );
};

export default PadariaProfissional;
