/* ============================================================
   ACI LADS — Shared Components
   Injects navbar and footer into every page
   ============================================================ */

const NAV_HTML = `
<nav class="navbar">
  <a href="index.html" class="nav-brand">
    <div class="nav-brand-icon">⚜</div>
    <span>ACI LADS</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="excos.html">Excos</a></li>
    <li><a href="articles.html">Articles</a></li>
    <li><a href="achievements.html">Achievements</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <button class="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="nav-overlay">
  <div class="nav-overlay-bg"></div>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="excos.html">Excos</a>
  <a href="articles.html">Articles</a>
  <a href="achievements.html">Achievements</a>
  <a href="contact.html">Contact</a>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>⚜ ACI LADS</h3>
        <p>The Literary and Debating Society of Ambassadors College, Ile-Ife. Nurturing eloquence, fostering brilliance, and building tomorrow's leaders through the power of words.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="excos.html">Executive Board</a></li>
          <li><a href="articles.html">Publications</a></li>
          <li><a href="achievements.html">Achievements</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="https://instagram.com/acilads" target="_blank">Instagram</a></li>
          <li><a href="https://wa.me/234000000000" target="_blank">WhatsApp</a></li>
          <li><a href="https://medium.com/@acilads" target="_blank">Medium</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span class="current-year"></span> ACI LADS — Ambassadors College, Ile-Ife. All rights reserved.</p>
      <p style="color: var(--gold); font-size: 0.8rem;">Excellence in Speech, Brilliance in Writing.</p>
    </div>
  </div>
</footer>
<button id="scrollTop" aria-label="Back to top">↑</button>
`;

// Inject on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.outerHTML = NAV_HTML;
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;
});
