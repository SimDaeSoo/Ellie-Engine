import * as PIXI from 'pixi.js';
import * as PIXI_LAYERS from '@pixi/layers';
import Stats from 'stats.js';

let updater: () => void;
let stage: PIXI.Container;
let lightContainer: PIXI.Container;

async function preload(
  callback: (percentage: number, assetName: string) => void
): Promise<void> {
  const BASE_URL: string =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/Ellie/build'
      : 'https://simdaesoo.github.io/Ellie/build';
  const assets: Array<[string, string]> = [];
  const srcs: Array<string> = [];

  srcs.push(`tiles.png`);
  srcs.push(`waters.png`);

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

function setRenderer(
  options: { defaultLighting: boolean } = { defaultLighting: true }
): {
  stage: PIXI.Container;
  lightContainer: PIXI.Container;
} {
  const [clientWidth, clientHeight] = getClientSize();
  if (stage) {
    stage.removeChildren();
    stage.removeAllListeners();
    lightContainer.removeChildren();
    lightContainer.removeAllListeners();

    if (options.defaultLighting) {
      const defaultLightingArea = new PIXI.Graphics();
      defaultLightingArea.beginFill(0xffffff);
      defaultLightingArea.drawRect(0, 0, clientWidth, clientHeight);
      defaultLightingArea.endFill();
      lightContainer.addChild(defaultLightingArea);
      defaultLightingArea.cacheAsBitmap = true;
    }

    return { stage, lightContainer };
  }
  const resolution: number = window.devicePixelRatio || 1;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
  PIXI.settings.STRICT_TEXTURE_CACHE = true;
  PIXI.settings.SPRITE_MAX_TEXTURES = 200;

  const stats: Stats = new Stats();
  const app = new PIXI.Application({
    width: clientWidth,
    height: clientHeight,
    sharedLoader: true,
    powerPreference: 'high-performance',
    backgroundColor: 0x202020,
    autoStart: false,
    antialias: false,
    forceCanvas: false,
    preserveDrawingBuffer: false,
    resolution,
  });
  app.stage = new PIXI_LAYERS.Stage();
  app.view.className = 'renderer';
  app.view.style.width = '100%';
  app.view.style.height = '100%';
  stats.dom.style.right = '0';
  stats.dom.style.removeProperty('left');

  const dom: HTMLElement = document.getElementById('content') as HTMLElement;
  dom.appendChild(app.view);
  dom.appendChild(stats.dom);

  const lightingStage = new PIXI_LAYERS.Stage();
  const lightingLayer = new PIXI_LAYERS.Layer();
  lightingLayer.useRenderTexture = true;
  lightingLayer.clearColor = [0.075, 0.075, 0.075, 1];

  stage = new PIXI.Container();
  lightContainer = new PIXI.Container();
  lightContainer.parentLayer = lightingLayer;

  const lightingSprite = new PIXI.Sprite(lightingLayer.getRenderTexture());
  lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;

  lightingStage.addChild(stage);
  lightingStage.addChild(lightContainer);
  lightingStage.addChild(lightingLayer);
  lightingStage.addChild(lightingSprite);
  app.stage.addChild(lightingStage);

  if (options.defaultLighting) {
    const defaultLightingArea = new PIXI.Graphics();
    defaultLightingArea.beginFill(0xffffff);
    defaultLightingArea.drawRect(0, 0, clientWidth, clientHeight);
    defaultLightingArea.endFill();
    lightContainer.addChild(defaultLightingArea);
    defaultLightingArea.cacheAsBitmap = true;
  }

  const render = () => {
    if (updater) updater();
    stats.update();
    app.render();
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);

  return { stage, lightContainer };
}

function setUpdater(callback: () => void): void {
  updater = callback;
}

function getClientSize(): [number, number] {
  // const ratio = window.innerWidth / window.innerHeight;

  // return [
  //   Math.min(1920, window.innerWidth),
  //   Math.ceil(Math.min(1920, window.innerWidth) / ratio),
  // ];
  return [window.innerWidth, window.innerHeight];
}

export { setRenderer, setUpdater, preload, getClientSize };
