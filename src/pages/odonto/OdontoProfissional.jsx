import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CalendarCheck, Check, ClipboardList, MapPin, MessageCircle, Phone, ShieldCheck, Smile, Sparkles, Stethoscope } from 'lucide-react';
import BarraVersoes from '@/components/exemplos/BarraVersoes';
import { MetaVersao, Revelar } from '@/components/exemplos/Demonstracao';
import { useFormulario } from '@/components/exemplos/useFormulario';
import { irPara } from '@/components/exemplos/utilitarios';
import { PERIODOS, contato, depoimentos, perguntas, tratamentos } from '@/conteudo/odonto';
import { validarContatoAgendamento } from '@/dominio/odonto';
import './OdontoProfissional.css';

const icones = { clareamento: Sparkles, ortodontia: Smile, implantes: ShieldCheck, limpeza: Stethoscope };
const NAO_SEI = 'Ainda não sei';

const primeiraConsulta = [
  { icone: MessageCircle, titulo: 'Conversa sem pressa', texto: 'Você conta o que incomoda e o que espera do tratamento.' },
  { icone: Stethoscope, titulo: 'Avaliação completa', texto: 'Exame clínico e, se precisar, radiografia na própria clínica.' },
  { icone: ClipboardList, titulo: 'Plano por escrito', texto: 'Etapas, prazo e valor de cada uma, para você decidir com calma.' },
];

const vazio = { nome: '', whatsapp: '', tratamento: NAO_SEI, periodo: PERIODOS[0] };

const Agendamento = () => {
  const { valores, erros, enviado, enviar, recomecar, ligar, alterar } = useFormulario(vazio, validarContatoAgendamento);

  if (enviado) {
    return (
      <div className="odp-pronto" role="status">
        <span className="odp-pronto__icone"><Check size={28} aria-hidden="true" /></span>
        <h3>Tudo certo, {valores.nome.trim().split(' ')[0]}.</h3>
        <p>Você pediu {valores.tratamento === NAO_SEI ? 'uma avaliação' : valores.tratamento.toLowerCase()}, no período da {valores.periodo.toLowerCase()}. Este é um site de demonstração, então nada foi enviado nem guardado.</p>
        <button type="button" className="odp-link" onClick={recomecar}>Fazer outro pedido</button>
      </div>
    );
  }

  const erroDe = (campo) => erros[campo] && (
    <p id={`odp-${campo}-erro`} className="odp-erro" role="alert"><AlertCircle size={15} aria-hidden="true" /> {erros[campo]}</p>
  );

  return (
    <form className="odp-form" onSubmit={enviar} noValidate>
      <div className="odp-campo">
        <label htmlFor="odp-tratamento">O que você procura?</label>
        <select id="odp-tratamento" value={valores.tratamento} onChange={alterar('tratamento')}>
          {[...tratamentos.map((t) => t.nome), NAO_SEI].map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>
      <fieldset className="odp-periodos">
        <legend>Melhor período</legend>
        <div>
          {PERIODOS.map((p) => (
            <label key={p} className={valores.periodo === p ? 'odp-periodo odp-periodo--ativo' : 'odp-periodo'}>
              <input type="radio" name="odp-periodo" value={p} checked={valores.periodo === p} onChange={alterar('periodo')} />
              {p}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="odp-campo">
        <label htmlFor="odp-nome">Seu nome</label>
        <input {...ligar('nome', 'odp')} type="text" autoComplete="name" />
        {erroDe('nome')}
      </div>
      <div className="odp-campo">
        <label htmlFor="odp-whatsapp">WhatsApp</label>
        <input {...ligar('whatsapp', 'odp')} type="tel" inputMode="tel" autoComplete="tel" placeholder="(22) 99999-9999" />
        {erroDe('whatsapp')}
      </div>
      <p className="odp-form__nota">Usamos estes dados só para confirmar seu horário.</p>
      <button type="submit" className="odp-botao">Pedir meu horário <ArrowRight size={18} aria-hidden="true" /></button>
    </form>
  );
};

const OdontoProfissional = () => (
  <div className="odp">
    <MetaVersao titulo={contato.nome} descricao="Versão Profissional do site de exemplo para clínica odontológica: tratamentos, primeira consulta, dúvidas frequentes e agendamento." />
    <a href="#odp-conteudo" className="odp-pular">Pular para o conteúdo</a>

    <nav className="odp-nav" aria-label="Principal">
      <span className="odp-nav__marca">{contato.marca}</span>
      <div className="odp-nav__links">
        <a href="#odp-tratamentos" onClick={irPara('odp-tratamentos')}>Tratamentos</a>
        <a href="#odp-duvidas" onClick={irPara('odp-duvidas')}>Dúvidas</a>
        <a href="#odp-agendar" onClick={irPara('odp-agendar')} className="odp-nav__agendar">Agendar</a>
      </div>
    </nav>

    <header className="odp-abertura">
      <Revelar className="odp-abertura__texto">
        <p className="odp-rotulo">Clínica odontológica em Rio das Ostras</p>
        <h1>Cuidar dos dentes pode ser <em>tranquilo.</em></h1>
        <p>Primeira avaliação gratuita, orçamento por escrito e um atendimento pensado para quem tem receio de dentista.</p>
        <div className="odp-abertura__acoes">
          <a href="#odp-agendar" onClick={irPara('odp-agendar')} className="odp-botao"><CalendarCheck size={18} aria-hidden="true" /> Agendar avaliação</a>
          <a href={contato.telefoneLink} className="odp-link"><Phone size={17} aria-hidden="true" /> {contato.telefone}</a>
        </div>
      </Revelar>
      <figure className="odp-abertura__foto">
        <img src="/images/exemplos/odonto/equipamento.jpg" alt="Equipamento odontológico limpo em consultório claro" width="1600" height="1067" />
        <figcaption><strong>4,9</strong> de nota média em 312 avaliações</figcaption>
      </figure>
    </header>

    <main id="odp-conteudo">
      <section id="odp-tratamentos" className="odp-secao">
        <Revelar className="odp-secao__topo">
          <p className="odp-rotulo">Tratamentos</p>
          <h2>Do check-up ao implante</h2>
        </Revelar>
        <div className="odp-tratamentos">
          {tratamentos.map((t, i) => {
            const Icone = icones[t.id];
            return (
              <Revelar key={t.id} como="article" atraso={i * 0.06} className="odp-tratamento">
                <span className="odp-tratamento__icone"><Icone size={24} aria-hidden="true" /></span>
                <h3>{t.nome}</h3>
                <p>{t.texto}</p>
              </Revelar>
            );
          })}
        </div>
      </section>

      <section className="odp-secao odp-consulta">
        <Revelar className="odp-secao__topo">
          <p className="odp-rotulo">Primeira consulta</p>
          <h2>Como é a sua primeira vez aqui</h2>
        </Revelar>
        <ol className="odp-passos">
          {primeiraConsulta.map((p, i) => (
            <Revelar key={p.titulo} como="li" atraso={i * 0.08}>
              <span className="odp-passos__n" aria-hidden="true">{i + 1}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </Revelar>
          ))}
        </ol>
      </section>

      <section className="odp-secao" aria-labelledby="odp-relatos-titulo">
        <Revelar className="odp-secao__topo">
          <p className="odp-rotulo">Quem já veio</p>
          <h2 id="odp-relatos-titulo">O que os pacientes contam</h2>
        </Revelar>
        <div className="odp-relatos">
          {depoimentos.map((d, i) => (
            <Revelar key={d.nome} como="blockquote" atraso={i * 0.08}>
              <p>“{d.texto}”</p>
              <footer><span aria-hidden="true">{d.nome[0]}</span><cite>{d.nome}</cite></footer>
            </Revelar>
          ))}
        </div>
        <div className="odp-convenios">
          <p>Convênios atendidos</p>
          <ul>{contato.convenios.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </section>

      <section id="odp-duvidas" className="odp-secao odp-duvidas">
        <Revelar className="odp-secao__topo">
          <p className="odp-rotulo">Dúvidas frequentes</p>
          <h2>Antes de marcar</h2>
        </Revelar>
        <div className="odp-duvidas__lista">
          {perguntas.map((p) => (
            <details key={p.pergunta}>
              <summary>{p.pergunta}</summary>
              <p>{p.resposta}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="odp-agendar" className="odp-secao odp-agendar">
        <div className="odp-agendar__intro">
          <p className="odp-rotulo">Agendamento</p>
          <h2>Peça seu horário</h2>
          <p>Confirmamos pelo WhatsApp em até 1 hora, em horário de atendimento.</p>
          <dl>
            {contato.horario.map(([dias, horas]) => <div key={dias}><dt>{dias}</dt><dd>{horas}</dd></div>)}
          </dl>
        </div>
        <div className="odp-agendar__caixa"><Agendamento /></div>
      </section>
    </main>

    <footer className="odp-rodape">
      <p className="odp-rodape__marca">{contato.marca}</p>
      <p><MapPin size={16} aria-hidden="true" /> {contato.endereco} · <a href={contato.telefoneLink}>{contato.telefone}</a></p>
      <p className="odp-rodape__nota">Site de exemplo. A clínica, a nota, os relatos e os contatos são fictícios. Em um site real, aqui entram o nome e o CRO do responsável técnico. Fotos: Pexels. <Link to="/">Criado pela ARRC Sistemas</Link>.</p>
    </footer>

    <BarraVersoes slug="odonto" nivel="profissional" />
  </div>
);

export default OdontoProfissional;
