// menu-mobile.js: scripts da página (interações e efeitos)

// função ligarMenuMobile: lógica principal
function ligarMenuMobile(botaoId, menuId) {
  const btn = document.getElementById(botaoId);
const menu = document.getElementById(menuId);

  if (!btn || !menu) return;

// escuta click: reação do usuário
  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

// escuta click: reação do usuário
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) menu.classList.remove("open");
  });

// escuta click: reação do usuário
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

ligarMenuMobile("menuBtnPrincipal", "menuPrincipal");

ligarMenuMobile("menuBtnProjetos", "menuProjetos");

// função syncMenuOnResize: lógica principal
function syncMenuOnResize(menuId) {
  const menu = document.getElementById(menuId);
  if (!menu) return;

  const isMobile = window.matchMedia("(max-width: 900px)").matches;

  if (!isMobile) menu.classList.remove("open");
}

// escuta resize: reação do usuário
window.addEventListener("resize", () => {
  syncMenuOnResize("menuPrincipal");
  syncMenuOnResize("menuProjetos");
});

syncMenuOnResize("menuPrincipal");
syncMenuOnResize("menuProjetos");

