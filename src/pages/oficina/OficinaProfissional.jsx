import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Camera, Check, ClipboardCheck, Disc, Droplets, Gauge, MapPin, Menu, MessageSquare, Phone, Wrench, X, Zap } from 'lucide-react';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { BotaoWhatsDemo, MetaVersao, Revelar } from '@/components/exemplos/Demonstracao';
import { useFormulario } from '@/components/exemplos/useFormulario';
import { irPara } from '@/components/exemplos/utilitarios';
import { contato, perguntas, servicos, tiposServico } from '@/conteudo/oficina';
import { validarOrcamento } from '@/dominio/oficina';
import './OficinaProfissional.css';

const icones = { revisao: ClipboardCheck, freios: Disc, suspensao: Gauge, eletrica: Zap, oleo: Droplets };

const passos = [
  { icone: MessageSquare, titulo: 'Você conta o problema', texto: 'Pelo formulário ou pelo WhatsApp, com o modelo do carro.' },
  { icone: Wrench, titulo: 'A gente mede e fotografa', texto: 'Diagnóstico com scanner e foto de cada peça com desgaste.' },
  { icone: Camera, titulo: 'Você aprova o que fazer', texto: 'Recebe o valor por item e escolhe o que fazer agora.' },
];

const galeria = [
  { src: '/images/exemplos/oficina/freio-medicao.jpg', alt: 'Mão de mecânico medindo um freio com micrômetro', legenda: 'Medição antes da troca' },
  { src: '/images/exemplos/oficina/oleo-motor.jpg', alt: 'Óleo novo sendo colocado no motor', legenda: 'Óleo e filtros originais' },
  { src: '/images/exemplos/oficina/disco-freio.jpg', alt: 'Disco de freio perfurado de um carro erguido no elevador', legenda: 'Freios revisados no elevador' },
];

const vazio = { nome: '', whatsapp: '', veiculo: '', tipo: tiposServico[0], descricao: '' };

const Navegacao = () => {
  const [aberto, setAberto] = useState(false);
  const links = [['ofp-servicos', 'Serviços'], ['ofp-como', 'Como funciona'], ['ofp-duvidas', 'Dúvidas']];
  const clicar = (id) => (e) => {
    setAberto(false);
    irPara(id)(e);
  };
  return (
    <nav className="ofp-nav" aria-label="Principal">
      <div className="ofp-nav__linha">
        <a href="#ofp-inicio" onClick={clicar('ofp-inicio')} className="ofp-nav__marca">{contato.marca}</a>
        <div className="ofp-nav__links">
          {links.map(([id, nome]) => <a key={id} href={`#${id}`} onClick={clicar(id)}>{nome}</a>)}
          <a href="#ofp-orcamento" onClick={clicar('ofp-orcamento')} className="ofp-botao ofp-botao--pequeno">Pedir orçamento</a>
        </div>
        <button type="button" className="ofp-nav__menu" onClick={() => setAberto(!aberto)} aria-expanded={aberto} aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}>
          {aberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {aberto && (
        <div className="ofp-nav__gaveta">
          {[...links, ['ofp-orcamento', 'Pedir orçamento']].map(([id, nome]) => <a key={id} href={`#${id}`} onClick={clicar(id)}>{nome}</a>)}
        </div>
      )}
    </nav>
  );
};

const Erro = ({ id, texto }) => texto && <p id={id} className="ofp-erro" role="alert"><AlertCircle size={15} aria-hidden="true" /> {texto}</p>;

const Orcamento = () => {
  const { valores, erros, enviado, enviar, recomecar, ligar, alterar } = useFormulario(vazio, validarOrcamento);

  if (enviado) {
    return (
      <div className="ofp-sucesso" role="status">
        <span className="ofp-sucesso__icone"><Check size={28} aria-hidden="true" /></span>
        <h3>Pedido preenchido, {valores.nome.trim().split(' ')[0]}.</h3>
        <p>Este é um site de demonstração, então nada foi enviado nem guardado. No site de verdade, o pedido chegaria ao WhatsApp da oficina.</p>
        <button type="button" className="ofp-link" onClick={recomecar}>Preencher de novo</button>
      </div>
    );
  }

  return (
    <form className="ofp-form" onSubmit={enviar} noValidate>
      <div className="ofp-form__linha">
        <div className="ofp-campo">
          <label htmlFor="ofp-nome">Seu nome</label>
          <input {...ligar('nome', 'ofp')} type="text" autoComplete="name" />
          <Erro id="ofp-nome-erro" texto={erros.nome} />
        </div>
        <div className="ofp-campo">
          <label htmlFor="ofp-whatsapp">WhatsApp</label>
          <input {...ligar('whatsapp', 'ofp')} type="tel" inputMode="tel" autoComplete="tel" placeholder="(22) 99999-9999" />
          <Erro id="ofp-whatsapp-erro" texto={erros.whatsapp} />
        </div>
      </div>
      <div className="ofp-campo">
        <label htmlFor="ofp-veiculo">Carro, modelo e ano</label>
        <input {...ligar('veiculo', 'ofp')} type="text" placeholder="Exemplo: Onix 2019" />
        <Erro id="ofp-veiculo-erro" texto={erros.veiculo} />
      </div>
      <div className="ofp-campo">
        <label htmlFor="ofp-tipo">O que você precisa?</label>
        <select id="ofp-tipo" value={valores.tipo} onChange={alterar('tipo')}>
          {tiposServico.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="ofp-campo">
        <label htmlFor="ofp-descricao">O que está acontecendo? (opcional)</label>
        <textarea id="ofp-descricao" rows={3} value={valores.descricao} onChange={alterar('descricao')} />
      </div>
      <p className="ofp-form__nota">Usamos estes dados só para responder ao seu pedido.</p>
      <button type="submit" className="ofp-botao">Pedir orçamento <ArrowRight size={18} aria-hidden="true" /></button>
    </form>
  );
};

const OficinaProfissional = () => (
  <div className="ofp">
    <MetaVersao titulo={contato.nome} descricao="Versão Profissional do site de exemplo para oficina mecânica: serviços, galeria, dúvidas frequentes e pedido de orçamento." />
    <a href="#ofp-conteudo" className="ofp-pular">Pular para o conteúdo</a>
    <Navegacao />

    <header id="ofp-inicio" className="ofp-abertura">
      <img src="/images/exemplos/oficina/oleo-motor.jpg" alt="" className="ofp-abertura__fundo" width="1600" height="1067" />
      <div className="ofp-abertura__conteudo">
        <Revelar>
          <p className="ofp-sobre">Auto center em Rio das Ostras, RJ</p>
          <h1>Seu carro revisado com laudo e foto de cada peça.</h1>
          <p className="ofp-abertura__texto">Diagnóstico por scanner, orçamento por item e nada trocado sem a sua aprovação.</p>
          <div className="ofp-abertura__acoes">
            <a href="#ofp-orcamento" onClick={irPara('ofp-orcamento')} className="ofp-botao">Pedir orçamento <ArrowRight size={18} aria-hidden="true" /></a>
            <a href={contato.telefoneLink} className="ofp-link ofp-link--claro"><Phone size={17} aria-hidden="true" /> {contato.telefone}</a>
          </div>
        </Revelar>
        <ul className="ofp-selos" aria-label="Diferenciais">
          <li><strong>40</strong> pontos na revisão</li>
          <li><strong>15</strong> anos de oficina</li>
          <li><strong>6x</strong> sem juros no cartão</li>
        </ul>
      </div>
    </header>

    <main id="ofp-conteudo">
      <section id="ofp-servicos" className="ofp-secao">
        <Revelar className="ofp-secao__topo">
          <p className="ofp-sobre">Serviços</p>
          <h2>O que fazemos pelo seu carro</h2>
        </Revelar>
        <div className="ofp-servicos">
          {servicos.map((s, i) => {
            const Icone = icones[s.arte];
            return (
              <Revelar key={s.n} atraso={i * 0.06} como="article" className="ofp-servico">
                <span className="ofp-servico__icone"><Icone size={24} aria-hidden="true" /></span>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </Revelar>
            );
          })}
        </div>
      </section>

      <section id="ofp-como" className="ofp-secao ofp-secao--escura">
        <Revelar className="ofp-secao__topo">
          <p className="ofp-sobre">Como funciona</p>
          <h2>Três passos, sem surpresa no valor</h2>
        </Revelar>
        <ol className="ofp-passos">
          {passos.map((p, i) => (
            <Revelar key={p.titulo} como="li" atraso={i * 0.08}>
              <span className="ofp-passos__n" aria-hidden="true">{i + 1}</span>
              <p.icone size={26} aria-hidden="true" />
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </Revelar>
          ))}
        </ol>
      </section>

      <section className="ofp-secao" aria-labelledby="ofp-galeria-titulo">
        <Revelar className="ofp-secao__topo">
          <p className="ofp-sobre">Na oficina</p>
          <h2 id="ofp-galeria-titulo">O dia a dia do nosso trabalho</h2>
        </Revelar>
        <div className="ofp-galeria">
          {galeria.map((g, i) => (
            <Revelar key={g.src} como="figure" atraso={i * 0.08}>
              <img src={g.src} alt={g.alt} loading="lazy" width="1600" height="1067" />
              <figcaption>{g.legenda}</figcaption>
            </Revelar>
          ))}
        </div>
      </section>

      <section id="ofp-duvidas" className="ofp-secao ofp-duvidas">
        <Revelar className="ofp-secao__topo">
          <p className="ofp-sobre">Dúvidas frequentes</p>
          <h2>Antes de trazer o carro</h2>
        </Revelar>
        <div className="ofp-duvidas__lista">
          {perguntas.map((p) => (
            <details key={p.pergunta}>
              <summary>{p.pergunta}</summary>
              <p>{p.resposta}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="ofp-orcamento" className="ofp-secao ofp-orcamento">
        <div className="ofp-orcamento__intro">
          <p className="ofp-sobre">Orçamento</p>
          <h2>Conte o que o carro está fazendo</h2>
          <p>Respondemos pelo WhatsApp em horário comercial, normalmente em menos de 15 minutos.</p>
          <BotaoWhatsDemo className="ofp-botao ofp-botao--contorno" classeAviso="ofp-aviso">Prefiro chamar no WhatsApp</BotaoWhatsDemo>
        </div>
        <div className="ofp-orcamento__caixa"><Orcamento /></div>
      </section>
    </main>

    <footer className="ofp-rodape">
      <div className="ofp-rodape__grade">
        <div>
          <p className="ofp-rodape__marca">{contato.nome}</p>
          <p><MapPin size={16} aria-hidden="true" /> {contato.endereco}</p>
          <p><Phone size={16} aria-hidden="true" /> <a href={contato.telefoneLink}>{contato.telefone}</a></p>
        </div>
        <dl>
          {contato.horario.map(([dias, horas]) => <div key={dias}><dt>{dias}</dt><dd>{horas}</dd></div>)}
        </dl>
      </div>
      <p className="ofp-rodape__nota">Site de exemplo. A oficina, o endereço, o telefone e os números são fictícios. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
    </footer>

    <BarraVersoes slug="oficina" nivel="profissional" />
  </div>
);

export default OficinaProfissional;
