// ====== EDITA AQUÍ TUS PROYECTOS ======
// img: ruta de la imagen en tu carpeta img/ (si no existe, se usa un respaldo automático)
const projects = [
  { title: "GPS PET", img: "img/gps-pet.jpg", emoji: "🐾", cats: ["web"],
    desc: "Aplicación web para rastreo y localización de mascotas en tiempo real.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://stefa77777.github.io/GPS-PET/", code: "https://github.com/stefa77777/GPS-PET" },
  { title: "Restaurante", img: "img/restaurante.jpg", emoji: "🍽️", cats: ["web"],
    desc: "Sitio web interactivo para consultar el menú y hacer reservas de un restaurante.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://stefa77777.github.io/Restaurante/", code: "https://github.com/stefa77777/Restaurante" },
  { title: "Trendy Shop (Hackathon)", img: "img/trendy-shop.jpg", emoji: "🛍️", cats: ["web", "equipo"],
    desc: "Tienda de moda en línea desarrollada en equipo durante el primer hackathon (Generation Ch14).",
    tech: ["JavaScript", "Trabajo en equipo"],
    demo: "https://argie-fullstack-java-generation-ch14.github.io/trendy-shop/",
    code: "https://github.com/argie-fullstack-java-generation-ch14/trendy-shop" },
  { title: "TechnoPet", img: "img/techno-pet.jpg", emoji: "🐶", cats: ["web", "equipo"],
    desc: "Proyecto grupal del Grupo 9, Generation Colombia, Cohorte 14.",
    tech: ["JavaScript", "Trabajo en equipo"],
    code: "https://github.com/devdavco/TechnoPet" },
  { title: "Mundo Animal", img: "img/mundo-animal.jpg", emoji: "🐱", cats: ["web", "equipo"],
    desc: "Blog para el cuidado y bienestar de las mascotas.",
    tech: ["HTML", "CSS", "Trabajo en equipo"],
    code: "https://github.com/elynzx/mundo-animal" },
  { title: "Agenda Telefónica (Hackathon)", img: "img/agenda-telefonica.jpg", emoji: "📞", cats: ["java", "equipo"],
    desc: "Agenda telefónica en Java desarrollada en equipo durante el segundo hackathon.",
    tech: ["Java", "Trabajo en equipo"],
    code: "https://github.com/Scardon14/hackaton2-agenda-telefonica" },
  { title: "Caja de Compensación", img: "img/caja-compensacion.jpg", emoji: "🏛️", cats: ["python"],
    desc: "Proyecto desarrollado en Python.",
    tech: ["Python"],
    code: "https://github.com/stefa77777/cajadeCompensacion-py" }
];

// ====== RENDER DE PROYECTOS ======
const grid = document.getElementById('grid');
grid.innerHTML = projects.map(p => `
  <article class="card" data-cats="${p.cats.join(' ')}">
    <div class="thumb">
      <img src="${p.img}" alt="Vista previa de ${p.title}" loading="lazy"
           data-demo="${p.demo || ''}" data-emoji="${p.emoji}">
    </div>
    <div class="body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="chips">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="links">
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">🌐 Demo</a>` : ''}
        <a href="${p.code}" target="_blank" rel="noopener">💻 Código</a>
      </div>
    </div>
  </article>`).join('');

// Si la imagen local no existe: 1) captura automática de la demo, 2) emoji
document.querySelectorAll('.thumb img').forEach(img => {
  img.addEventListener('error', function onErr() {
    const demo = img.dataset.demo;
    if (demo && !img.dataset.tried) {
      img.dataset.tried = '1';
      img.src = 'https://api.microlink.io/?url=' + encodeURIComponent(demo) +
                '&screenshot=true&meta=false&embed=screenshot.url';
    } else {
      img.removeEventListener('error', onErr);
      const d = document.createElement('div');
      d.className = 'ph';
      d.textContent = img.dataset.emoji;
      img.replaceWith(d);
    }
  });
});

// ====== FILTROS ======
document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('button'); if (!btn) return;
  document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.f;
  document.querySelectorAll('.card').forEach(c =>
    c.classList.toggle('hide', f !== 'all' && !c.dataset.cats.split(' ').includes(f)));
});

// ====== EFECTO ESCRITURA ======
const words = ["Full-Stack", "Web", "Creativa", "Autodidacta"];
const typed = document.getElementById('typed');
let w = 0, i = 0, del = false;
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, i);
  if (!del && i === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && i === 0) { del = false; w = (w + 1) % words.length; }
  i += del ? -1 : 1;
  setTimeout(type, del ? 50 : 110);
})();

// ====== ANIMACIÓN AL HACER SCROLL ======
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('visible');
    en.target.querySelectorAll('[data-count]').forEach(el => {
      const target = +el.dataset.count; let n = 0;
      const t = setInterval(() => { el.textContent = ++n; if (n >= target) clearInterval(t); }, 90);
      delete el.dataset.count;
    });
    io.unobserve(en.target);
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ====== MENÚ MÓVIL ======
const menu = document.getElementById('menu');
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

// ====== VOLVER ARRIBA ======
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 500));
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('year').textContent = new Date().getFullYear();