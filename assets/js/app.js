(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const projects = window.PROJECTS || [];
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const IMG = 'assets/img/gallery/web/';
  const TITLE = 'Roozbeh Moayyedian';
  const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bit = () => (Math.random() < 0.5 ? '0' : '1');
  const setHash = (h) => { try { history.replaceState(null, '', h || location.pathname + location.search); } catch (e) { /* ignore */ } };

  if (fine) document.documentElement.classList.add('fine');

  /* ---------------------------------------------------------------
   * Binary decode: letters start as flickering 0/1 and lock in.
   * Each letter keeps its real width, so nothing shifts.
   * ------------------------------------------------------------- */
  function decode(el, text, { duration = 1500, hold = 0, onFrame } = {}) {
    return new Promise((resolve) => {
      el.textContent = '';
      if (reduce) { el.textContent = text; resolve(); return; }
      const slots = [];
      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) { el.append(part); slots.push({ ch: part, done: true }); continue; }
        const word = document.createElement('span');
        word.className = 'dw';
        for (const ch of part) {
          const s = document.createElement('span');
          s.className = 'dc scr';
          s.textContent = ch;
          s.dataset.bit = bit();
          word.append(s);
          slots.push({ ch, s, done: false, at: hold + duration * (0.1 + Math.random() * 0.9) });
        }
        el.append(word);
      }
      const start = performance.now();
      let lastFlip = 0;
      const step = (now) => {
        const t = now - start;
        const flip = now - lastFlip > 70;
        if (flip) lastFlip = now;
        let left = 0;
        for (const c of slots) {
          if (c.done) continue;
          if (t >= c.at) { c.done = true; c.s.classList.remove('scr'); continue; }
          left++;
          if (flip) c.s.dataset.bit = bit();
        }
        if (onFrame) onFrame(slots, t);
        if (left) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------------------------------------------------------------
   * Opening door: a lone diamond on a black screen, split by a seam.
   * Tap it (or wait 10s): the doors slide apart and the diamond drops
   * into a cell of the hero grid, which lights up as if tapped.
   * ------------------------------------------------------------- */
  const opened = new Promise((resolve) => {
    const root = document.documentElement;
    const gate = $('#gate');
    clearTimeout(window.__gateFailsafe);
    if (!gate || !root.classList.contains('gated')) { if (gate) gate.remove(); resolve(); return; }
    const key = $('#gate-key');
    let done = false;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const open = () => {
      if (done) return;
      done = true;
      clearTimeout(auto);
      document.removeEventListener('keydown', onKey);
      gate.classList.add('charge');

      // Pick a resting cell: right of the headline on wide screens, anywhere central on phones
      const W = window.innerWidth, H = window.innerHeight;
      const wide = W >= 900;
      const tx = W * (wide ? 0.6 + Math.random() * 0.25 : 0.2 + Math.random() * 0.6);
      const ty = H * (wide ? 0.3 + Math.random() * 0.4 : 0.2 + Math.random() * 0.6);
      const cell = window.Lattice && window.Lattice.cellNear ? window.Lattice.cellNear(tx, ty) : null;

      setTimeout(() => {
        gate.classList.add('opening');
        root.classList.remove('gated');
        resolve();
      }, 260);

      const D = key.offsetWidth / 2;
      const fx = W / 2, fy = H / 2;
      const t0 = performance.now() + 380, dur = 1150;
      const fly = (now) => {
        const t = Math.min(1, Math.max(0, (now - t0) / dur));
        const e = ease(t);
        const x = cell ? cell.x : fx, y = cell ? cell.y : fy;
        const k = cell ? 1 + (cell.r / D - 1) * e : 1 - e * 0.4;
        key.style.transform = `translate3d(${(x - fx) * e}px, ${(y - fy) * e}px, 0) rotate(${e * 90}deg) scale(${k})`;
        if (t < 1) { requestAnimationFrame(fly); return; }
        if (cell && window.Lattice) window.Lattice.pulse(x, y, 1.25);
        key.classList.add('landed');
        setTimeout(() => gate.remove(), 600);
      };
      requestAnimationFrame(fly);
    };
    const onKey = (e) => { if (!e.metaKey && !e.ctrlKey && !e.altKey) open(); };
    key.addEventListener('click', open);
    gate.addEventListener('click', open);
    document.addEventListener('keydown', onKey);
    const auto = setTimeout(open, 10000);
    requestAnimationFrame(() => key.focus({ preventScroll: true }));
  });

  /* Hero name + tab title */
  const nameEl = $('#name');
  const nameFx = $('#name-fx');
  if (nameEl && nameFx) opened.then(() => {
    const text = nameFx.textContent.trim();
    const HOLD = 650, DUR = 1700;
    decode(nameFx, text, {
      hold: HOLD,
      duration: DUR,
      onFrame: (slots, t) => {
        document.title = slots.map((s) => (s.done ? s.ch : s.s.dataset.bit)).join('');
        if (t > HOLD + DUR * 0.25) nameEl.classList.add('lit');
      }
    }).then(() => {
      document.title = TITLE;
      nameEl.classList.add('lit');
      const r = nameEl.getBoundingClientRect();
      if (window.Lattice) window.Lattice.pulse(r.left + r.width / 2, r.top + r.height / 2, 1.1);
    });
  });

  /* ---------------------------------------------------------------
   * Nav: solid background after scrolling, live Toronto clock
   * ------------------------------------------------------------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const clock = $('#clock');
  if (clock) {
    let fmt;
    try { fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', hour: 'numeric', minute: '2-digit' }); } catch (e) { fmt = null; }
    const tick = () => { if (fmt) clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 10000);
  }

  const navLinks = $$('.nav-links a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['work', 'contact'].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------------------------------------------------------------
   * Work grid
   * ------------------------------------------------------------- */
  const grid = $('#grid');
  const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'xr', label: 'AR & VR' },
    { id: 'installations', label: 'Installations' },
    { id: 'games', label: 'Games' },
    { id: 'web', label: 'Generative & web' }
  ];

  const cardHTML = (p, i) => {
    const big = p.layout === 'feature' || p.layout === 'wide';
    const sizes = big ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    return `
    <a class="card reveal${p.layout ? ' ' + p.layout : ''}" href="#${p.slug}"
       data-slug="${p.slug}" data-filters="${p.filters.join(' ')}" style="--d:${i % 3};view-transition-name:card-${p.slug}">
      <span class="card-media"><img src="${IMG}${p.img}-800.jpg" srcset="${IMG}${p.img}-800.jpg 800w, ${IMG}${p.img}-1600.jpg 1600w"
        sizes="${sizes}" alt="${esc(p.alt)}" loading="lazy" decoding="async"${p.pos ? ` style="object-position:${esc(p.pos)}"` : ''}></span>
      <span class="card-glare" aria-hidden="true"></span>
      ${p.status ? `<span class="badge"><i aria-hidden="true"></i>${esc(p.status)}</span>` : ''}
      <span class="card-cta" aria-hidden="true">${esc(p.url ? p.cta : 'View details')} ${ARROW}</span>
      <span class="card-body">
        <span class="card-kicker">${esc(p.client)}</span>
        <span class="card-title">${esc(p.title)}</span>
        <span class="card-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</span>
      </span>
    </a>`;
  };

  if (grid) grid.innerHTML = projects.map(cardHTML).join('');
  const cards = $$('.card', grid || document);
  const countEl = $('#work-count');
  if (countEl) countEl.textContent = projects.length;

  /* Filters */
  const filtersEl = $('#filters');
  if (filtersEl) {
    filtersEl.innerHTML = FILTERS.map((f) => {
      const n = f.id === 'all' ? projects.length : projects.filter((p) => p.filters.includes(f.id)).length;
      return `<button type="button" class="chip" data-filter="${f.id}" aria-pressed="${f.id === 'all'}">${f.label}<span class="chip-n">${n}</span></button>`;
    }).join('');
  }
  const chips = $$('.chip', filtersEl || document);

  function applyFilter(id) {
    const run = () => {
      cards.forEach((c) => { c.hidden = id !== 'all' && !c.dataset.filters.split(' ').includes(id); });
      grid.classList.toggle('is-filtered', id !== 'all');
      chips.forEach((ch) => ch.setAttribute('aria-pressed', String(ch.dataset.filter === id)));
      if (countEl) countEl.textContent = cards.filter((c) => !c.hidden).length;
    };
    if (document.startViewTransition && !reduce) document.startViewTransition(run);
    else run();
  }
  chips.forEach((ch) => ch.addEventListener('click', () => applyFilter(ch.dataset.filter)));

  /* Collaborators marquee: hold still until it's on screen */
  const collab = $('.collab');
  if (collab) {
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { collab.classList.add('seen'); cio.disconnect(); }
      }, { threshold: 0.9 });
      opened.then(() => cio.observe(collab)); // not while the door is still shut
    } else collab.classList.add('seen');
  }

  /* Scroll reveal */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => rio.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* Tilt + glare on cards */
  if (fine && !reduce) {
    cards.forEach((card) => {
      const amp = card.classList.contains('feature') ? 3 : 6;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--rx', ((0.5 - y) * amp).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((x - 0.5) * amp).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    /* Custom cursor: a dot and a trailing ring; over tiles the ring becomes a glowing orb */
    document.documentElement.classList.add('has-cursor');
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot out';
    ring.className = 'cursor-ring out';
    dot.innerHTML = ring.innerHTML = '<i></i>';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    const dlg = document.getElementById('modal');
    const host = () => (dlg && dlg.open ? dlg : document.body);
    const mount = () => { const h = host(); if (dot.parentNode !== h) { h.append(ring, dot); } };
    mount();
    let x = -200, y = -200, rx = x, ry = y, moving = false;
    const follow = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(x - rx) + Math.abs(y - ry) > 0.2) requestAnimationFrame(follow); else moving = false;
    };
    const setMode = (target) => {
      const orb = !!(target && target.closest && target.closest('.card'));
      const link = !orb && !!(target && target.closest && target.closest('a, button, .chip, [role="button"]'));
      ring.classList.toggle('orb', orb); dot.classList.toggle('orb', orb);
      ring.classList.toggle('link', link); dot.classList.toggle('link', link);
    };
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      dot.classList.remove('out'); ring.classList.remove('out');
      if (!moving) { moving = true; requestAnimationFrame(follow); }
    }, { passive: true });
    document.addEventListener('pointerover', (e) => setMode(e.target));
    document.documentElement.addEventListener('pointerleave', () => { dot.classList.add('out'); ring.classList.add('out'); });
    window.addEventListener('pointerdown', () => ring.classList.add('press'));
    // Safari brings back the system pointer when a press starts a text selection; skip that outside form fields
    document.addEventListener('mousedown', (e) => {
      if (e.button !== 0 || (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]'))) return;
      e.preventDefault();
    });
    window.addEventListener('pointerup', () => ring.classList.remove('press'));
    if (dlg) {
      dlg.addEventListener('close', mount);
      window.__mountCursor = mount;
    }

    /* Slight magnetic pull on buttons */
    $$('.btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  }

  /* ---------------------------------------------------------------
   * Project detail dialog
   * ------------------------------------------------------------- */
  const modal = $('#modal');
  const m = {
    img: $('#m-img'), count: $('#m-count'), kicker: $('#m-kicker'), title: $('#m-title'),
    desc: $('#m-desc'), tags: $('#m-tags'), cta: $('#m-cta'), note: $('#m-note')
  };
  let list = projects.slice();
  let pos = 0;
  const pad = (n) => String(n).padStart(2, '0');

  function fill(p) {
    const src = p.full || p.img;
    m.img.classList.remove('ready');
    m.img.onload = () => m.img.classList.add('ready');
    m.img.src = `${IMG}${src}-1600.jpg`;
    m.img.alt = (p.full && p.fullAlt) || p.alt;
    if (m.img.complete) m.img.classList.add('ready');
    m.count.textContent = `${pad(pos + 1)} / ${pad(list.length)}`;
    m.kicker.textContent = p.client;
    m.title.textContent = p.title;
    m.desc.textContent = p.desc;
    m.tags.innerHTML = (p.status ? `<li class="tag-status">${esc(p.status)}</li>` : '') + p.tags.map((t) => `<li>${esc(t)}</li>`).join('');
    m.cta.hidden = !p.url;
    if (p.url) m.cta.href = p.url; else m.cta.removeAttribute('href');
    m.cta.innerHTML = `${esc(p.cta || '')} ${ARROW}`;
    m.note.textContent = p.note || '';
    m.note.hidden = !p.note;
  }

  function openProject(slug) {
    const p = bySlug[slug];
    if (!p || !modal || typeof modal.showModal !== 'function') return false;
    const visible = cards.filter((c) => !c.hidden).map((c) => bySlug[c.dataset.slug]);
    list = visible.includes(p) ? visible : projects.slice();
    pos = list.indexOf(p);
    fill(p);
    if (!modal.open) {
      modal.showModal();
      document.documentElement.classList.add('modal-open');
      if (window.__mountCursor) window.__mountCursor();
    }
    setHash('#' + slug);
    return true;
  }
  function stepProject(d) {
    pos = (pos + d + list.length) % list.length;
    fill(list[pos]);
    setHash('#' + list[pos].slug);
  }

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new-tab clicks open the same panel there
      if (openProject(card.dataset.slug)) e.preventDefault();
    });
  });

  if (modal) {
    $('#m-close').addEventListener('click', () => modal.close());
    $('#m-prev').addEventListener('click', () => stepProject(-1));
    $('#m-next').addEventListener('click', () => stepProject(1));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') stepProject(-1);
      if (e.key === 'ArrowRight') stepProject(1);
    });
    modal.addEventListener('close', () => {
      document.documentElement.classList.remove('modal-open');
      setHash('');
    });
  }

  const fromHash = () => {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (bySlug[slug]) openProject(slug);
  };
  window.addEventListener('hashchange', fromHash);
  fromHash();

  /* ---------------------------------------------------------------
   * Contact: rotating questions, copy email
   * ------------------------------------------------------------- */
  const ask = $('#ask');
  if (ask && !reduce) {
    const items = $$('span', ask).filter((s) => s.parentElement === ask);
    items.forEach((s) => { s.dataset.text = s.textContent.trim(); });
    let i = 0, inView = false, hovering = false;
    const show = (n) => {
      items[i].classList.remove('on');
      i = n;
      items[i].classList.add('on');
      decode(items[i], items[i].dataset.text, { duration: 900 });
    };
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(ask);
    ask.addEventListener('pointerenter', () => { hovering = true; });
    ask.addEventListener('pointerleave', () => { hovering = false; });
    setInterval(() => { if (inView && !hovering && !document.hidden) show((i + 1) % items.length); }, 4200);
  }

  $$('.copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const done = (label) => { btn.textContent = label; setTimeout(() => { btn.textContent = 'Copy'; }, 1800); };
      const selectText = () => {
        const target = document.getElementById(btn.dataset.target);
        if (!target) return;
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done('Selected');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(btn.dataset.copy).then(() => done('Copied'), selectText);
      } else {
        selectText();
      }
    });
  });

  /* ---------------------------------------------------------------
   * Footer: wordmark sized to the full width, with a cursor spotlight
   * ------------------------------------------------------------- */
  const mark = $('.footer-mark');
  const markText = mark && mark.firstElementChild;
  const fit = () => {
    if (!markText) return;
    markText.style.fontSize = '100px';
    const w = markText.getBoundingClientRect().width;
    if (w) markText.style.fontSize = (100 * mark.clientWidth / w * 0.995).toFixed(2) + 'px';
  };
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('resize', fit);
  if (mark && fine && !reduce) {
    mark.addEventListener('pointermove', (e) => {
      const r = markText.getBoundingClientRect();
      markText.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      markText.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  const portrait = $('.portrait');
  const portraitImg = $('.portrait-img');
  if (portrait && portraitImg) {
    const aim = (e) => {
      const r = portraitImg.getBoundingClientRect();
      portraitImg.style.setProperty('--px', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      portraitImg.style.setProperty('--py', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    };
    portrait.addEventListener('pointerenter', aim);
    portrait.addEventListener('pointerleave', aim);
    if (!fine) {
      portrait.addEventListener('click', () => portrait.classList.toggle('colour'));
      if ('IntersectionObserver' in window) {
        const pio = new IntersectionObserver(([e]) => {
          if (e.intersectionRatio > 0.6) { setTimeout(() => portrait.classList.add('colour'), 500); pio.disconnect(); }
        }, { threshold: [0, 0.6, 1] });
        pio.observe(portrait);
      }
    }
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
