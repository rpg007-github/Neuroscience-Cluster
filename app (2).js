/* ============================================================
   UWF Neuroscience Research Cluster — app.js v2.0
   GOVERNANCE NOTE: Custom JS requires UMC approval per UWF web policy.
   Submit this file to websupport@uwf.edu for vetting.
   ============================================================ */

'use strict';

// ---- Neural Network Canvas (UWF Blue palette) ----
(function initNeural() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }
  const ctx = canvas.getContext('2d');
  let W, H, nodes;

  const BLUE  = 'rgba(0, 76, 151,';
  const GREEN = 'rgba(0, 122, 51,';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildNodes();
  }

  function buildNodes() {
    const n = Math.min(Math.floor((W * H) / 14000), 80);
    nodes = Array.from({ length: n }, (_, i) => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      r:     Math.random() * 2 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      color: i % 6 === 0 ? GREEN : BLUE
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.pulse += 0.012;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Connections
    const maxD = 140;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          const a = (1 - d / maxD) * 0.13;
          ctx.beginPath();
          ctx.strokeStyle = BLUE + a + ')';
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      const r = n.r + Math.sin(n.pulse) * 0.45;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
      g.addColorStop(0, n.color + '0.28)');
      g.addColorStop(1, n.color + '0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.8)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  new ResizeObserver(resize).observe(canvas);
  resize();
  draw();
})();

// ---- Navbar: scroll state + mobile toggle ----
(function() {
  const nav    = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close on any nav link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
})();

// ---- Counter animations ----
(function() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nums.forEach(el => { el.textContent = el.dataset.target; });
    return;
  }
  const ease = t => 1 - Math.pow(1 - t, 3);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target, 10);
      const start  = performance.now();
      const dur    = 1500;
      (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(ease(p) * target);
        if (p < 1) requestAnimationFrame(step);
      })(start);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(el => io.observe(el));
})();

// ---- Scroll reveal ----
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll(
    '.research-card, .member-card, .pub-item, .grant-card, .why-item, .contact-card, .nn-labs'
  );
  targets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
  targets.forEach(el => io.observe(el));

  // Stagger delay for grids
  document.querySelectorAll('.research-grid, .team-grid, .grants-grid').forEach(g => {
    g.querySelectorAll('.research-card, .member-card, .grant-card').forEach((c, i) => {
      c.style.transitionDelay = (i * 0.06) + 's';
    });
  });
})();

// ---- Publication filter ----
(function() {
  const btns  = document.querySelectorAll('.pf-btn');
  const items = document.querySelectorAll('.pub-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const lab = item.dataset.lab || '';
        const show = filter === 'all' || lab === filter;
        item.classList.toggle('hidden', !show);
        item.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
    });
  });
})();

// ---- Smooth anchor scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

// ---- Active nav link on scroll ----
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();
