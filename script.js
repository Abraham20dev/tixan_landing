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

  const repo = 'Abraham20dev/tixan_landing';
  const url = `https://api.github.com/repos/${repo}/releases/latest`;

  if (info && button) {
    fetch(url)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) {
          info.innerHTML = "<p>Latest version unavailable.</p>";
          return;
        }

        const asset = data.assets?.find(a => a.name.endsWith('.zip'));

        if (!asset) {
          info.innerHTML = "<p>No downloadable file found.</p>";
          return;
        }

        const version = data.tag_name?.replace('v', '') || "latest";

        info.innerHTML = `
          <p>Version: <strong>v${version}</strong></p>
        `;

        button.href = asset.browser_download_url;
        button.textContent = "Download for Windows";

        //
        // Optional tracking (only if gtag exists)
        //
        if (typeof gtag === "function") {
          button.addEventListener('click', () => {
            gtag('event', 'download_click', {
              event_category: 'engagement',
              event_label: 'tixan_windows'
            });
          });
        }
      })
      .catch(() => {
        info.innerHTML = "<p>Unable to load release info.</p>";
      });
  }
}
