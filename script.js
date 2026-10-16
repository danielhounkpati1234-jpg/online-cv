document.addEventListener('DOMContentLoaded', function () {

  // ── MOBILE MENU ──────────────────────────────────
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        var spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ── HEADER SHADOW ON SCROLL ──────────────────────
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── FLOATING BAR ─────────────────────────────────
  var floatingBar = document.getElementById('floating-bar');
  if (floatingBar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        floatingBar.classList.add('visible');
      } else {
        floatingBar.classList.remove('visible');
      }
    }, { passive: true });
  }

  // ── TABS (About page) ───────────────────────────
  var tabsNav = document.getElementById('tabs-nav');
  if (tabsNav) {
    var buttons = tabsNav.querySelectorAll('.tab-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(function (panel) {
          panel.classList.remove('active');
        });

        var target = document.getElementById('tab-' + btn.getAttribute('data-tab'));
        if (target) target.classList.add('active');
      });
    });

    // Handle direct hash links to tabs
    if (window.location.hash) {
      var hash = window.location.hash.replace('#', '');
      var matchBtn = tabsNav.querySelector('[data-tab="' + hash + '"]');
      if (matchBtn) matchBtn.click();
    }
  }

  // ── SMOOTH SCROLL for same-page anchors ─────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', id);
      }
    });
  });

  // ── REVEAL ON SCROLL (lightweight) ──────────────
  var reveals = document.querySelectorAll('.exp-card, .skill-cat, .philo-card, .stat-item, .exp-detail, .contact-item');

  if (reveals.length && 'IntersectionObserver' in window) {
    reveals.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

});
