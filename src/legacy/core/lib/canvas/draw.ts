import { ICoordinates } from '../types';

export function drawLine(
  canvas: CanvasRenderingContext2D,
  begin: ICoordinates,
  end: ICoordinates,
  lineWidth = 4,
  color = 'green'
) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = lineWidth;
  canvas.strokeStyle = color;
  canvas.stroke();
}

export function drawRect(
  ctx: CanvasRenderingContext2D,
  topLeft: ICoordinates,
  topRight: ICoordinates,
  bottomRight: ICoordinates,
  bottomLeft: ICoordinates
) {
  drawLine(ctx, topLeft, topRight);
  drawLine(ctx, topRight, bottomRight);
  drawLine(ctx, bottomRight, bottomLeft);
  drawLine(ctx, bottomLeft, topLeft);
}
