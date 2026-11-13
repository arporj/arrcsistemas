import React from 'react';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao } from '@/components/exemplos/Demonstracao';
import { contato, eventos, foto, incluso } from '@/conteudo/festas';
import './FestasEssencial.css';

const FestasEssencial = () => (
  <div className="fee">
    <MetaVersao titulo={contato.nome} descricao="Versão Essencial do site de exemplo para casa de festas: uma página com tipos de evento, o que está incluso e contato." />
    <a href="#fee-conteudo" className="fee-pular">Pular para o conteúdo</a>

    <header className="fee-topo">
      <p className="fee-marca">{contato.marca}</p>
      <p className="fee-topo__sub">Casa de festas em Rio das Ostras</p>
    </header>

    <main id="fee-conteudo">
      <section className="fee-abertura">
        <h1>Um salão claro para os dias que você vai lembrar.</h1>
        <img src={foto.claro.src} alt={foto.claro.alt} width="1600" height="1067" />
        <div className="fee-abertura__rodape">
          <p>Casamentos, formaturas, aniversários e eventos de empresa, de 50 a 400 convidados.</p>
          <BotaoWhatsDemo className="fee-botao" classeAviso="fee-aviso">Agendar uma visita</BotaoWhatsDemo>
        </div>
      </section>

      <section className="fee-eventos" aria-labelledby="fee-eventos-titulo">
        <h2 id="fee-eventos-titulo">Festas que recebemos</h2>
        <dl>
          {eventos.map((e) => (
            <div key={e.id}>
              <dt>{e.nome}</dt>
              <dd>{e.texto}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="fee-incluso" aria-labelledby="fee-incluso-titulo">
        <h2 id="fee-incluso-titulo">Já incluso no aluguel</h2>
        <ul>
          {incluso.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </section>

      <section className="fee-contato" aria-labelledby="fee-contato-titulo">
        <h2 id="fee-contato-titulo">Venha conhecer</h2>
        <p>{contato.endereco}</p>
        <p>{contato.visitas}</p>
        <p><a href={contato.telefoneLink}>{contato.telefone}</a> · <a href={`mailto:${contato.email}`}>{contato.email}</a></p>
      </section>
    </main>

    <footer className="fee-rodape">
      <p>Site de exemplo. A casa, os salões e os contatos são fictícios. Foto: Pexels.</p>
      <Link to="/">Criado pela ARRC Sistemas</Link>
    </footer>

    <BarraVersoes slug="casa-de-festas" nivel="essencial" />
  </div>
);

export default FestasEssencial;
