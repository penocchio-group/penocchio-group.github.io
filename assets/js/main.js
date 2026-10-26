/* Penocchio Research Group — shared behaviour
   - mobile menu + dropdowns + current-page highlighting
   - Arnath popup (home)
   - news and publication rendering from /data
   - copy-to-clipboard buttons
   No dependencies, no cookies, no tracking. */
(function () {
  'use strict';

  /* ---------- current page in the menu ---------- */
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';
  var sectionOf = {
    'research.html': 'research', 'publications.html': 'research', 'stored-free-energy.html': 'research',
    'people.html': 'people', 'emanuele.html': 'people', 'collaborators.html': 'people'
  };
  document.querySelectorAll('.nav a[href]').forEach(function (a) {
    if ((a.getAttribute('href') || '').toLowerCase() === page && !a.classList.contains('brand')) {
      if (!a.classList.contains('dd-top')) a.setAttribute('aria-current', 'page');
    }
  });
  if (sectionOf[page]) {
    var dd = document.querySelector('.dd[data-section="' + sectionOf[page] + '"]');
    if (dd) dd.classList.add('current');
  }

  /* ---------- mobile menu ---------- */
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menu-btn');
  function setMenu(open, returnFocus) {
    if (!nav) return;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      var first = nav.querySelector('.nav-links a');
      if (first) first.focus();
    } else if (returnFocus) {
      menuBtn.focus();
    }
  }
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open'), true); });
    nav.querySelectorAll('.nav-links a, .nav-contact, .btn-opps').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false, false); });
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (m) {
      if (m.matches) setMenu(false, false);
    });
  }

  /* ---------- dropdowns ---------- */
  var dds = Array.prototype.slice.call(document.querySelectorAll('.dd'));
  function closeAll(except) {
    dds.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('open');
      var b = d.querySelector('.dd-btn'); if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  dds.forEach(function (d) {
    var b = d.querySelector('.dd-btn');
    if (!b) return;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
      if (open) { var f = d.querySelector('.dd-menu a'); if (f) f.focus(); }
    });
    d.addEventListener('focusout', function (e) {
      if (!d.contains(e.relatedTarget)) { d.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
    });
  });
  document.addEventListener('click', function () { closeAll(null); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openDd = dds.filter(function (d) { return d.classList.contains('open'); })[0];
    if (openDd) { closeAll(null); var b = openDd.querySelector('.dd-btn'); if (b) b.focus(); return; }
    if (nav && nav.classList.contains('open')) setMenu(false, true);
  });

  /* ---------- Arnath popup (home only) ---------- */
  var hot = document.getElementById('arnath-btn');
  var bubble = document.getElementById('arnath');
  if (hot && bubble) {
    var closeBtn = document.getElementById('arnath-close');
    var openBubble = function () {
      bubble.hidden = false;
      bubble.classList.remove('open'); void bubble.offsetWidth; bubble.classList.add('open');
      hot.setAttribute('aria-expanded', 'true');
      closeBtn.focus({ preventScroll: true });
      var r = bubble.getBoundingClientRect();
      if (r.bottom > window.innerHeight || r.top < 0) {
        bubble.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    };
    var closeBubble = function (returnFocus) {
      if (bubble.hidden) return;
      bubble.hidden = true;
      hot.setAttribute('aria-expanded', 'false');
      if (returnFocus) hot.focus();
    };
    hot.addEventListener('click', function (e) { e.stopPropagation(); bubble.hidden ? openBubble() : closeBubble(false); });
    closeBtn.addEventListener('click', function () { closeBubble(true); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBubble(true); });
    document.addEventListener('click', function (e) {
      if (!bubble.hidden && !bubble.contains(e.target) && e.target !== hot) closeBubble(false);
    });
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(d) {
    var p = String(d).split('-');
    return p.length > 1 ? MONTHS[parseInt(p[1], 10) - 1] + ' ' + p[0] : p[0];
  }
  var ICONS = {
    group: '<path d="M8 30c0-6 4-10 9-10s9 4 9 10"/><circle cx="17" cy="12" r="5"/><path d="M27 20c4 .5 7 4 7 9"/><path d="M25 7.5a5 5 0 0 1 0 9"/>',
    funding: '<path d="M21 5l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z"/>',
    paper: '<path d="M11 5h13l6 6v20H11z"/><path d="M24 5v6h6"/><path d="M15 17h11M15 21h11M15 25h7"/>',
    prize: '<circle cx="20" cy="15" r="8"/><path d="M15 22l-3 11 8-4 8 4-3-11"/><path d="M17 15l2 2 4-4"/>',
    talk: '<rect x="15" y="4" width="10" height="17" rx="5"/><path d="M10 17a10 10 0 0 0 20 0"/><path d="M20 27v7M14 34h12"/>',
    people: '<circle cx="20" cy="13" r="6"/><path d="M8 34c1-7 6-11 12-11s11 4 12 11"/>'
  };
  var KIND_LABEL = { group: 'Group', funding: 'Funding', paper: 'Paper', prize: 'Prize', talk: 'Talk', people: 'People' };
  function icon(kind) {
    return '<span class="nicon" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[kind] || ICONS.paper) + '</svg></span>';
  }
  function isExternal(url) { return /^https?:/i.test(url || ''); }

  /* ---------- news ---------- */
  function newsRow(n, withText) {
    var tag = n.link ? 'a' : 'div';
    var attrs = n.link ? ' href="' + esc(n.link) + '"' + (isExternal(n.link) ? ' target="_blank" rel="noopener"' : '') : '';
    var media = n.image ? '<img src="' + esc(n.image) + '" alt="" loading="lazy" width="80" height="80">' : icon(n.kind);
    return '<' + tag + ' class="newsrow"' + attrs + '>' + media +
      '<div><span class="k">' + esc(KIND_LABEL[n.kind] || n.kind) + '</span>' +
      '<span class="txt">' + esc(n.title) + (n.link && isExternal(n.link) ? ' <span aria-hidden="true">↗</span>' : '') + '</span>' +
      (withText && n.text ? '<span class="sub">' + esc(n.text) + '</span>' : '') +
      '</div><time datetime="' + esc(n.date) + '">' + fmtDate(n.date) + '</time></' + tag + '>';
  }
  document.querySelectorAll('[data-news]').forEach(function (el) {
    if (!window.NEWS) return;
    var limit = parseInt(el.getAttribute('data-news'), 10) || window.NEWS.length;
    var withText = el.hasAttribute('data-news-text');
    var kind = el.getAttribute('data-news-kind');
    var items = window.NEWS.filter(function (n) { return !kind || n.kind === kind; }).slice(0, limit);
    el.innerHTML = items.map(function (n) { return newsRow(n, withText); }).join('');
  });

  /* news page filter */
  var newsFilters = document.getElementById('news-filters');
  var newsAll = document.getElementById('news-all');
  if (newsFilters && newsAll && window.NEWS) {
    var renderNews = function (kind) {
      var byYear = {}; var order = [];
      window.NEWS.forEach(function (n) {
        if (kind && n.kind !== kind) return;
        var y = String(n.date).slice(0, 4);
        if (!byYear[y]) { byYear[y] = []; order.push(y); }
        byYear[y].push(n);
      });
      newsAll.innerHTML = order.map(function (y) {
        return '<h2 class="year-head">' + y + '</h2><div class="newslist light">' +
          byYear[y].map(function (n) { return newsRow(n, true); }).join('') + '</div>';
      }).join('') || '<p class="empty">Nothing here yet.</p>';
    };
    newsFilters.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-kind]'); if (!b) return;
      newsFilters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderNews(b.getAttribute('data-kind'));
    });
    renderNews('');
  }

  /* ---------- publications ---------- */
  function authorsHtml(a) {
    return esc(a).replace(/E\. Penocchio(\*?)/g, '<b>E. Penocchio$1</b>');
  }
  function pubLink(p) { return p.doi ? 'https://doi.org/' + p.doi : (p.url || ''); }
  function pubRow(p, opts) {
    var link = pubLink(p);
    var title = link ? '<a class="t" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>' : '<span class="t">' + esc(p.title) + '</span>';
    var badge = p.type === 'preprint' ? ((opts && opts.numCol) ? '' : '<span class="badge">Preprint</span>') : p.type === 'review' ? '<span class="badge">Tutorial review</span>' : p.type === 'notes' ? '<span class="badge">Lecture notes</span>' : p.type === 'history' ? '<span class="badge">In Italian</span>' : '';
    var meta = authorsHtml(p.authors) + ' · <em>' + esc(p.journal) + '</em>' + (p.details ? ' ' + esc(p.details) : '');
    var right = link ? '<a class="doi" href="' + esc(link) + '" target="_blank" rel="noopener" aria-label="Open paper: ' + esc(p.title) + '">' + (p.doi ? 'DOI ↗' : 'Link ↗') + '</a>' : '<span></span>';
    var yearCell = (opts && opts.noYear) ? '' : '<span class="y">' + p.year + '</span>';
    if (opts && opts.numCol) yearCell = '<span class="num">' + (p.num ? p.num : '') + '</span>' + yearCell;
    return '<li>' + yearCell + '<div>' + title + badge + '<div class="m">' + meta + '</div>' +
      (p.note && !(opts && opts.compact) ? '<div class="note">' + esc(p.note) + '</div>' : '') + '</div>' + right + '</li>';
  }
  var featured = document.getElementById('featured-pubs');
  if (featured && window.PUBLICATIONS) {
    featured.innerHTML = window.PUBLICATIONS.filter(function (p) { return p.featured; })
      .map(function (p) { return pubRow(p, { compact: true }); }).join('');
  }
  var themePubs = document.querySelectorAll('[data-pubs-topic]');
  themePubs.forEach(function (el) {
    if (!window.PUBLICATIONS) return;
    var t = el.getAttribute('data-pubs-topic'); var n = parseInt(el.getAttribute('data-limit'), 10) || 3;
    el.innerHTML = window.PUBLICATIONS.filter(function (p) { return p.topics.indexOf(t) > -1; }).slice(0, n)
      .map(function (p) { return pubRow(p, { compact: true }); }).join('');
  });

  var pubAll = document.getElementById('pub-all');
  if (pubAll && window.PUBLICATIONS) {
    var q = document.getElementById('pub-q');
    var filterBox = document.getElementById('pub-filters');
    var count = document.getElementById('pub-count');
    var state = { topic: '', type: '' };
    // paper numbers: chronological, oldest = 1; preprints and history pieces are not numbered
    window.PUBLICATIONS.map(function (p, i) { return { p: p, i: i }; })
      .filter(function (o) { return o.p.type !== 'history' && o.p.type !== 'preprint'; })
      .sort(function (a, b) { return a.p.year - b.p.year || b.i - a.i; })
      .forEach(function (o, k) { o.p.num = k + 1; });
    // build topic buttons
    var btns = '<button type="button" class="filter" data-topic="" aria-pressed="true">All</button>';
    Object.keys(window.PUB_TOPICS).forEach(function (k) {
      btns += '<button type="button" class="filter" data-topic="' + k + '" aria-pressed="false">' + esc(window.PUB_TOPICS[k]) + '</button>';
    });
    btns += '<button type="button" class="filter" data-type="corr" aria-pressed="false">Corresponding author</button>';
    filterBox.innerHTML = btns;

    var match = function (p, term) {
      if (state.topic && p.topics.indexOf(state.topic) < 0) return false;
      if (state.type === 'corr' && !/E\. Penocchio\*/.test(p.authors)) return false;
      if (!term) return true;
      var hay = (p.title + ' ' + p.authors + ' ' + p.journal + ' ' + p.year + ' ' + (p.note || '')).toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '');
      return term.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
    };
    var render = function () {
      var term = (q.value || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      var pre = window.PUBLICATIONS.filter(function (p) { return p.type === 'preprint' && match(p, term); });
      var main = window.PUBLICATIONS.filter(function (p) { return p.type !== 'history' && p.type !== 'preprint' && match(p, term); });
      var hist = window.PUBLICATIONS.filter(function (p) { return p.type === 'history' && !state.topic && !state.type && match(p, term); });
      main.sort(function (a, b) { return b.year - a.year; });
      var html = ''; var lastY = null; var open = false;
      if (pre.length) {
        html += '<h2 class="year-head">Preprints</h2><ol class="pubs">' + pre.map(function (p) { return pubRow(p, { noYear: true, numCol: true }); }).join('') + '</ol>';
      }
      main.forEach(function (p) {
        if (p.year !== lastY) {
          if (open) html += '</ol>';
          html += '<h2 class="year-head">' + p.year + '</h2><ol class="pubs">';
          open = true; lastY = p.year;
        }
        html += pubRow(p, { noYear: true, numCol: true });
      });
      if (open) html += '</ol>';
      if (hist.length) {
        html += '<h2 class="year-head">History of science &amp; science education</h2><ol class="pubs">' + hist.map(function (p) { return pubRow(p, { noYear: true, numCol: true }); }).join('') + '</ol>';
      }
      var n = pre.length + main.length + hist.length;
      pubAll.innerHTML = n ? html : '<p class="empty">No papers match “' + esc(q.value) + '”. <button type="button" id="pub-reset">Clear the search and filters</button></p>';
      count.textContent = main.length + (main.length === 1 ? ' paper' : ' papers') + (pre.length ? ' · ' + pre.length + (pre.length === 1 ? ' preprint' : ' preprints') : '');
      var r = document.getElementById('pub-reset');
      if (r) r.addEventListener('click', function () { q.value = ''; setFilter(filterBox.querySelector('[data-topic=""]')); });
    };
    var setFilter = function (b) {
      filterBox.querySelectorAll('.filter').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      state.topic = b.hasAttribute('data-topic') ? b.getAttribute('data-topic') : '';
      state.type = b.getAttribute('data-type') || '';
      render();
    };
    filterBox.addEventListener('click', function (e) { var b = e.target.closest('.filter'); if (b) setFilter(b); });
    q.addEventListener('input', render);
    var params = new URLSearchParams(location.search);
    if (params.get('q')) q.value = params.get('q');
    var tb = params.get('topic') ? filterBox.querySelector('[data-topic="' + params.get('topic') + '"]') : null;
    if (tb) setFilter(tb); else render();
  }

  /* ---------- copy buttons ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var src = document.getElementById(b.getAttribute('data-copy'));
      if (!src) return;
      var text = src.innerText.trim();
      var done = function () { var old = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = old; }, 1800); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done);
      else { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) {} ta.remove(); }
    });
  });

  /* ---------- pause looping videos for reduced-motion users ---------- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); v.setAttribute('controls', ''); });
  }
})();
