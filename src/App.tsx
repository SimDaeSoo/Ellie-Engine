import * as PIXI from 'pixi.js';
import Stats from 'stats.js';

async function preload(): Promise<void> {
  const srcs: Array<string> = [];

  srcs.push('./build/bunny.png');

  return new Promise((resolve) => {
    for (const src of srcs) {
      PIXI.Loader.shared.add(src, src);
    }

    PIXI.Loader.shared.load(() => {
      resolve();
    });
  });
}

async function main(): Promise<void> {
  const resolution: number = window.devicePixelRatio || 1;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
  PIXI.settings.STRICT_TEXTURE_CACHE = true;

  const stats: Stats = new Stats();
  const app: PIXI.Application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    sharedLoader: true,
    powerPreference: 'high-performance',
    backgroundColor: 0x202020,
    backgroundAlpha: 0,
    autoStart: false,
    antialias: false,
    forceCanvas: false,
    preserveDrawingBuffer: false,
    resolution,
  });
  app.view.style.width = '100%';
  app.view.style.height = '100%';
  document.body.appendChild(app.view);
  document.body.appendChild(stats.dom);

  await preload();

  // Sample
  const container: PIXI.Container = new PIXI.Container();

  app.stage.addChild(container);

  // Create a new texture
  const texture: PIXI.Texture = PIXI.Texture.from('./build/bunny.png');

  // Create a 5x5 grid of bunnies
  for (let i = 0; i < 25; i++) {
    const bunny: PIXI.Sprite = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
  }

  // Move container to the center
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  // Center bunny sprite in local container coordinates
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  const render = () => {
    container.rotation -= 0.01;

    stats.update();
    app.render();
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);
}

main();

const App = () => <></>;

export default App;
