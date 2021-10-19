import * as PIXI from 'pixi.js';

class Renderer {
  public app: PIXI.Application;

  constructor(canvasID: string, width: number, height: number, resolution: number = 1) {
    const view = document.getElementById(canvasID) as HTMLCanvasElement;

    view.style.width = '100%';
    view.style.height = '100%';

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.OFF;
    PIXI.settings.STRICT_TEXTURE_CACHE = true;
    PIXI.settings.RESOLUTION = resolution;

    this.app = new PIXI.Application({
      width,
      height,
      sharedLoader: true,
      powerPreference: 'high-performance',
      backgroundColor: 0x0f131a,
      autoStart: true,
      antialias: false,
      forceCanvas: false,
      preserveDrawingBuffer: false,
      useContextAlpha: false,
      resolution,
      view,
    });
  }

  public render(): void {
    this.app.render();
  }
}

export default Renderer;
