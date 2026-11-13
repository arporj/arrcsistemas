import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Grid3x3, Mail, MapPin, Paintbrush, Phone, Search, Truck } from 'lucide-react';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao, Revelar } from '@/components/exemplos/Demonstracao';
import { formatarReais, irPara } from '@/components/exemplos/utilitarios';
import { contato, fortes } from '@/conteudo/construcao';
import { catalogo, estimarMaterial } from '@/dominio/construcao';
import './ConstrucaoProfissional.css';

const TODAS = 'Todas';
const categorias = [TODAS, ...new Set(catalogo.map((p) => p.categoria))];

const tiposCalculo = [
  { id: 'parede', nome: 'Parede', icone: Layers, medidas: ['Comprimento', 'Altura'] },
  { id: 'piso', nome: 'Piso', icone: Grid3x3, medidas: ['Comprimento', 'Largura'] },
  { id: 'pintura', nome: 'Pintura', icone: Paintbrush, medidas: ['Comprimento', 'Altura'] },
];

const semAcento = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
// Aceita vírgula como separador decimal, como a pessoa digita no Brasil.
const paraNumero = (texto) => Number(String(texto).replace(',', '.'));
const formatarArea = (m2) => m2.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

const Catalogo = () => {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(TODAS);
  const termo = semAcento(busca.trim());
  const visiveis = catalogo.filter((p) => (categoria === TODAS || p.categoria === categoria)
    && (!termo || semAcento(`${p.nome} ${p.medida} ${p.categoria}`).includes(termo)));

  return (
    <section id="cop-catalogo" className="cop-secao">
      <Revelar className="cop-secao__topo">
        <p className="cop-rotulo">Catálogo</p>
        <h2>Preço de balcão, sem cadastro</h2>
      </Revelar>
      <div className="cop-filtros">
        <label className="cop-busca">
          <Search size={18} aria-hidden="true" />
          <span className="cop-oculto">Buscar produto</span>
          <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar: tijolo, tinta, piso..." />
        </label>
        <div className="cop-categorias" role="group" aria-label="Filtrar por categoria">
          {categorias.map((c) => (
            <button key={c} type="button" aria-pressed={categoria === c} onClick={() => setCategoria(c)}>{c}</button>
          ))}
        </div>
      </div>
      <p className="cop-contagem" aria-live="polite">{visiveis.length} {visiveis.length === 1 ? 'produto' : 'produtos'}</p>
      {visiveis.length === 0 ? (
        <div className="cop-vazio">
          <p>Nenhum produto com “{busca}”.</p>
          <p>Tente outra palavra ou mande a lista pelo WhatsApp que a gente procura para você.</p>
          <button type="button" className="cop-link" onClick={() => { setBusca(''); setCategoria(TODAS); }}>Limpar a busca</button>
        </div>
      ) : (
        <ul className="cop-produtos">
          {visiveis.map((p) => (
            <li key={p.id} className="cop-produto">
              {p.foto
                ? <img src={p.foto} alt={p.alt} loading="lazy" width="1600" height="1067" />
                : <span className="cop-produto__sem-foto" aria-hidden="true">{p.categoria}</span>}
              <div className="cop-produto__texto">
                <p className="cop-produto__categoria">{p.categoria}</p>
                <h3>{p.nome}</h3>
                <p className="cop-produto__medida">{p.medida}</p>
                <p className="cop-produto__preco">{formatarReais(p.preco)} <small>por {p.unidade}</small></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const Calculadora = () => {
  const [tipo, setTipo] = useState('parede');
  const [medidas, setMedidas] = useState({ a: '4', b: '2,8' });
  const atual = tiposCalculo.find((t) => t.id === tipo);
  const resultado = estimarMaterial(tipo, paraNumero(medidas.a), paraNumero(medidas.b));
  const alterar = (campo) => (e) => setMedidas((m) => ({ ...m, [campo]: e.target.value.replace(/[^\d,.]/g, '') }));

  return (
    <section id="cop-calculadora" className="cop-secao cop-calculadora">
      <Revelar className="cop-secao__topo">
        <p className="cop-rotulo">Calculadora de material</p>
        <h2>Quanto material a sua obra precisa?</h2>
        <p>Digite as medidas em metros. A conta já inclui 10% de perda nos tijolos e no piso.</p>
      </Revelar>
      <div className="cop-calculadora__grade">
        <div className="cop-calculadora__entrada">
          <div className="cop-tipos" role="group" aria-label="O que você vai fazer">
            {tiposCalculo.map((t) => (
              <button key={t.id} type="button" aria-pressed={tipo === t.id} onClick={() => setTipo(t.id)}>
                <t.icone size={20} aria-hidden="true" /> {t.nome}
              </button>
            ))}
          </div>
          <div className="cop-medidas">
            {[['a', atual.medidas[0]], ['b', atual.medidas[1]]].map(([campo, rotulo]) => (
              <div key={campo} className="cop-campo">
                <label htmlFor={`cop-medida-${campo}`}>{rotulo} (m)</label>
                <input id={`cop-medida-${campo}`} type="text" inputMode="decimal" value={medidas[campo]} onChange={alterar(campo)} />
              </div>
            ))}
          </div>
        </div>
        <div className="cop-resultado" aria-live="polite">
          {resultado.itens.length === 0 ? (
            <p className="cop-resultado__vazio">Digite as duas medidas, maiores que zero, para ver a lista de material.</p>
          ) : (
            <>
              <p className="cop-resultado__area">{formatarArea(resultado.area)} m²</p>
              <ul>
                {resultado.itens.map((i) => (
                  <li key={i.id}>
                    <span><strong>{i.quantidade.toLocaleString('pt-BR')}</strong> {i.medida} · {i.nome}</span>
                    <span>{formatarReais(i.subtotal)}</span>
                  </li>
                ))}
              </ul>
              <p className="cop-resultado__total"><span>Estimativa</span><strong>{formatarReais(resultado.total)}</strong></p>
              <BotaoWhatsDemo className="cop-botao cop-botao--inteiro" classeAviso="cop-aviso">Pedir cotação desta lista</BotaoWhatsDemo>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const ConstrucaoProfissional = () => (
  <div className="cop">
    <MetaVersao titulo={contato.nome} descricao="Versão Profissional do site de exemplo para loja de materiais de construção: catálogo com busca e calculadora de material." />
    <a href="#cop-conteudo" className="cop-pular">Pular para o conteúdo</a>

    <nav className="cop-nav" aria-label="Principal">
      <span className="cop-nav__marca">{contato.marca}</span>
      <div className="cop-nav__links">
        <a href="#cop-catalogo" onClick={irPara('cop-catalogo')}>Catálogo</a>
        <a href="#cop-calculadora" onClick={irPara('cop-calculadora')}>Calculadora</a>
        <a href={contato.telefoneLink} className="cop-nav__fone"><Phone size={16} aria-hidden="true" /> {contato.telefone}</a>
      </div>
    </nav>

    <header className="cop-abertura">
      <img src="/images/exemplos/constrular/casa-pronta.jpg" alt="" className="cop-abertura__fundo" width="1600" height="1067" />
      <Revelar className="cop-abertura__texto">
        <p className="cop-rotulo">Materiais de construção</p>
        <h1>Material certo, no dia certo, na sua obra.</h1>
        <p>Consulte preços, calcule quanto material comprar e peça a cotação com frete em poucos minutos.</p>
        <div className="cop-abertura__acoes">
          <a href="#cop-calculadora" onClick={irPara('cop-calculadora')} className="cop-botao">Calcular meu material</a>
          <a href="#cop-catalogo" onClick={irPara('cop-catalogo')} className="cop-botao cop-botao--claro">Ver catálogo</a>
        </div>
      </Revelar>
    </header>

    <main id="cop-conteudo">
      <section className="cop-fortes" aria-label="Por que comprar aqui">
        {fortes.map((f, i) => (
          <Revelar key={f.titulo} atraso={i * 0.06} className="cop-forte">
            <p className="cop-forte__valor">{f.valor}</p>
            <h2>{f.titulo}</h2>
            <p>{f.texto}</p>
          </Revelar>
        ))}
      </section>

      <Catalogo />
      <Calculadora />

      <section className="cop-secao cop-entrega">
        <Truck size={36} aria-hidden="true" />
        <div>
          <h2>Entrega em 24 horas</h2>
          <p>Pedidos confirmados até as 15h saem no dia seguinte, com descarga no local da obra.</p>
        </div>
      </section>
    </main>

    <footer className="cop-rodape">
      <div className="cop-rodape__grade">
        <p className="cop-rodape__marca">{contato.marca}</p>
        <p><MapPin size={16} aria-hidden="true" /> {contato.endereco}</p>
        <p><Phone size={16} aria-hidden="true" /> <a href={contato.telefoneLink}>{contato.telefone}</a></p>
        <p><Mail size={16} aria-hidden="true" /> <a href={`mailto:${contato.email}`}>{contato.email}</a></p>
        <dl>
          {contato.horario.map(([dias, horas]) => <div key={dias}><dt>{dias}</dt><dd>{horas}</dd></div>)}
        </dl>
      </div>
      <p className="cop-rodape__nota">Site de exemplo. A loja, os preços, os prazos e os contatos são fictícios. Os consumos da calculadora são médias usadas só para a demonstração. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
    </footer>

    <BarraVersoes slug="construcao" nivel="profissional" />
  </div>
);

export default ConstrucaoProfissional;
