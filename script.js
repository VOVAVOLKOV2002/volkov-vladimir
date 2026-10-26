// Добавить ролик — одна строка в W (порядок = порядок карточек)
const W=[
{title:'Автомобильная съёмка',category:'Автомобили',desc:'Активная съёмка автомобилей: скорость, свет, металл',youtubeId:'Bp36ivFyzdM'},
{title:'Спортивный репортаж',category:'Спорт',desc:'Скорость и эмоции соревнований',youtubeId:'kJp8uqLqJH4'},
{title:'Музыкальный клип',category:'Клипы',desc:'Визуальный образ под музыку артиста',youtubeId:'qsGBafyczrY'},
{title:'Рекламный ролик',category:'Реклама',desc:'Продающая картинка для бренда',youtubeId:'IQPIOjJdAnw'},
{title:'Репортаж',category:'Репортаж',desc:'Событие как оно есть, без пауз',youtubeId:'7PJZMFTMZgs'},
{title:'Интервью / подкаст',category:'Интервью',desc:'Чистый кадр и звук для разговора',youtubeId:'HbDZFQmOoJA'}];
const $=s=>document.querySelector(s),md=$('#md'),fr=$('#fr');
const mob=matchMedia('(max-width:767px)'),tab=matchMedia('(max-width:1024px)'),calm=matchMedia('(prefers-reduced-motion:reduce)');
const lite=navigator.connection&&(navigator.connection.saveData||/2g/.test(navigator.connection.effectiveType));
let last,live=[],paused=[];

$('#wg').innerHTML=W.map((w,i)=>`<button class="cd rv" style="--d:${(i%3)*.08}s" data-i="${i}" aria-label="${w.category}: смотреть ролик на весь экран"><div class="vb"><img src="https://i.ytimg.com/vi/${w.youtubeId}/hq720.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${w.youtubeId}/mqdefault.jpg'" alt="" loading="lazy"><div class="ifw"></div></div><div class="sh"></div><div class="cap"><b>${w.category}</b><span>${w.desc}</span></div><i class="pl"></i></button>`).join('');

// Фоновое видео: только в зоне видимости, число одновременных ограничено
const MAX=mob.matches?1:tab.matches?4:6;
function on(c){
  if(live.includes(c))return;
  if(live.length>=MAX)off(live[0]);
  const id=W[c.dataset.i].youtubeId,f=document.createElement('iframe');
  f.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&disablekb=1&modestbranding=1&iv_load_policy=3&fs=0`;
  f.tabIndex=-1;f.title='';f.setAttribute('aria-hidden','true');f.allow='autoplay; encrypted-media';
  f.onload=()=>setTimeout(()=>f.classList.add('on'),1400);
  c.querySelector('.ifw').appendChild(f);live.push(c);
}
function off(c){c.querySelector('.ifw').innerHTML='';live=live.filter(x=>x!==c)}
if(!calm.matches&&!lite){
  const vo=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){if(md.hidden)on(e.target);else paused.push(e.target)}
    else{off(e.target);paused=paused.filter(x=>x!==e.target)}
  }),{threshold:.55});
  document.querySelectorAll('#wg .cd').forEach(c=>vo.observe(c));
}

// Полноэкранный просмотр
document.addEventListener('click',e=>{
  const c=e.target.closest('.cd');
  if(c){
    last=c;paused=[...live];[...live].forEach(off);
    fr.src=`https://www.youtube.com/embed/${W[c.dataset.i].youtubeId}?autoplay=1&rel=0&playsinline=1`;
    md.hidden=false;requestAnimationFrame(()=>md.classList.add('on'));$('#mx').focus();
  }else if(e.target===md||e.target.closest('#mx'))close()
});
function close(){
  md.classList.remove('on');fr.src='';
  setTimeout(()=>{md.hidden=true;paused.forEach(on);paused=[]},300);
  last&&last.focus();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){md.hidden||close();menu(false)}});

// Меню и хедер
const hd=$('#hd'),nav=$('#nav'),bg=$('#bg'),ov=$('#ov');
function menu(o){nav.classList.toggle('on',o);ov.classList.toggle('on',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
bg.onclick=()=>menu(!nav.classList.contains('on'));
ov.onclick=()=>menu(false);
nav.onclick=e=>e.target.tagName==='A'&&menu(false);

// Параллакс фото hero: скролл + движение мыши
const hp=$('#hp');let mx=0,my=0,sy=0,tk=0;
const draw=()=>{tk=0;hp.style.transform=`translate3d(${mx*-16}px,${my*-12+sy*.22}px,0) scale(1.12)`};
const go=()=>{tk||(tk=requestAnimationFrame(draw))};
addEventListener('scroll',()=>{sy=Math.min(scrollY,innerHeight);hd.classList.toggle('s',scrollY>30);calm.matches||go()},{passive:true});
if(!calm.matches&&matchMedia('(pointer:fine)').matches)addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;go()},{passive:true});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
$('#yr').textContent=new Date().getFullYear();
