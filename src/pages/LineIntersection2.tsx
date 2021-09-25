import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import { SAMPLE_POLYGON } from '../constants';
import { Line } from '../interfaces';
import { setRenderer, setUpdater } from '../utils';
import { drawLines, drawPoints } from '../utils/Graphics';
import { createLabel } from '../utils/Label';
import * as Collision from '../utils/Collision';

const onTouch = (e: any) => {
  const [x, y] = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  callback(x, y);
};

const onClick = (e: any) => {
  const [x, y] = [e.clientX, e.clientY];
  callback(x, y);
};

let callback: (x: number, y: number) => void;

const LineIntersection2 = () => {
  useEffect(() => {
    // Sample Polygon
    let dirty = true;
    const [width, height] = [window.innerWidth, window.innerHeight];
    const scale = width < height ? height : width;
    const polygonLines: Array<Line> = [];
    const polygon: Array<[number, number]> = SAMPLE_POLYGON.map(([x, y]) => [
      x * ((scale / 2000) * 900) + width / 2 - (scale / 2000) * 450,
      y * ((scale / 2000) * 900) + height / 2 - (scale / 2000) * 500,
    ]);

    for (let i = 0; i < polygon.length - 1; i++) {
      polygonLines.push([polygon[i], polygon[i + 1]]);
    }

    // Render
    const app: PIXI.Application = setRenderer();
    const graphics = new PIXI.Graphics();
    const { container: labelContainer } = createLabel('Click to move line');
    labelContainer.x = Math.round(
      window.innerWidth / 2 - labelContainer.width / 2
    );
    labelContainer.y = 60;

    app.stage.addChild(graphics);

    // movable line
    const movableLine: Line = [
      [Math.round(width / 2), Math.round(height / 2)],
      [width, Math.round(height / 2)],
    ];
    const { container: beginContainer } = createLabel(`(${movableLine[0]})`);
    const { container: endContainer } = createLabel(`(${movableLine[1]})`);
    app.stage.addChild(beginContainer);
    app.stage.addChild(endContainer);
    app.stage.addChild(labelContainer);

    // Event Listener
    window.removeEventListener('touchstart', onTouch);
    window.removeEventListener('click', onClick);
    window.addEventListener('touchstart', onTouch);
    window.addEventListener('click', onClick);
    callback = (x, y) => {
      movableLine[1][0] = x;
      movableLine[1][1] = y;
      dirty = true;
    };

    setUpdater(() => {
      if (!dirty) return;
      const collisionPoints: Array<[number, number]> = [];

      // Line Intersection
      for (const line of polygonLines) {
        const collisionDt = Collision.lineIntersection(movableLine, line);
        if (collisionDt >= 0 && collisionDt <= 1) {
          collisionPoints.push([
            movableLine[0][0] +
              (movableLine[1][0] - movableLine[0][0]) * collisionDt,
            movableLine[0][1] +
              (movableLine[1][1] - movableLine[0][1]) * collisionDt,
          ]);
        }
      }

      graphics.clear();
      drawLines(graphics, polygonLines, {
        width: 2,
        color: 0x555555,
        cap: PIXI.LINE_CAP.ROUND,
      });
      drawLines(graphics, [movableLine], {
        width: 1,
        color: 0x009900,
      });
      drawPoints(graphics, movableLine, 1, 0xff0000);
      drawPoints(graphics, collisionPoints, 3, 0xffaa66);

      beginContainer.position.set(...movableLine[0]);
      endContainer.position.set(...movableLine[1]);

      dirty = false;
    });
  }, []);

  return <></>;
};

export default LineIntersection2;
