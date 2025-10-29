(function(){
  // Respect reduced motion: reveal everything immediately
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = Array.from(document.querySelectorAll('.reveal'));
  if (!elements.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
})();

// Button ripple micro-interaction
(function(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], a.btn'));
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function(e){
      if (btn.disabled) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';

      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      // Remove existing ripple if any (for rapid clicks)
      const old = btn.querySelector('.ripple');
      if (old) old.remove();

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

// Auto-highlight current nav link
(function(){
  try {
    const links = Array.from(document.querySelectorAll('nav a[href]'));
    if (!links.length) return;
    const current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href');
      const target = href.split('/').pop();
      if (target === current) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
        // Kick off underline animation on next frame (for CSS transition)
        requestAnimationFrame(() => a.classList.add('is-animated'));
      }
    });
  } catch (e) { /* no-op */ }
})();

// Typography preset toggle (modern, editorial, compact)
(function(){
  try {
    const html = document.documentElement;
    const PRESETS = ['typo-modern', 'typo-editorial', 'typo-compact'];
    const STORAGE_KEY = 'typo-preset';

    function getCurrentPreset() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && PRESETS.includes(saved)) return saved;
      // Detect current class on <html> or default to modern
      const existing = PRESETS.find(c => html.classList.contains(c));
      return existing || 'typo-modern';
    }

    function applyPreset(preset) {
      PRESETS.forEach(c => html.classList.remove(c));
      html.classList.add(preset);
      localStorage.setItem(STORAGE_KEY, preset);
      updateButtonLabel(preset);
    }

    function nextPreset(preset) {
      const idx = PRESETS.indexOf(preset);
      const next = PRESETS[(idx + 1) % PRESETS.length];
      return next;
    }

    function labelFor(preset) {
      return preset.replace('typo-', '');
    }

    function updateButtonLabel(preset) {
      const btn = document.querySelector('.typo-toggle');
      if (btn) btn.innerHTML = `Text: <span class="typo-badge">${labelFor(preset)}</span>`;
    }

    // Initialize
    const initial = getCurrentPreset();
    applyPreset(initial);

    // Inject toggle button once per page
    if (!document.querySelector('.typo-toggle')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'typo-toggle';
      btn.setAttribute('aria-label', 'Cycle typography preset');
      btn.addEventListener('click', () => {
        const current = getCurrentPreset();
        applyPreset(nextPreset(current));
      });
      document.body.appendChild(btn);
      updateButtonLabel(initial);
    }
  } catch (e) { /* no-op */ }
})();

// Gallery lightbox for Projects page
(function(){
  const galleryImages = Array.from(document.querySelectorAll('#gallery .gallery-item img'));
  if (!galleryImages.length) return;

  // Lazy-load images for performance
  galleryImages.forEach(img => { if (!img.loading) img.loading = 'lazy'; });

  // Make images keyboard-activatable
  galleryImages.forEach(img => {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    const label = img.getAttribute('alt') || 'Open image';
    img.setAttribute('aria-label', `Open: ${label}`);
  });

  let currentIndex = 0;
  let lastFocused = null;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image preview');

  overlay.innerHTML = `
    <div class="lightbox__inner">
      <button class="lightbox__btn lightbox__prev" aria-label="Previous image" title="Previous" type="button">&#10094;</button>
      <img class="lightbox__img" alt="">
      <button class="lightbox__btn lightbox__next" aria-label="Next image" title="Next" type="button">&#10095;</button>
      <div class="lightbox__caption" aria-live="polite"></div>
      <button class="lightbox__close" aria-label="Close" title="Close" type="button">&#10005;</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox__img');
  const captionEl = overlay.querySelector('.lightbox__caption');
  const btnPrev = overlay.querySelector('.lightbox__prev');
  const btnNext = overlay.querySelector('.lightbox__next');
  const btnClose = overlay.querySelector('.lightbox__close');

  function update(index) {
    const item = galleryImages[index];
    if (!item) return;
    imgEl.src = item.src;
    imgEl.alt = item.alt || '';
    captionEl.textContent = item.alt || '';
  }

  function open(index) {
    lastFocused = document.activeElement;
    currentIndex = index;
    update(currentIndex);
    overlay.classList.add('is-open');
    document.body.classList.add('has-lightbox');
    // Focus close for accessibility
    btnClose.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('has-lightbox');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    update(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    update(currentIndex);
  }

  // Event wiring
  galleryImages.forEach((img, idx) => {
    img.addEventListener('click', () => open(idx));
    img.style.cursor = 'zoom-in';
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(idx);
      }
    });
  });

  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  btnClose.addEventListener('click', close);

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    const inner = overlay.querySelector('.lightbox__inner');
    if (!inner.contains(e.target)) close();
  });

  // Keyboard controls and focus trap
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'Tab') {
      // Focus trap among buttons and image
      const focusables = [btnPrev, btnNext, btnClose];
      const idx = focusables.indexOf(document.activeElement);
      if (e.shiftKey) {
        e.preventDefault();
        const ni = (idx - 1 + focusables.length) % focusables.length;
        focusables[ni].focus();
      } else {
        e.preventDefault();
        const ni = (idx + 1) % focusables.length;
        focusables[ni].focus();
      }
    }
  });
})();

// Map toolbar accessibility: allow keyboard activation of label-based controls
(function(){
  const toolbar = document.querySelector('.map-toolbar');
  if (!toolbar) return;

  function enhanceLabel(lbl) {
    if (!lbl || !lbl.htmlFor) return;
    const input = document.getElementById(lbl.htmlFor);
    if (!input) return;
    lbl.setAttribute('role', 'button');
    if (!lbl.hasAttribute('tabindex')) lbl.tabIndex = 0;

    function syncPressed() {
      if (input.type === 'checkbox') {
        lbl.setAttribute('aria-pressed', input.checked ? 'true' : 'false');
      } else if (input.type === 'radio') {
        // set pressed true on the checked in the group, false on others
        const group = Array.from(document.querySelectorAll(`label[for]`))
          .filter(l => {
            const i = document.getElementById(l.htmlFor);
            return i && i.type === 'radio' && i.name === input.name;
          });
        group.forEach(l => {
          const i = document.getElementById(l.htmlFor);
          l.setAttribute('aria-pressed', i && i.checked ? 'true' : 'false');
        });
      }
    }

    lbl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lbl.click();
      }
    });

    lbl.addEventListener('click', () => {
      // click will toggle/check input due to label association
      // give the browser a tick to update checked state
      setTimeout(syncPressed, 0);
    });

    // Initialize state
    syncPressed();
  }

  // Enhance all toolbar and panel labels that control inputs
  const labels = Array.from(document.querySelectorAll('.map-toolbar label[for], .map-panel label[for], .map-zoom label[for]'));
  labels.forEach(enhanceLabel);

  // Sidebar toggle aria-expanded sync
  const sidebarToggleLabels = Array.from(document.querySelectorAll('label[for="sidebar-cb"]'));
  const sidebarCb = document.getElementById('sidebar-cb');
  if (sidebarCb) {
    function syncExpanded() {
      const expanded = !!sidebarCb.checked;
      sidebarToggleLabels.forEach(l => l.setAttribute('aria-expanded', expanded ? 'true' : 'false'));
    }
    sidebarToggleLabels.forEach(l => l.setAttribute('aria-controls', 'places-panel'));
    sidebarCb.addEventListener('change', syncExpanded);
    syncExpanded();
  }
})();

// Contact form: prevent submit (demo) and announce politely
(function(){
  const form = document.querySelector('form.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('contact-note');
    if (note) note.textContent = 'Thanks! This is a demo and no message was sent.';
  });
})();
