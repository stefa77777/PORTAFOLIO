const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$('#year').textContent=new Date().getFullYear();
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));

/* PROYECTOS: agrega aquí los demás (tags: web, equipo, java, python) */
const projects=[
 {t:'Trendy Shop',d:'Tienda de moda en línea (e-commerce) creada en equipo durante el hackathon de Generation Colombia.',tags:['web','equipo'],stack:['HTML','CSS','JavaScript'],code:'https://github.com/argie-fullstack-java-generation-ch14/trendy-shop',demo:'https://argie-fullstack-java-generation-ch14.github.io/trendy-shop/'},
 {t:'Agenda telefónica',d:'Aplicación en Java para gestionar contactos, desarrollada en equipo en un hackathon.',tags:['java','equipo'],stack:['Java'],code:'https://github.com/Scardon14/hackaton2-agenda-telefonica'},
 {t:'Plataforma para mascotas',d:'Plataforma de cuidado de mascotas construida en equipo durante el bootcamp Full-Stack Java.',tags:['web','equipo','java'],stack:['Java','Spring Boot','SQL']}
];
const grid=$('#grid');
grid.innerHTML=projects.map(p=>`<article class="card" data-tags="${p.tags.join(' ')}"><h3>${p.t}</h3><p>${p.d}</p>
<div class="tags">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
<div class="links">${p.code?`<a href="${p.code}" target="_blank" rel="noopener">💻 Código</a>`:''}${p.demo?`<a href="${p.demo}" target="_blank" rel="noopener">🌐 Demo</a>`:''}</div></article>`).join('');
$$('#filters button').forEach(b=>b.onclick=()=>{
  $$('#filters button').forEach(x=>x.classList.toggle('active',x===b));
  $$('.card').forEach(c=>c.style.display=(b.dataset.f==='all'||c.dataset.tags.includes(b.dataset.f))?'':'none');
});

/* Tilt 3D + brillo que sigue al mouse en las tarjetas */
$$('.card').forEach(c=>{
  c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.transform=`rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*10}deg) translateY(-4px)`;
    c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');
  });
  c.addEventListener('pointerleave',()=>c.style.transform='');
});

/* Texto que se escribe solo */
const words=['Full-Stack','Java','Backend','Frontend','de soluciones reales'];let wi=0,ci=0,del=false;
(function type(){
  const w=words[wi];$('#typed').textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length}
  ci+=del?-1:1;setTimeout(type,del?45:90);
})();

/* Ojos del avatar siguen el cursor + brillo de fondo */
const pupils=$$('.pupil'),glow=$('#glow');
addEventListener('pointermove',e=>{
  glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';
  const r=$('#avatar').getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy)||1,k=Math.min(6,d/40);
  pupils.forEach(p=>p.style.transform=`translate(${dx/d*k}px,${dy/d*k}px)`);
});

/* Revelado, contadores, progreso, volver arriba */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
  const n=+e.target.dataset.count;let i=0;const t=setInterval(()=>{e.target.textContent=++i;if(i>=n)clearInterval(t)},900/n)}),{threshold:.6});
$$('[data-count]').forEach(el=>co.observe(el));
addEventListener('scroll',()=>{
  const h=document.documentElement;$('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  $('#toTop').classList.toggle('show',h.scrollTop>600);
},{passive:true});
$('#toTop').onclick=()=>scrollTo({top:0});