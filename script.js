// Fade‑in elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// Fetch latest release from GitHub (runs only on download page)
if (window.location.pathname.includes('download')) {
  const repo = 'Abraham20dev/tixan_landing';  // your GitHub Pages repo
  const releaseUrl = `https://api.github.com/repos/${repo}/releases/latest`;
  const infoContainer = document.getElementById('release-info');
  const downloadBtn = document.getElementById('download-btn');

  if (infoContainer && downloadBtn) {
    fetch(releaseUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch release');
        return res.json();
      })
      .then(data => {
        const version = data.tag_name.replace('v', '');
        const releaseDate = new Date(data.published_at).toLocaleDateString();

        // Look for .exe first, then .zip
        let asset = data.assets.find(a => a.name.endsWith('.exe'));
        if (!asset) {
          asset = data.assets.find(a => a.name.endsWith('.zip'));
        }

        if (asset) {
          const sizeMB = (asset.size / (1024 * 1024)).toFixed(1);
          infoContainer.innerHTML = `
            <p>Latest version: <span>v${version}</span></p>
            <p>Released: <span>${releaseDate}</span></p>
            <p>Size: <span>${sizeMB} MB</span></p>
          `;
          downloadBtn.href = asset.browser_download_url;
          downloadBtn.textContent = 'Download for Windows';

          // Track download click
          downloadBtn.addEventListener('click', () => {
            gtag('event', 'download', {
              'event_category': 'engagement',
              'event_label': 'FORGE_Windows_Setup',
              'value': 1
            });
          });
        } else {
          infoContainer.innerHTML = `<p>No installer found in the latest release. Please check the <a href="https://github.com/${repo}/releases" target="_blank">releases page</a>.</p>`;
        }
      })
      .catch(err => {
        infoContainer.innerHTML = `<p>Could not load release info. Please check back later.</p>`;
        console.error(err);
      });
  }
}
