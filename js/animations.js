/* Business Women Albury Wodonga — scroll animations.
   Loaded on every page. Each page's own file in js/pages/ decides which of these to start. */
window.BWAW = window.BWAW || {};
(function (BWAW) {
  const asset = (name) => (name ? "assets/" + name : "");
  const sponsorAssets = [
    ["starfish-marketing.png", "Starfish Marketing"],
    ["hadar.png", "Hadar"],
    ["peta-stewart.png", "Peta Stewart"],
    ["nbn-local.png", "nbn Local"],
    ["muntz-associates.png", "Muntz and Associates"],
    ["campbells.png", "Campbells of Rutherglen"],
    ["gr.png", "GR"],
    ["laurae-healy-art.png", "Laurae Healy Art"],
    ["hume-bank.png", "Hume Bank"],
    ["regent-cinemas.png", "Regent Cinemas"],
    ["pinpoint-finance.png", "Pinpoint Finance"],
    ["redefined.png", "ReDefined Counselling"],
    ["peta-stewart-signature.png", "Peta Stewart"],
    ["harris-liebman.png", "Harris Liebman Solicitors"],
    ["formule.png", "Formule"],
    ["business-hubs.png", "Business Hubs Enterpriseplus"],
    ["rsc.png", "RSC Recovery Solutions Counselling"],
  ];
  function shuffleSponsorAssets() {
    const a = [...sponsorAssets];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* Re-run the active scroll animation on scroll and resize. */
  let sraf;
  function story() {
    const e = document.getElementById("story") || document.getElementById("stack");
    if (!e) return;
    const gs = [...e.querySelectorAll(".sg")],
      st = document.getElementById("sst"),
      ims = [...e.querySelectorAll(".si")],
      n = gs.length;
    if (e.classList.contains("hb")) {
      if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
        gs.forEach((g) => g.classList.add("sponsor-visible"));
        return;
      }
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((x) => {
            if (x.isIntersecting) {
              x.target.classList.add("sponsor-visible");
              observer.unobserve(x.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      gs.forEach((g, i) => {
        g.style.transitionDelay = i * 150 + "ms";
        observer.observe(g);
      });
      return;
    }
    const u = () => {
      sraf = 0;
      const r = e.getBoundingClientRect(),
        p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      gs.forEach((g, i) => {
        const c = (i + 0.5) / n,
          d = Math.abs(p - c) * n;
        let o = Math.min(1, Math.max(0, (0.5 - d) / 0.2));
        if (e.id === "story" && i === 0 && p < 0.2) o = 1;
        const y = (c - p) * n * 70;
        g.style.opacity = o;
        g.classList.toggle("on", o > 0.6);
        g.style.transform = `translateY(calc(-50% + ${y}px))`;
      });
      if (st)
        st.style.transform = `rotate(${(p - 0.5) * 14}deg) scale(${0.98 + 0.02 * Math.sin(p * Math.PI)})`;
      const ts = ims.map((m, i) => (i ? Math.min(1, Math.max(0, (p * n - i + 0.35) / 0.5)) : 1));
      ims.forEach((m, i) => {
        const t = ts[i],
          d = ts.slice(i + 1).reduce((x, y) => x + y, 0);
        m.style.opacity = t;
        m.style.transform = `translateY(${(1 - t) * 70 - d * 18}px) scale(${0.95 + 0.05 * t - d * 0.045})`;
        m.style.filter = `brightness(${1 - d * 0.12})`;
      });
    };
    u();
    window._su = () => {
      if (!sraf) sraf = requestAnimationFrame(u);
    };
  }
  addEventListener("scroll", () => window._su && window._su(), { passive: true });
  addEventListener("resize", () => window._su && window._su());

  /* Sponsors page: tiered sponsor logos scroller. */
  function sqf() {
    const e = document.getElementById("sq");
    if (!e) return;
    const ts = [...e.querySelectorAll(".tp")],
      ns = ts.map((t) => t.children[1].children.length),
      W = ns.map(() => 1),
      T = W.reduce((a, b) => a + b, 0),
      prev = window._su;
    let q = 0;
    const c = (x) => Math.min(1, Math.max(0, x));
    const u = () => {
      q = 0;
      const r = e.getBoundingClientRect(),
        p = c(-r.top / (r.height - innerHeight)) * T;
      let acc = 0;
      ts.forEach((t, i) => {
        const lp = c((p - acc) / W[i]),
          op = c(Math.min(i ? lp / 0.15 : 1, i < ts.length - 1 ? (1 - lp) / 0.15 : 1));
        t.style.opacity = op;
        t.style.visibility = op > 0 ? "visible" : "hidden";
        t.style.transform = `translateY(${(lp < 0.5 ? 1 : -1) * (1 - op) * 40}px) scale(${0.97 + 0.03 * op})`;
        acc += W[i];
      });
    };
    u();
    window._su = () => {
      prev && prev();
      if (!q) q = requestAnimationFrame(u);
    };
  }

  /* Grants page: winners and finalists scrollers. */
  function gwf() {
    const e = document.getElementById("gw");
    if (!e) return;
    const cs = [...e.querySelectorAll(".grant-winner")],
      n = cs.length,
      prev = window._su;
    let q = 0;
    const c = (x) => Math.min(1, Math.max(0, x));
    const u = () => {
      q = 0;
      const r = e.getBoundingClientRect(),
        p = c(-r.top / (r.height - innerHeight)) * (n - 1);
      cs.forEach((el, i) => {
        const m = p - i;
        let o,
          y,
          sc = 1;
        if (m < 0) {
          o = i ? c(1 + m * 1.25) : 1;
          y = -m * 140;
        } else {
          o = i == n - 1 ? 1 : c(1 - m * 1.25);
          y = -m * 70;
          sc = 1 - m * 0.06;
        }
        el.style.opacity = o;
        el.style.transform = "translateY(" + y + "px) scale(" + sc + ")";
        el.style.visibility = o > 0 ? "visible" : "hidden";
      });
    };
    u();
    window._su = () => {
      prev && prev();
      if (!q) q = requestAnimationFrame(u);
    };
  }
  function gff() {
    const e = document.getElementById("gf");
    if (!e) return;
    const cs = [...e.querySelectorAll(".fc")],
      n = cs.length,
      prev = window._su;
    let q = 0;
    const c = (x) => Math.min(1, Math.max(0, x));
    const u = () => {
      q = 0;
      const r = e.getBoundingClientRect(),
        p = c(-r.top / (r.height - innerHeight)) * (n - 1);
      cs.forEach((el, i) => {
        const m = p - i;
        let o,
          y,
          sc = 1;
        if (m < 0) {
          o = i ? c(1 + m * 1.25) : 1;
          y = -m * 140;
        } else {
          o = i == n - 1 ? 1 : c(1 - m * 1.25);
          y = -m * 70;
          sc = 1 - m * 0.06;
        }
        el.style.opacity = o;
        el.style.transform = `translateY(${y}px) scale(${sc})`;
        el.style.visibility = o > 0 ? "visible" : "hidden";
      });
    };
    u();
    const pg = window._su;
    window._su = () => {
      prev && prev();
      if (!q) q = requestAnimationFrame(u);
    };
  }
  function grantWinnerFade() {
    const cards = document.querySelectorAll("#gw .grant-winner");
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      cards.forEach((c) => c.classList.add("grant-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("grant-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.14 },
    );
    cards.forEach((card, i) => {
      card.style.setProperty("--reveal-delay", `${i * 180}ms`);
      observer.observe(card);
    });
  }

  /* Get involved page: chamber benefits scroller. */
  function ivf() {
    const e = document.getElementById("iv");
    if (!e) return;
    const gs = [...e.querySelectorAll(".sg")],
      vs = [...e.querySelectorAll(".vi")],
      bg = document.getElementById("bgl"),
      st = document.getElementById("ivs"),
      n = gs.length,
      prev = window._su;
    let q = 0;
    const c = (x) => Math.min(1, Math.max(0, x));
    const u = () => {
      q = 0;
      if (bg) bg.style.transform = `translateY(${Math.min(scrollY, innerHeight) * 0.15}px)`;
      const r = e.getBoundingClientRect(),
        p = c(-r.top / (r.height - innerHeight));
      gs.forEach((g, i) => {
        const ce = (i + 0.5) / n,
          pp = i == 0 ? Math.max(p, ce) : i == n - 1 ? Math.min(p, ce) : p,
          d = Math.abs(pp - ce) * n,
          o = c((0.5 - d) / 0.2),
          y = (ce - pp) * n * 70;
        g.style.opacity = o;
        g.style.transform = `translateY(calc(-50% + ${y}px))`;
        g.classList.toggle("on", o > 0.6);
        const v = vs[i];
        v.style.opacity = o;
        v.style.transform = i === 0 ? "none" : `translateY(${y * 0.6}px) scale(${0.9 + 0.1 * o})`;
      });
      if (st) st.style.transform = "none";
    };
    u();
    window._su = () => {
      prev && prev();
      if (!q) q = requestAnimationFrame(u);
    };
  }

  /* Home page: rotating community partner logos. */
  let sponsorTimer = 0;
  let sponsorCycle = [];
  function rotateSponsorLogos() {
    clearInterval(sponsorTimer);
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const slots = [...document.querySelectorAll(".trust-logo img")];
    if (!slots.length) return;
    sponsorTimer = setInterval(() => {
      const slot = slots[Math.floor(Math.random() * slots.length)];
      const current = slot.dataset.asset || "";
      const visible = new Set(slots.map((img) => img.dataset.asset || ""));
      if (!sponsorCycle.length) sponsorCycle = shuffleSponsorAssets();
      let nextIndex = sponsorCycle.findIndex((x) => !visible.has(x[0]) && x[0] !== current);
      if (nextIndex < 0) {
        sponsorCycle = shuffleSponsorAssets().filter((x) => !visible.has(x[0]) && x[0] !== current);
        nextIndex = 0;
      }
      if (!sponsorCycle.length) return;
      const next = sponsorCycle.splice(nextIndex, 1)[0];
      slot.classList.add("fade-out");
      setTimeout(() => {
        slot.src = asset(next[0]);
        slot.alt = next[1];
        slot.dataset.asset = next[0];
        requestAnimationFrame(() => slot.classList.remove("fade-out"));
      }, 460);
    }, 2800);
  }

  Object.assign(BWAW, {
    story,
    sqf,
    gwf,
    gff,
    grantWinnerFade,
    ivf,
    rotateSponsorLogos,
    reducedMotion: () => matchMedia("(prefers-reduced-motion:reduce)").matches,
  });
})(window.BWAW);
