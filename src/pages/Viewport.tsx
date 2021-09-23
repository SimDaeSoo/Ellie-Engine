import * as PIXI from 'pixi.js';
import seedrandom from 'seedrandom';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { peakBufferBit } from '../utils/buffer';
import { nextStep } from '../utils/cave';

const viewportSize = {
  width: Math.ceil(window.innerWidth / 3),
  height: Math.ceil(window.innerHeight / 3),
};
const position = { x: 0, y: 0 };
const vector = { x: 0, y: 0 };
const targetPosition = { x: 0, y: 0 };

const onTouch = (e: any) => {
  const currentX = Math.round(position.x + viewportSize.width / 2);
  const currentY = Math.round(position.y + viewportSize.height / 2);
  vector.x =
    Math.cos(
      Math.atan2(
        e.targetTouches[0].clientY - currentY,
        e.targetTouches[0].clientX - currentX
      )
    ) * 2;
  vector.y =
    Math.sin(
      Math.atan2(
        e.targetTouches[0].clientY - currentY,
        e.targetTouches[0].clientX - currentX
      )
    ) * 2;

  targetPosition.x = e.targetTouches[0].clientX;
  targetPosition.y = e.targetTouches[0].clientY;
};

const onClick = (e: any) => {
  const currentX = Math.round(position.x + viewportSize.width / 2);
  const currentY = Math.round(position.y + viewportSize.height / 2);
  vector.x =
    Math.cos(Math.atan2(e.clientY - currentY, e.clientX - currentX)) * 2;
  vector.y =
    Math.sin(Math.atan2(e.clientY - currentY, e.clientX - currentX)) * 2;

  targetPosition.x = e.clientX;
  targetPosition.y = e.clientY;
};

const ViewPort = () => {
  useEffect(() => {
    (async () => {
      // Buffer Tile Map Generate
      const seed = Math.random().toFixed(4);
      const randomGenerate = seedrandom(seed);
      const TILE_SIZE = 8;
      const width = Math.ceil(window.innerWidth / TILE_SIZE);
      const height = Math.ceil(window.innerHeight / TILE_SIZE);
      const buffer = new ArrayBuffer(Math.ceil(width / 8) * height);

      for (let i = 0; i < Math.ceil(width / 8) * height; i++) {
        const view = new Uint8Array(buffer, i, 1);
        view[0] = Math.floor(randomGenerate() * 256);
      }

      // Cave Generate
      nextStep(buffer, width, height, { birthLimit: 5, deathLimit: 3 });
      nextStep(buffer, width, height, { birthLimit: 5, deathLimit: 3 });
      nextStep(buffer, width, height, { birthLimit: 5, deathLimit: 3 });
      nextStep(buffer, width, height, { birthLimit: 5, deathLimit: 4 });
      nextStep(buffer, width, height, { birthLimit: 5, deathLimit: 4 });
      nextStep(buffer, width, height, { birthLimit: 5, deathLimit: 4 });
      nextStep(buffer, width, height, { birthLimit: 4, deathLimit: 4 });
      nextStep(buffer, width, height, { birthLimit: 4, deathLimit: 4 });
      nextStep(buffer, width, height, { birthLimit: 4, deathLimit: 4 });

      // Label
      const labelContainer = new PIXI.Container();
      const labelBackground = new PIXI.Graphics();
      const label = new PIXI.Text(`Click to move viewport`, {
        fontSize: 13,
        fill: 0xffffff,
      });
      labelBackground.beginFill(0x000000, 0.5);
      labelBackground.drawRect(-1, -1, label.width + 2, label.height + 2);
      labelBackground.endFill();

      labelContainer.x = window.innerWidth / 2 - label.width / 2 - 1;
      labelContainer.y = 60;
      labelContainer.addChild(labelBackground);
      labelContainer.addChild(label);

      // Tile Viewport Area
      const tilemapViewport = new PIXI.Graphics();
      tilemapViewport
        .lineStyle({ width: 1, color: 0x00ff00 })
        .moveTo(0, 0)
        .lineTo(Math.ceil(window.innerWidth / 8) * 4, 0)
        .lineTo(
          Math.ceil(window.innerWidth / 8) * 4,
          Math.ceil(window.innerHeight / 8) * 4
        )
        .lineTo(0, Math.ceil(window.innerHeight / 8) * 4)
        .lineTo(0, 0);

      // Viewport
      const viewport = new PIXI.Container();
      const viewportLine = new PIXI.Graphics();
      vector.x = 0;
      vector.y = 0;
      position.x = 0;
      position.y = 0;
      viewportLine
        .lineStyle({ width: 1, color: 0xff0000 })
        .moveTo(0, 0)
        .lineTo(viewportSize.width, 0)
        .lineTo(viewportSize.width, viewportSize.height)
        .lineTo(0, viewportSize.height)
        .lineTo(0, 0);
      const viewportPositionBackground = new PIXI.Graphics();
      const viewportPositionLabel = new PIXI.Text(
        `(${position.x},${position.y})`,
        {
          fontSize: 13,
          fill: 0xffffff,
        }
      );
      viewportPositionLabel.x = 2;
      viewportPositionLabel.y = 2;
      viewportPositionBackground.beginFill(0x000000, 0.5);
      viewportPositionBackground.drawRect(
        0,
        0,
        viewportPositionLabel.width + 2,
        viewportPositionLabel.height + 2
      );
      viewportPositionBackground.endFill();

      viewport.addChild(viewportPositionBackground);
      viewport.addChild(viewportPositionLabel);
      viewport.addChild(viewportLine);

      // Rendering
      const app: PIXI.Application = await setRenderer();
      const graphics = new PIXI.Graphics();

      graphics.clear();
      graphics.beginFill(0x666666);
      for (
        let y = Math.floor(tilemapViewport.y / 8);
        y < Math.ceil((tilemapViewport.y + tilemapViewport.height) / 8);
        y++
      ) {
        for (
          let x = Math.floor(tilemapViewport.x / 8);
          x < Math.ceil((tilemapViewport.x + tilemapViewport.width) / 8);
          x++
        ) {
          if (peakBufferBit(buffer, x, y, width)) {
            graphics.beginFill(0x666666);
            graphics.drawRect(x * 8, y * 8, 8, 8);
          }
        }
      }
      graphics.endFill();

      app.stage.addChild(graphics);
      app.stage.addChild(viewport);
      app.stage.addChild(tilemapViewport);
      app.stage.addChild(labelContainer);

      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('click', onClick);
      window.addEventListener('touchstart', onTouch);
      window.addEventListener('click', onClick);

      setUpdater(() => {
        // Vector Move
        const currentX = Math.round(position.x + viewportSize.width / 2);
        const currentY = Math.round(position.y + viewportSize.height / 2);
        if (
          Math.sqrt(
            (currentX - targetPosition.x) ** 2 +
              (currentY - targetPosition.y) ** 2
          ) < 4
        ) {
          vector.x = 0;
          vector.y = 0;
        }
        if (position.x <= 0 && vector.x < 0) {
          targetPosition.x = Math.round(viewportSize.width / 2);
          position.x = 0;
          vector.x = 0;
        } else if (
          position.x + viewportSize.width >= window.innerWidth &&
          vector.x > 0
        ) {
          targetPosition.x =
            window.innerWidth - Math.round(viewportSize.width / 2);
          position.x = window.innerWidth - viewportSize.width;
          vector.x = 0;
        }
        if (position.y <= 0 && vector.y < 0) {
          targetPosition.y = Math.round(viewportSize.height / 2);
          position.y = 0;
          vector.y = 0;
        } else if (
          position.y + viewportSize.height >= window.innerHeight &&
          vector.y > 0
        ) {
          targetPosition.y =
            window.innerHeight - Math.round(viewportSize.height / 2);
          position.y = window.innerHeight - viewportSize.height;
          vector.y = 0;
        }

        position.x += vector.x;
        position.y += vector.y;
        viewport.x = position.x;
        viewport.y = position.y;
        viewportPositionLabel.text = `(${Math.round(position.x)},${Math.round(
          position.y
        )})`;

        // ViewPort Check
        if (
          viewport.x < tilemapViewport.x ||
          viewport.x + viewport.width - 1 >
            tilemapViewport.x + tilemapViewport.width ||
          viewport.y < tilemapViewport.y ||
          viewport.y + viewport.height - 1 >
            tilemapViewport.y + tilemapViewport.height
        ) {
          tilemapViewport.x =
            viewport.x -
            Math.round((tilemapViewport.width - viewport.width) / 2);
          tilemapViewport.y =
            viewport.y -
            Math.round((tilemapViewport.height - viewport.height) / 2);
          if (tilemapViewport.x <= 0) tilemapViewport.x = 0;
          if (tilemapViewport.x >= window.innerWidth - tilemapViewport.width)
            tilemapViewport.x = window.innerWidth - tilemapViewport.width;
          if (tilemapViewport.y <= 0) tilemapViewport.y = 0;
          if (tilemapViewport.y >= window.innerHeight - tilemapViewport.height)
            tilemapViewport.y = window.innerHeight - tilemapViewport.height;

          // Re Draw Tilemap
          graphics.clear();
          graphics.beginFill(0x666666);
          for (
            let y = Math.floor(tilemapViewport.y / 8);
            y < Math.ceil((tilemapViewport.y + tilemapViewport.height) / 8);
            y++
          ) {
            for (
              let x = Math.floor(tilemapViewport.x / 8);
              x < Math.ceil((tilemapViewport.x + tilemapViewport.width) / 8);
              x++
            ) {
              if (peakBufferBit(buffer, x, y, width)) {
                graphics.beginFill(0x666666);
                graphics.drawRect(x * 8, y * 8, 8, 8);
              }
            }
          }
          graphics.endFill();
        }
      });
    })();
  }, []);

  return <></>;
};

export default ViewPort;
