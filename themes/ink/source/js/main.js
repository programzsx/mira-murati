/* Ink Theme — Minimal Client Scripts */
(function () {
  'use strict';

  // ── Helpers ──
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

  // ── Copyright year ──
  var el = document.getElementById('copyright-year');
  if (el) {
    el.textContent = new Date().getFullYear();
  }

  // ── TOC toggle for mobile ──
  var toc = document.querySelector('.toc');
  if (toc) {
    var toggle = toc.querySelector('.toc-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        toc.classList.toggle('open');
      });
    }
  }

  // ── Code block beautify: add header bar with macOS dots + language label ──
  var highlights = document.querySelectorAll('.post-body .highlight');
  highlights.forEach(function (fig) {
    // Extract language from class (e.g., "highlight bash" → "bash")
    var lang = '';
    var classes = fig.className.split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] !== 'highlight') {
        lang = classes[i];
        break;
      }
    }

    // Create header bar
    var header = document.createElement('div');
    header.className = 'code-header';

    // macOS dots
    var dots = document.createElement('div');
    dots.className = 'dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(dots);

    // Language label
    if (lang) {
      var label = document.createElement('span');
      label.className = 'lang-label';
      label.textContent = lang;
      header.appendChild(label);
    }

    // Insert header before the table
    fig.insertBefore(header, fig.firstChild);
  });

  // ── Site-wide password gate ──
  // Triggered by <meta name="site-password" content="<CLEAR-PASSWORD>">.
  // The site password is sent cleartext (it has to be — client must hash it),
  // so the gate is only a soft barrier. Don't rely on it for real secrets.
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

  // ── Per-post password gate (legacy) ──
  // Triggered by <meta name="post-password" content="<CLEAR-PASSWORD>">.
  // Only runs if the site-wide gate did not already render #password-gate.
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
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
    input.focus();
  }
})();
