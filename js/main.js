/* =====================================================================
   Regulars — site JS
   Vanilla only. Handles:
     - mobile nav toggle
     - image lightbox with keyboard navigation + download link
     - copy-to-clipboard buttons
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Mobile nav ------------------------------------------- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close on link click (mobile)
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Lightbox --------------------------------------------- */
  var lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    var lbImg = lightbox.querySelector('[data-lightbox-img]');
    var lbCounter = lightbox.querySelector('[data-lightbox-counter]');
    var lbCaption = lightbox.querySelector('[data-lightbox-caption]');
    var lbDl = lightbox.querySelector('[data-lightbox-dl]');
    var lbClose = lightbox.querySelector('[data-lightbox-close]');
    var lbPrev = lightbox.querySelector('[data-lightbox-prev]');
    var lbNext = lightbox.querySelector('[data-lightbox-next]');

    // Collect all gallery items as [{full, caption}]
    var items = [];
    var triggers = document.querySelectorAll('[data-lightbox-trigger]');
    triggers.forEach(function (el, idx) {
      var full = el.getAttribute('data-full') || el.getAttribute('href');
      var caption = el.getAttribute('data-caption') || (el.querySelector('img') && el.querySelector('img').alt) || '';
      items.push({ full: full, caption: caption });
      el.addEventListener('click', function (e) {
        // allow plain right-click + ctrl-click to still save
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        e.preventDefault();
        openAt(idx);
      });
    });

    var cur = 0, lastFocused = null;

    function openAt(i) {
      cur = i;
      lastFocused = document.activeElement;
      render();
      lightbox.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      // focus close for keyboard
      window.setTimeout(function () { lbClose && lbClose.focus(); }, 10);
    }
    function close() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }
    function next(d) {
      cur = (cur + d + items.length) % items.length;
      render();
    }
    function render() {
      var item = items[cur];
      lbImg.src = item.full;
      lbImg.alt = item.caption;
      if (lbCounter) lbCounter.textContent = (cur + 1) + ' / ' + items.length;
      if (lbCaption) lbCaption.textContent = item.caption;
      if (lbDl) {
        lbDl.href = item.full;
        // file basename for download attribute
        var slash = item.full.lastIndexOf('/');
        lbDl.setAttribute('download', slash >= 0 ? item.full.substring(slash + 1) : item.full);
      }
    }

    lbClose && lbClose.addEventListener('click', close);
    lbPrev && lbPrev.addEventListener('click', function () { next(-1); });
    lbNext && lbNext.addEventListener('click', function () { next(1); });
    // click on scrim closes
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    // keyboard
    document.addEventListener('keydown', function (e) {
      if (lightbox.getAttribute('aria-hidden') !== 'false') return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next(1);
      else if (e.key === 'ArrowLeft') next(-1);
    });
  }

  /* ---------- Copy-to-clipboard ------------------------------------ */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var prev = btn.textContent;
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        window.setTimeout(function () {
          btn.classList.remove('copied');
          btn.textContent = prev;
        }, 1600);
      };
      // Modern API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        // textarea hack
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); }
        catch (e) { /* swallow */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Smooth scroll for in-page anchors --------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollTo ? null : null; // no-op
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth'
      });
      // Move focus for a11y
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

})();
