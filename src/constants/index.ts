import { IconNames } from 'rsuite/lib/Icon';

const TILE_TYPE_BYTES = 4;
const TILE_PROPERTIES_BYTES = 3;
enum WORKER_COMMAND {
  MAP_INITIALIZE,
  MAP_UPDATE_STATE,
}
enum WORKER_CALLBACK_COMMAND {
  INITIALIZED,
  DONE,
}

enum MENU_TYPES {
  EMPTY,
  ERASER,
  OBSIDIAN,
  PEBBLE,
  IRON,
  STONE,
  DIRT,
  SAND,
  WATER,
  LAVA,
  ACID,
  STATIC_LIGHT,
  MOVING_LIGHT,
  CAVE_GENERATE,
  PLAY,
  PAUSE,
  PIXEL_1,
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
  IRON,
  PEBBLE,
  OBSIDIAN,
  STONE,
  DIRT,
  SAND,
  WATER,
  LAVA,
  ACID,
  EMPTY,
}

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

const BLOCK_WEIGHT: EnumDictionary<BLOCK_TYPES, number> = {
  [BLOCK_TYPES.IRON]: 3,
  [BLOCK_TYPES.OBSIDIAN]: 3,
  [BLOCK_TYPES.STONE]: 3,
  [BLOCK_TYPES.DIRT]: 3,
  [BLOCK_TYPES.PEBBLE]: 3,
  [BLOCK_TYPES.SAND]: 3,
  [BLOCK_TYPES.WATER]: 2,
  [BLOCK_TYPES.LAVA]: 2,
  [BLOCK_TYPES.ACID]: 1,
  [BLOCK_TYPES.EMPTY]: 0,
};

const BLOCKS: { [key: string]: [number, number, number] } = {
  IRON: [190, 190, 180],
  OBSIDIAN: [20, 20, 40],
  STONE: [65, 65, 67],
  PEBBLE: [34, 44, 54],
  DIRT: [62, 44, 32],
  SAND: [155, 129, 74],
  WATER: [15, 82, 186],
  LAVA: [247, 80, 6],
  ACID: [75, 210, 59],
  EMPTY: [0, 0, 0],
};

const BLOCK_TYPE_VALUES: { [key: string]: number } = {
  PEBBLE: 0b00000000001101100010110000100010,
  IRON: 0b00000000101101001011111010111110,
  DIRT: 0b00000000001000000010110000111110,
  SAND: 0b00000000010010101000000110011011,
  WATER: 0b00000000101110100101001000001111,
  LAVA: 0b00000000000001100101000011110111,
  STONE: 0b00000000010000110100000101000001,
  ACID: 0b00000000001110111101001001001011,
  OBSIDIAN: 0b00000000001010000001010000010100,
  EMPTY: 0b00000000111111111111111111111111,
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
        name: 'Stone Block',
        type: MENU_TYPES.STONE,
      },
      {
        name: 'Iron Block',
        type: MENU_TYPES.IRON,
      },
      {
        name: 'Obsidian Block',
        type: MENU_TYPES.OBSIDIAN,
      },
      {
        name: 'Pebble Block',
        type: MENU_TYPES.PEBBLE,
      },
      {
        name: 'Dirt Block',
        type: MENU_TYPES.DIRT,
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
        name: 'Acid Block',
        type: MENU_TYPES.ACID,
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
        name: '1px',
        type: MENU_TYPES.PIXEL_1,
      },
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

export {
  TILE_TYPE_BYTES,
  TILE_PROPERTIES_BYTES,
  WORKER_COMMAND,
  WORKER_CALLBACK_COMMAND,
  BLOCKS,
  MENU_TYPES,
  NAVIGATIONS,
  BLOCK_TYPES,
  BLOCK_TYPE_VALUES,
  BLOCK_WEIGHT,
};
