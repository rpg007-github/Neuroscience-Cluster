/*
  app-neuro.js — UWF Neuroscience Research Cluster
  GOVERNANCE: Submit to websupport@uwf.edu for UMC vetting before production.
  Accessibility: prefers-reduced-motion respected throughout.
  Dependencies: Bootstrap 4 (loaded by T4), jQuery slim (loaded by T4).
*/

'use strict';

// ---- Neural Canvas (UWF Blue palette, neuro-nautical) ----
(function initNeural() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }
  const ctx = canvas.getContext('2d');
  let W, H, nodes;

  const BLUE  = 'rgba(0,76,151,';
  const GREEN = 'rgba(0,122,51,';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildNodes();
  }

  function buildNodes() {
    const n = Math.min(Math.floor((W * H) / 14000), 75);
    nodes = Array.from({ length: n }, (_, i) => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    (Math.random() - 0.5) * 0.25,
      r:     Math.random() * 1.8 + 0.7,
      pulse: Math.random() * Math.PI * 2,
      color: i % 6 === 0 ? GREEN : BLUE
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(nd => {
      nd.x += nd.vx; nd.y += nd.vy; nd.pulse += 0.01;
      if (nd.x < 0 || nd.x > W) nd.vx *= -1;
      if (nd.y < 0 || nd.y > H) nd.vy *= -1;
    });
    const maxD = 130;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.beginPath();
          ctx.strokeStyle = BLUE + ((1 - d / maxD) * 0.12) + ')';
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(nd => {
      const r = nd.r + Math.sin(nd.pulse) * 0.4;
      const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, r * 6);
      g.addColorStop(0, nd.color + '0.25)');
      g.addColorStop(1, nd.color + '0)');
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, r * 6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2);
      ctx.fillStyle = nd.color + '0.8)';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  new ResizeObserver(resize).observe(canvas);
  resize();
  draw();
})();

// ---- Counter animations ----
(function initCounters() {
  const els = document.querySelectorAll('.neuro-stat-num[data-target]');
  if (!els.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => {
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      el.textContent = pre + el.dataset.target + suf;
    });
    return;
  }
  const ease = t => 1 - Math.pow(1 - t, 3);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const pre    = el.dataset.prefix || '';
      const suf    = el.dataset.suffix || '';
      const start  = performance.now();
      const dur    = 1400;
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = pre + Math.round(ease(p) * target) + suf;
        if (p < 1) requestAnimationFrame(step);
      })(start);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
})();

// ---- Publication filter ----
(function initPubFilter() {
  const btns  = document.querySelectorAll('.neuro-pf');
  const items = document.querySelectorAll('.neuro-pub-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button states
      btns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline-primary');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline-primary');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.lab === filter;
        item.classList.toggle('hidden', !show);
        item.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
    });
  });
})();

// ---- Scroll reveal (minimal, accessibility-safe) ----
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll(
    '.neuro-research-card, .neuro-pub-item, .neuro-placement-card, .alternating'
  );
  targets.forEach(el => el.classList.add('neuro-reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
  targets.forEach(el => io.observe(el));
})();

// ---- Smooth anchor scrolling (respects reduced motion) ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 64;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto' : 'smooth';
    window.scrollTo({ top, behavior });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});
