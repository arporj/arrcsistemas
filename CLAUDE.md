# ARRC Sistemas (site institucional)

Site da ARRC Sistemas em Vite + React, com páginas de exemplo em `/exemplos/*`.

## Portas locais (faixa 3700–3799)

- `npm run dev`: `http://localhost:3700`
- `npm run preview`: `http://localhost:3701`
- `npm run dev:previa`: `http://localhost:3702`, usada só pelo painel de prévia do Claude, para nunca ocupar a 3700 do usuário.
- Fixas no `package.json` (com `--strictPort`) e no `.claude/launch.json` (`autoPort: false`). Porta ocupada = falha, nunca outra porta.

## Sites de exemplo

Decisão de 03/11/2026: cada site de exemplo tem linguagem visual própria (layout, tipografia, cores e tipo de efeito), para mostrar a variedade do que a ARRC pode entregar. Não reaproveitar a estrutura de um exemplo em outro nem seguir o layout antigo da página.

- Oficina (`/exemplos/oficina`): escuro e laranja. Abertura com cena 3D em WebGL nativo e serviços em rolagem horizontal.
- Padaria (`/exemplos/padaria`): cores que seguem a hora do dia, pó de farinha em canvas e encomenda com total automático.
- Casa de festas (`/exemplos/casa-de-festas`): revista clara em verde-eucalipto, colunas de fotos, painéis expansíveis, simulador de mesas e agenda. A versão em vinho com a palavra-janela foi recusada pelo usuário em 03/11/2026.
- Construção (`/exemplos/construcao`): azul de planta técnica, casa isométrica construída pela rolagem e planejador de arrastar. A versão amarela e preta em blocos foi recusada pelo usuário em 03/11/2026.
- Odonto (`/exemplos/odonto`): claro e calmo, respiração guiada, arcada animada por tratamento e agendamento por etapas.
- Regras de exemplo em `src/dominio/`, ainda sem testes porque o projeto não tem Vitest instalado.
- Nenhum formulário de exemplo envia dados: a mensagem final precisa dizer isso.
- Fotos: Pexels, sem rostos e sem marcas de terceiros. Códigos no Pexels: oficina `freio-medicao` 6870299, `disco-freio` 4022545, `oleo-motor` 13065700 (recortada); padaria `pao-farinha` 27418970 (recortada), `fornada` 4913487, `maos-pao` 13247700; casa de festas `salao` 12688995, `mesa-velas` 17022991, `mesa-branca` 28450665, `menu-velas` 33964860, `salao-moderno` 17315458, `salao-luzes` 16935994, `salao-claro` 36028895, `baloes` 796606; construção `casa-pronta` 7587880, `tijolos-chao` 4509089, `tijolo-obra` 32913797, `tintas` 1887946, `piso` 3616760 (recortada); odonto `consultorio` 6812453, `equipamento` 305568.
