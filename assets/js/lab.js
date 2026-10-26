/* Decrypts the members-only lab area in the browser (AES-GCM + PBKDF2). */
(function () {
  'use strict';
  var form = document.getElementById('lab-lock');
  var box = document.getElementById('lab-content');
  var err = document.getElementById('lab-err');
  if (!form || !box || !window.LAB) return;
  function b64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  async function open(pw) {
    var enc = new TextEncoder();
    var base = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(LAB.salt), iterations: LAB.iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(LAB.iv) }, key, b64(LAB.ct));
    return new TextDecoder().decode(plain);
  }
  function show(html) {
    box.innerHTML = html; box.hidden = false; form.hidden = true;
    var h = box.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
  }
  try { var saved = sessionStorage.getItem('lab-pw'); if (saved) open(saved).then(show).catch(function () {}); } catch (e) {}
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var pw = document.getElementById('lab-pw').value;
    err.textContent = '';
    if (!window.crypto || !crypto.subtle) { err.textContent = 'Your browser cannot decrypt this page. Open the site over https in a recent browser.'; return; }
    open(pw).then(function (html) {
      try { sessionStorage.setItem('lab-pw', pw); } catch (e2) {}
      show(html);
    }).catch(function () { err.textContent = 'Wrong password. Check with Emanuele if you are unsure.'; });
  });
})();
