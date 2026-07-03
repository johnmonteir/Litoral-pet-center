// Redireciona para o app do Google no celular ao clicar em "Avaliar no Google"
const googleBtn = document.querySelector('.google-btn');
if (googleBtn) {
  googleBtn.addEventListener('click', function (e) {
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = 'https://search.google.com/local/writereview?placeid=ChIJ-bArM43NwAcRCaSbEYZg9Fc';
    }
  });
}

// Observação: o botão flutuante de WhatsApp já existe no HTML (.float-whatsapp).
// Antes, este script criava um segundo botão idêntico via JS, o que fazia dois
// ícones de WhatsApp aparecerem sobrepostos no canto da tela. Removido.

// Rolagem suave para links internos (#) e fechamento do menu mobile ao navegar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
  });
});

// Menu mobile (hamburger)
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function closeMobileMenu() {
  if (!navMenu || !navToggle) return;
  navMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Ano atual no rodapé
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Indicador de "Aberto agora" / "Fechado agora" com base no horário de Caucaia - CE
// Segunda: 13h30-17h30 | Terça a Sábado: 08h30-17h30 | Domingo: fechado
function updateOpenStatus() {
  const statusEl = document.getElementById('openStatus');
  if (!statusEl) return;

  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Fortaleza' })
  );
  const day = now.getDay(); // 0 = domingo ... 6 = sábado
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  let isOpen = false;
  if (day === 0) {
    isOpen = false;
  } else if (day === 1) {
    isOpen = minutesNow >= 13 * 60 + 30 && minutesNow <= 17 * 60 + 30;
  } else {
    isOpen = minutesNow >= 8 * 60 + 30 && minutesNow <= 17 * 60 + 30;
  }

  statusEl.textContent = isOpen ? '🟢 Aberto agora' : '🔴 Fechado agora';
  statusEl.classList.toggle('is-open', isOpen);
  statusEl.classList.toggle('is-closed', !isOpen);
}

updateOpenStatus();
setInterval(updateOpenStatus, 60000);

// Anima os cards suavemente conforme entram na tela ao rolar a página
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
