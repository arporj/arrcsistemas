import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao } from '@/components/exemplos/Demonstracao';
import { formatarReais } from '@/components/exemplos/utilitarios';
import { cardapio, contato, fornadas } from '@/conteudo/padaria';
import { horaEmSaoPaulo, situacaoAgora } from '@/dominio/padaria';
import './PadariaEssencial.css';

const destaques = cardapio.filter((c) => ['fermentacao', 'frances', 'broa', 'chapa', 'queijo', 'cafe'].includes(c.id));

const PadariaEssencial = () => {
  const [situacao] = useState(() => situacaoAgora(horaEmSaoPaulo()));

  return (
    <div className="pde">
      <MetaVersao titulo={contato.nome} descricao="Versão Essencial do site de exemplo para padaria: uma página com horário das fornadas, cardápio e endereço." />
      <a href="#pde-conteudo" className="pde-pular">Pular para o conteúdo</a>

      <header className="pde-topo">
        <span className="pde-marca">Padaria do <em>Seu Antônio</em></span>
        <span className={`pde-situacao${situacao.aberto ? ' pde-situacao--aberta' : ''}`}>
          <i aria-hidden="true" /> {situacao.aberto ? 'Aberto agora' : 'Fechado agora'}
        </span>
      </header>

      <main id="pde-conteudo">
        <section className="pde-abertura">
          <img src="/images/exemplos/padaria/pao-farinha.jpg" alt="Pão artesanal dourado, com farinha e cortes na casca" width="1300" height="1900" />
          <div>
            <p className="pde-desde">Desde 1980 em Rio das Ostras</p>
            <h1>Pão quente, <em>todo dia,</em> no mesmo forno.</h1>
            <p>A família do Seu Antônio acorda antes da cidade para o pão sair quente. {situacao.texto}.</p>
            <BotaoWhatsDemo className="pde-botao" classeAviso="pde-aviso">Encomendar pelo WhatsApp</BotaoWhatsDemo>
          </div>
        </section>

        <section className="pde-fornadas" aria-labelledby="pde-fornadas-titulo">
          <h2 id="pde-fornadas-titulo">Horário das fornadas</h2>
          <ol>
            {fornadas.map((f) => (
              <li key={`${f.hora}-${f.nome}`}><strong>{f.hora}h</strong> {f.nome}</li>
            ))}
          </ol>
        </section>

        <section className="pde-cardapio" aria-labelledby="pde-cardapio-titulo">
          <h2 id="pde-cardapio-titulo">Do nosso balcão</h2>
          <ul>
            {destaques.map((c) => (
              <li key={c.id}>
                <span className="pde-cardapio__nome">{c.nome}<small>{c.detalhe}</small></span>
                <span className="pde-cardapio__pontos" aria-hidden="true" />
                <span className="pde-cardapio__preco">{formatarReais(c.preco)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pde-visita" aria-labelledby="pde-visita-titulo">
          <h2 id="pde-visita-titulo">Passa aqui</h2>
          <p>{contato.endereco}, {contato.cidade}</p>
          <p>{contato.horario}</p>
          <p><a href={contato.telefoneLink}>{contato.telefone}</a></p>
        </section>
      </main>

      <footer className="pde-rodape">
        <p>Site de exemplo. A padaria, os preços e os contatos são fictícios. Foto: Pexels.</p>
        <Link to="/">Criado pela ARRC Sistemas</Link>
      </footer>

      <BarraVersoes slug="padaria" nivel="essencial" />
    </div>
  );
};

export default PadariaEssencial;
