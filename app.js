(function(){
  "use strict";

  var LS_SAVED = "daybreak_saved_v1";
  var LS_SEEN = "daybreak_seen_v1";
  var LS_BANNER = "daybreak_banner_dismissed_v1";
  var LS_THEME = "daybreak_theme_v1";

  var quoteWrap = document.getElementById("quoteWrap");
  var quoteText = document.getElementById("quoteText");
  var quoteAuthor = document.getElementById("quoteAuthor");
  var catEl = document.getElementById("cat");
  var saveBtn = document.getElementById("saveBtn");
  var shareBtn = document.getElementById("shareBtn");
  var listBtn = document.getElementById("listBtn");
  var nextBtn = document.getElementById("nextBtn");
  var main = document.getElementById("main");
  var installBanner = document.getElementById("installBanner");
  var dismissBanner = document.getElementById("dismissBanner");
  var sheet = document.getElementById("sheet");
  var sheetBackdrop = document.getElementById("sheetBackdrop");
  var savedList = document.getElementById("savedList");
  var themeBtn = document.getElementById("themeBtn");
  var themeIconSun = document.getElementById("themeIconSun");
  var themeIconMoon = document.getElementById("themeIconMoon");
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');

  var current = null;

  // ---------- storage helpers ----------
  function safeGet(key, fallback){
    try{
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    }catch(e){ return fallback; }
  }
  function safeSet(key, val){
    try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){}
  }

  function getSaved(){ return safeGet(LS_SAVED, []); }
  function setSaved(list){ safeSet(LS_SAVED, list); }
  function isSaved(q){
    return getSaved().some(function(s){ return s.t === q.t; });
  }

  // ---------- time-of-day theme ----------
  function applyTimeOfDay(){
    var h = new Date().getHours();
    var cls = "tod-day";
    if (h >= 5 && h < 9) cls = "tod-morning";
    else if (h >= 9 && h < 17) cls = "tod-day";
    else if (h >= 17 && h < 21) cls = "tod-evening";
    else cls = "tod-night";
    document.body.classList.remove("tod-morning","tod-day","tod-evening","tod-night");
    document.body.classList.add(cls);
  }
  applyTimeOfDay();
  setInterval(applyTimeOfDay, 10 * 60 * 1000);

  // ---------- dark mode toggle (persists, overrides time-of-day tint) ----------
  function applyTheme(isDark){
    document.body.classList.toggle("theme-dark", isDark);
    themeIconSun.style.display = isDark ? "none" : "block";
    themeIconMoon.style.display = isDark ? "block" : "none";
    if (themeColorMeta) themeColorMeta.setAttribute("content", isDark ? "#232E2A" : "#5C7A63");
  }
  var darkOn = safeGet(LS_THEME, false);
  applyTheme(darkOn);
  themeBtn.addEventListener("click", function(){
    darkOn = !darkOn;
    safeSet(LS_THEME, darkOn);
    applyTheme(darkOn);
  });

  // ---------- quote rotation (no repeat until the pool is exhausted) ----------
  function pickNext(){
    var seen = safeGet(LS_SEEN, []);
    if (seen.length >= QUOTES.length) seen = [];
    var remaining = QUOTES.map(function(_, i){ return i; })
      .filter(function(i){ return seen.indexOf(i) === -1; });
    var idx = remaining[Math.floor(Math.random() * remaining.length)];
    seen.push(idx);
    safeSet(LS_SEEN, seen);
    return QUOTES[idx];
  }

  function render(q, animate){
    current = q;
    function paint(){
      quoteText.textContent = q.t;
      if (q.a){
        quoteAuthor.textContent = q.a;
        quoteAuthor.style.display = "block";
      } else {
        quoteAuthor.style.display = "none";
      }
      catEl.textContent = q.c;
      saveBtn.classList.toggle("active", isSaved(q));
      if (animate){
        quoteWrap.classList.remove("leaving");
      }
    }
    if (animate){
      quoteWrap.classList.add("leaving");
      setTimeout(paint, 220);
    } else {
      paint();
    }
  }

  function showNext(){
    render(pickNext(), true);
  }

  // ---------- save / share ----------
  saveBtn.addEventListener("click", function(){
    if (!current) return;
    var list = getSaved();
    var idx = list.findIndex(function(s){ return s.t === current.t; });
    if (idx === -1){
      list.unshift(current);
      setSaved(list);
      saveBtn.classList.add("active");
    } else {
      list.splice(idx, 1);
      setSaved(list);
      saveBtn.classList.remove("active");
    }
  });

  shareBtn.addEventListener("click", function(){
    if (!current) return;
    var text = current.a ? '"' + current.t + '" — ' + current.a : '"' + current.t + '"';
    if (navigator.share){
      navigator.share({ text: text }).catch(function(){});
    } else if (navigator.clipboard){
      navigator.clipboard.writeText(text).then(function(){
        shareBtn.classList.add("active");
        setTimeout(function(){ shareBtn.classList.remove("active"); }, 900);
      }).catch(function(){});
    }
  });

  nextBtn.addEventListener("click", showNext);

  // ---------- swipe / tap on the quote area ----------
  var touchStartX = null, touchStartY = null;
  main.addEventListener("touchstart", function(e){
    var t = e.changedTouches[0];
    touchStartX = t.clientX; touchStartY = t.clientY;
  }, { passive:true });

  main.addEventListener("touchend", function(e){
    if (touchStartX === null) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - touchStartX;
    var dy = t.clientY - touchStartY;
    touchStartX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4){
      showNext();
    }
  }, { passive:true });

  main.addEventListener("click", function(e){
    // tap anywhere on the quote text itself advances too
    if (e.target === quoteText || e.target === quoteWrap) showNext();
  });

  // ---------- saved sheet ----------
  function renderSheet(){
    var list = getSaved();
    if (list.length === 0){
      savedList.innerHTML = '<div class="empty-state">Quotes you save will show up here — tap the ribbon icon on one you like.</div>';
      return;
    }
    savedList.innerHTML = "";
    list.forEach(function(q, i){
      var row = document.createElement("div");
      row.className = "saved-item";
      var body = document.createElement("div");
      var p = document.createElement("p");
      p.textContent = q.t;
      body.appendChild(p);
      if (q.a){
        var span = document.createElement("span");
        span.textContent = "— " + q.a;
        body.appendChild(span);
      }
      row.appendChild(body);
      var rm = document.createElement("button");
      rm.className = "saved-remove";
      rm.setAttribute("aria-label","Remove");
      rm.textContent = "✕";
      rm.addEventListener("click", function(){
        var l = getSaved();
        l.splice(i, 1);
        setSaved(l);
        renderSheet();
        if (current) saveBtn.classList.toggle("active", isSaved(current));
      });
      row.appendChild(rm);
      savedList.appendChild(row);
    });
  }

  function openSheet(){
    renderSheet();
    sheet.classList.add("show");
    sheetBackdrop.classList.add("show");
  }
  function closeSheet(){
    sheet.classList.remove("show");
    sheetBackdrop.classList.remove("show");
  }
  listBtn.addEventListener("click", openSheet);
  sheetBackdrop.addEventListener("click", closeSheet);

  // ---------- install banner (iOS Safari, not already installed) ----------
  function isStandalone(){
    return window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;
  }
  function isIOS(){
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }
  if (isIOS() && !isStandalone() && !safeGet(LS_BANNER, false)){
    setTimeout(function(){ installBanner.classList.add("show"); }, 1400);
  }
  dismissBanner.addEventListener("click", function(){
    installBanner.classList.remove("show");
    safeSet(LS_BANNER, true);
  });

  // ---------- service worker for offline ----------
  if ("serviceWorker" in navigator){
    window.addEventListener("load", function(){
      navigator.serviceWorker.register("sw.js").catch(function(){});
    });
  }

  // ---------- boot ----------
  render(pickNext(), false);
})();
