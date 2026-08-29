
/* ---- slate filter (per taalblok) ---- */
document.querySelectorAll('.langblock').forEach(function(scope){
  var chips = scope.querySelectorAll('.chip');
  chips.forEach(function(b){
    b.addEventListener('click', function(){
      chips.forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
      var f = b.dataset.f;
      scope.querySelectorAll('.card').forEach(function(c){
        c.classList.toggle('hide', f !== 'all' && c.dataset.s !== f);
      });
    });
  });
});

/* ---- voor/na-schuif ---- */
document.querySelectorAll('.wipe').forEach(function(el){
  function set(p){
    p = Math.max(0, Math.min(100, p));
    el.style.setProperty('--pos', p + '%');
    el.setAttribute('aria-valuenow', Math.round(p));
  }
  set(50);
  var down = false;
  function from(e){
    var r = el.getBoundingClientRect();
    set(((e.clientX !== undefined ? e.clientX : e.touches[0].clientX) - r.left) / r.width * 100);
  }
  el.addEventListener('pointerdown', function(e){ down = true; el.setPointerCapture(e.pointerId); from(e); });
  el.addEventListener('pointermove', function(e){ if (down) from(e); });
  el.addEventListener('pointerup', function(){ down = false; });
  el.addEventListener('pointercancel', function(){ down = false; });
  el.addEventListener('keydown', function(e){
    var cur = +el.getAttribute('aria-valuenow');
    if (e.key === 'ArrowLeft'){ set(cur - 4); e.preventDefault(); }
    if (e.key === 'ArrowRight'){ set(cur + 4); e.preventDefault(); }
  });
});

/* ---- gespreksplanner ---- */
document.querySelectorAll('[data-book]').forEach(function(root){
  var C = JSON.parse(root.dataset.book);
  var ZBASE = 'https://zcal.co/waranafilm/';           /* vervang door de echte agenda-links */
  var sel = C.types[0], slot = null;
  var optsEl = root.querySelector('.opts'), slotsEl = root.querySelector('.slots'),
      sumEl = root.querySelector('.book-sum'), goEl = root.querySelector('.go'),
      tzEl = root.querySelector('.tz');
  var pad = function(n){ return String(n).padStart(2, '0'); };

  function slots(){
    var out = [], d = new Date(), hours = [9, 11, 14, 16];
    d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 1);
    while (out.length < 6){
      if (d.getDay() !== 0 && d.getDay() !== 6){
        hours.forEach(function(h){
          if (out.length < 6){ var x = new Date(d); x.setHours(h, 0, 0, 0); out.push(x); }
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  function render(){
    optsEl.innerHTML = C.types.map(function(t){
      return '<button class="opt" type="button" data-id="' + t.id + '" aria-pressed="' + (t.id === sel.id) + '">'
        + '<span class="dot"></span><span><b>' + t.t + ' &middot; ' + t.m + ' ' + C.min + '</b>'
        + '<span class="s">' + t.s + '</span></span></button>';
    }).join('');
    optsEl.querySelectorAll('.opt').forEach(function(b){
      b.onclick = function(){
        sel = C.types.filter(function(t){ return t.id === b.dataset.id; })[0];
        render();
      };
    });

    var S = slots();
    if (!slot) slot = S[0];
    slotsEl.innerHTML = S.map(function(x, i){
      return '<button class="slot" type="button" data-i="' + i + '" aria-pressed="' + (+x === +slot) + '">'
        + '<small>' + C.days[x.getDay()] + ' ' + x.getDate() + ' ' + C.months[x.getMonth()] + '</small>'
        + pad(x.getHours()) + ':00</button>';
    }).join('');
    slotsEl.querySelectorAll('.slot').forEach(function(b){
      b.onclick = function(){ slot = S[+b.dataset.i]; render(); };
    });

    var end = new Date(+slot + sel.m * 60000);
    sumEl.innerHTML = '<b>' + sel.t + '</b> &middot; ' + sel.m + ' ' + C.minutes + '<br>'
      + C.days[slot.getDay()] + ' ' + slot.getDate() + ' ' + C.months[slot.getMonth()] + ', '
      + pad(slot.getHours()) + ':00&ndash;' + pad(end.getHours()) + ':' + pad(end.getMinutes());
    goEl.href = ZBASE + sel.id + '?start=' + encodeURIComponent(slot.toISOString());
    try { tzEl.textContent = C.tz + ' ' + Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' '); }
    catch (e) { tzEl.textContent = C.tzFallback; }
  }
  render();
});
