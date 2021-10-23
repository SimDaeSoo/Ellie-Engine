import { BLOCKS, MENU_TYPES, BLOCK_TYPES, TILE_PROPERTY } from '../constants';
import Map from '../core/Map';

let mouseEventCallback: (x: number, y: number) => void;
const setMouseEventCallback = (cb: (x: number, y: number) => void, isWide: boolean) => {
  mouseEventCallback = (x, y) => {
    cb(Math.round(x - (isWide ? 220 : 0)), Math.round(y));
  };
};

let updater: () => void;
const setUpdater = (cb: () => void) => {
  updater = cb;
};

let menuSelectCallback: (type: MENU_TYPES) => void = () => {};
const setMenuSelectCallback = (cb: (type: MENU_TYPES) => void) => {
  menuSelectCallback = cb;
};

let movable = false;
const onTouchstart = (e: any) => {
  if (movable) return;
  const [x, y] = [(e.targetTouches[0].clientX / window.innerWidth) * window.innerWidth, (e.targetTouches[0].clientY / window.innerHeight) * window.innerHeight];
  if (mouseEventCallback) mouseEventCallback(x, y);
  movable = true;
};

const onTouchmove = (e: any) => {
  if (!movable) return;
  const [x, y] = [
    (e.changedTouches[0].clientX / window.innerWidth) * window.innerWidth,
    (e.changedTouches[0].clientY / window.innerHeight) * window.innerHeight,
  ];
  if (mouseEventCallback) mouseEventCallback(x, y);
  movable = true;
};

const onTouchend = () => {
  movable = false;
};

const onMousedown = (e: any) => {
  const [x, y] = [(e.clientX / window.innerWidth) * window.innerWidth, (e.clientY / window.innerHeight) * window.innerHeight];
  if (mouseEventCallback) mouseEventCallback(x, y);
  movable = true;
};

const onMousemove = (e: any) => {
  if (!movable) return;
  const [x, y] = [(e.clientX / window.innerWidth) * window.innerWidth, (e.clientY / window.innerHeight) * window.innerHeight];
  if (mouseEventCallback) mouseEventCallback(x, y);
};

const onMouseup = () => {
  movable = false;
};

const setController = () => {
  window.removeEventListener('touchstart', onTouchstart);
  window.removeEventListener('touchmove', onTouchmove);
  window.removeEventListener('touchend', onTouchend);
  window.addEventListener('touchstart', onTouchstart);
  window.addEventListener('touchmove', onTouchmove);
  window.addEventListener('touchend', onTouchend);

  window.removeEventListener('mousedown', onMousedown);
  window.removeEventListener('mousemove', onMousemove);
  window.removeEventListener('mouseup', onMouseup);
  window.addEventListener('mousedown', onMousedown);
  window.addEventListener('mousemove', onMousemove);
  window.addEventListener('mouseup', onMouseup);
};

const fillTile = (map: Map, x: number, y: number, length: number, menuType: MENU_TYPES): void => {
  for (let offsetY = -length; offsetY <= length; offsetY++) {
    for (let offsetX = -length; offsetX <= length; offsetX++) {
      if (
        x + offsetX < 0 ||
        x + offsetX >= map.totalWidth ||
        y + offsetY < 0 ||
        y + offsetY >= map.totalHeight ||
        Math.sqrt(offsetX ** 2 + offsetY ** 2) > length
      ) {
        continue;
      }

      switch (menuType) {
        case MENU_TYPES.DIRT: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.DIRT], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 80);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.STONE: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.STONE], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 100);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.OBSIDIAN: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 120);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.IRON: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.IRON], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 120);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.SAND: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.SAND], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 60);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.PEBBLE: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.PEBBLE], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 100);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.WATER: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.WATER], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 100);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.LAVA: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.LAVA], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 60);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.ACID: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.ACID], Math.floor(171 + Math.random() * 84));
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 60);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        case MENU_TYPES.ERASER: {
          map.setTileRgba(x + offsetX, y + offsetY, ...BLOCKS[BLOCK_TYPES.EMPTY], 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.LIFE, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.SCALA, 0);
          map.setTileProperties(x + offsetX, y + offsetY, TILE_PROPERTY.STABLE, 0);
          break;
        }
        default: {
        }
      }
    }
  }
};

const isSharedArrayBufferSupport = () => {
  try {
    new SharedArrayBuffer(10);
    return true;
  } catch (e) {
    return false;
  }
};

function shffle<T>(values: Array<T>): Array<T> {
  const _values: Array<T> = [...values];
  const newValues: Array<T> = [];

  while (_values.length) {
    newValues.push(..._values.splice(Math.floor(Math.random() * _values.length), 1));
  }

  return newValues;
}

function fillAllTiles(map: Map): void {
  for (let y = 0; y < map.totalHeight; y++) {
    for (let x = 0; x < map.totalWidth; x++) {
      if (y > Math.floor((map.totalHeight / 5) * 4)) {
        map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.PEBBLE], Math.floor(171 + Math.random() * 84));
        map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 100);
        map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
        map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
      } else if (y > Math.floor((map.totalHeight / 5) * 3)) {
        map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.LAVA], Math.floor(171 + Math.random() * 84));
        map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 60);
        map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
        map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
      } else if (y > Math.floor((map.totalHeight / 5) * 2)) {
        map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.DIRT], Math.floor(171 + Math.random() * 84));
        map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 80);
        map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
        map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
      } else if (y > Math.floor(map.totalHeight / 5) * 1) {
        map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.WATER], Math.floor(171 + Math.random() * 84));
        map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 100);
        map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
        map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
      } else {
        map.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.ACID], Math.floor(171 + Math.random() * 84));
        map.setTileProperties(x, y, TILE_PROPERTY.LIFE, 60);
        map.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
        map.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
      }
    }
  }
}

function sleep(dt: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, dt);
  });
}

export {
  setController,
  setMouseEventCallback,
  setUpdater,
  updater,
  setMenuSelectCallback,
  menuSelectCallback,
  fillTile,
  isSharedArrayBufferSupport,
  shffle,
  fillAllTiles,
  sleep,
};
