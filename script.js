// ===== 1. SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ===== 2. MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => nav.classList.toggle('show'));
}


// ===== 3. DOWNLOAD BUTTON (STATIC, NO API) =====
document.addEventListener('DOMContentLoaded', function () {
  const isDownloadPage = window.location.pathname.includes('download');
  if (!isDownloadPage) return;

  const button = document.getElementById('download-btn');
  if (!button) {
    console.error('Download button not found – check ID');
    return;
  }

  //  Direct link to the .zip file on GitHub
  const directUrl = 'https://github.com/Abraham20dev/tixan_landing/releases/latest/download/TIXAN.zip';

  button.href = directUrl;
  button.textContent = 'Download for Windows';

  // Optional Google Analytics tracking (safe if gtag doesn't exist)
  if (typeof gtag === 'function') {
    button.addEventListener('click', () => {
      gtag('event', 'download_click', {
        event_category: 'engagement',
        event_label: 'tixan_windows'
      });
    });
  }

  // Show version info if the element exists
  const info = document.getElementById('release-info');
  if (info) {
    info.innerHTML = `<p>Version: <strong>latest</strong></p>`;
  }
});
