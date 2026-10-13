/* Business Women Albury Wodonga — behaviour shared by every page:
   navigation, header, scroll reveals, forms, event descriptions and contact cards. */
window.BWAW = window.BWAW || {};
(function (BWAW) {
  const $ = (s) => document.querySelector(s);

  /* Forms: show a thank-you message (forms are not connected to a service yet). */
  function sub(f) {
    const b = f.querySelector("button");
    const label = b.dataset.success || "Thanks, we’ll be in touch";
    b.textContent = label;
    b.disabled = true;
    setTimeout(() => {
      b.textContent = b.dataset.label || "Send me email updates";
      b.disabled = false;
      f.reset();
    }, 3000);
    return false;
  }

  document.querySelectorAll("[data-demo-form]").forEach((form) =>
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sub(form);
    }),
  );

  /* Fade elements with .r or .fd in as they scroll into view. */
  const R = (h) => {
    const o = new IntersectionObserver(
      (e) =>
        e.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("in");
            o.unobserve(x.target);
          }
        }),
      { threshold: 0.1 },
    );
    h.querySelectorAll(".r,.fd").forEach((el, i) => {
      if (el.classList.contains("r")) el.style.transitionDelay = (i % 3) * 0.08 + "s";
      o.observe(el);
    });
  };

  /* Upcoming events: clamp long descriptions with a "See more" button. */
  function setupEventDescriptions(root) {
    root.querySelectorAll(".up .ev p:not(.event-copy-full)").forEach((p) => {
      p.classList.add("event-copy-clamp");
      requestAnimationFrame(() => {
        if (p.scrollHeight <= p.clientHeight + 2) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "event-copy-toggle";
        button.textContent = "See more";
        button.setAttribute("aria-expanded", "false");
        button.addEventListener("click", () => {
          const expanded = p.classList.toggle("expanded");
          button.textContent = expanded ? "See less" : "See more";
          button.setAttribute("aria-expanded", String(expanded));
        });
        p.insertAdjacentElement("afterend", button);
      });
    });
  }

  /* Events page: open and close the "more events" panel. */
  function mor() {
    const n = document.getElementById("nx");
    const open = n.classList.toggle("open");
    const b = document.querySelector(".more-events-control button");
    if (b) b.setAttribute("aria-expanded", String(open));
    if (open) n.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* Contact page: click a card to copy its email address. */
  async function copyContactEmail(button) {
    const email = button.dataset.email;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else {
        const field = document.createElement("textarea");
        field.value = email;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      const status = button.querySelector(".copy-feedback");
      if (status) status.textContent = "Email copied";
      button.setAttribute("aria-label", `Copied ${email}`);
      setTimeout(() => {
        if (status) status.textContent = "";
        button.setAttribute("aria-label", `Copy ${button.querySelector("h3").textContent} email address`);
      }, 1800);
    } catch {
      const status = button.querySelector(".copy-feedback");
      if (status) status.textContent = email;
    }
  }

  /* Show a labelled placeholder when an image fails to load. */
  function markMissingImages(root) {
    root.querySelectorAll("img").forEach((img) => {
      const mark = () => {
        if (img.naturalWidth) return;
        const frame = img.closest(".im,.pc,.pim,.si,.gimg,.trust-logo,.ph");
        if (frame && !frame.querySelector(".image-placeholder-label")) {
          frame.classList.add("image-placeholder");
          frame.setAttribute("aria-label", "Image placeholder");
          const label = document.createElement("span");
          label.className = "image-placeholder-label";
          label.textContent = "Image placeholder";
          frame.append(label);
        }
      };
      img.addEventListener("error", mark, { once: true });
      if (img.complete && !img.naturalWidth) mark();
    });
  }

  /* Header and navigation menu. */
  $("#nav").addEventListener("click", (event) => {
    const topLink = event.target.closest(".nav-top");
    if (topLink && matchMedia("(max-width:800px)").matches) {
      const item = topLink.closest(".nav-item");
      if (!item.classList.contains("expanded")) {
        event.preventDefault();
        $("#nav")
          .querySelectorAll(".nav-item")
          .forEach((other) => other.classList.remove("expanded"));
        item.classList.add("expanded");
        return;
      }
    }
    if (event.target.closest("a")) {
      $("#nav").classList.remove("open");
      $("#bg").setAttribute("aria-expanded", "false");
      $("#nav")
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("expanded"));
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $("#nav").classList.remove("open");
      $("#bg").setAttribute("aria-expanded", "false");
      $("#nav")
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("expanded"));
    }
  });

  $("#bg").onclick = () => {
    const open = $("#nav").classList.toggle("open");
    $("#bg").setAttribute("aria-expanded", String(open));
  };
  addEventListener("scroll", () => document.querySelector("header").classList.toggle("sc", scrollY > 10), {
    passive: true,
  });

  /* Start-up. */
  const main = $("#m");
  setupEventDescriptions(main);
  main
    .querySelectorAll(".contact-copy-card")
    .forEach((button) => button.addEventListener("click", () => copyContactEmail(button)));
  markMissingImages(main);
  R(main);
  window._su = null;

  BWAW.mor = mor;
})(window.BWAW);
