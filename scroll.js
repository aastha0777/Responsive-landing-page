// Helper: Convert hex to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Helper: Interpolate between two colors
function interpolateColor(color1, color2, factor) {
  const result = {};
  result.r = Math.round(color1.r + factor * (color2.r - color1.r));
  result.g = Math.round(color1.g + factor * (color2.g - color1.g));
  result.b = Math.round(color1.b + factor * (color2.b - color1.b));
  return `rgb(${result.r}, ${result.g}, ${result.b})`;
}

// Color steps
const colorStops = [
  { id: 'home', color: '#00ff00' },   // Green
  { id: 'about', color: '#007bff' },  // Blue
  { id: 'services', color: '#facc15' }, // Yellow
  { id: 'contact', color: '#8B4513' }  // BROWN
];

// Scroll event
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 2;

  for (let i = 0; i < colorStops.length - 1; i++) {
    const currentSection = document.getElementById(colorStops[i].id);
    const nextSection = document.getElementById(colorStops[i + 1].id);
    const start = currentSection.offsetTop;
    const end = nextSection.offsetTop;

    if (scrollY >= start && scrollY < end) {
      const factor = (scrollY - start) / (end - start);
      const color1 = hexToRgb(colorStops[i].color);
      const color2 = hexToRgb(colorStops[i + 1].color);
      const interpolated = interpolateColor(color1, color2, factor);
      document.body.style.backgroundColor = interpolated;
      break;
    }
  }
});
