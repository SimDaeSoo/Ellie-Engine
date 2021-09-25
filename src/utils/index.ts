import * as PIXI from 'pixi.js';
import Stats from 'stats.js';

let updater: () => void;
let app: PIXI.Application;

async function preload(
  callback: (percentage: number, assetName: string) => void
): Promise<void> {
  const BASE_URL: string =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/Ellie/build'
      : 'https://simdaesoo.github.io/Ellie/build';
  const assets: Array<[string, string]> = [];
  const srcs: Array<string> = [];

  for (let i = 1; i <= 62; i++) {
    srcs.push(`tiles/Tile_${i.toString().padStart(2, '0')}.png`);
  }

  for (let i = 0; i <= 36; i++) {
    srcs.push(`waters/${i.toString().padStart(2, '0')}.png`);
  }

  for (let i = 0; i <= 0; i++) {
    srcs.push(`backgrounds/${i.toString().padStart(2, '0')}.png`);
  }

  srcs.push(`characters/ellie/idle.png`);

  for (const src of srcs) {
    assets.push([src, `${BASE_URL}/${src}`]);
  }

  let loaded = 0;

  PIXI.Loader.shared.onLoad.add((...args: any) => {
    const resource = args[1];
    callback(++loaded / assets.length, resource.name);
  });

  return new Promise((resolve) => {
    for (const asset of assets) {
      PIXI.Loader.shared.add(...asset);
    }

    PIXI.Loader.shared.load(() => {
      resolve();
    });
  });
}

function setRenderer(): PIXI.Application {
  if (app) {
    app.stage.removeChildren();
    app.stage.removeAllListeners();
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

export { setRenderer, setUpdater, preload };
