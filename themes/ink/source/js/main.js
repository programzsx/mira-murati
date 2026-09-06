/* Ink Theme — Cyber-noir Editorial Client Scripts */
(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      .then(function (buf) {
        var arr = new Uint8Array(buf);
        var hex = '';
        for (var i = 0; i < arr.length; i++) {
          hex += (arr[i] < 16 ? '0' : '') + arr[i].toString(16);
        }
        return hex;
      });
  }

  /* ---------- Copyright year ---------- */
  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- TOC toggle for mobile ---------- */
  var toc = document.querySelector('.toc');
  if (toc) {
    var toggle = toc.querySelector('.toc-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        toc.classList.toggle('open');
      });
    }
  }

  /* ---------- Code block beautify + copy button ---------- */
  var highlights = document.querySelectorAll('.post-body .highlight');
  highlights.forEach(function (fig) {
    var lang = '';
    var classes = fig.className.split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] !== 'highlight') { lang = classes[i]; break; }
    }
    var header = document.createElement('div');
    header.className = 'code-header';
    var dots = document.createElement('div');
    dots.className = 'dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(dots);

    var right = document.createElement('div');
    right.style.cssText = 'display:flex;align-items:center;gap:8px;';
    if (lang) {
      var label = document.createElement('span');
      label.className = 'lang-label';
      label.textContent = lang;
      right.appendChild(label);
    }
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'code-copy';
    copyBtn.textContent = 'copy';
    copyBtn.setAttribute('aria-label', '复制代码');
    right.appendChild(copyBtn);
    header.appendChild(right);

    fig.insertBefore(header, fig.firstChild);

    copyBtn.addEventListener('click', function () {
      var code = fig.querySelector('pre code') || fig.querySelector('code') || fig.querySelector('pre');
      var text = code ? code.innerText : '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = 'copied';
          copyBtn.classList.add('copied');
          setTimeout(function () { copyBtn.textContent = 'copy'; copyBtn.classList.remove('copied'); }, 1600);
        });
      } else {
        // Fallback for older browsers
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); copyBtn.textContent = 'copied'; copyBtn.classList.add('copied'); } catch (e) {}
        document.body.removeChild(ta);
        setTimeout(function () { copyBtn.textContent = 'copy'; copyBtn.classList.remove('copied'); }, 1600);
      }
    });
  });

  /* ---------- Lazy-load images (defensive — for static HTML) ---------- */
  document.querySelectorAll('.post-body img, .entry-content img').forEach(function (img) {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
  });

  /* ---------- Lightbox: click-to-zoom images in post body ---------- */
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', '图片预览');
  lb.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.92);display:none;align-items:center;justify-content:center;padding:2rem;cursor:zoom-out;';
  lb.innerHTML = '<img alt="" style="max-width:95vw;max-height:95vh;object-fit:contain;border-radius:8px;box-shadow:0 24px 64px rgba(0,0,0,0.6);"><button type="button" aria-label="关闭" style="position:absolute;top:1.5rem;right:1.5rem;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.25rem;cursor:pointer;backdrop-filter:blur(8px);">×</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  var lbClose = lb.querySelector('button');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.style.display = 'none';
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  lb.addEventListener('click', closeLightbox);
  lbClose.addEventListener('click', function (e) { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.style.display === 'flex') closeLightbox();
  });

  document.querySelectorAll('.post-body img, .entry-content img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', '点击放大图片');
    var activate = function () { openLightbox(img.src, img.alt); };
    img.addEventListener('click', activate);
    img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
  });

  /* ---------- Reading progress bar ---------- */
  var progress = document.getElementById('reading-progress');
  if (progress) {
    var updateProgress = function () {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
      progress.style.setProperty('--progress', pct + '%');
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- TOC scroll-spy ---------- */
  var tocLinks = document.querySelectorAll('.sidebar-toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var headings = [];
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var h = document.getElementById(id);
      if (h) headings.push({ id: id, el: h, link: a });
    });
    var setActive = function (id) {
      tocLinks.forEach(function (a) { a.classList.remove('active'); });
      var target = document.querySelector('.sidebar-toc a[href="#' + id + '"]');
      if (target) target.classList.add('active');
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    headings.forEach(function (h) { spy.observe(h.el); });
  }

  /* ---------- Theme toggle (light / dark) ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme') || '';
      // No attribute = follow system (currently dark). Clicking forces light, then dark, then system.
      var next;
      if (!current) next = 'light';
      else if (current === 'light') next = 'dark';
      else next = ''; // back to system
      if (next) html.setAttribute('data-theme', next);
      else html.removeAttribute('data-theme');
      try { localStorage.setItem('ink-theme', next); } catch (e) {}
    });
  }

  /* ---------- Site-wide password gate ---------- */
  var siteMeta = document.querySelector('meta[name="site-password"]');
  if (siteMeta) {
    var sitePassword = siteMeta.getAttribute('content');
    var siteGate = document.getElementById('password-gate');
    var siteBody = document.getElementById('post-body-protected');
    var siteInput = document.getElementById('password-input');
    var siteSubmit = document.getElementById('password-submit');
    var siteError = document.getElementById('password-error');
    var SITE_AUTH_KEY = 'site_auth';

    if (sessionStorage.getItem(SITE_AUTH_KEY) === '1') {
      siteGate.style.display = 'none';
      siteBody.style.display = '';
    } else {
      siteInput.focus();
    }

    function trySiteUnlock() {
      sha256(siteInput.value).then(function (hash) {
        return sha256(sitePassword).then(function (expected) {
          if (hash === expected) {
            sessionStorage.setItem(SITE_AUTH_KEY, '1');
            siteGate.style.display = 'none';
            siteBody.style.display = '';
          } else {
            siteError.textContent = '密码错误，请重试';
            siteInput.value = '';
            siteInput.focus();
          }
        });
      });
    }

    siteSubmit.addEventListener('click', trySiteUnlock);
    siteInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') trySiteUnlock();
    });
  }

  /* ---------- Per-post password gate (legacy) ---------- */
  var postMeta = document.querySelector('meta[name="post-password"]');
  if (postMeta && !siteMeta) {
    var correctPassword = postMeta.getAttribute('content');
    var gate = document.getElementById('password-gate');
    var body = document.getElementById('post-body-protected');
    var input = document.getElementById('password-input');
    var submit = document.getElementById('password-submit');
    var error = document.getElementById('password-error');
    var pagePath = window.location.pathname;
    if (sessionStorage.getItem('auth_' + pagePath) === correctPassword) {
      gate.style.display = 'none';
      body.style.display = 'block';
    }
    function tryUnlock() {
      if (input.value === correctPassword) {
        sessionStorage.setItem('auth_' + pagePath, correctPassword);
        gate.style.display = 'none';
        body.style.display = 'block';
      } else {
        error.textContent = '密码错误，请重试';
        input.value = '';
        input.focus();
      }
    }
    submit.addEventListener('click', tryUnlock);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
    input.focus();
  }
})();
