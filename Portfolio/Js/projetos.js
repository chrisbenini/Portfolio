// projetos.js: scripts da página (interações e efeitos)

const PROJETOS = [
  {
    id: "portfolio",
    titulo: "Meu Portfolio",
    categoria: "dev",
    badge: "Full Stack",
    desc: "Interface moderna, responsiva e interativa construída com foco em experiência visual e organização técnica.", 
    stack: ["Html5", "CSS3 ", "JavaScript", "Git"],
    bullets: ["Identidade visual tecnológica", "Performance visual", "Experiência imersiva"],
    github: "https://github.com/chrisbenini/Portfolio"
  },
  {
    id: "xml-excel",
    titulo: "Conversor XML → Excel",
    categoria: "dev",
    badge: "Dev",
    desc: "Converte XML para Excel, com 3 tipos de gerações diferentes.",
    stack: ["C#", ".NET", "Xml", "Excel", "Automação"],
    bullets: ["Leitura e parsing de XML", "Geração de planilha pronta", "Foco em rotina e produtividade"],
    github: "https://github.com/chrisbenini/Conversor-de-XML"
  },
  {
    id: "tiny-extractor",
    titulo: "Tiny Extractor (API)",
    categorias: ["dev", "dados"],
    badge: "Back-end / Dados",
    desc: "Extração de dados via API para análise e integração com rotinas internas.",
    stack: ["API", "Python", "Integração", "Dados", ],
    bullets: ["Conecta em endpoints", "Normaliza e organiza retorno", "Pronto pra virar pipeline"],
    github: "https://github.com/chrisbenini/tiny-extractor"
  },
  {
    id: "margin-simulator",
    titulo: " Marketplace Margin Simulator",
    categoria: "dados",
    badge: "Dados",
    desc: "Simulador para cálculos de preços automatizados, e análises de rentabilidade por produto.", 
    stack: ["Excel", "VBA", "Análise", "SQL", "Fórmulas"],
    bullets: ["Controle de margem", "Apoio ao time de negócio", "Controle de lucros"],
    github: "https://github.com/chrisbenini/marketplace-margin-simulator"
  },
  {
    id: "social-grafos",
    titulo: "Dados de Redes sociais",
    categoria: "dados",
    badge: "Dados",
    desc: "Projeto de análise de interações sociais utilizando modelo de grafos.",
    stack: ["Neoj4", "Modelagem de Dados", "Script", "Cypher"],
    bullets: ["Identificação de usuários influentes", "Detecção de comunidades por hashtags", "Análise de interações"],
    github: "https://github.com/chrisbenini/rede-social-grafos"
  },
  {
    id: "dio-graph",
    titulo: "Dio graph",
    categoria: "dados",
    badge: "Dados",
    desc: "Projeto simples de grafo de conhecimento usando Neo4j e Cypher.",
    stack: ["Neoj4", "Modelagem de Dados", "Script", "Cypher"],
    bullets: ["Grafo de conhecimento em Neo4j", "Relacionamentos entre entidades", "Exploração via Cypher"],
    github: "https://github.com/chrisbenini/Dio-graph"
  },
  {
    id: "recomendacao",
    titulo: "Recomendação Inteligente de Músicas",
    categoria: "dados",
    badge: "Dados",
    desc: "Sistema de Recomendação de Música com Neo4j.", 
    stack: ["Neoj4", "Modelagem de Dados", "Script", "Cypher"],
    bullets: ["Sistema de recomendação baseado em dados", "Matching entre usuários com gostos semelhantes", "Geração de recomendações por gênero e afinidade"],
    github: "https://github.com/chrisbenini/musica-recomendada"
  }
];

const grid = document.getElementById("projGrid");
const modal = document.getElementById("projModal");
const mTag = document.getElementById("mTag");
const mTitle = document.getElementById("mTitle");
const mDesc = document.getElementById("mDesc");
const mStack = document.getElementById("mStack");
const mBullets = document.getElementById("mBullets");
const mGithub = document.getElementById("mGithub");

// função cardTemplate: lógica principal
function cardTemplate(p) {
  return `
    <article class="projCard" data-cat="${p.categoria}" data-id="${p.id}">
      <div class="projCardHead">
        <span class="projBadge">${p.badge}</span>
      </div>

      <h3 class="projName">${p.titulo}</h3>

      <div class="projCardBtns">
        <button class="projDetailBtn" type="button" data-open="${p.id}">
          Detalhes <span class="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  `;
}

// função render: lógica principal
function render(filter = "all") {
  const list = filter === "all"
    ? PROJETOS
    : PROJETOS.filter(p => {

        const cats = p.categorias ?? (p.categoria ? [p.categoria] : []);
        return cats.includes(filter);
      });

  grid.innerHTML = list.map(cardTemplate).join("");
  attachCardEffects();
}

// função openModal: lógica principal
function openModal(id) {
  const p = PROJETOS.find(x => x.id === id);
  if (!p) return;

  mTag.textContent = p.badge;
  mTitle.textContent = p.titulo;

  const card = document.querySelector(".projModalCard"); // pega o card do modal

  const THEMES = {
    dev:   ["rgba(124,58,237,.95)", "rgba(34,211,238,.95)", "rgba(59,130,246,.85)"],
    dados: ["rgba(34,197,94,.90)",  "rgba(34,211,238,.95)", "rgba(59,130,246,.85)"],
    api:   ["rgba(59,130,246,.90)", "rgba(34,211,238,.95)", "rgba(124,58,237,.90)"],
  };

  const [a,b,c] = THEMES[p.categoria] || THEMES.dev;
  card.style.setProperty("--techA", a);
  card.style.setProperty("--techB", b);
  card.style.setProperty("--techC", c);
  mDesc.textContent = p.desc;
  mGithub.href = p.github;

  mStack.innerHTML = p.stack.map(s => `<span class="projPill">${s}</span>`).join("");
  mBullets.innerHTML = p.bullets.map(b => `<li>${b}</li>`).join("");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Eu: trava scroll só quando modal abre
}

// função closeModal: lógica principal
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Eu: devolve o scroll normal
}

// função attachCardEffects: lógica principal
function attachCardEffects() {
  const cards = document.querySelectorAll(".projCard");

  cards.forEach(card => {
// escuta mousemove: reação do usuário
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    });

// escuta click: reação do usuário
    card.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open]");
      if (btn) openModal(btn.dataset.open);
    });
  });
}

document.querySelectorAll(".chip").forEach(btn => {
// escuta click: reação do usuário
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});

// escuta click: reação do usuário
modal.addEventListener("click", (e) => {
  if (e.target.dataset.close) closeModal();
});
// escuta keydown: reação do usuário
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

render("all");

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

// bloco automático: roda ao carregar a página
(function () {
  const outs = document.querySelectorAll(".brandTech .brandText");
  const curs = document.querySelectorAll(".brandTech .brandCursor");
  const wraps = document.querySelectorAll(".brandTech");

  if (!outs.length || !curs.length || !wraps.length) return;

  const nome = "Christopher Benini";
  let i = 0;

  outs.forEach(o => (o.textContent = ""));
  curs.forEach(c => (c.style.display = "inline-block"));
  wraps.forEach(w => w.classList.remove("is-done"));

// função type: lógica principal
  function type() {
    if (i < nome.length) {
      outs.forEach(o => (o.textContent += nome[i]));
      i++;
      setTimeout(type, 55);
    } else {
      setTimeout(() => {
        curs.forEach(c => (c.style.display = "none"));
        wraps.forEach(w => w.classList.add("is-done"));
      }, 250);
    }
  }

  type();
})();
