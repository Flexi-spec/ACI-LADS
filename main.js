/* ============================================================
   ACI LADS — Shared JavaScript
   Handles: Navbar scroll/hamburger, AOS init, Scroll-to-top
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── AOS Init ── */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  /* ── Navbar scroll class ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger && navOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navOverlay.classList.toggle('open');
      document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close on overlay link click
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) {
        hamburger.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll to Top ── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Set current year in footer ── */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
