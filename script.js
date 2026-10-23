(function () {
  // ---- Referans verisi ----
  var kurumsal = [
    "loqioloyalty.com", "ledaajans.com", "aboutephesus.com", "canciftci.av.tr",
    "solutionrfid.com", "verkingroup.com", "okanhurda.com", "sabanlihurdacilik.com",
    "www.aksehircinarkamera.com", "corollablog.com", "parisvia.com", "gokcenmarble.com",
    "landlordenergy.com.tr", "www.partnerenergie.be", "aysegulmut.com.tr", "puresourcetr.com",
    "dmmlojistik.com", "coronayattur.com", "www.cenanvakfi.org", "www.yilanlikayahafriyat.com",
    "kesanonline.com", "senkayataksi.com", "www.objektifmedia.com"
  ];
  var eticaret = [
    "evasilvera.com.tr", "bicakhanesi.com", "www.atesotoyedek.com", "atsizbicak.com",
    "seytin.com.tr", "www.balcinoglubiberleri.com.tr", "www.promosyonbank.com", "cetprime.com",
    "veritasturkiye.com", "eniyikombiler.com", "sphandcraft.com", "saraymobilyahome.com.tr",
    "pecron.com.tr", "extrasocialmedia.com"
  ];

  var refs = [];
  kurumsal.forEach(function (d) { refs.push({ d: d, t: "kurumsal" }); });
  eticaret.forEach(function (d) { refs.push({ d: d, t: "eticaret" }); });

  function clean(d) { return d.replace(/^www\./, ""); }
  function shot(d, w) {
    return "https://s.wordpress.com/mshots/v1/" + encodeURIComponent("https://" + d) + "?w=" + w + "&h=" + Math.round(w * 0.66);
  }

  // ---- Sayaçlar ----
  var counts = { total: refs.length, kurumsal: kurumsal.length, eticaret: eticaret.length };
  document.querySelectorAll("[data-count]").forEach(function (el) {
    el.textContent = counts[el.dataset.count];
  });

  // ---- Referans kartları ----
  var grid = document.getElementById("grid");
  refs.forEach(function (r) {
    var name = clean(r.d);
    var a = document.createElement("a");
    a.className = "ref reveal";
    a.href = "https://" + r.d + "/";
    a.target = "_blank";
    a.rel = "noopener";
    a.dataset.type = r.t;
    a.innerHTML =
      '<div class="shot"><div class="ph">' + name.charAt(0).toUpperCase() + '</div>' +
      '<img loading="lazy" alt="' + name + ' ana sayfa önizlemesi" src="' + shot(r.d, 640) + '">' +
      '<div class="overlay"><span>Siteyi Ziyaret Et ↗</span></div></div>' +
      '<div class="ref-info"><b>' + name + '</b>' +
      '<span class="tag ' + (r.t === "eticaret" ? "shop" : "") + '">' + (r.t === "eticaret" ? "E-Ticaret" : "Kurumsal") + '</span></div>';
    var img = a.querySelector("img");
    img.addEventListener("load", function () { img.classList.add("ok"); });
    img.addEventListener("error", function () { img.remove(); });
    grid.appendChild(a);
  });

  // ---- Filtre ----
  document.getElementById("filters").addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    btn.classList.add("active");
    var f = btn.dataset.f;
    document.querySelectorAll(".ref").forEach(function (c) {
      c.classList.toggle("hide", f !== "all" && c.dataset.type !== f);
      c.classList.add("in");
    });
  });

  // ---- Hero tarayıcı vitrini ----
  var featured = ["loqioloyalty.com", "ledaajans.com", "evasilvera.com.tr", "bicakhanesi.com", "solutionrfid.com", "sphandcraft.com", "aboutephesus.com", "pecron.com.tr"];
  var bImg = document.getElementById("browserImg");
  var bUrl = document.getElementById("browserUrl");
  var idx = 0;
  function showFeatured() {
    var d = featured[idx % featured.length];
    bImg.style.opacity = 0;
    setTimeout(function () {
      bImg.src = shot(d, 900);
      bUrl.textContent = d;
    }, 250);
    idx++;
  }
  bImg.addEventListener("load", function () { bImg.style.opacity = 1; });
  showFeatured();
  setInterval(showFeatured, 4500);

  // ---- Kayan şerit ----
  var mq = document.getElementById("marquee");
  var names = refs.map(function (r) { return clean(r.d); });
  mq.innerHTML = names.concat(names).map(function (n) { return "<span>" + n + "</span>"; }).join("");

  // ---- Tema ----
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) saved = "dark";
  if (saved) root.setAttribute("data-theme", saved);
  document.getElementById("themeBtn").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---- Menü / scroll ----
  var menu = document.getElementById("menu");
  document.getElementById("burger").addEventListener("click", function () { menu.classList.toggle("open"); });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") menu.classList.remove("open"); });
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () { nav.classList.toggle("scrolled", window.scrollY > 10); });

  // ---- Reveal animasyonu ----
  document.querySelectorAll(".card, .steps li, .sec-head, .cta-box").forEach(function (el) { el.classList.add("reveal"); });
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.08 }) : null;
  document.querySelectorAll(".reveal").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
