import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

function createOffscreenCanvas(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }
  return { canvas, ctx };
}

/**
 * Procedural Sun: Golden core with turbulent granules and limb darkening
 */
export function getSunTexture(): THREE.CanvasTexture {
  if (textureCache.has('sun')) return textureCache.get('sun')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  // Base solar plasma gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f59e0b');
  grad.addColorStop(0.3, '#fbbf24');
  grad.addColorStop(0.5, '#fef08a');
  grad.addColorStop(0.7, '#fbbf24');
  grad.addColorStop(1, '#ea580c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Convective granules and magnetic storms
  const imgData = ctx.getImageData(0, 0, 1024, 512);
  const data = imgData.data;

  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 1024; x++) {
      const idx = (y * 1024 + x) * 4;
      // Multi-frequency noise approximation
      const n1 = Math.sin(x * 0.04) * Math.cos(y * 0.04);
      const n2 = Math.sin(x * 0.12 + n1 * 2) * Math.cos(y * 0.12);
      const n3 = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 0.5;
      const noise = (n1 + n2 + n3) * 25;

      data[idx] = Math.min(255, Math.max(0, data[idx] + noise * 1.2)); // R
      data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + noise * 0.8)); // G
      data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + noise * 0.2)); // B
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Add sunspots
  ctx.fillStyle = 'rgba(120, 53, 15, 0.75)';
  const spots = [
    { x: 300, y: 220, r: 18 },
    { x: 330, y: 235, r: 10 },
    { x: 720, y: 300, r: 24 },
    { x: 750, y: 310, r: 14 },
    { x: 550, y: 190, r: 12 },
  ];
  for (const s of spots) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(69, 26, 3, 0.9)';
    ctx.arc(s.x, s.y, s.r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('sun', texture);
  return texture;
}

/**
 * Procedural Mercury: Heavily cratered basalt highlands and impact rays
 */
export function getMercuryTexture(): THREE.CanvasTexture {
  if (textureCache.has('mercury')) return textureCache.get('mercury')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  // Gray rocky base
  ctx.fillStyle = '#6b7280';
  ctx.fillRect(0, 0, 1024, 512);

  // Mottled terrain
  const imgData = ctx.getImageData(0, 0, 1024, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 45;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // Craters with shadows and bright rims
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const r = Math.random() * 22 + 4;

    ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)';
    ctx.lineWidth = Math.max(1, r * 0.15);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('mercury', texture);
  return texture;
}

/**
 * Procedural Venus: Opaque swirling sulfuric acid clouds
 */
export function getVenusTexture(): THREE.CanvasTexture {
  if (textureCache.has('venus')) return textureCache.get('venus')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#fef3c7');
  grad.addColorStop(0.2, '#fde68a');
  grad.addColorStop(0.5, '#f59e0b');
  grad.addColorStop(0.8, '#d97706');
  grad.addColorStop(1, '#b45309');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Swirling chevron wind bands
  ctx.fillStyle = 'rgba(254, 243, 199, 0.3)';
  for (let y = 30; y < 480; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 30) {
      const cy = y + Math.sin(x * 0.02 + y * 0.05) * 18 + Math.cos(x * 0.008) * 10;
      ctx.lineTo(x, cy);
    }
    ctx.lineTo(1024, y + 25);
    ctx.lineTo(0, y + 25);
    ctx.closePath();
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('venus', texture);
  return texture;
}

/**
 * Procedural Earth: Oceans, recognizable continents, polar caps, and cloud swirl overlay
 */
export function getEarthTexture(): THREE.CanvasTexture {
  if (textureCache.has('earth')) return textureCache.get('earth')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  // Deep ocean
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
  oceanGrad.addColorStop(0, '#0c4a6e');
  oceanGrad.addColorStop(0.5, '#0284c7');
  oceanGrad.addColorStop(1, '#0c4a6e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Polar Ice Caps
  ctx.fillStyle = '#f8fafc';
  // North Pole
  ctx.beginPath();
  ctx.ellipse(512, 18, 512, 35, 0, 0, Math.PI * 2);
  ctx.fill();
  // Antarctica
  ctx.beginPath();
  ctx.ellipse(512, 495, 512, 40, 0, 0, Math.PI * 2);
  ctx.fill();

  // Continental landmasses (Eurasia, Africa, Americas, Australia)
  ctx.fillStyle = '#15803d'; // Vegetation green
  const continents = [
    // North America
    { x: 180, y: 150, rx: 90, ry: 60, col: '#16a34a' },
    // South America
    { x: 260, y: 330, rx: 60, ry: 90, col: '#15803d' },
    // Eurasia
    { x: 620, y: 140, rx: 180, ry: 75, col: '#16a34a' },
    // Africa & Sahara desert
    { x: 520, y: 270, rx: 75, ry: 90, col: '#ca8a04' },
    // Australia
    { x: 840, y: 360, rx: 55, ry: 40, col: '#d97706' },
  ];

  for (const c of continents) {
    ctx.fillStyle = c.col;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Terrain variations
    ctx.fillStyle = 'rgba(202, 138, 4, 0.45)';
    ctx.beginPath();
    ctx.ellipse(c.x + 10, c.y + 5, c.rx * 0.6, c.ry * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cloud layers
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 1024;
    const y = 80 + Math.random() * 350;
    const w = 60 + Math.random() * 140;
    const h = 15 + Math.random() * 30;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.sin(x * 0.01) * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('earth', texture);
  return texture;
}

/**
 * Procedural Moon: Basaltic Maria and crater highlands
 */
export function getMoonTexture(): THREE.CanvasTexture {
  if (textureCache.has('moon')) return textureCache.get('moon')!;

  const { canvas, ctx } = createOffscreenCanvas(512, 256);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, 0, 512, 256);

  // Dark Lunar Maria (basaltic plains)
  ctx.fillStyle = '#475569';
  const maria = [
    { x: 180, y: 90, rx: 50, ry: 40 },
    { x: 270, y: 110, rx: 60, ry: 45 },
    { x: 130, y: 140, rx: 40, ry: 35 },
    { x: 380, y: 90, rx: 35, ry: 30 },
  ];
  for (const m of maria) {
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Craters
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = Math.random() * 12 + 2;

    ctx.strokeStyle = 'rgba(241, 245, 249, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('moon', texture);
  return texture;
}

/**
 * Procedural Mars: Iron oxide red, dark volcanic shields, and polar ice
 */
export function getMarsTexture(): THREE.CanvasTexture {
  if (textureCache.has('mars')) return textureCache.get('mars')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  // Martian rust red base
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#ea580c');
  grad.addColorStop(0.5, '#c2410c');
  grad.addColorStop(1, '#9a3412');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Dark basaltic plains (Syrtis Major, Sinus Sabaeus)
  ctx.fillStyle = 'rgba(67, 20, 7, 0.5)';
  ctx.beginPath();
  ctx.ellipse(650, 240, 120, 80, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(320, 280, 90, 60, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Valles Marineris canyon slash
  ctx.strokeStyle = 'rgba(40, 12, 4, 0.7)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(350, 260);
  ctx.bezierCurveTo(450, 270, 520, 250, 580, 265);
  ctx.stroke();

  // Polar Ice Caps (dry ice + water ice)
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(512, 15, 220, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(512, 498, 160, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('mars', texture);
  return texture;
}

/**
 * Procedural Jupiter: Zonal jet stream bands and the Great Red Spot
 */
export function getJupiterTexture(): THREE.CanvasTexture {
  if (textureCache.has('jupiter')) return textureCache.get('jupiter')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  // Alternating chromatic atmospheric bands
  const bands = [
    { y: 0, h: 45, col: '#78350f' },
    { y: 45, h: 35, col: '#d97706' },
    { y: 80, h: 55, col: '#fef3c7' }, // North Tropical Zone
    { y: 135, h: 60, col: '#9a3412' }, // North Equatorial Belt
    { y: 195, h: 40, col: '#fed7aa' }, // Equatorial Zone
    { y: 235, h: 65, col: '#7c2d12' }, // South Equatorial Belt
    { y: 300, h: 45, col: '#ffedd5' }, // South Tropical Zone
    { y: 345, h: 50, col: '#b45309' }, // South Temperate Belt
    { y: 395, h: 55, col: '#fde68a' },
    { y: 450, h: 62, col: '#78350f' },
  ];

  for (const b of bands) {
    ctx.fillStyle = b.col;
    ctx.fillRect(0, b.y, 1024, b.h);
  }

  // Turbulence wave disturbances
  for (let y = 10; y < 500; y += 15) {
    ctx.fillStyle = (y % 30 === 0) ? 'rgba(255, 255, 255, 0.22)' : 'rgba(80, 20, 5, 0.22)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 20) {
      const cy = y + Math.sin(x * 0.03 + y * 0.1) * 6;
      ctx.lineTo(x, cy);
    }
    ctx.lineTo(1024, y + 10);
    ctx.lineTo(0, y + 10);
    ctx.closePath();
    ctx.fill();
  }

  // The Great Red Spot (in the South Tropical Zone ~ y = 290)
  ctx.save();
  ctx.translate(620, 280);
  ctx.fillStyle = '#b91c1c'; // Deep crimson
  ctx.beginPath();
  ctx.ellipse(0, 0, 50, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spiral swirl inside the storm
  ctx.strokeStyle = '#fca5a5';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, 36, 18, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('jupiter', texture);
  return texture;
}

/**
 * Procedural Saturn: Subtle butterscotch bands
 */
export function getSaturnTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn')) return textureCache.get('saturn')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#ca8a04');
  grad.addColorStop(0.2, '#eab308');
  grad.addColorStop(0.35, '#fef08a');
  grad.addColorStop(0.5, '#fef9c3');
  grad.addColorStop(0.65, '#fde047');
  grad.addColorStop(0.85, '#ca8a04');
  grad.addColorStop(1, '#a16207');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle latitudinal haze
  ctx.fillStyle = 'rgba(161, 98, 7, 0.15)';
  for (let y = 0; y < 512; y += 12) {
    ctx.fillRect(0, y, 1024, 5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('saturn', texture);
  return texture;
}

/**
 * Procedural Saturn Rings: Concentric rings with Cassini division and alpha channel
 */
export function getSaturnRingsTexture(): THREE.CanvasTexture {
  if (textureCache.has('saturn-rings')) return textureCache.get('saturn-rings')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 64);

  // Clear to full transparency
  ctx.clearRect(0, 0, 1024, 64);

  // Horizontal gradient mapped radially: x=0 is inner ring, x=1024 is outer ring
  const imgData = ctx.createImageData(1024, 64);
  const data = imgData.data;

  for (let x = 0; x < 1024; x++) {
    const norm = x / 1024; // 0 to 1
    let alpha = 0;
    let r = 210, g = 195, b = 165;

    // Inner C ring (semi-transparent)
    if (norm > 0.05 && norm < 0.28) {
      alpha = 0.35 + Math.sin(norm * 80) * 0.15;
    }
    // Main B ring (brightest, densest)
    else if (norm >= 0.28 && norm < 0.65) {
      alpha = 0.88 + Math.sin(norm * 140) * 0.1;
      r = 235; g = 220; b = 190;
    }
    // Cassini Division (dark gap)
    else if (norm >= 0.65 && norm < 0.72) {
      alpha = 0.03; // Nearly transparent
    }
    // A ring
    else if (norm >= 0.72 && norm < 0.95) {
      // Encke gap around 0.88
      if (norm >= 0.875 && norm <= 0.89) {
        alpha = 0.05;
      } else {
        alpha = 0.7 + Math.sin(norm * 120) * 0.15;
      }
    }

    const aVal = Math.floor(Math.max(0, Math.min(1, alpha)) * 255);
    for (let y = 0; y < 64; y++) {
      const idx = (y * 1024 + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = aVal;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set('saturn-rings', texture);
  return texture;
}

/**
 * Procedural Uranus: Cyan / aquamarine ice giant
 */
export function getUranusTexture(): THREE.CanvasTexture {
  if (textureCache.has('uranus')) return textureCache.get('uranus')!;

  const { canvas, ctx } = createOffscreenCanvas(512, 256);
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#22d3ee');
  grad.addColorStop(0.3, '#06b6d4');
  grad.addColorStop(0.7, '#0891b2');
  grad.addColorStop(1, '#0e7490');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Very subtle high altitude cloud bands
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  for (let y = 40; y < 220; y += 25) {
    ctx.fillRect(0, y, 512, 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('uranus', texture);
  return texture;
}

/**
 * Procedural Neptune: Vivid azure blue, supersonic dark spot, and methane cirrus clouds
 */
export function getNeptuneTexture(): THREE.CanvasTexture {
  if (textureCache.has('neptune')) return textureCache.get('neptune')!;

  const { canvas, ctx } = createOffscreenCanvas(1024, 512);
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#1d4ed8');
  grad.addColorStop(0.25, '#2563eb');
  grad.addColorStop(0.5, '#3b82f6');
  grad.addColorStop(0.75, '#1e40af');
  grad.addColorStop(1, '#1e3a8a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Great Dark Spot (cyclonic storm)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
  ctx.beginPath();
  ctx.ellipse(420, 230, 60, 35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bright white high-altitude methane cirrus clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 1024;
    const y = 140 + Math.random() * 220;
    ctx.beginPath();
    ctx.ellipse(x, y, 40 + Math.random() * 50, 4 + Math.random() * 4, 0.05, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('neptune', texture);
  return texture;
}

/**
 * Procedural Pluto: Reddish tholins and bright heart-shaped Tombaugh Regio
 */
export function getPlutoTexture(): THREE.CanvasTexture {
  if (textureCache.has('pluto')) return textureCache.get('pluto')!;

  const { canvas, ctx } = createOffscreenCanvas(512, 256);
  // Mottled caramel/brown base
  ctx.fillStyle = '#b45309';
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = '#78350f';
  ctx.fillRect(0, 150, 512, 50);

  // Tombaugh Regio (Heart-shaped nitrogen ice plain)
  ctx.save();
  ctx.translate(260, 130);
  ctx.fillStyle = '#fef3c7'; // Creamy ice
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-25, -25, -50, 10, 0, 45);
  ctx.bezierCurveTo(50, 10, 25, -25, 0, 0);
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  textureCache.set('pluto', texture);
  return texture;
}

/**
 * Helper to get texture by planet key
 */
export function getTextureByType(type: string): THREE.CanvasTexture {
  switch (type) {
    case 'sun':
      return getSunTexture();
    case 'mercury':
      return getMercuryTexture();
    case 'venus':
      return getVenusTexture();
    case 'earth':
      return getEarthTexture();
    case 'moon':
      return getMoonTexture();
    case 'mars':
      return getMarsTexture();
    case 'jupiter':
      return getJupiterTexture();
    case 'saturn':
      return getSaturnTexture();
    case 'uranus':
      return getUranusTexture();
    case 'neptune':
      return getNeptuneTexture();
    case 'pluto':
      return getPlutoTexture();
    default:
      return getMercuryTexture();
  }
}
