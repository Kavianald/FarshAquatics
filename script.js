// Utility: select
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// ===== Mobile Nav (off-canvas) =====
const nav = $('.nav');
const toggle = $('.nav-toggle');
const menu = $('#navMenu');
const scrim = $('.nav-scrim');

const setNav = (open) => {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle?.addEventListener('click', () => setNav(!nav.classList.contains('open')));
scrim?.addEventListener('click', () => setNav(false));
$$('[data-close]', menu).forEach(a => a.addEventListener('click', () => setNav(false)));

// ===== Smooth anchor offset (account for sticky header) =====
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#' || id === '#!') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerH = $('.site-header').offsetHeight || 72;
    const y = target.getBoundingClientRect().top + window.scrollY - (headerH + 10);
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
},{ threshold: 0.12 });

$$('.reveal').forEach(el => io.observe(el));

// ===== Footer year =====
$('#year').textContent = new Date().getFullYear();

// ===== Contact Modal =====
const modal = $('#contactModal');
const openBtns = $$('.contact-open');
const closeBtn = $('.modal-close', modal);
const scrimModal = $('.modal-scrim', modal);

function openModal(){
  modal.setAttribute('aria-hidden','false');
  // Lock scroll
  document.body.style.overflow = 'hidden';
  // focus close
  closeBtn?.focus();
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

openBtns.forEach(b=> b.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); }));
closeBtn?.addEventListener('click', closeModal);
scrimModal?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

// Copy to clipboard
$$('.copy', modal).forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const sel = btn.getAttribute('data-copy');
    const el = $(sel);
    if (!el) return;
    const text = el.textContent.trim();
    navigator.clipboard?.writeText(text).then(()=>{
      const original = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(()=> btn.textContent = original, 1100);
    });
  });
});
