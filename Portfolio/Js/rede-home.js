// rede-home.js: scripts da página (interações e efeitos)

const c = document.getElementById("bgNet");
const ctx = c.getContext("2d");

let w, h, pts;

// função resize: lógica principal
function resize(){
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;

  const count = Math.round((w*h)/50000); // densidade
  pts = Array.from({length: count}, () => ({
  x: Math.random()*w,
  y: Math.random()*h,
  vx: (Math.random()*2-1)*0.35,
  vy: (Math.random()*2-1)*0.35
}));

const hubs = 4;
for (let k = 0; k < hubs; k++){
  const hx = Math.random() * w;
  const hy = Math.random() * h;

  for (let n = 0; n < Math.floor(pts.length * 0.08); n++){
    pts.push({
      x: hx + (Math.random() * 160 - 80),
      y: hy + (Math.random() * 160 - 80),
      vx: (Math.random() * 2 - 1) * 0.25,
      vy: (Math.random() * 2 - 1) * 0.25
    });
  }
}}

// escuta resize: reação do usuário
window.addEventListener("resize", resize);
resize();

// função draw: lógica principal
function draw(){
  ctx.clearRect(0,0,w,h);

  const g = ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0, "rgba(124,58,237,.10)");
  g.addColorStop(0.5, "rgba(59,130,246,.08)");
  g.addColorStop(1, "rgba(34,197,94,.05)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for (let i=0;i<pts.length;i++){
    const p = pts[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x<0||p.x>w) p.vx *= -1;
    if (p.y<0||p.y>h) p.vy *= -1;

    ctx.fillStyle = "rgba(255,255,255,.14)";
    ctx.beginPath();
    ctx.arc(p.x,p.y,1.6,0,Math.PI*2);
    ctx.fill();

    for (let j=i+1;j<pts.length;j++){
      const q = pts[j];
      const dx = p.x-q.x, dy=p.y-q.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if (d < 200){
        const a = 1 - d/160;
        ctx.strokeStyle = `rgba(255,255,255,${0.10*a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(q.x,q.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();

// bloco automático: roda ao carregar a página
(function () {
  const welcome = document.getElementById("welcomeType");
  const name = document.getElementById("nameType");
  if (!welcome || !name) return;

// função typeInto: lógica principal
  function typeInto(el, text, speed = 45) {
    el.textContent = "";
    el.classList.add("is-typing");

    return new Promise((resolve) => {
      let i = 0;
// função tick: lógica principal
      function tick() {
        el.textContent += text[i++];
        if (i < text.length) setTimeout(tick, speed);
        else {
          el.classList.remove("is-typing");
          resolve();
        }
      }
      tick();
    });
  }

  const t1 = welcome.dataset.text || "Bem-vindo ao meu portfólio";
  const t2 = name.dataset.text || "Christopher";

  (async () => {
    await typeInto(welcome, t1, 35);
    await new Promise(r => setTimeout(r, 180));
    await typeInto(name, t2, 55);
  })();
})();
