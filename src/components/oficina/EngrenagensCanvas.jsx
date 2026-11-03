import React, { useEffect, useRef, useState } from 'react';

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Cena desenhada por raymarching: duas engrenagens de aço em contato, com calor e faíscas no ponto de contato.
const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uTurn;
uniform float uHeat;
uniform float uZoom;
uniform vec2 uTilt;
uniform vec2 uCenter;
uniform vec2 uLight;

const float TAU = 6.2831853;
const float TH = 0.26;
const float H = 0.15;
const float R1 = 1.42;
const float R2 = 0.6725;
const float D = 2.2575;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float box(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }

float gear(vec3 p, float R, float n, float holes, float turn) {
  p.xy = rot(turn) * p.xy;
  float r = length(p.xy);
  float a = atan(p.y, p.x);
  float s = TAU / n;
  float at = mod(a + s * 0.5, s) - s * 0.5;
  vec2 q = r * vec2(cos(at), sin(at));
  float wid = mix(0.115, 0.06, clamp((q.x - R) / H, 0.0, 1.0));
  float tooth = box(q - vec2(R + H * 0.5, 0.0), vec2(H * 0.5, wid)) - 0.012;
  float d = min(r - R, tooth);
  d = max(d, R * 0.2 - r);
  float sh = TAU / holes;
  float ah = mod(a + sh * 0.5, sh) - sh * 0.5;
  d = max(d, R * 0.13 - length(r * vec2(cos(ah), sin(ah)) - vec2(R * 0.58, 0.0)));
  vec2 w = vec2(d, abs(p.z) - TH);
  float g = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.018;
  float pocket = max(abs(r - R * 0.6) - R * 0.26, TH * 0.6 - abs(p.z));
  return max(g, -pocket);
}

float map(vec3 p) {
  float g1 = gear(p, R1, 28.0, 6.0, uTurn);
  float g2 = gear(p - vec3(D, 0.0, 0.0), R2, 14.0, 5.0, -2.0 * uTurn + TAU / 28.0);
  return min(g1, g2);
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 0.002;
  return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

vec3 env(vec3 dir) {
  vec3 c = mix(vec3(0.012, 0.011, 0.010), vec3(0.055, 0.05, 0.046), dir.y * 0.5 + 0.5);
  c += vec3(0.95, 0.96, 1.0) * 1.9 * smoothstep(0.72, 0.97, dot(dir, normalize(vec3(-0.45, 0.72, 0.55))));
  c += vec3(0.8, 0.82, 0.86) * 0.9 * smoothstep(0.035, 0.0, abs(dir.y - 0.28)) * smoothstep(-0.2, 0.5, dir.z);
  c += vec3(1.0, 0.33, 0.09) * 1.5 * pow(max(dot(dir, normalize(vec3(0.6, -0.65, 0.45))), 0.0), 5.0);
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y - uCenter;
  vec3 camO = vec3(0.0, 0.0, uZoom);
  vec3 camD = normalize(vec3(uv, -1.6));

  mat2 rx = rot(uTilt.y);
  mat2 ry = rot(uTilt.x);
  vec3 ro = camO; ro.yz = rx * ro.yz; ro.xz = ry * ro.xz;
  vec3 rd = camD; rd.yz = rx * rd.yz; rd.xz = ry * rd.xz;
  vec3 pivot = vec3(0.62, 0.0, 0.0);
  ro += pivot;

  vec3 contact = vec3(R1 + H * 0.5 + 0.01, 0.0, 0.0);
  vec3 color = vec3(0.0);

  // Só marcha dentro da faixa em que as engrenagens existem: é o que mantém a cena leve.
  float zb = TH + 0.03;
  float hit = -1.0;
  if (abs(rd.z) > 0.0005) {
    float t0 = (zb - ro.z) / rd.z;
    float t1 = (-zb - ro.z) / rd.z;
    float tn = max(min(t0, t1), 0.0);
    float tf = max(t0, t1);
    float t = tn;
    for (int i = 0; i < 56; i++) {
      if (t > tf) break;
      float d = map(ro + rd * t);
      if (d < 0.0016) { hit = t; break; }
      t += d * 0.82;
    }
  }

  vec3 toCam = contact - ro;
  float along = dot(toCam, rd);
  float haze = length(toCam - rd * along);
  color += vec3(1.0, 0.27, 0.06) * exp(-haze * haze * 1.05) * 0.2 * (0.45 + uHeat);
  color += vec3(0.05, 0.035, 0.028) * exp(-dot(uv, uv) * 1.4);

  if (hit > 0.0) {
    vec3 p = ro + rd * hit;
    vec3 n = normalAt(p);
    float isFace = smoothstep(0.86, 0.98, abs(n.z));

    // Escovado concêntrico nas faces planas.
    bool onFirst = length(p.xy) < R1 + H + 0.02;
    vec2 rel = onFirst ? p.xy : p.xy - vec2(D, 0.0);
    float rr = length(rel);
    float brushed = hash(floor(rr * 120.0)) - 0.5;
    n.xy += normalize(rel + 0.0001) * brushed * 0.09 * isFace;
    n = normalize(n);

    vec3 ref = reflect(rd, n);
    vec3 refWorld = ref; refWorld.xz = ry * refWorld.xz * mat2(1.0); refWorld.xz = refWorld.xz;
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
    float ao = clamp(map(p + n * 0.13) / 0.13, 0.0, 1.0);
    vec3 steel = vec3(0.68, 0.655, 0.62);

    vec3 lp = vec3(uLight * 3.2 + vec2(0.6, 0.0), 1.7);
    vec3 ld = lp - p;
    float dist2 = dot(ld, ld);
    ld = normalize(ld);
    float diff = max(dot(n, ld), 0.0);
    float spec = pow(max(dot(reflect(-ld, n), -rd), 0.0), 48.0);

    color = env(refWorld) * steel * (0.3 + 0.7 * fres + 0.2 * isFace);
    color += steel * diff * 0.13 * 6.0 / (1.0 + dist2);
    color += vec3(1.0, 0.86, 0.7) * spec * 3.2 / (1.0 + dist2 * 0.35);
    color *= 0.35 + 0.65 * ao;

    float dc = length(p - contact);
    float heat = exp(-dc * dc * 5.2) * (0.72 + 0.28 * sin(uTime * 3.1 + rr * 7.0)) * (0.5 + uHeat);
    color += vec3(1.0, 0.25, 0.04) * heat * 1.25 + vec3(1.0, 0.68, 0.3) * pow(heat, 3.0) * 1.3;
  }

  // Faíscas soltas a partir do contato.
  vec3 down = vec3(0.0, -1.0, 0.0);
  for (int i = 0; i < 16; i++) {
    float fi = float(i);
    float life = fract(uTime * (0.34 + hash(fi) * 0.3) + hash(fi + 7.0));
    vec3 v = vec3((hash(fi + 2.0) - 0.5) * 2.6, 0.55 + hash(fi + 3.0) * 1.5, 0.35 + hash(fi + 4.0) * 0.9);
    vec3 pos = contact + vec3(0.0, 0.0, TH) + v * life * 1.35 + down * life * life * 2.3;
    vec3 rel = pos - ro;
    float dd = length(rel - rd * dot(rel, rd));
    float fade = (1.0 - life) * (1.0 - life);
    color += vec3(1.0, 0.56, 0.2) * fade * 0.00062 * (0.6 + uHeat) / (dd * dd + 0.00022);
  }

  color = (color * (2.51 * color + 0.03)) / (color * (2.43 * color + 0.59) + 0.14);
  color = pow(clamp(color, 0.0, 1.0), vec3(0.4545));
  color += (hash(gl_FragCoord.x * 0.37 + gl_FragCoord.y * 1.91 + uTime) - 0.5) * 0.018;
  gl_FragColor = vec4(color, 1.0);
}
`;

const criarShader = (gl, tipo, fonte) => {
  const shader = gl.createShader(tipo);
  gl.shaderSource(shader, fonte);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'Falha ao compilar o shader');
  }
  return shader;
};

const criarPrograma = (gl) => {
  const programa = gl.createProgram();
  gl.attachShader(programa, criarShader(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(programa, criarShader(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(programa);
  if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(programa) || 'Falha ao ligar o programa WebGL');
  }
  return programa;
};

const ESCALA_MINIMA = 0.4;
const PIXELS_MAXIMOS = 1500000;

/**
 * Fundo 3D da abertura. Sem WebGL, ou se o contexto for perdido, mostra a foto do motor.
 * Pausa fora da tela e reduz a resolução sozinho em aparelhos lentos.
 */
const EngrenagensCanvas = ({ estatico = false }) => {
  const canvasRef = useRef(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) {
      console.warn('WebGL indisponível: usando a foto como fundo da abertura.');
      setFalhou(true);
      return undefined;
    }

    let programa;
    try {
      programa = criarPrograma(gl);
    } catch (erro) {
      console.error('Não foi possível iniciar a cena 3D da abertura:', erro);
      setFalhou(true);
      return undefined;
    }

    gl.useProgram(programa);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posicao = gl.getAttribLocation(programa, 'aPos');
    gl.enableVertexAttribArray(posicao);
    gl.vertexAttribPointer(posicao, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    ['uRes', 'uTime', 'uTurn', 'uHeat', 'uZoom', 'uTilt', 'uCenter', 'uLight'].forEach((nome) => {
      u[nome] = gl.getUniformLocation(programa, nome);
    });

    let escala = 1;
    let retrato = false;
    const ajustarTamanho = () => {
      const largura = canvas.clientWidth;
      const altura = canvas.clientHeight;
      retrato = altura > largura;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const limite = Math.min(1, Math.sqrt(PIXELS_MAXIMOS / Math.max(1, largura * altura * dpr * dpr)));
      const fator = dpr * limite * escala;
      canvas.width = Math.max(2, Math.round(largura * fator));
      canvas.height = Math.max(2, Math.round(altura * fator));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
    };

    const ponteiro = { x: 0, y: 0, alvoX: 0, alvoY: 0 };
    const aoMover = (e) => {
      if (e.pointerType !== 'mouse') return;
      ponteiro.alvoX = (e.clientX / window.innerWidth) * 2 - 1;
      ponteiro.alvoY = 1 - (e.clientY / window.innerHeight) * 2;
    };

    let quadro = 0;
    let visivel = true;
    let rolagemAnterior = window.scrollY;
    let calor = 0.5;
    let giroExtra = 0;
    let ultimo = performance.now();
    let acumulado = 0;
    let contagem = 0;
    let pularQuadro = false;
    let inicio = ultimo;

    const desenhar = (agora) => {
      const tempo = (agora - inicio) / 1000;
      const rolagem = window.scrollY;
      const progresso = Math.min(rolagem / Math.max(1, window.innerHeight), 1.4);
      const delta = rolagem - rolagemAnterior;
      rolagemAnterior = rolagem;
      calor += (Math.min(Math.abs(delta) / 40, 1.1) + 0.42 - calor) * 0.06;
      giroExtra += delta * 0.0022;
      ponteiro.x += (ponteiro.alvoX - ponteiro.x) * 0.05;
      ponteiro.y += (ponteiro.alvoY - ponteiro.y) * 0.05;

      gl.uniform1f(u.uTime, tempo);
      gl.uniform1f(u.uTurn, (estatico ? 0.4 : tempo * 0.16) + giroExtra);
      gl.uniform1f(u.uHeat, calor);
      gl.uniform1f(u.uZoom, (retrato ? 8.6 : 6.3) - progresso * 1.1);
      gl.uniform2f(u.uTilt, -0.42 + ponteiro.x * 0.1 + progresso * 0.28, 0.34 - ponteiro.y * 0.08 - progresso * 0.2);
      gl.uniform2f(u.uCenter, retrato ? 0.03 : 0.3, retrato ? 0.2 : 0.03);
      gl.uniform2f(u.uLight, ponteiro.x, ponteiro.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const repetir = (agora) => {
      quadro = requestAnimationFrame(repetir);
      if (!visivel || document.hidden) {
        ultimo = agora;
        return;
      }
      acumulado += agora - ultimo;
      contagem += 1;
      ultimo = agora;
      if (contagem === 30) {
        const media = acumulado / contagem;
        acumulado = 0;
        contagem = 0;
        if (media > 25 && escala > ESCALA_MINIMA) {
          escala = Math.max(ESCALA_MINIMA, escala * 0.8);
          ajustarTamanho();
        } else if (media > 40) {
          pularQuadro = true;
        }
      }
      if (pularQuadro && contagem % 2 === 1) return;
      desenhar(agora);
    };

    const observador = new ResizeObserver(() => {
      ajustarTamanho();
      if (estatico) desenhar(performance.now());
    });
    observador.observe(canvas);

    const visibilidade = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
    });
    visibilidade.observe(canvas);

    const aoPerderContexto = (e) => {
      e.preventDefault();
      console.error('O navegador perdeu o contexto WebGL da abertura.');
      cancelAnimationFrame(quadro);
      setFalhou(true);
    };
    canvas.addEventListener('webglcontextlost', aoPerderContexto);

    ajustarTamanho();
    if (estatico) {
      desenhar(performance.now());
    } else {
      window.addEventListener('pointermove', aoMover, { passive: true });
      inicio = performance.now();
      quadro = requestAnimationFrame(repetir);
    }

    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
      visibilidade.disconnect();
      window.removeEventListener('pointermove', aoMover);
      canvas.removeEventListener('webglcontextlost', aoPerderContexto);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(programa);
    };
  }, [estatico]);

  return (
    <div className={`of-canvas${falhou ? ' of-canvas--foto' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default EngrenagensCanvas;
