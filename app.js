const ranking=[
 ['01','Void Emperor','184','Fantasy','rgba(25,164,255,.45)'],['02','One Piece','1194','Action','rgba(255,88,70,.42)'],['03','Cyber Requiem','76','Sci-Fi','rgba(179,62,255,.45)'],['04','Magic Emperor','914','Fantasy','rgba(255,119,34,.45)'],['05','Return of the Devourer','50','Isekai','rgba(28,230,202,.4)']
];
const comics=[
 ['Cyber Requiem','Sci-Fi · Action','action','fantasy','#792cff','#071c42','4.9'],['Void Emperor','Fantasy · Action','fantasy','action','#0b91ff','#061126','4.9'],['Return of the Devourer','Isekai · Fantasy','isekai','fantasy','#00c6a8','#06231e','4.8'],['Love Algorithm','Romance · Comedy','romance','comedy','#ff4fa3','#31122e','4.7'],['Iron Fist Reborn','Martial Arts · Action','martial','action','#ff9d38','#301508','4.8'],['Moonlit Academy','Fantasy · Romance','romance','fantasy','#7a67ff','#171333','4.8'],['Level 99 Intern','Comedy · Isekai','comedy','isekai','#f1d63e','#2b2507','4.6'],['Last Star Hunter','Action · Sci-Fi','action','fantasy','#27b7ff','#061b2c','4.9']
];
const updates=[['Noble Lady Reformation Guide','44','16 menit lalu','#a88bff'],['Academy’s Genius Swordmaster','156','46 menit lalu','#35c8ff'],['Momose Akira no Hatsukoi','81','46 menit lalu','#ff5d9d'],['The Genius Midfielder’s Pass','73','1 jam lalu','#54e5a9'],['Juvenile Prison','118','9 jam lalu','#ff9d42'],['Healing With Drubly','30','9 jam lalu','#4e8cff']];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function renderRanking(){ $('#rankingGrid').innerHTML=ranking.map((r,i)=>`<article class="rank-card reveal"><div class="rank-art" style="--c1:${r[4]}"><span class="rank-number">${r[0]}</span><span class="rank-trend">↗ ${i+4}%</span></div><div class="rank-copy"><h3>${r[1]}</h3><p>Chapter ${r[2]} · ${r[3]}</p><span class="rank-tag">Read now →</span></div></article>`).join('') }
function renderDiscover(filter='all'){const arr=comics.filter(c=>filter==='all'||c.includes(filter));$('#discoverGrid').innerHTML=arr.map(c=>`<article class="comic-card reveal"><div class="comic-cover" style="--a:${c[4]};--b:${c[5]}"><span>${c[0]}</span></div><div class="comic-meta"><h3>${c[0]}</h3><p>${c[1]}</p><div class="comic-footer"><span class="rating">★ ${c[6]}</span><button class="bookmark">♡</button></div></div></article>`).join('');observe()}
function renderUpdates(){$('#updatesList').innerHTML=updates.map(u=>`<article class="update-item reveal" style="--x:${u[3]}"><div class="update-thumb"></div><div><h3>${u[0]}</h3><p>Chapter ${u[1]} · ${u[2]}</p></div><span class="chapter">READ</span></article>`).join('');observe()}
function observe(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});$$('.reveal').forEach(x=>io.observe(x))}
renderRanking();renderDiscover();renderUpdates();observe();
window.addEventListener('scroll',()=>$('#topbar').classList.toggle('scrolled',scrollY>25));
window.addEventListener('mousemove',e=>{$('#cursorGlow').style.left=e.clientX+'px';$('#cursorGlow').style.top=e.clientY+'px'});
$$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderDiscover(b.dataset.filter)});
function openModal(id){$(id).classList.add('open')}function closeModal(m){m.classList.remove('open')}
$('#searchBtn').onclick=()=>openModal('#searchModal');$('#mobileSearch').onclick=()=>openModal('#searchModal');
$$('.modal-close').forEach(b=>b.onclick=()=>closeModal(b.closest('.modal')));$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)closeModal(m)});
$('#heroRead').onclick=()=>openReader('Void Emperor');$$('.continue-btn').forEach(b=>b.onclick=()=>openReader(b.dataset.reader));
function openReader(t){$('#readerTitle').textContent=t;openModal('#readerModal')}
$('#tourBtn').onclick=()=>$('#tour').classList.add('open');$('#tourClose').onclick=()=>$('#tour').classList.remove('open');
$('#joinBtn').onclick=()=>toast('Welcome to NecroToon','Account demo siap digunakan.');$('#profileBtn').onclick=()=>toast('Guest profile','Login & sync akan tersedia di versi production.');$('#mobileProfile').onclick=()=>toast('Profile','Personal library, history, dan settings.');
$$('.heart,.bookmark').forEach(b=>b.onclick=()=>{b.textContent=b.textContent==='♡'?'♥':'♡';toast('Library updated','Judul disimpan ke favorit lokal.')});
$('#themeBtn').onclick=()=>{document.body.classList.toggle('light');toast('Theme','Mode visual diubah.')};
$('#searchInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())toast('Search',`Mencari “${e.target.value.trim()}”...`);if(e.key==='Escape')closeModal($('#searchModal'))});
$$('.search-hints button').forEach(b=>b.onclick=()=>{$('#searchInput').value=b.textContent;$('#searchInput').focus()});
function toast(title,text){$('#toastTitle').textContent=title;$('#toastText').textContent=text;$('#toast').classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>$('#toast').classList.remove('show'),2800)}
setTimeout(()=>toast('NecroToon online','Selamat datang di experience baru.'),1200);
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openModal('#searchModal')}if(e.key==='Escape'){$$('.modal.open').forEach(m=>closeModal(m));$('#tour').classList.remove('open')}});
