export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  color = "#22c55e",
  width = 1
) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color = "#f00"
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}
