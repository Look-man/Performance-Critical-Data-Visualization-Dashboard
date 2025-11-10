// Extend the built-in Performance interface to support Chrome's memory API

interface PerformanceMemory {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

interface Performance {
  memory?: PerformanceMemory;
}
