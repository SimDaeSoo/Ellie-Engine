import { IconNames } from 'rsuite/lib/Icon';

const TILE_BYTES = 4;
enum WORKER_COMMAND {
  CLEAR_MAP,
}
enum WORKER_CALLBACK_COMMAND {
  INITIALIZED,
  DONE,
}

enum MENU_TYPES {
  EMPTY,
  ERASER,
  DIRT,
  SAND,
  WATER,
  LAVA,
  STATIC_LIGHT,
  MOVING_LIGHT,
  CLEAR,
  CAVE_GENERATE,
  PLAY,
  PAUSE,
  PIXEL_1,
  PIXEL_3,
  PIXEL_5,
  PIXEL_9,
  PIXEL_15,
  ZOOM_1,
  ZOOM_2,
  ZOOM_4,
  ZOOM_8,
}

const BLOCKS: { [key: string]: [number, number, number] } = {
  DIRT: [112, 84, 62],
  SAND: [255, 229, 124],
  WATER: [15, 82, 186],
  LAVA: [247, 104, 6],
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
        name: '1px',
        type: MENU_TYPES.PIXEL_1,
      },
      {
        name: '3px',
        type: MENU_TYPES.PIXEL_3,
      },
      {
        name: '5px',
        type: MENU_TYPES.PIXEL_5,
      },
      {
        name: '9px',
        type: MENU_TYPES.PIXEL_9,
      },
      {
        name: '15px',
        type: MENU_TYPES.PIXEL_15,
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
        name: '4x',
        type: MENU_TYPES.ZOOM_4,
      },
      {
        name: '8x',
        type: MENU_TYPES.ZOOM_8,
      },
    ],
  },
  {
    icon: 'setting',
    name: 'Utils',
    type: MENU_TYPES.EMPTY,
    subNavigations: [
      {
        name: 'Cave Generate',
        type: MENU_TYPES.CAVE_GENERATE,
      },
      {
        name: 'Clear',
        type: MENU_TYPES.CLEAR,
      },
    ],
  },
];

export {
  TILE_BYTES,
  WORKER_COMMAND,
  WORKER_CALLBACK_COMMAND,
  BLOCKS,
  MENU_TYPES,
  NAVIGATIONS,
};
