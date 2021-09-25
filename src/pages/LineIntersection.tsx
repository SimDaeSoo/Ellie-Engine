import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { Line } from '../interfaces';
import { setRenderer } from '../utils';
import { drawLines, drawPoints } from '../utils/Graphics';
import { createLabel } from '../utils/Label';
import * as Collision from '../utils/Collision';

const LineIntersection = () => {
  useEffect(() => {
    // Render
    const app: PIXI.Application = setRenderer();
    const graphics = new PIXI.Graphics();
    const [quarterWidth, quarterHeight] = [
      Math.floor(window.innerWidth / 4),
      Math.floor(window.innerHeight / 4),
    ];

    // Lines
    const lineA: Line = [
      [quarterWidth, quarterHeight],
      [quarterWidth * 3, quarterHeight * 3],
    ];
    const lineB: Line = [
      [quarterWidth * 3, quarterHeight],
      [quarterWidth, quarterHeight * 3],
    ];

    // Draw Points
    const points = [...lineA, ...lineB];
    app.stage.addChild(graphics);

    for (const point of points) {
      const { container: pointContainer } = createLabel(`(${point})`);
      pointContainer.position.set(...point);
      app.stage.addChild(pointContainer);
    }

    graphics.clear();
    drawLines(graphics, [lineA, lineB], 1, 0x009900);
    drawPoints(graphics, points, 2);

    // Line Intersection
    const collisionDt: number = Collision.lineIntersection(lineA, lineB);
    const collisionPoint: [number, number] = [
      lineA[0][0] + (lineA[1][0] - lineA[0][0]) * collisionDt,
      lineA[0][1] + (lineA[1][1] - lineA[0][1]) * collisionDt,
    ];
    drawPoints(graphics, [collisionPoint], 4, 0x5500ff);

    const { container: pointContainer } = createLabel(
      `Intersection at (${collisionPoint[0].toFixed(
        2
      )},${collisionPoint[1].toFixed(2)})`
    );
    pointContainer.position.set(...collisionPoint);
    app.stage.addChild(pointContainer);
  }, []);

  return <></>;
};

export default LineIntersection;
