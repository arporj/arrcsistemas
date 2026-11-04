import React, { useEffect, useRef } from 'react';

const RAIO_PONTEIRO = 130;

const criarGrao = (largura, altura) => ({
  x: Math.random() * largura,
  y: Math.random() * altura,
  raio: 0.6 + Math.random() * 1.9,
  vx: (Math.random() - 0.5) * 0.12,
  vy: -0.05 - Math.random() * 0.2,
  fase: Math.random() * Math.PI * 2,
  alfa: 0.15 + Math.random() * 0.5,
});

/** Pó de farinha suspenso, que se afasta do ponteiro. Fica fora do desenho com movimento reduzido. */
const Farinha = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas 2D indisponível: a abertura fica sem o pó de farinha.');
      return undefined;
    }

    let largura = 0;
    let altura = 0;
    let graos = [];
    let quadro = 0;
    let visivel = true;
    const ponteiro = { x: -999, y: -999 };

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = canvas.clientWidth;
      altura = canvas.clientHeight;
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const total = Math.min(150, Math.round((largura * altura) / 9000));
      graos = Array.from({ length: total }, () => criarGrao(largura, altura));
    };

    const desenhar = () => {
      quadro = requestAnimationFrame(desenhar);
      if (!visivel || document.hidden) return;
      ctx.clearRect(0, 0, largura, altura);
      ctx.fillStyle = '#fff4e0';
      graos.forEach((g) => {
        g.fase += 0.01;
        g.x += g.vx + Math.sin(g.fase) * 0.12;
        g.y += g.vy;
        const dx = g.x - ponteiro.x;
        const dy = g.y - ponteiro.y;
        const dist = Math.hypot(dx, dy);
        if (dist < RAIO_PONTEIRO && dist > 0) {
          const forca = (1 - dist / RAIO_PONTEIRO) * 2.2;
          g.x += (dx / dist) * forca;
          g.y += (dy / dist) * forca;
        }
        if (g.y < -6) g.y = altura + 6;
        if (g.x < -6) g.x = largura + 6;
        if (g.x > largura + 6) g.x = -6;
        ctx.globalAlpha = g.alfa;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.raio, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const aoMover = (e) => {
      const r = canvas.getBoundingClientRect();
      ponteiro.x = e.clientX - r.left;
      ponteiro.y = e.clientY - r.top;
    };

    const tamanho = new ResizeObserver(ajustar);
    tamanho.observe(canvas);
    const observador = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
    });
    observador.observe(canvas);
    window.addEventListener('pointermove', aoMover, { passive: true });
    ajustar();
    quadro = requestAnimationFrame(desenhar);

    return () => {
      cancelAnimationFrame(quadro);
      tamanho.disconnect();
      observador.disconnect();
      window.removeEventListener('pointermove', aoMover);
    };
  }, []);

  return <canvas ref={ref} className="pd-farinha" aria-hidden="true" />;
};

export default Farinha;
