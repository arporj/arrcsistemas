# ARRC Sistemas (site institucional)

Site da ARRC Sistemas em Vite + React, com páginas de exemplo em `/exemplos/*`.

## Portas locais (faixa 3700–3799)

- `npm run dev`: `http://localhost:3700`
- `npm run preview`: `http://localhost:3701`
- Fixas no `package.json` (com `--strictPort`) e no `.claude/launch.json` (`autoPort: false`). Porta ocupada = falha, nunca outra porta.

## Sites de exemplo

Decisão de 03/11/2026: cada site de exemplo tem linguagem visual própria (layout, tipografia, cores e tipo de efeito), para mostrar a variedade do que a ARRC pode entregar. Não reaproveitar a estrutura de um exemplo em outro nem seguir o layout antigo da página.

- Oficina (`/exemplos/oficina`): refeita. Abertura com cena 3D em WebGL nativo (`src/components/oficina/EngrenagensCanvas.jsx`) e animações ligadas à rolagem com `framer-motion`.
- Padaria, casa de festas, construção e odonto: ainda no layout antigo.
- Nenhum formulário de exemplo envia dados: a mensagem final precisa dizer isso.
- Fotos novas: Pexels, sem rostos e sem marcas de terceiros. Oficina: `freio-medicao.jpg` (foto 6870299), `disco-freio.jpg` (foto 4022545) e `oleo-motor.jpg` (foto 13065700, recortada para tirar as marcas do rótulo).
