/*
 * Diamond lattice: the hero background.
 * A field of steel-blue diamonds that light up cyan around the cursor,
 * on tap/click, and in slow ambient pulses. Pauses when off screen.
 * Exposes window.Lattice.pulse(clientX, clientY, strength).
 */
(() => {
  'use strict';
  const canvas = document.getElementById('lattice');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BG = '#05070b';
  const STEEL = 'rgba(54, 100, 148, 0.5)';

  let W = 0, H = 0, S = 120, R = 60, cells = [];
  let rect = canvas.getBoundingClientRect();
  let raf = 0, inView = true, t0 = performance.now(), lastAmbient = -10;
  const AMBIENT = 10;     // seconds between the slow background ripples
  const AFTER_TAP = 5;    // the next ripple waits this long after any tap or drop-in
  // Each visit opens the grid at a slightly different scale and point in its breathing cycle.
  const SCALE = 0.78 + Math.random() * 0.5;
  const PHASE = Math.random() * Math.PI * 2;
  // w eases between 0 and 1 as the cursor enters or leaves, so the parallax shift fades in/out instead of snapping
  const pointer = { x: 0, y: 0, sx: 0, sy: 0, w: 0, inside: false, fresh: true };
  const pulses = [];

  /* Pre-rendered glowing diamond, drawn with additive blending. */
  const SPR = 256, SR = 82;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = SPR;
  (() => {
    const g = sprite.getContext('2d');
    const c = SPR / 2;
    const dia = (r) => {
      g.beginPath();
      g.moveTo(c, c - r); g.lineTo(c + r, c); g.lineTo(c, c + r); g.lineTo(c - r, c);
      g.closePath();
    };
    g.lineJoin = 'miter';
    g.shadowColor = 'rgba(120, 255, 236, 0.95)';
    g.shadowBlur = 30;
    g.strokeStyle = 'rgba(170, 255, 244, 0.9)';
    g.lineWidth = 7;
    dia(SR); g.stroke(); g.stroke();
    g.shadowBlur = 8;
    g.lineWidth = 3.5;
    g.strokeStyle = '#effffd';
    dia(SR); g.stroke();
    g.shadowBlur = 18;
    g.lineWidth = 2.5;
    g.strokeStyle = 'rgba(170, 255, 244, 0.35)';
    dia(SR * 0.5); g.stroke();
  })();

  function build() {
    cells = [];
    const cols = Math.ceil(W / S) + 2;
    const rows = Math.ceil(H / S) + 2;
    for (let j = -1; j < rows; j++) {
      for (let i = -1; i < cols; i++) {
        cells.push({ x: i * S, y: j * S, e: 0, seed: Math.random() });
        cells.push({ x: i * S + S / 2, y: j * S + S / 2, e: 0, seed: Math.random() });
      }
    }
  }

  function resize() {
    rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    S = (W < 640 ? 92 : W < 1100 ? 118 : 140) * SCALE;
    R = S / 2;
    build();
    if (reduce) draw(performance.now(), true);
  }

  function draw(now, settle) {
    const t = (now - t0) / 1000;
    const cx = W / 2, cy = H / 2;

    // Jump the glow to a fresh entry point only once the last glow has faded; otherwise let it glide there
    if (pointer.fresh) { if (pointer.w < 0.02) { pointer.sx = pointer.x; pointer.sy = pointer.y; } pointer.fresh = false; }
    pointer.sx += (pointer.x - pointer.sx) * 0.14;
    pointer.sy += (pointer.y - pointer.sy) * 0.14;

    // Slow breathing zoom (a nod to the original background) plus a little parallax.
    const zoom = reduce ? 1 : 1 + 0.045 * Math.sin(t * 0.21 + PHASE);
    pointer.w += ((pointer.inside ? 1 : 0) - pointer.w) * 0.05;
    const px = (pointer.sx - cx) * -0.025 * pointer.w;
    const py = (pointer.sy - cy) * -0.025 * pointer.w;

    if (!reduce && t - lastAmbient > AMBIENT) {
      lastAmbient = t;
      pulses.push({ x: Math.random() * W, y: Math.random() * H, t, speed: 220 + Math.random() * 140, life: 3.4, amp: 0.75 });
    }
    for (let i = pulses.length - 1; i >= 0; i--) if (t - pulses[i].t > pulses[i].life) pulses.splice(i, 1);

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    const sig2 = 2 * 160 * 160;
    ctx.beginPath();
    for (const c of cells) {
      const x = cx + (c.x - cx) * zoom + px;
      const y = cy + (c.y - cy) * zoom + py;
      c.sx = x; c.sy = y;

      let target = 0;
      if (pointer.w > 0.001) {
        const dx = x - pointer.sx, dy = y - pointer.sy;
        target = Math.exp(-(dx * dx + dy * dy) / sig2) * pointer.w;
      }
      for (const p of pulses) {
        const age = t - p.t;
        const dx = x - p.x, dy = y - p.y;
        const band = (Math.sqrt(dx * dx + dy * dy) - age * p.speed) / 70;
        const v = Math.exp(-band * band) * (1 - age / p.life) * p.amp;
        if (v > target) target = v;
      }
      const tw = Math.pow(Math.max(0, Math.sin(t * 0.45 + c.seed * 60)), 28) * 0.95;
      if (tw > target) target = tw;

      c.e = settle ? target : c.e + (target - c.e) * (target > c.e ? 0.22 : 0.05);

      const r = R * zoom * (0.76 + 0.14 * c.e);
      c.r = r;
      ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath();
    }
    ctx.strokeStyle = STEEL;
    ctx.lineWidth = Math.max(1.5, R * 0.05);
    ctx.lineJoin = 'miter';
    ctx.stroke();

    ctx.globalCompositeOperation = 'lighter';
    for (const c of cells) {
      if (c.e < 0.02) continue;
      const size = SPR * (c.r / SR);
      ctx.globalAlpha = Math.min(1, c.e);
      ctx.drawImage(sprite, c.sx - size / 2, c.sy - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function loop(now) {
    raf = 0;
    draw(now, false);
    if (inView && !document.hidden) raf = requestAnimationFrame(loop);
  }
  function start() { if (!reduce && !raf && inView && !document.hidden) raf = requestAnimationFrame(loop); }

  function toLocal(clientX, clientY) {
    rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  window.addEventListener('pointermove', (e) => {
    const p = toLocal(e.clientX, e.clientY);
    const inside = p.x >= 0 && p.y >= 0 && p.x <= W && p.y <= H;
    if (inside && !pointer.inside) pointer.fresh = true;
    pointer.inside = inside;
    // Outside the hero, keep the last position inside so the glow and shift fade out where the cursor left
    if (inside) { pointer.x = p.x; pointer.y = p.y; }
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer.inside = false; });

  const hero = canvas.parentElement;
  hero.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button')) return;
    api.pulse(e.clientX, e.clientY, 1);
  });

  const api = {
    pulse(clientX, clientY, amp = 1) {
      if (reduce) return;
      const p = toLocal(clientX, clientY);
      const t = (performance.now() - t0) / 1000;
      pulses.push({ x: p.x, y: p.y, t, speed: 480, life: 2.6, amp });
      lastAmbient = t - AMBIENT + AFTER_TAP;
      start();
    },
    // The grid diamond nearest a point, in viewport coordinates, followed live as the grid breathes.
    cellNear(clientX, clientY) {
      const p = toLocal(clientX, clientY);
      let best = null, bd = Infinity;
      for (const c of cells) {
        if (c.sx == null) continue;
        const d = (c.sx - p.x) ** 2 + (c.sy - p.y) ** 2;
        if (d < bd) { bd = d; best = c; }
      }
      if (!best) return null;
      return {
        get x() { return canvas.getBoundingClientRect().left + best.sx; },
        get y() { return canvas.getBoundingClientRect().top + best.sy; },
        get r() { return best.r; }
      };
    }
  };
  window.Lattice = api;

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; start(); }).observe(canvas);
  }
  document.addEventListener('visibilitychange', start);

  resize();
  start();
})();
