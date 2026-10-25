import '@testing-library/jest-dom';

// Mock matchMedia for testing responsive & reduced-motion hooks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? false : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver
(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLCanvasElement.getContext for 2D/WebGL testing
HTMLCanvasElement.prototype.getContext = function (contextType: string) {
  if (contextType === '2d') {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (_x: number, _y: number, w: number, h: number) => ({
        data: new Uint8ClampedArray(w * h * 4),
      }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      fill: () => {},
      arc: () => {},
      createRadialGradient: () => ({
        addColorStop: () => {},
      }),
      createLinearGradient: () => ({
        addColorStop: () => {},
      }),
    } as unknown as CanvasRenderingContext2D;
  }
  return null;
} as any;
