import { BLOCKS, MENU_TYPES } from '../constants';
import Map from '../core/Map';

let mouseEventCallback: (x: number, y: number) => void;
const setMouseEventCallback = (
  cb: (x: number, y: number) => void,
  isWide: boolean
) => {
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
  const [x, y] = [
    (e.targetTouches[0].clientX / window.innerWidth) * window.innerWidth,
    (e.targetTouches[0].clientY / window.innerHeight) * window.innerHeight,
  ];
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
  const [x, y] = [
    (e.clientX / window.innerWidth) * window.innerWidth,
    (e.clientY / window.innerHeight) * window.innerHeight,
  ];
  if (mouseEventCallback) mouseEventCallback(x, y);
  movable = true;
};

const onMousemove = (e: any) => {
  if (!movable) return;
  const [x, y] = [
    (e.clientX / window.innerWidth) * window.innerWidth,
    (e.clientY / window.innerHeight) * window.innerHeight,
  ];
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

const fillTile = (
  map: Map,
  x: number,
  y: number,
  length: number,
  menuType: MENU_TYPES
): void => {
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
          map.setTileProperties(x + offsetX, y + offsetY, ...BLOCKS.DIRT, 255);
          break;
        }
        case MENU_TYPES.SAND: {
          map.setTileProperties(x + offsetX, y + offsetY, ...BLOCKS.SAND, 255);
          break;
        }
        case MENU_TYPES.WATER: {
          map.setTileProperties(x + offsetX, y + offsetY, ...BLOCKS.WATER, 255);
          break;
        }
        case MENU_TYPES.LAVA: {
          map.setTileProperties(x + offsetX, y + offsetY, ...BLOCKS.LAVA, 255);
          break;
        }
        case MENU_TYPES.ERASER: {
          map.setTileProperties(x + offsetX, y + offsetY, ...BLOCKS.EMPTY, 0);
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

export {
  setController,
  setMouseEventCallback,
  setUpdater,
  updater,
  setMenuSelectCallback,
  menuSelectCallback,
  fillTile,
  isSharedArrayBufferSupport,
};
