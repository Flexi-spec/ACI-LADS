/***** ACI LADS UI INTERACTIONS & DYNAMIC LOADERS *****/
/* -- Animate On Scroll Init -- */
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ once: true, duration: 900, easing: "ease-out-back" });

  /* Hamburger Mobile Nav */
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      navUl.classList.toggle('open');
      hamburger.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    document.querySelectorAll('nav ul li a').forEach(link =>
      link.addEventListener('click', () => navUl.classList.remove('open'))
    );
  }
  
  /* Typewriter.js Effect (for index.html) */
  if (document.querySelector('.motto-type')) {
    const el = document.querySelector('.motto-type');
    // Import via CDN if not loaded
    if (!window.Typewriter) {
      let tw = document.createElement('script');
      tw.src = 'https://cdn.jsdelivr.net/npm/typewriter-effect@2.18.0/dist/core.js';
      tw.onload = () => launchType();
      document.head.appendChild(tw);
    } else {
      launchType();
    }
    function launchType() {
      /* global Typewriter */
      new Typewriter(el, {
        loop: true,
        delay: 58,
        deleteSpeed: 22,
      }).typeString('Excellence in Speech, Brilliance in Writing.')
        .pauseFor(3100).deleteAll().typeString('Brilliance in Writing, Excellence in Speech.')
        .pauseFor(2500).start();
    }
  }

  /* Shimmer Button 'See All' scroll to */
  document.querySelectorAll('.enter-btn[href], .see-all-btn[href]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href')?.replace('#','');
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /**** Medium Article Fetcher (for articles.html) ****/
  if (document.getElementById('medium-feed')) loadMediumArticles();

  /* Card hover focus for Tab/keyboard users */
  document.querySelectorAll('.exco-card').forEach(card=>{
    card.addEventListener('keydown', e => {
      if (e.key==='Enter') card.classList.add('focus');
    });
    card.addEventListener('blur', ()=> card.classList.remove('focus'));
  });
});

/* --- MEDIUM API FUNCTION --- */
/**
 * Fetches and injects Medium blog posts as cards into articles.html
 * Show skeletons until loaded.
 */
function loadMediumArticles() {
  const MEDIUM_URL = 'https://medium.com/feed/acilads'; // Change to your Medium profile or publication feed
  const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';
  const board = document.getElementById('medium-feed');
  // Show skeletons
  board.innerHTML = Array(4).fill('').map(() => `
    <div class="skel-card" data-aos="fade-up">
      <div class="skel-img"></div>
      <div class="skel-cat"></div>
      <div class="skel-title"></div>
      <div class="skel-desc"></div>
    </div>
  `).join('');
  fetch(`${RSS2JSON}${encodeURIComponent(MEDIUM_URL)}`)
    .then(r=>r.json())
    .then(({items}) => {
      // clean
      board.innerHTML = '';
      if (!items || !items.length) {
        board.innerHTML = '<div class="center gold-txt mt-4">No articles yet. Stay tuned!</div>';
        return;
      }
      items.slice(0,8).forEach(item => {
        const { title, thumbnail, link, pubDate, categories, description } = item;
        let desc = description.replace(/<[^>]*>?/gm, '').substring(0,120)+'...';
        board.innerHTML += `
          <div class="article-card" data-aos="fade-up">
            <img class="article-img" src="${thumbnail||'assets/default.jpg'}" alt="Article Image">
            <div class="article-meta">
              <div class="article-cat">${(categories||[])[0]||'Article'}</div>
              <h3 class="article-title">${title}</h3>
              <div class="article-desc">${desc}</div>
              <a class="read-more-link btn-glow" href="${link}" target="_blank" rel="noopener">Read More</a>
            </div>
          </div>`;
      });
      AOS.refresh();
    })
    .catch(e=>{
      board.innerHTML = '<div class="center gold-txt mt-4">Failed to load articles. Check your connection.</div>';
    });
}