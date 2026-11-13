import React from 'react';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao } from '@/components/exemplos/Demonstracao';
import { contato, tratamentos } from '@/conteudo/odonto';
import './OdontoEssencial.css';

const OdontoEssencial = () => (
  <div className="ode">
    <MetaVersao titulo={contato.nome} descricao="Versão Essencial do site de exemplo para clínica odontológica: uma página com tratamentos, horário, convênios e contato." />
    <a href="#ode-conteudo" className="ode-pular">Pular para o conteúdo</a>

    <header className="ode-topo">
      <span className="ode-marca">{contato.marca}<small>odontologia</small></span>
      <a href={contato.telefoneLink} className="ode-topo__fone">{contato.telefone}</a>
    </header>

    <main id="ode-conteudo">
      <section className="ode-abertura">
        <h1>Dentista sem pressa, <em>do jeito que você precisa.</em></h1>
        <p>Atendimento calmo, explicação de cada etapa e orçamento por escrito antes de começar.</p>
        <BotaoWhatsDemo className="ode-botao" classeAviso="ode-aviso">Agendar pelo WhatsApp</BotaoWhatsDemo>
        <img src="/images/exemplos/odonto/consultorio.jpg" alt="Consultório claro, com cadeira odontológica e janela ampla" width="1600" height="1068" />
      </section>

      <section className="ode-tratamentos" aria-labelledby="ode-tratamentos-titulo">
        <h2 id="ode-tratamentos-titulo">Tratamentos</h2>
        <ul>
          {tratamentos.map((t) => (
            <li key={t.id}>
              <h3>{t.nome}</h3>
              <p>{t.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="ode-info" aria-label="Horário, convênios e endereço">
        <div>
          <h2>Horário</h2>
          <dl>
            {contato.horario.map(([dias, horas]) => <div key={dias}><dt>{dias}</dt><dd>{horas}</dd></div>)}
          </dl>
        </div>
        <div>
          <h2>Convênios</h2>
          <p>{contato.convenios.join(', ')}.</p>
        </div>
        <div>
          <h2>Endereço</h2>
          <p>{contato.endereco}</p>
          <p><a href={contato.telefoneLink}>{contato.telefone}</a></p>
        </div>
      </section>
    </main>

    <footer className="ode-rodape">
      <p>Site de exemplo. A clínica e os contatos são fictícios. Em um site real, aqui entram o nome e o CRO do responsável técnico. Foto: Pexels.</p>
      <Link to="/">Criado pela ARRC Sistemas</Link>
    </footer>

    <BarraVersoes slug="odonto" nivel="essencial" />
  </div>
);

export default OdontoEssencial;
