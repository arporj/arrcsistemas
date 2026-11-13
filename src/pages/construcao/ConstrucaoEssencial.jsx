import React from 'react';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao } from '@/components/exemplos/Demonstracao';
import { contato, fortes } from '@/conteudo/construcao';
import { catalogo } from '@/dominio/construcao';
import './ConstrucaoEssencial.css';

// Agrupa os produtos do catálogo por categoria, na ordem em que aparecem.
const categorias = catalogo.reduce((grupos, p) => {
  const grupo = grupos.find((g) => g.nome === p.categoria);
  if (grupo) grupo.itens.push(p.nome);
  else grupos.push({ nome: p.categoria, itens: [p.nome] });
  return grupos;
}, []);

const ConstrucaoEssencial = () => (
  <div className="coe">
    <MetaVersao titulo={contato.nome} descricao="Versão Essencial do site de exemplo para loja de materiais de construção: uma página com o que a loja vende, entrega e contato." />
    <a href="#coe-conteudo" className="coe-pular">Pular para o conteúdo</a>

    <header className="coe-topo">
      <span className="coe-marca">{contato.marca}</span>
      <a href={contato.telefoneLink} className="coe-topo__fone">{contato.telefone}</a>
    </header>

    <main id="coe-conteudo">
      <section className="coe-abertura">
        <div className="coe-abertura__texto">
          <p className="coe-rotulo">Materiais de construção</p>
          <h1>Do tijolo à tinta, entregue na sua obra.</h1>
          <p>Mande a lista de material e receba o preço fechado, com frete, em até 2 horas.</p>
          <BotaoWhatsDemo className="coe-botao" classeAviso="coe-aviso">Mandar minha lista</BotaoWhatsDemo>
        </div>
        <img src="/images/exemplos/constrular/tijolo-obra.jpg" alt="Mão com luva assentando um tijolo cerâmico" width="1600" height="1067" />
      </section>

      <section className="coe-fortes" aria-label="Por que comprar aqui">
        {fortes.map((f) => (
          <div key={f.titulo}>
            <p className="coe-fortes__valor">{f.valor}</p>
            <h2>{f.titulo}</h2>
            <p>{f.texto}</p>
          </div>
        ))}
      </section>

      <section className="coe-produtos" aria-labelledby="coe-produtos-titulo">
        <h2 id="coe-produtos-titulo">O que você encontra aqui</h2>
        <div className="coe-produtos__grade">
          {categorias.map((c) => (
            <div key={c.nome}>
              <h3>{c.nome}</h3>
              <ul>{c.itens.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="coe-contato" aria-labelledby="coe-contato-titulo">
        <h2 id="coe-contato-titulo">Loja</h2>
        <div className="coe-contato__grade">
          <p>{contato.endereco}</p>
          <dl>
            {contato.horario.map(([dias, horas]) => <div key={dias}><dt>{dias}</dt><dd>{horas}</dd></div>)}
          </dl>
          <p><a href={contato.telefoneLink}>{contato.telefone}</a><br /><a href={`mailto:${contato.email}`}>{contato.email}</a></p>
        </div>
      </section>
    </main>

    <footer className="coe-rodape">
      <p>Site de exemplo. A loja, os prazos e os contatos são fictícios. Foto: Pexels.</p>
      <Link to="/">Criado pela ARRC Sistemas</Link>
    </footer>

    <BarraVersoes slug="construcao" nivel="essencial" />
  </div>
);

export default ConstrucaoEssencial;
