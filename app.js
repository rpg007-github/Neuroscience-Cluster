/* ============================================
   UWF Neuroscience Research Cluster
   app.js — Interactions & Animations
   ============================================ */

// ---- Neural Network Canvas ----
(function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initNodes();
  }

  function initNodes() {
    const count = Math.floor((W * H) / 14000);
    nodes = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2
    }));
  }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    // Update
    nodes.forEach(n => {
      n.x  += n.vx;
      n.y  += n.vy;
      n.pulse += 0.018;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Connections
    const maxDist = 160;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const alpha = (1 - d / maxDist) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(77, 166, 255, ${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      const pulsed = n.r + Math.sin(n.pulse) * 0.6;
      // Glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsed * 5);
      grad.addColorStop(0, 'rgba(77, 166, 255, 0.25)');
      grad.addColorStop(1, 'rgba(77, 166, 255, 0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulsed * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulsed, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(77, 166, 255, 0.8)`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  // Mouse interaction
  let mouse = { x: -9999, y: -9999 };
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  raf = requestAnimationFrame(draw);
})();

// ---- Navbar scroll ----
(function initNav() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ---- Counter animation ----
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const prefix   = el.dataset.prefix   || '';
    const suffix   = el.dataset.suffix   || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => io.observe(el));
})();

// ---- Scroll reveal ----
(function initReveal() {
  const targets = document.querySelectorAll(
    '.area-card, .member-card, .pub-item, .grant-card, .news-item, .pillar, .stat'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
})();

// ---- Active nav link highlight ----
(function initActiveSections() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + id
            ? 'var(--text-primary)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();

// ---- Stagger card animations ----
(function staggerCards() {
  document.querySelectorAll('.research-areas, .team-grid, .grants-grid').forEach(group => {
    const cards = group.querySelectorAll('.area-card, .member-card, .grant-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = (i * 0.08) + 's';
    });
  });
})();

// ---- Mobile hamburger (placeholder) ----
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // In production, the UWF CMS will handle mobile nav
    alert('Mobile navigation will be handled by the UWF CMS template.');
  });
})();

// ---- Smooth link hovers ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
