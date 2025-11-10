export const measureFPS = (cb: (fps: number) => void) => {
  let last = performance.now();
  let frames = 0;
  const loop = (now: number) => {
    frames++;
    if (now - last >= 1000) {
      cb(frames);
      frames = 0;
      last = now;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};

export const measureExecutionTime = async (label: string, fn: () => void) => {
  const start = performance.now();
  await fn();
  const duration = performance.now() - start;
  console.log(`${label}: ${duration.toFixed(2)}ms`);
};
