/* Stored free energy page
   - renders the community list from data/stored-free-energy.js
   - small calculator: RT Σ ( [X] ln([X]/[X]eq) − [X] + [X]eq )
   No dependencies, no cookies, no tracking. */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- the list ---------- */
  var list = document.getElementById('sfe-list');
  var filterBox = document.getElementById('sfe-filters');
  var count = document.getElementById('sfe-count');
  var DRIVE = window.SFE_DRIVING || {};

  function row(p) {
    var link = p.doi ? 'https://doi.org/' + p.doi : (p.url || '');
    var title = link
      ? '<a class="t" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>'
      : '<span class="t">' + esc(p.title) + '</span>';
    var meta = esc(p.authors) + ' · <em>' + esc(p.journal) + '</em>' + (p.details ? ' ' + esc(p.details) : '') + ' (' + p.year + ')';
    var tags = '<ul class="facts sfe-tags">' +
      '<li class="drive-' + esc(p.driving) + '">' + esc(DRIVE[p.driving] || p.driving) + (p.source ? ': ' + esc(p.source) : '') + '</li>' +
      (p.system ? '<li class="sys">' + esc(p.system) + '</li>' : '') +
      '<li class="lab">Lab: ' + esc(p.labs) + '</li>' +
      (p.coauthored ? '<li class="co">Co-author: E. Penocchio</li>' : '') + '</ul>';
    var what = p.quantified ? '<p class="sfe-what">' + p.quantified + '</p>' : '';
    var right = link
      ? '<a class="doi" href="' + esc(link) + '" target="_blank" rel="noopener" aria-label="Open paper: ' + esc(p.title) + '">' + (p.doi ? 'DOI ↗' : 'Link ↗') + '</a>'
      : '<span></span>';
    return '<li><span class="y">' + p.year + '</span><div>' + title + '<div class="m">' + meta + '</div>' + tags + what + '</div>' + right + '</li>';
  }

  if (list && window.SFE_PAPERS) {
    var papers = window.SFE_PAPERS.slice().sort(function (a, b) {
      return b.year - a.year || String(a.authors).localeCompare(String(b.authors));
    });
    var state = '';
    var render = function () {
      var shown = papers.filter(function (p) { return !state || p.driving === state; });
      list.innerHTML = shown.length ? shown.map(row).join('') : '<li class="empty">Nothing here yet.</li>';
      if (count) count.textContent = shown.length + (shown.length === 1 ? ' paper' : ' papers');
    };
    if (filterBox) {
      var btns = '<button type="button" class="filter" data-drive="" aria-pressed="true">All</button>';
      Object.keys(DRIVE).forEach(function (k) {
        var n = papers.filter(function (p) { return p.driving === k; }).length;
        if (n) btns += '<button type="button" class="filter" data-drive="' + k + '" aria-pressed="false">' + esc(DRIVE[k]) + '</button>';
      });
      filterBox.innerHTML = btns;
      filterBox.addEventListener('click', function (e) {
        var b = e.target.closest('.filter'); if (!b) return;
        filterBox.querySelectorAll('.filter').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        state = b.getAttribute('data-drive') || '';
        render();
      });
    }
    render();
  }

  /* ---------- calculator ---------- */
  var calc = document.getElementById('calc');
  if (!calc) return;
  var R = 8.314462618; // J mol-1 K-1
  var body = calc.querySelector('tbody');
  var tIn = calc.querySelector('#calc-t');
  var out = calc.querySelector('#calc-out');
  var perMole = calc.querySelector('#calc-mol');
  var totals = calc.querySelector('#calc-tot');
  var note = calc.querySelector('#calc-note');
  var bars = calc.querySelector('#calc-bars');
  var EXAMPLE = [['A', 1, 9], ['B', 9, 1]];
  var uid = 0;

  function addRow(name, x, xeq, focus) {
    uid += 1;
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td><label class="visually-hidden" for="sp-n' + uid + '">Species name</label><input id="sp-n' + uid + '" class="nm" type="text" value="' + esc(name) + '" autocomplete="off" spellcheck="false"></td>' +
      '<td><label class="visually-hidden" for="sp-x' + uid + '">Concentration in the driven state, mM</label><input id="sp-x' + uid + '" class="x" type="number" min="0" step="any" inputmode="decimal" value="' + (x == null ? '' : x) + '"></td>' +
      '<td><label class="visually-hidden" for="sp-e' + uid + '">Equilibrium concentration, mM</label><input id="sp-e' + uid + '" class="xe" type="number" min="0" step="any" inputmode="decimal" value="' + (xeq == null ? '' : xeq) + '"></td>' +
      '<td><button type="button" class="rm" aria-label="Remove this species">×</button></td>';
    body.appendChild(tr);
    if (focus) tr.querySelector('.nm').focus();
  }
  function reset() {
    body.innerHTML = '';
    EXAMPLE.forEach(function (r) { addRow(r[0], r[1], r[2]); });
    tIn.value = '298.15';
    update();
  }
  function fmt(v) {
    if (!isFinite(v)) return '∞';
    if (v === 0) return '0';
    var a = Math.abs(v);
    if (a >= 10000 || a < 0.001) {
      var p = v.toExponential(2).split('e');
      return p[0] + ' × 10' + String(parseInt(p[1], 10)).replace(/-/g, '⁻').replace(/\d/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]; });
    }
    return String(Number(v.toPrecision(3)));
  }
  function update() {
    var T = parseFloat(tIn.value);
    var rows = Array.prototype.slice.call(body.querySelectorAll('tr'));
    var problems = [];
    var terms = [];
    if (!(T > 0)) problems.push('Enter a temperature above 0 K.');
    rows.forEach(function (tr, i) {
      var name = tr.querySelector('.nm').value.trim() || 'species ' + (i + 1);
      var xs = tr.querySelector('.x').value, es = tr.querySelector('.xe').value;
      if (xs === '' && es === '') return;
      var x = parseFloat(xs), e = parseFloat(es);
      if (!(x >= 0) || !(e >= 0)) { problems.push('Check the numbers for ' + name + ' (concentrations cannot be negative or empty).'); return; }
      var t;
      if (x === 0) t = e;
      else if (e === 0) t = Infinity;
      else t = Math.max(0, x * Math.log(x / e) - x + e); // ≥ 0; max() removes round-off
      terms.push({ name: name, v: t, inf: !isFinite(t), x: x, e: e });
    });
    if (problems.length || !terms.length) {
      out.textContent = '–';
      if (perMole) perMole.textContent = '–';
      if (totals) totals.textContent = '';
      note.textContent = problems[0] || 'Add at least one species.';
      bars.innerHTML = '';
      return;
    }
    if (terms.some(function (t) { return t.inf; })) {
      out.textContent = '∞';
      if (perMole) perMole.textContent = '–';
      if (totals) totals.textContent = '';
      note.textContent = 'A species that is absent at equilibrium but present in the driven state gives an infinite value: check that both columns describe the same system.';
      bars.innerHTML = '';
      return;
    }
    var RT = R * T; // J/mol
    var sum = terms.reduce(function (s, t) { return s + t.v; }, 0); // mM
    var G = RT * sum * 1e-3; // J/L, since 1 mM = 1e-3 mol/L
    out.textContent = fmt(G) + ' J L⁻¹';
    var tot = terms.reduce(function (s, x) { return s + x.x; }, 0); // mM, driven state
    var totEq = terms.reduce(function (s, x) { return s + x.e; }, 0); // mM, equilibrium
    if (perMole) perMole.textContent = tot > 0 ? fmt(G / (tot * 1e-3) / 1000) + ' kJ mol⁻¹' : '–';
    if (totals) totals.textContent = 'Sum of concentrations: ' + fmt(tot) + ' mM driven, ' + fmt(totEq) + ' mM at equilibrium.';
    note.textContent = 'RT = ' + (RT / 1000).toFixed(3) + ' kJ mol⁻¹, so RT × 1 mM = ' + (RT / 1000).toFixed(2) + ' J L⁻¹. Each species contributes a non-negative term; the total is zero only at equilibrium.';
    var max = Math.max.apply(null, terms.map(function (t) { return t.v; })) || 1;
    bars.innerHTML = terms.map(function (t) {
      var g = RT * t.v * 1e-3;
      return '<li><span class="bn">' + esc(t.name) + '</span><span class="bt"><span style="width:' + (100 * t.v / max).toFixed(1) + '%"></span></span><span class="bv">' + fmt(g) + '</span></li>';
    }).join('');
  }

  calc.addEventListener('input', update);
  calc.addEventListener('click', function (e) {
    var rm = e.target.closest('.rm');
    if (rm) {
      var tr = rm.closest('tr');
      var next = tr.nextElementSibling || tr.previousElementSibling;
      tr.remove();
      if (next) next.querySelector('.nm').focus(); else calc.querySelector('[data-calc="add"]').focus();
      update();
      return;
    }
    var act = e.target.closest('[data-calc]');
    if (!act) return;
    if (act.getAttribute('data-calc') === 'add') { addRow('', '', '', true); update(); }
    if (act.getAttribute('data-calc') === 'reset') reset();
  });
  reset();
})();
