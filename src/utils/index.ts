import * as PIXI from 'pixi.js';
import Stats from 'stats.js';

let updater: () => void;
let app: PIXI.Application;

async function preload(): Promise<void> {
  const BASE_URL: string =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/Engine/build'
      : 'https://simdaesoo.github.io/Engine/build';
  const assets: Array<[string, string]> = [];
  const srcs: Array<string> = [];

  for (let i = 1; i <= 61; i++) {
    srcs.push(`tiles/Tile_${i.toString().padStart(2, '0')}.png`);
  }

  for (let i = 0; i <= 36; i++) {
    srcs.push(`waters/${i.toString().padStart(2, '0')}.png`);
  }

  for (const src of srcs) {
    assets.push([src, `${BASE_URL}/${src}`]);
  }

  return new Promise((resolve) => {
    for (const asset of assets) {
      PIXI.Loader.shared.add(...asset);
    }

    PIXI.Loader.shared.load(() => {
      resolve();
    });
  });
}

async function setRenderer(): Promise<PIXI.Application> {
  if (app) {
    app.stage.removeAllListeners();
    app.stage.removeChildren();
    return app;
  }
  const resolution: number = window.devicePixelRatio || 1;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
  PIXI.settings.STRICT_TEXTURE_CACHE = true;

  const stats: Stats = new Stats();
  app = new PIXI.Application({
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
  app.view.className = 'renderer';
  app.view.style.width = '100%';
  app.view.style.height = '100%';
  stats.dom.style.right = '0';
  stats.dom.style.removeProperty('left');

  const dom: HTMLElement = document.getElementById('content') as HTMLElement;
  dom.appendChild(app.view);
  dom.appendChild(stats.dom);

  try {
    await preload();
  } catch (e) {
    console.log(e);
  }

  const render = () => {
    if (updater) updater();
    stats.update();
    app.render();
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);

  return app;
}

function setUpdater(callback: () => void): void {
  updater = callback;
}

export { setRenderer, setUpdater };
