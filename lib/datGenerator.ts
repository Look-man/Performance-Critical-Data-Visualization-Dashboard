export type DataPoint = {
  x: number;
  y: number;
  timestamp: number;
  value?: number;
};


export function generateDataPoint(i: number): DataPoint {
  const x = i;
  const y =
    Math.sin(i / 100) * 50 +
    Math.random() * 10 +
    (Math.random() > 0.9 ? Math.random() * 80 : 0);

  return { x, y, timestamp: Date.now(), value: y };
}
