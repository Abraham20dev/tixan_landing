//
// ===== 1. SIMPLE SCROLL REVEAL =====
//

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});


//
// ===== 2. MOBILE MENU (SIMPLE TOGGLE) =====
//

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}


//
// ===== 3. DOWNLOAD PAGE LOGIC (OPTIONAL, SAFE FALLBACK) =====
//

const isDownloadPage = window.location.pathname.includes('download');

if (isDownloadPage) {
  const info = document.getElementById('release-info');
  const button = document.getElementById('download-btn');

  // ← CHANGE THIS to your actual direct download URL
  const directUrl = 'https://github.com/Abraham20dev/tixan_landing/releases/latest/download/TIXAN.zip';

  if (button) {
    button.href = directUrl;
    button.textContent = "Download for Windows";
  }

  if (info) {
    // Optionally show a static version
    info.innerHTML = `<p>Version: <strong>latest</strong></p>`;
  }

  if (typeof gtag === "function") {
    button.addEventListener('click', () => {
      gtag('event', 'download_click', {
        event_category: 'engagement',
        event_label: 'tixan_windows'
      });
    });
  }
}
      })
      .catch(() => {
        info.innerHTML = "<p>Unable to load release info.</p>";
      });
  }
}
