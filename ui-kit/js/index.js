// ZEITPUNKT UI kit — progressive enhancement. No dependencies.
// import { initKit } from '@zeitpunkt/ui-kit/js'; initKit();

/** Mobile menu: <button data-menu-toggle aria-expanded="false"> inside .masthead */
export function initMasthead(root = document) {
  root.querySelectorAll('[data-menu-toggle]').forEach((btn) => {
    const header = btn.closest('.masthead');
    if (!header) return;
    btn.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}

/** Seamless ticker: <div class="ticker ticker--animate"> … <ul class="ticker__track"> */
export function initTicker(root = document) {
  root.querySelectorAll('.ticker--animate .ticker__track').forEach((track) => {
    if (track.dataset.cloned) return;
    [...track.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    track.dataset.cloned = 'true';
  });
}

/** Reading progress: <div class="read-progress" data-read-progress="#article"> */
export function initReadProgress(root = document) {
  root.querySelectorAll('[data-read-progress]').forEach((bar) => {
    const target = document.querySelector(bar.dataset.readProgress) || document.body;
    const update = () => {
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, (-rect.top / total) * 100)) : 0;
      bar.style.setProperty('--progress', `${pct}%`);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
}

/** Reader font size: <button data-prose-size="+1|-1" data-target="#article-body"> */
export function initProseSize(root = document) {
  root.querySelectorAll('[data-prose-size]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const prose = document.querySelector(btn.dataset.target || '.prose');
      if (!prose) return;
      const next = Math.min(2, Math.max(0, Number(prose.dataset.size || 0) + Number(btn.dataset.proseSize)));
      prose.dataset.size = String(next);
    });
  });
}

/** Single-choice groups: <div data-toggle-group> <button aria-pressed> … */
export function initToggleGroups(root = document) {
  root.querySelectorAll('[data-toggle-group]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      group.dispatchEvent(new CustomEvent('toggle-change', { detail: { value: btn.value || btn.textContent.trim() } }));
    });
  });
}

/** Independent toggle (bookmark): <button data-toggle aria-pressed="false"> */
export function initToggles(root = document) {
  root.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true'));
    });
  });
}

/** Share: <button data-share> — native share sheet or copy link */
export function initShare(root = document) {
  root.querySelectorAll('[data-share]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = window.location.href;
      if (navigator.share) {
        try { await navigator.share({ title: document.title, url }); } catch {}
        return;
      }
      await navigator.clipboard?.writeText(url);
      const label = btn.querySelector('[data-share-label]');
      if (label) {
        const prev = label.textContent;
        label.textContent = 'Скопійовано';
        setTimeout(() => { label.textContent = prev; }, 2000);
      }
    });
  });
}

export function initKit(root = document) {
  initMasthead(root);
  initTicker(root);
  initReadProgress(root);
  initProseSize(root);
  initToggleGroups(root);
  initToggles(root);
  initShare(root);
}
