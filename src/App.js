const palette = {
  primary: "#D8D09F",
  accent: "#A51C30",
  recycled: "#4CAF50",
  muted: "#6B6B6B",
  soft: "#F7F5EE",
  frame: "#F0E9D6"
};

function hexToRgba(hex, alpha = 1) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyPalette(p) {
  const root = document.documentElement.style;
  root.setProperty('--color-primary', p.primary);
  root.setProperty('--color-accent', p.accent);
  root.setProperty('--color-recycled', p.recycled);
  root.setProperty('--color-muted', p.muted);
  root.setProperty('--color-bg', p.soft);
  root.setProperty('--color-frame', p.frame);
  const g = `radial-gradient(circle at 10% 10%, ${hexToRgba(p.primary, 0.30)}, ${hexToRgba(p.accent, 0.04)} 40%, ${hexToRgba(p.recycled, 0.02)} 100%), ${p.soft}`;
  root.setProperty('--bg-gradient', g);
  root.setProperty('--bg', 'var(--bg-gradient)');
}

function renderSwatches(p) {
  const paletteNode = document.getElementById('palette');
  const keys = Object.keys(p);
  keys.forEach(key => {
    const sw = document.createElement('div');
    sw.className = 'swatch';
    sw.innerHTML = `
      <div class="box" style="background:${p[key]};"></div>
      <div class="label"><strong>${key}</strong> <span style="float:right;font-family:monospace">${p[key]}</span></div>
    `;
    paletteNode.appendChild(sw);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyPalette(palette);
  renderSwatches(palette);
  document.getElementById('primaryBtn').addEventListener('click', () => {
    alert('Thanks for choosing to sell/donate — this is a UI demo action.');
  });
});
