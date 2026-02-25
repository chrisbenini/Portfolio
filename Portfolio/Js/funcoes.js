// funcoes.js: scripts da página (interações e efeitos)

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

// escuta click: reação do usuário
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

// escuta click: reação do usuário
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) menu.classList.remove("open");
  });

// escuta click: reação do usuário
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

const canvas = document.getElementById("bg");
const ctx = canvas?.getContext?.("2d", { alpha: true });

if (canvas && ctx) {
  let w = 0, h = 0, dpr = 1;
  let t = 0;

// função resize: lógica principal
  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }

// escuta resize: reação do usuário
  window.addEventListener("resize", resize);
  resize();

// função baseBackground: lógica principal
  function baseBackground() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(7, 10, 18, 1)";
    ctx.fillRect(0, 0, w, h);

    const g1 = ctx.createRadialGradient(
      w * 0.20, h * 0.22, 0,
      w * 0.20, h * 0.22, Math.max(w, h) * 0.85
    );
    g1.addColorStop(0, "rgba(124,58,237,0.12)");
    g1.addColorStop(1, "rgba(124,58,237,0)");

    const g2 = ctx.createRadialGradient(
      w * 0.82, h * 0.20, 0,
      w * 0.82, h * 0.20, Math.max(w, h) * 0.85
    );
    g2.addColorStop(0, "rgba(59,130,246,0.12)");
    g2.addColorStop(1, "rgba(59,130,246,0)");

    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
  }

  const orbs = [
    { x: -300, y: 0, vx: 0.18, vy: 0.02, r: 260, c0: [168, 139, 250], c1: [96, 165, 250], phase: 0.0 },
    { x: 0, y: 0, vx: -0.14, vy: 0.01, r: 320, c0: [96, 165, 250], c1: [124, 58, 237], phase: 1.7 },
    { x: 0, y: 0, vx: 0.10, vy: -0.06, r: 240, c0: [124, 58, 237], c1: [96, 165, 250], phase: 3.1 },
    { x: 0, y: 0, vx: -0.08, vy: 0.07, r: 220, c0: [59, 130, 246], c1: [168, 139, 250], phase: 4.4 },
  ];

// função initOrbs: lógica principal
  function initOrbs() {
    for (const o of orbs) {
      o.x = Math.random() * w;
      o.y = Math.random() * h;
    }
  }
  initOrbs();

// função drawOrb: lógica principal
  function drawOrb(o) {
    ctx.globalCompositeOperation = "lighter";

    const pulse = 1 + Math.sin(t + o.phase) * 0.035;
    const R = o.r * pulse * dpr;

    const [r0, g0, b0] = o.c0;
    const [r1, g1, b1] = o.c1;

    const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, R * 1.25);
    grad.addColorStop(0, `rgba(${r0},${g0},${b0},0.18)`);
    grad.addColorStop(0.38, `rgba(${r1},${g1},${b1},0.12)`);
    grad.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(o.x, o.y, R * 1.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
  }

// função wrap: lógica principal
  function wrap(o) {
    const m = o.r * 2.2 * dpr;
    if (o.x < -m) o.x = w + m;
    if (o.x > w + m) o.x = -m;
    if (o.y < -m) o.y = h + m;
    if (o.y > h + m) o.y = -m;
  }

// função step: lógica principal
  function step() {
    t += 0.012;
    baseBackground();

    for (const o of orbs) {
      o.x += o.vx * dpr;
      o.y += o.vy * dpr;

      o.y += Math.sin(t * 0.7 + o.phase) * 0.15 * dpr;
      o.x += Math.cos(t * 0.55 + o.phase) * 0.12 * dpr;

      wrap(o);
      drawOrb(o);
    }

    requestAnimationFrame(step);
  }

  step();
}

// bloco automático: roda ao carregar a página
(function () {
  const tabs = document.querySelectorAll(".aboutTab");
  const panels = document.querySelectorAll(".aboutPanel");
  const wrap = document.querySelector(".aboutPanelWrap");
  if (!tabs.length || !panels.length || !wrap) return;

  let openKey = null;

// função closeAll: lógica principal
  function closeAll() {
    tabs.forEach(t => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });

    panels.forEach(p => p.classList.remove("is-open"));
    wrap.style.display = "none";
    openKey = null;
  }

// função openTab: lógica principal
  function openTab(key) {
    tabs.forEach(t => {
      const active = t.dataset.about === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach(p => {
      p.classList.toggle("is-open", p.dataset.panel === key);
    });

    wrap.style.display = "block";
    openKey = key;
  }

  tabs.forEach(btn => {
// escuta click: reação do usuário
    btn.addEventListener("click", () => {
      const key = btn.dataset.about;
      if (openKey === key) closeAll();
      else openTab(key);
    });
  });

  closeAll();
})();

// bloco automático: roda ao carregar a página
(function () {
  const tabs = document.querySelectorAll(".skillTab");
  const panels = document.querySelectorAll(".skillPanel");
  const wrap = document.querySelector(".skillPanelWrap");
  if (!tabs.length || !panels.length || !wrap) return;

  let openKey = null;

// função closeAll: lógica principal
  function closeAll() {
    tabs.forEach(t => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });

    panels.forEach(p => p.classList.remove("is-open"));
    wrap.style.display = "none";
    openKey = null;
  }

// função openTab: lógica principal
  function openTab(key) {
    tabs.forEach(t => {
      const active = t.dataset.skill === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach(p => {
      p.classList.toggle("is-open", p.dataset.panel === key);
    });

    wrap.style.display = "block";
    openKey = key;
  }

  tabs.forEach(btn => {
// escuta click: reação do usuário
    btn.addEventListener("click", () => {
      const key = btn.dataset.skill;
      if (openKey === key) closeAll();
      else openTab(key);
    });
  });

  closeAll();
})();

// bloco automático: roda ao carregar a página
(function () {
  const openBtn = document.getElementById("openResumo");
  const modal = document.getElementById("resumoModal");
  if (!openBtn || !modal) return;

// função open: lógica principal
  function open() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

// função close: lógica principal
  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

// escuta click: reação do usuário
  openBtn.addEventListener("click", open);

// escuta click: reação do usuário
  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") close();
  });

// escuta keydown: reação do usuário
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });
})();

// bloco automático: roda ao carregar a página
(function setupAccordionsSmooth() {
// função initGroup: lógica principal
  function initGroup(groupEl) {
    const items = Array.from(groupEl.querySelectorAll(".accItem"));

    items.forEach((it) => {
      it.classList.remove("open");
      const btn = it.querySelector(".accBtn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });

    items.forEach((item) => {
      const btn = item.querySelector(".accBtn");
      if (!btn) return;

// escuta click: reação do usuário
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        items.forEach((it) => {
          if (it !== item) {
            it.classList.remove("open");
            const b = it.querySelector(".accBtn");
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

// escuta DOMContentLoaded: reação do usuário
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-accordion-group]").forEach(initGroup);
  });
})();

// bloco automático: roda ao carregar a página
(() => {
  const container = document.querySelector("#materiais");
  if (!container) return;

// escuta click: reação do usuário
  container.addEventListener("click", (e) => {
    const top = e.target.closest(".matTop");
    if (!top) return;

    e.preventDefault();
    e.stopPropagation();

    const card = top.closest(".matCard");
    if (!card) return;

    const isOpen = card.classList.contains("isOpen");

    container.querySelectorAll(".matCard.isOpen").forEach((c) => {
      c.classList.remove("isOpen");
      const t = c.querySelector(".matTop");
      if (t) t.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      card.classList.add("isOpen");
      top.setAttribute("aria-expanded", "true");
    }
  });
})();

// bloco automático: roda ao carregar a página
(function(){
  const out = document.getElementById("brandText");
  const cur = document.getElementById("brandCursor");
  const wrap = document.querySelector(".brandTech");
  if (!out || !cur || !wrap) return;

  const nome = "Christopher Benini";
  let i = 0;

// função type: lógica principal
  function type(){
    if (i < nome.length){
      out.textContent += nome[i++];
      setTimeout(type, 55);
    } else {
      setTimeout(() => {
        cur.style.display = "none";
        wrap.classList.add("is-done");
      }, 250);
    }
  }
  type();
})();


