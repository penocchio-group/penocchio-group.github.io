/* Flashing Brownian ratchet: a small overdamped Langevin simulation.
   Particles diffuse in an asymmetric sawtooth potential between two walls.
   The landscape can be kept on, kept off, or switched on and off. Only the
   switching landscape produces net drift, so the particles pile up against
   the right wall: asymmetry + energy input = directed motion (a pump).
   The lower panel shows the particle distribution in real time.
   Units: one tooth = 1, diffusion D = 1, kT = 1. */
(function () {
  'use strict';
  var root = document.getElementById('ratchet');
  if (!root) return;
  var canvas = root.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var playBtn = root.querySelector('[data-act="play"]');
  var resetBtn = root.querySelector('[data-act="reset"]');
  var speedBtn = root.querySelector('[data-act="speed"]');
  var radios = root.querySelectorAll('input[name="mode"]');
  var live = root.querySelector('.demo-live');

  /* ---- physics ---- */
  var N = 2500;                  // simulated particles (all enter the distribution)
  var SHOW_EVERY = 8;            // draw every 8th particle as a dot
  var K = 7;                     // teeth between the two walls
  var A = 0.10, V0 = 10;         // steep fraction of a tooth, barrier height in kT
  var T_ON = 0.12, T_OFF = 0.06; // switching protocol (simulation time)
  var DT = 0.0004;
  /* playback: each phase of the switching lasts about 0.7 s on screen */
  var RATE_ON = T_ON / 0.7, RATE_OFF = T_OFF / 0.7;
  /* steady modes: "always off" runs a bit faster so the flattening shows within ~20 s */
  var RATE_ALWAYS_ON = 0.1, RATE_ALWAYS_OFF = 0.2;
  var SMOOTH_DOTS = 0.22;        // on-screen smoothing of each dot (physics untouched)
  var X0 = 0.5, X1 = 2.5;        // particles start spread evenly over two teeth
  var speed = 1;

  /* ---- distribution plot ---- */
  var BINS_PER_TOOTH = 40, G = K * BINS_PER_TOOTH;
  var KSIG = 2, KR = 6, kernel = [];
  for (var q = -KR; q <= KR; q++) kernel.push(Math.exp(-q * q / (2 * KSIG * KSIG)));
  var ksum = kernel.reduce(function (s, v) { return s + v; }, 0);
  kernel = kernel.map(function (v) { return v / ksum; });
  var counts = new Float64Array(G), raw = new Float64Array(G), dens = new Float64Array(G), dens0 = new Float64Array(G);
  var SMOOTH = 0.35;             // temporal smoothing of the plotted distribution (1 = none)
  var yMax = 1, hold = 0;

  var C = { line: '#8fc4b9', dot: '#e0913f', track: '#ffffff', text: '#c8c8c2', muted: '#8fa9a2',
            grid: 'rgba(255,255,255,0.07)', panel: 'rgba(255,255,255,0.035)', wall: '#c8c8c2' };

  var mode = 'flash', running = false, visible = true, on = true;
  var x = new Float64Array(N), xd = new Float64Array(N), yd = new Float64Array(N), jit = new Float64Array(N);
  var t = 0, last = 0, spare = null, fresh = true;

  function frac(u) { return u - Math.floor(u); }
  function V(u) { u = frac(u); return u < A ? V0 * u / A : V0 * (1 - u) / (1 - A); }
  function F(u) { u = frac(u); return u < A ? -V0 / A : V0 / (1 - A); }
  function gauss() {
    if (spare !== null) { var s0 = spare; spare = null; return s0; }
    var a = 1 - Math.random(), b = Math.random(), r = Math.sqrt(-2 * Math.log(a));
    spare = r * Math.sin(2 * Math.PI * b);
    return r * Math.cos(2 * Math.PI * b);
  }
  function wall(v) { // reflecting walls at 0 and K
    if (v < 0) v = -v;
    if (v > K) v = 2 * K - v;
    return v < 0 ? 0 : (v > K ? K : v);
  }
  function mirror(j) { return j < 0 ? -j - 1 : (j >= G ? 2 * G - j - 1 : j); }

  function smoothInto(src, target, alpha) {
    for (var j = 0; j < G; j++) {
      var s = 0;
      for (var k = -KR; k <= KR; k++) s += kernel[k + KR] * src[mirror(j + k)];
      target[j] += (s - target[j]) * alpha;
    }
  }
  function density(target, alpha) {
    counts.fill(0);
    for (var i = 0; i < N; i++) counts[Math.min(G - 1, Math.floor(x[i] * BINS_PER_TOOTH))] += 1;
    var norm = BINS_PER_TOOTH / N; // probability per tooth
    for (var j = 0; j < G; j++) raw[j] = counts[j] * norm;
    smoothInto(raw, target, alpha);
  }
  function startShape() {
    // exact starting distribution (a flat block), smoothed like the live curve
    for (var j = 0; j < G; j++) {
      var c = (j + 0.5) / BINS_PER_TOOTH;
      raw[j] = (c >= X0 && c < X1) ? 1 / (X1 - X0) : 0;
    }
    dens0.fill(0); smoothInto(raw, dens0, 1);
  }
  function floorMax() { var m = 0; for (var j = 0; j < G; j++) m = Math.max(m, dens0[j]); return m * 1.6; }

  function reset() {
    for (var i = 0; i < N; i++) { x[i] = X0 + Math.random() * (X1 - X0); xd[i] = x[i]; jit[i] = Math.random(); }
    t = 0; on = mode !== 'off'; fresh = true;
    startShape(); dens.fill(0); density(dens, 1);
    hold = 0; yMax = floorMax();
    draw(); announce();
  }

  function isOn(time) { return mode === 'flash' ? (time % (T_ON + T_OFF)) < T_ON : mode === 'on'; }

  function advance(realDt) {
    // integrate in small steps; the playback rate depends on the phase so that
    // "on" and "off" phases last about the same time on screen
    var remaining = realDt * speed, s = Math.sqrt(2 * DT), guard = 0;
    while (remaining > 0 && guard++ < 4000) {
      on = isOn(t);
      var rate = mode === 'flash' ? (on ? RATE_ON : RATE_OFF) : (mode === 'off' ? RATE_ALWAYS_OFF : RATE_ALWAYS_ON);
      var need = DT / rate;               // real seconds per step
      if (need > remaining && Math.random() > remaining / need) break;
      for (var i = 0; i < N; i++) x[i] = wall(x[i] + (on ? F(x[i]) * DT : 0) + s * gauss());
      t += DT; remaining -= need;
    }
    on = isOn(t);
  }

  function size() {
    var r = canvas.getBoundingClientRect();
    var d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(r.width * d));
    canvas.height = Math.max(1, Math.round(r.height * d));
    ctx.setTransform(d, 0, 0, d, 0, 0);
    fresh = true; draw();
  }

  function roundRect(x0, y0, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x0 + r, y0); ctx.lineTo(x0 + w - r, y0); ctx.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r);
    ctx.lineTo(x0 + w, y0 + h - r); ctx.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h);
    ctx.lineTo(x0 + r, y0 + h); ctx.quadraticCurveTo(x0, y0 + h, x0, y0 + h - r);
    ctx.lineTo(x0, y0 + r); ctx.quadraticCurveTo(x0, y0, x0 + r, y0); ctx.closePath();
  }

  function drawWall(X, yTop, yBot, side) {
    // a solid line with short hatches on the outside, like a textbook wall
    ctx.strokeStyle = C.wall; ctx.lineWidth = 3; ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(X, yTop); ctx.lineTo(X, yBot); ctx.stroke();
    ctx.lineWidth = 1.2; ctx.globalAlpha = 0.6;
    ctx.beginPath();
    for (var y = yTop + 4; y < yBot; y += 9) { ctx.moveTo(X, y + 6); ctx.lineTo(X + side * 7, y); }
    ctx.stroke(); ctx.globalAlpha = 1; ctx.lineCap = 'round';
  }

  function draw() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    var small = w < 520;
    ctx.clearRect(0, 0, w, h);
    var pad = small ? 10 : 16, wallW = small ? 10 : 14;
    var L = pad + wallW, R = w - pad - wallW, px = (R - L) / K;
    var sx = function (v) { return L + v * px; };
    // layout: landscape on top, distribution below
    var topL = h * 0.17, baseL = h * 0.54;
    var pTop = h * 0.62, pBot = h - pad - (small ? 14 : 16), pH = pBot - (pTop + (small ? 22 : 26));
    var yOf = function (v) { return baseL - (v / V0) * (baseL - topL); };

    // guides at each valley, through both panels
    ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
    ctx.beginPath();
    for (var g = 1; g < K; g++) { var gx = Math.round(sx(g)) + 0.5; ctx.moveTo(gx, topL); ctx.lineTo(gx, pBot); }
    ctx.stroke();

    // landscape
    ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeStyle = C.line; ctx.globalAlpha = on ? 1 : 0.16;
    ctx.beginPath(); ctx.moveTo(sx(0), yOf(0));
    for (var k = 0; k < K; k++) { ctx.lineTo(sx(k + A), yOf(V0)); ctx.lineTo(sx(k + 1), yOf(0)); }
    ctx.stroke(); ctx.globalAlpha = 1;
    if (!on) {
      ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(sx(0), baseL); ctx.lineTo(sx(K), baseL); ctx.stroke(); ctx.setLineDash([]);
    }
    drawWall(L - 1.5, topL - 10, baseL + 6, -1);
    drawWall(R + 1.5, topL - 10, baseL + 6, 1);

    // particles (a sample), smoothed on screen so the jiggling is easier to follow
    var a = fresh ? 1 : SMOOTH_DOTS;
    var r = small ? 2.6 : 3.4;
    ctx.fillStyle = C.dot; ctx.globalAlpha = 0.82;
    ctx.beginPath();
    for (var i = SHOW_EVERY; i < N; i += SHOW_EVERY) {
      xd[i] += (x[i] - xd[i]) * a;
      var yt = on ? yOf(V(xd[i])) - r - jit[i] * 4 : baseL - r - jit[i] * 22;
      yd[i] = fresh ? yt : yd[i] + (yt - yd[i]) * 0.35;
      var X = sx(xd[i]);
      ctx.moveTo(X + r, yd[i]); ctx.arc(X, yd[i], r, 0, Math.PI * 2);
    }
    ctx.fill(); ctx.globalAlpha = 1;
    // the particle you can follow
    xd[0] += (x[0] - xd[0]) * a;
    var yt0 = on ? yOf(V(xd[0])) - 6 : baseL - 6 - jit[0] * 22;
    yd[0] = fresh ? yt0 : yd[0] + (yt0 - yd[0]) * 0.35;
    ctx.fillStyle = C.track; ctx.beginPath(); ctx.arc(sx(xd[0]), yd[0], small ? 4 : 5.5, 0, Math.PI * 2); ctx.fill();
    fresh = false;

    // state badge
    ctx.font = (small ? '600 11px ' : '600 13px ') + 'Space Grotesk, system-ui, sans-serif';
    var label = on ? 'Landscape on' : 'Landscape off';
    var bw = ctx.measureText(label).width + (small ? 30 : 36), bh = small ? 22 : 26;
    roundRect(pad, pad, bw, bh, bh / 2);
    ctx.fillStyle = on ? 'rgba(143,196,185,0.16)' : 'rgba(255,255,255,0.06)'; ctx.fill();
    ctx.strokeStyle = on ? C.line : 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(pad + (small ? 11 : 13), pad + bh / 2, small ? 3.5 : 4.5, 0, Math.PI * 2);
    ctx.fillStyle = on ? C.line : 'rgba(255,255,255,0.35)'; ctx.fill();
    ctx.fillStyle = '#f2f2ee'; ctx.textBaseline = 'middle';
    ctx.fillText(label, pad + (small ? 20 : 24), pad + bh / 2 + 0.5);
    if (speed > 1) {
      ctx.textAlign = 'right'; ctx.fillStyle = C.muted;
      ctx.fillText('×' + speed + ' speed', w - pad, pad + bh / 2 + 0.5);
      ctx.textAlign = 'left';
    }

    // ---- distribution panel ----
    roundRect(pad * 0.5, pTop - 8, w - pad, pBot - pTop + 8 + (small ? 10 : 12), 6);
    ctx.fillStyle = C.panel; ctx.fill();
    ctx.font = (small ? '500 11px ' : '500 13px ') + 'Space Grotesk, system-ui, sans-serif';
    ctx.textBaseline = 'alphabetic'; ctx.fillStyle = C.text;
    var titleY = pTop + (small ? 8 : 10);
    ctx.fillText('Where the particles are', L + 2, titleY);
    // legend: now / at start
    var lx = R - 2;
    ctx.textAlign = 'right';
    ctx.fillText('at start', lx, titleY);
    var tw1 = ctx.measureText('at start').width;
    ctx.strokeStyle = 'rgba(242,242,238,0.55)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(lx - tw1 - 26, titleY - 4); ctx.lineTo(lx - tw1 - 6, titleY - 4); ctx.stroke(); ctx.setLineDash([]);
    var lx2 = lx - tw1 - 40;
    ctx.fillText('now', lx2, titleY);
    var tw2 = ctx.measureText('now').width;
    ctx.strokeStyle = C.dot; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(lx2 - tw2 - 26, titleY - 4); ctx.lineTo(lx2 - tw2 - 6, titleY - 4); ctx.stroke();
    ctx.textAlign = 'left';

    // y-scale: never smaller than the starting block, grows fast when peaks get sharp
    var m = 0; for (var j = 0; j < G; j++) m = Math.max(m, dens[j]);
    hold = Math.max(m, hold * 0.99);
    var target = Math.max(floorMax(), hold * 1.12);
    yMax += (target - yMax) * (target > yMax ? 0.3 : 0.05);
    var yb = pBot, yScale = pH / yMax;
    var xOf = function (jj) { return sx((jj + 0.5) / BINS_PER_TOOTH); };

    // baseline and walls of the plot
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(L, yb + 0.5); ctx.lineTo(R, yb + 0.5); ctx.stroke();
    drawWall(L - 1.5, yb - pH, yb, -1);
    drawWall(R + 1.5, yb - pH, yb, 1);

    // distribution now: filled area + line
    ctx.beginPath(); ctx.moveTo(L, yb);
    for (var j2 = 0; j2 < G; j2++) ctx.lineTo(xOf(j2), yb - Math.min(dens[j2] * yScale, pH + 4));
    ctx.lineTo(R, yb); ctx.closePath();
    ctx.fillStyle = 'rgba(224,145,63,0.28)'; ctx.fill();
    ctx.beginPath();
    for (var j3 = 0; j3 < G; j3++) { var yy = yb - Math.min(dens[j3] * yScale, pH + 4); if (j3 === 0) ctx.moveTo(xOf(j3), yy); else ctx.lineTo(xOf(j3), yy); }
    ctx.strokeStyle = C.dot; ctx.lineWidth = 2; ctx.stroke();

    // distribution at start: dashed outline
    ctx.beginPath();
    for (var j4 = 0; j4 < G; j4++) { var y4 = yb - dens0[j4] * yScale; if (j4 === 0) ctx.moveTo(xOf(j4), y4); else ctx.lineTo(xOf(j4), y4); }
    ctx.strokeStyle = 'rgba(242,242,238,0.55)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);

    // axis hint
    ctx.font = (small ? '400 10px ' : '400 12px ') + 'Space Grotesk, system-ui, sans-serif';
    ctx.fillStyle = C.muted; ctx.textAlign = 'right';
    ctx.fillText('position between the walls →', R - 2, h - pad * 0.5 - 1);
    ctx.textAlign = 'left';
  }

  var MESSAGES = {
    flash: 'Landscape switching on and off: the particles march right and pile up against the right wall.',
    on: 'Landscape always on: the particles stay trapped in the valleys, giving sharp peaks.',
    off: 'Landscape always off: the particles spread out between the walls and the distribution flattens.'
  };
  function announce() { if (live) live.textContent = MESSAGES[mode]; }

  function frame(ts) {
    if (!running) return;
    var dtReal = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
    last = ts;
    if (visible) { advance(dtReal); density(dens, SMOOTH); draw(); }
    requestAnimationFrame(frame);
  }
  function play() { if (running) return; running = true; last = 0; playBtn.textContent = 'Pause'; requestAnimationFrame(frame); }
  function pause() { running = false; playBtn.textContent = 'Play'; }

  playBtn.addEventListener('click', function () { running ? pause() : play(); });
  resetBtn.addEventListener('click', function () { reset(); });
  if (speedBtn) speedBtn.addEventListener('click', function () {
    speed = speed === 1 ? 4 : 1;
    speedBtn.textContent = speed === 1 ? 'Faster' : 'Slower';
    speedBtn.setAttribute('aria-pressed', String(speed > 1));
    if (!running) draw();
  });
  radios.forEach(function (rd) {
    // changing the landscape keeps the particles where they are, so you can
    // watch the distribution respond; "Start again" puts them back
    rd.addEventListener('change', function () {
      if (!rd.checked) return;
      mode = rd.value; on = isOn(t); announce();
      if (!running) play();
    });
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.05 }).observe(canvas);
  }
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(canvas); else window.addEventListener('resize', size);

  reset(); size();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) play(); else pause();
})();
