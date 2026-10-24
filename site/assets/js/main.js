import { initKit } from './kit/index.js';

initKit();

// Archive: instant filter of rows on the current page
const search = document.querySelector('[data-archive-search]');
if (search) {
  const rows = [...document.querySelectorAll('[data-filter-item]')];
  const counter = document.querySelector('[data-archive-count]');
  const empty = document.querySelector('[data-filter-empty]');
  const plural = (n) => {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return 'матеріал';
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'матеріали';
    return 'матеріалів';
  };
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const hit = !q || row.textContent.toLowerCase().includes(q);
      row.hidden = !hit;
      if (hit) visible += 1;
    });
    if (counter) counter.textContent = `Знайдено ${visible} ${plural(visible)}`;
    if (empty) empty.hidden = visible > 0;
  });
}

// Article: highlight current TOC entry
const toc = document.querySelector('#TableOfContents');
if (toc && 'IntersectionObserver' in window) {
  const links = new Map([...toc.querySelectorAll('a')].map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        links.get(entry.target.id)?.classList.add('is-active');
      });
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );
  links.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}
