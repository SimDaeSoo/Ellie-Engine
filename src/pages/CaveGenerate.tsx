import * as PIXI from 'pixi.js';
import seedrandom from 'seedrandom';
import { useEffect } from 'react';
import { setRenderer, setUpdater } from '../utils';
import { peakBufferBit } from '../utils/buffer';
import { nextStep } from '../utils/cave';

const CaveGenerate = () => {
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

      // Label
      const labelContainer = new PIXI.Container();
      const labelBackground = new PIXI.Graphics();
      const label = new PIXI.Text(
        `Seed: ${seed} / Width: ${window.innerWidth}px / Height: ${window.innerHeight}px / Buffer: ${buffer.byteLength} bytes`,
        {
          fontSize: 13,
          fill: 0xffffff,
        }
      );
      labelBackground.beginFill(0x000000, 0.5);
      labelBackground.drawRect(-1, -1, label.width + 2, label.height + 2);
      labelBackground.endFill();

      labelContainer.x = window.innerWidth / 2 - label.width / 2 - 1;
      labelContainer.y = 60;
      labelContainer.addChild(labelBackground);
      labelContainer.addChild(label);

      // Rendering
      const app: PIXI.Application = await setRenderer();
      const graphics = new PIXI.Graphics();

      graphics.beginFill(0x666666);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (peakBufferBit(buffer, x, y, width)) {
            graphics.beginFill(0x666666);
            graphics.drawRect(x * 8, y * 8, 8, 8);
          }
        }
      }
      graphics.endFill();

      app.stage.addChild(graphics);
      app.stage.addChild(labelContainer);

      let frame = 0;
      const leftSteps = [
        { birthLimit: 5, deathLimit: 3 },
        { birthLimit: 5, deathLimit: 3 },
        { birthLimit: 5, deathLimit: 3 },
        { birthLimit: 5, deathLimit: 4 },
        { birthLimit: 5, deathLimit: 4 },
        { birthLimit: 5, deathLimit: 4 },
        { birthLimit: 4, deathLimit: 4 },
        { birthLimit: 4, deathLimit: 4 },
        { birthLimit: 4, deathLimit: 4 },
      ];

      setUpdater(() => {
        if (frame++ > 10 && leftSteps.length) {
          const stepOption = leftSteps.splice(0, 1)[0];

          nextStep(buffer, width, height, stepOption);

          graphics.clear();
          graphics.beginFill(0x666666);
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              if (peakBufferBit(buffer, x, y, width)) {
                graphics.drawRect(x * 8, y * 8, 8, 8);
              }
            }
          }
          graphics.endFill();

          frame = 0;
        }
      });
    })();
  }, []);

  return <></>;
};

export default CaveGenerate;
