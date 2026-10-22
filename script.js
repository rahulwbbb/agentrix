(() => {
  'use strict';
  const icon = p => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const services = [
    ['AI Chatbots','Smart website and WhatsApp chatbots that answer customers and capture leads 24/7.',icon('<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/>')],
    ['AI Voice Agents','Natural-sounding voice assistants that handle calls, bookings and follow-ups.',icon('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>')],
    ['Workflow Automation','Connect your apps and remove manual steps with reliable automated workflows.',icon('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3 3 0 0 1 3 3v6.5"/>')],
    ['Website Development','Fast, modern, SEO-ready websites designed to convert visitors into customers.',icon('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>')],
    ['Custom AI Solutions','Tailored AI agents and integrations built around your data and goals.',icon('<path d="M12 3l2.2 5.3L20 9l-4.2 3.9L17 19l-5-3-5 3 1.2-6.1L4 9l5.8-.7z"/>')],
    ['Business Process Automation','Automate invoicing, reporting, onboarding and other repetitive back-office tasks.',icon('<path d="M4 7h16M4 12h10M4 17h7"/><path d="M17 15l2 2 3-4"/>')]
  ];
  const why = [
    ['Fast Delivery','Working automations in days, not months.',icon('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>')],
    ['Affordable Pricing','Clear, fair pricing built for growing businesses.',icon('<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.600-1.500-3-1.500-1.700 0-2.800.9-2.800 2.100 0 3 5.800 1.200 5.800 4.200 0 1.200-1.200 2.200-3 2.200-1.400 0-2.500-.6-3-1.600M12 6.500V8m0 8v1.500"/>')],
    ['Secure Automation','Your data stays protected with safe, private setups.',icon('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>')],
    ['Custom Solutions','Every build is shaped around how you work.',icon('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>')],
    ['Ongoing Support','We monitor, fix and improve after launch.',icon('<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/>')],
    ['Modern AI Technology','Built on today’s leading AI models and tools.',icon('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>')]
  ];
  const render = (id, list) => {
    document.getElementById(id).innerHTML = list.map(([t, d, i], n) =>
      `<article class="card glass reveal" style="transition-delay:${(n % 3) * 90}ms"><div class="icon">${i}</div><h3>${t}</h3><p>${d}</p></article>`).join('');
  };
  render('service-grid', services);
  render('why-grid', why);

  // card glow follows cursor
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  });

  // mobile menu
  const burger = document.getElementById('burger'), links = document.getElementById('links');
  const toggle = open => { links.classList.toggle('open', open); burger.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => toggle(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') toggle(false); });

  // scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // animated counters
  const count = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', dur = 1800, t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('en-IN') + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); }
  }), { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // active nav link
  const navLinks = [...links.querySelectorAll('a:not(.btn)')];
  const sio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'services', 'about', 'contact'].forEach(id => sio.observe(document.getElementById(id)));

  // contact form
  const form = document.getElementById('form'), status = document.getElementById('status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => {
      const bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.classList.toggle('bad', bad); if (bad) ok = false;
    });
    status.className = 'status full ' + (ok ? 'ok' : 'err');
    if (!ok) { status.textContent = 'Please fill in your name, a valid email and a message.'; return; }
    /* Connect a backend here (Formspree, Web3Forms, Google Apps Script, n8n webhook) with fetch(). */
    status.textContent = 'Thanks! We’ve received your message and will reply within 24 hours.';
    form.reset();
  });
})();
