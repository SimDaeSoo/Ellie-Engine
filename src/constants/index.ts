import { IconNames } from 'rsuite/lib/Icon';

const TILE_TYPE_BYTES = 4;
const TILE_VALUE_BYTES = 4;
enum WORKER_COMMAND {
  MAP_INITIALIZE,
  MAP_PROCESSING,
}
enum WORKER_CALLBACK_COMMAND {
  INITIALIZED,
  DONE,
}

enum MENU_TYPES {
  EMPTY,
  ERASER,
  STONE,
  DIRT,
  SAND,
  WATER,
  LAVA,
  STATIC_LIGHT,
  MOVING_LIGHT,
  CAVE_GENERATE,
  PLAY,
  PAUSE,
  PIXEL_3,
  PIXEL_9,
  PIXEL_15,
  PIXEL_25,
  PIXEL_40,
  PIXEL_60,
  PIXEL_100,
  ZOOM_1,
  ZOOM_2,
  ZOOM_3,
  ZOOM_4,
  ZOOM_5,
  ZOOM_6,
  ZOOM_7,
  ZOOM_8,
}

enum BLOCK_TYPES {
  STONE,
  DIRT,
  SAND,
  WATER,
  LAVA,
  EMPTY,
}

const BLOCKS: { [key: string]: [number, number, number] } = {
  STONE: [65, 65, 67],
  DIRT: [62, 44, 32],
  SAND: [155, 129, 74],
  WATER: [15, 82, 186],
  LAVA: [247, 80, 6],
  EMPTY: [0, 0, 0],
};

const NAVIGATIONS: Array<{
  icon: IconNames;
  name: string;
  type: MENU_TYPES;
  subNavigations?: Array<{ name: string; type: MENU_TYPES }>;
}> = [
  {
    icon: 'gears2',
    name: 'Engine',
    type: MENU_TYPES.EMPTY,
    subNavigations: [
      {
        name: 'Play',
        type: MENU_TYPES.PLAY,
      },
      {
        name: 'Pause',
        type: MENU_TYPES.PAUSE,
      },
    ],
  },
  {
    icon: 'edit2',
    name: 'Block Drawing',
    type: MENU_TYPES.EMPTY,
    subNavigations: [
      {
        name: 'Dirt Block',
        type: MENU_TYPES.DIRT,
      },
      {
        name: 'Stone Block',
        type: MENU_TYPES.STONE,
      },
      {
        name: 'Sand Block',
        type: MENU_TYPES.SAND,
      },
      {
        name: 'Water Block',
        type: MENU_TYPES.WATER,
      },
      {
        name: 'Lava Block',
        type: MENU_TYPES.LAVA,
      },
      {
        name: 'Erase',
        type: MENU_TYPES.ERASER,
      },
    ],
  },
  {
    icon: 'edit',
    name: 'Border Setting',
    type: MENU_TYPES.EMPTY,
    subNavigations: [
      {
        name: '3px',
        type: MENU_TYPES.PIXEL_3,
      },
      {
        name: '9px',
        type: MENU_TYPES.PIXEL_9,
      },
      {
        name: '15px',
        type: MENU_TYPES.PIXEL_15,
      },
      {
        name: '25px',
        type: MENU_TYPES.PIXEL_25,
      },
      {
        name: '40px',
        type: MENU_TYPES.PIXEL_40,
      },
      {
        name: '60px',
        type: MENU_TYPES.PIXEL_60,
      },
      {
        name: '100px',
        type: MENU_TYPES.PIXEL_100,
      },
    ],
  },
  {
    icon: 'crosshairs',
    name: 'Zoom',
    type: MENU_TYPES.EMPTY,
    subNavigations: [
      {
        name: '1x',
        type: MENU_TYPES.ZOOM_1,
      },
      {
        name: '2x',
        type: MENU_TYPES.ZOOM_2,
      },
      {
        name: '3x',
        type: MENU_TYPES.ZOOM_3,
      },
      {
        name: '4x',
        type: MENU_TYPES.ZOOM_4,
      },
      {
        name: '5x',
        type: MENU_TYPES.ZOOM_5,
      },
      {
        name: '6x',
        type: MENU_TYPES.ZOOM_6,
      },
      {
        name: '7x',
        type: MENU_TYPES.ZOOM_7,
      },
      {
        name: '8x',
        type: MENU_TYPES.ZOOM_8,
      },
    ],
  },
];

export { TILE_TYPE_BYTES, TILE_VALUE_BYTES, WORKER_COMMAND, WORKER_CALLBACK_COMMAND, BLOCKS, MENU_TYPES, NAVIGATIONS, BLOCK_TYPES };
