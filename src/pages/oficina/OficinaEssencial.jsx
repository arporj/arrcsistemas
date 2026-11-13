import React from 'react';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao } from '@/components/exemplos/Demonstracao';
import { contato, servicos } from '@/conteudo/oficina';
import './OficinaEssencial.css';

const OficinaEssencial = () => (
  <div className="ofe">
    <MetaVersao titulo={contato.nome} descricao="Versão Essencial do site de exemplo para oficina mecânica: uma página direta com serviços, horário e contato." />
    <a href="#ofe-conteudo" className="ofe-pular">Pular para o conteúdo</a>

    <header className="ofe-topo">
      <span className="ofe-marca">{contato.marca}<small>auto center</small></span>
      <a href={contato.telefoneLink} className="ofe-topo__fone">{contato.telefone}</a>
    </header>

    <main id="ofe-conteudo">
      <section className="ofe-abertura">
        <div className="ofe-abertura__texto">
          <p className="ofe-sobre">Oficina mecânica em Rio das Ostras</p>
          <h1>Manutenção sem surpresa no orçamento.</h1>
          <p>Revisão, freios, suspensão, elétrica e troca de óleo. Antes de trocar qualquer peça, mostramos a foto e o valor.</p>
          <div className="ofe-acoes">
            <BotaoWhatsDemo className="ofe-botao" classeAviso="ofe-aviso">Chamar no WhatsApp</BotaoWhatsDemo>
            <a href={contato.telefoneLink} className="ofe-link">Ligar: {contato.telefone}</a>
          </div>
        </div>
        <img
          className="ofe-abertura__foto"
          src="/images/exemplos/oficina/disco-freio.jpg"
          alt="Disco de freio perfurado de um carro erguido no elevador"
          width="1600"
          height="1069"
        />
      </section>

      <section className="ofe-servicos" aria-labelledby="ofe-servicos-titulo">
        <h2 id="ofe-servicos-titulo">Serviços</h2>
        <ol>
          {servicos.map((s) => (
            <li key={s.n}>
              <span className="ofe-servicos__n" aria-hidden="true">{s.n}</span>
              <h3>{s.titulo}</h3>
              <p>{s.resumo}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ofe-visita" aria-labelledby="ofe-visita-titulo">
        <h2 id="ofe-visita-titulo">Onde estamos</h2>
        <div className="ofe-visita__grade">
          <div>
            <h3>Endereço</h3>
            <p>{contato.endereco}</p>
          </div>
          <div>
            <h3>Horário</h3>
            <dl>
              {contato.horario.map(([dias, horas]) => (
                <div key={dias}><dt>{dias}</dt><dd>{horas}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h3>Telefone</h3>
            <p><a href={contato.telefoneLink}>{contato.telefone}</a></p>
          </div>
        </div>
      </section>
    </main>

    <footer className="ofe-rodape">
      <p>Site de exemplo. A oficina, o endereço e o telefone são fictícios. Foto: Pexels.</p>
      <Link to="/">Criado pela ARRC Sistemas</Link>
    </footer>

    <BarraVersoes slug="oficina" nivel="essencial" />
  </div>
);

export default OficinaEssencial;
