// Добавить ролик — одна строка в W
const W=[
{title:'Автомобильная съёмка',category:'Автомобили',youtubeId:'Bp36ivFyzdM'},
{title:'Спортивный репортаж',category:'Спорт',youtubeId:'kJp8uqLqJH4'},
{title:'Музыкальный клип',category:'Музыкальные клипы',youtubeId:'qsGBafyczrY'},
{title:'Рекламный ролик',category:'Реклама / промо',youtubeId:'IQPIOjJdAnw'},
{title:'Репортаж',category:'Репортаж',youtubeId:'7PJZMFTMZgs'},
{title:'Интервью / подкаст',category:'Интервью / подкасты',youtubeId:'HbDZFQmOoJA'}];
const T=[
['Автомобили','Динамика, драйв и детали машины в движении',0],
['Спорт','Скорость и эмоции соревнований',1],
['Музыкальные клипы','Визуальный образ под музыку артиста',2],
['Реклама / промо','Продающая картинка для бренда',3],
['Репортаж','Событие как оно есть, без пауз',4],
['Интервью / подкасты','Чистый кадр и звук для разговора',5]];
const $=s=>document.querySelector(s),md=$('#md'),fr=$('#fr');
let last;
const d=i=>`style="--d:${(i%3)*.08}s"`;
$('#wg').innerHTML=W.map((w,i)=>`<button class="cd rv" ${d(i)} data-i="${i}" aria-label="Смотреть: ${w.title}"><div class="th"><img src="https://img.youtube.com/vi/${w.youtubeId}/hqdefault.jpg" alt="${w.title}" loading="lazy"><span class="pl"></span></div><div class="wi"><small>${w.category}</small><b>${w.title}</b></div></button>`).join('');
$('#tg').innerHTML=T.map((t,i)=>`<button class="cd rv" ${d(i)} data-i="${t[2]}" aria-label="${t[0]}: смотреть ролик"><div class="tc"><b>${t[0]}</b><span>${t[1]}</span></div></button>`).join('');
document.addEventListener('click',e=>{
  const c=e.target.closest('.cd');
  if(c){last=c;fr.src=`https://www.youtube.com/embed/${W[c.dataset.i].youtubeId}?autoplay=1&rel=0`;md.hidden=false;requestAnimationFrame(()=>md.classList.add('on'));$('#mx').focus()}
  else if(e.target===md||e.target.closest('#mx'))close()
});
function close(){md.classList.remove('on');fr.src='';setTimeout(()=>{md.hidden=true},300);last&&last.focus()}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){md.hidden||close();menu(false)}});

const hd=$('#hd'),nav=$('#nav'),bg=$('#bg'),ov=$('#ov');
function menu(o){nav.classList.toggle('on',o);ov.classList.toggle('on',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
bg.onclick=()=>menu(!nav.classList.contains('on'));
ov.onclick=()=>menu(false);
nav.onclick=e=>e.target.tagName==='A'&&menu(false);

const hv=$('#hv'),mob=matchMedia('(max-width:767px)'),calm=matchMedia('(prefers-reduced-motion:reduce)');
if(!mob.matches&&!calm.matches){hv.src=hv.dataset.src;hv.play().catch(()=>{})}
let tk=0;
addEventListener('scroll',()=>{tk||requestAnimationFrame(()=>{
  const y=scrollY;hd.classList.toggle('s',y>30);
  if(!mob.matches&&!calm.matches&&y<innerHeight)hv.style.transform=`translate3d(0,${y*.25}px,0)`;
  tk=0});tk=1},{passive:true});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
$('#yr').textContent=new Date().getFullYear();
