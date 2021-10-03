import { BLOCK_TYPES, TILE_TYPE_BYTES } from '../constants';
import { isSharedArrayBufferSupport } from '../utils';

class Map {
  private id: number;
  private threadQuantity: number;
  private _tileBufferGrid?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _tileRgbaView?: Array<Array<Uint8Array>>;
  private _tileValueView?: Array<Array<Uint32Array>>;

  private _width?: number;
  private _height?: number;
  private _totalWidth?: number;
  private _totalHeight?: number;
  private _splitQuantity?: number;
  private _x?: number;
  private _y?: number;
  private _lookupX?: Array<number>;
  private _lookupY?: Array<number>;
  private simulator: Generator;

  constructor(id: number, threadQuantity: number) {
    this.id = id;
    this.threadQuantity = threadQuantity;
    this.simulator = this.stepGenerator(10, 10000);
  }

  public update(): void {
    this.simulator.next();
    // let x;
    // let y;
    // let value;
    // let type;
    // let isLiquid;

    // for (let i = this.totalWidth * this.totalHeight - 1 - this.id; i >= 0; i -= this.threadQuantity) {
    //   x = i % this.totalWidth;
    //   y = Math.floor(i / this.totalWidth);
    //   value = this.getTileValue(x, y);
    //   type = this.lookupTileType(value);
    //   if (type === BLOCK_TYPES.EMPTY || type === BLOCK_TYPES.STONE) continue;

    //   isLiquid = type === BLOCK_TYPES.WATER || type === BLOCK_TYPES.LAVA;

    //   if (y + 1 < this.totalHeight && this.lookupTileType(this.getTileValue(x, y + 1)) === BLOCK_TYPES.EMPTY) {
    //     this.setTileValue(x, y, 0);
    //     this.setTileValue(x, y + 1, value);
    //     continue;
    //   }

    //   if (y + 1 < this.totalHeight && x + 1 < this.totalWidth && this.lookupTileType(this.getTileValue(x + 1, y + 1)) === BLOCK_TYPES.EMPTY) {
    //     this.setTileValue(x, y, 0);
    //     this.setTileValue(x + 1, y + 1, value);
    //     continue;
    //   }

    //   if (y + 1 < this.totalHeight && x - 1 >= 0 && this.lookupTileType(this.getTileValue(x - 1, y + 1)) === BLOCK_TYPES.EMPTY) {
    //     this.setTileValue(x, y, 0);
    //     this.setTileValue(x - 1, y + 1, value);
    //     continue;
    //   }

    //   if (x + 1 < this.totalWidth && isLiquid && this.lookupTileType(this.getTileValue(x + 1, y)) === BLOCK_TYPES.EMPTY) {
    //     this.setTileValue(x, y, 0);
    //     this.setTileValue(x + 1, y, value);
    //     continue;
    //   }

    //   if (x - 1 >= 0 && isLiquid && this.lookupTileType(this.getTileValue(x - 1, y)) === BLOCK_TYPES.EMPTY) {
    //     this.setTileValue(x, y, 0);
    //     this.setTileValue(x - 1, y, value);
    //     continue;
    //   }
    // }
  }

  public clear(id: number, threadQuantity: number): void {
    for (let i = id; i < this.totalWidth * this.totalHeight; i += threadQuantity) {
      const x = i % this.totalWidth;
      const y = Math.floor(i / this.totalWidth);

      this.setTileValue(x, y, 0);
    }
  }

  public create(x: number, y: number, width: number, height: number, splitQuantity: number = 1): void {
    this._tileBufferGrid = [];
    this._tileRgbaView = [];
    this._tileValueView = [];
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._totalWidth = width * splitQuantity;
    this._totalHeight = height * splitQuantity;
    this._splitQuantity = splitQuantity;
    this._lookupX = new Array(this.totalWidth);
    this._lookupY = new Array(this.totalHeight);

    const sharedArrayBufferSupported = isSharedArrayBufferSupport();
    for (let y = 0; y < this.splitQuantity; y++) {
      this._tileBufferGrid.push([]);
      this._tileRgbaView.push([]);
      this._tileValueView.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        if (!sharedArrayBufferSupported) {
          this._tileBufferGrid[y].push(new ArrayBuffer(width * height * TILE_TYPE_BYTES));
        } else {
          this._tileBufferGrid[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
        }
        this._tileRgbaView[y].push(new Uint8Array(this.tileBufferGrid[y][x]));
        this._tileValueView[y].push(new Uint32Array(this.tileBufferGrid[y][x]));
        for (let offsetX = 0; offsetX < width; offsetX++) {
          this._lookupX[x * width + offsetX] = x;
        }
      }

      for (let offsetY = 0; offsetY < height; offsetY++) {
        this._lookupY[y * height + offsetY] = y;
      }
    }
  }

  public import(data: {
    tileBufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  }): void {
    const { tileBufferGrid, x, y, width, height, splitQuantity } = data;

    this._tileBufferGrid = tileBufferGrid;
    this._tileRgbaView = [];
    this._tileValueView = [];
    this._width = width;
    this._height = height;
    this._totalWidth = width * splitQuantity;
    this._totalHeight = height * splitQuantity;
    this._splitQuantity = splitQuantity;
    this._x = x;
    this._y = y;
    this._lookupX = new Array(this.totalWidth);
    this._lookupY = new Array(this.totalHeight);

    for (let y = 0; y < this.splitQuantity; y++) {
      this._tileRgbaView.push([]);
      this._tileValueView.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        this._tileRgbaView[y].push(new Uint8Array(this.tileBufferGrid[y][x]));
        this._tileValueView[y].push(new Uint32Array(this.tileBufferGrid[y][x]));
        for (let offsetX = 0; offsetX < width; offsetX++) {
          this._lookupX[x * width + offsetX] = x;
        }
      }
      for (let offsetY = 0; offsetY < height; offsetY++) {
        this._lookupY[y * height + offsetY] = y;
      }
    }
  }

  public export(): {
    tileBufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  } {
    return {
      tileBufferGrid: this.tileBufferGrid,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      splitQuantity: this.splitQuantity,
    };
  }

  private *stepGenerator(limitDuration: number, accumulateLimit: number) {
    let step = this.simulateGenerator(limitDuration, accumulateLimit);

    while (true) {
      if (step.next(Date.now()).done) step = this.simulateGenerator(limitDuration, accumulateLimit);
      yield;
    }
  }

  private *simulateGenerator(_limitDuration: number, _accumulateLimit: number) {
    let begin = Date.now();
    let x;
    let y;
    let value;
    let type;
    let isLiquid;
    let accumulate = 0;

    for (let i = this.totalWidth * this.totalHeight - 1 - this.id; i >= 0; i -= this.threadQuantity) {
      if (++accumulate >= _accumulateLimit) {
        accumulate = 0;
        if (Date.now() - begin >= _limitDuration) begin = yield;
      }

      x = i % this.totalWidth;
      y = Math.floor(i / this.totalWidth);
      value = this.getTileValue(x, y);
      type = this.lookupTileType(value);
      if (type === BLOCK_TYPES.EMPTY || type === BLOCK_TYPES.STONE) continue;

      isLiquid = type === BLOCK_TYPES.WATER || type === BLOCK_TYPES.LAVA;

      if (y + 1 < this.totalHeight && this.lookupTileType(this.getTileValue(x, y + 1)) === BLOCK_TYPES.EMPTY) {
        this.setTileValue(x, y, 0);
        this.setTileValue(x, y + 1, value);
        continue;
      }

      if (y + 1 < this.totalHeight && x + 1 < this.totalWidth && this.lookupTileType(this.getTileValue(x + 1, y + 1)) === BLOCK_TYPES.EMPTY) {
        this.setTileValue(x, y, 0);
        this.setTileValue(x + 1, y + 1, value);
        continue;
      }

      if (y + 1 < this.totalHeight && x - 1 >= 0 && this.lookupTileType(this.getTileValue(x - 1, y + 1)) === BLOCK_TYPES.EMPTY) {
        this.setTileValue(x, y, 0);
        this.setTileValue(x - 1, y + 1, value);
        continue;
      }

      if (x + 1 < this.totalWidth && isLiquid && this.lookupTileType(this.getTileValue(x + 1, y)) === BLOCK_TYPES.EMPTY) {
        this.setTileValue(x, y, 0);
        this.setTileValue(x + 1, y, value);
        continue;
      }

      if (x - 1 >= 0 && isLiquid && this.lookupTileType(this.getTileValue(x - 1, y)) === BLOCK_TYPES.EMPTY) {
        this.setTileValue(x, y, 0);
        this.setTileValue(x - 1, y, value);
        continue;
      }
    }

    return;
  }

  private get tileBufferGrid(): Array<Array<ArrayBuffer | SharedArrayBuffer>> {
    if (!this._tileBufferGrid) throw new Error('map tilerBuffer undefined');
    return this._tileBufferGrid;
  }

  public get x(): number {
    if (this._x === undefined) throw new Error('map position x undefined');
    return this._x;
  }

  public get y(): number {
    if (this._y === undefined) throw new Error('map position y undefined');
    return this._y;
  }

  public get lookupX(): Array<number> {
    if (this._lookupX === undefined) throw new Error('map lookup x undefined');
    return this._lookupX;
  }

  public get lookupY(): Array<number> {
    if (this._lookupY === undefined) throw new Error('map lookup y undefined');
    return this._lookupY;
  }

  public get width(): number {
    if (!this._width) throw new Error('map width undefined');
    return this._width;
  }

  public get height(): number {
    if (!this._height) throw new Error('map height undefined');
    return this._height;
  }

  public get totalWidth(): number {
    if (!this._totalWidth) throw new Error('map width undefined');
    return this._totalWidth;
  }

  public get totalHeight(): number {
    if (!this._totalHeight) throw new Error('map height undefined');
    return this._totalHeight;
  }

  public get splitQuantity(): number {
    if (!this._splitQuantity) throw new Error('map split quantity undefined');
    return this._splitQuantity;
  }

  public get tileRgbaView(): Array<Array<Uint8Array>> {
    if (!this._tileRgbaView) throw new Error('map tile properties undefined');
    return this._tileRgbaView;
  }

  public get tileValueView(): Array<Array<Uint32Array>> {
    if (!this._tileValueView) throw new Error('map tile types undefined');
    return this._tileValueView;
  }

  private set tileBufferGrid(bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>) {
    this._tileBufferGrid = bufferGrid;
  }

  public set x(x: number) {
    this._x = x;
  }

  public set y(y: number) {
    this._y = y;
  }

  public set width(width: number) {
    this._width = width;
  }

  public set height(height: number) {
    this._height = height;
  }

  public set totalWidth(totalWidth: number) {
    this._totalWidth = totalWidth;
  }

  public set totalHeight(totalHeight: number) {
    this._totalHeight = totalHeight;
  }

  public set splitQuantity(splitQuantity: number) {
    this._splitQuantity = splitQuantity;
  }

  public set tileRgbaView(tileRgbaView: Array<Array<Uint8Array>>) {
    this._tileRgbaView = tileRgbaView;
  }

  public set tileValueView(tileValueView: Array<Array<Uint32Array>>) {
    this._tileValueView = tileValueView;
  }

  public lookupTileType(value: number): BLOCK_TYPES {
    if (value === 0) return BLOCK_TYPES.EMPTY;
    if ((value & 0b00000000001000000010110000111110) === 0b00000000001000000010110000111110) return BLOCK_TYPES.DIRT;
    if ((value & 0b00000000010010101000000110011011) === 0b00000000010010101000000110011011) return BLOCK_TYPES.SAND;
    if ((value & 0b00000000101110100101001000001111) === 0b00000000101110100101001000001111) return BLOCK_TYPES.WATER;
    if ((value & 0b00000000000001100101000011110111) === 0b00000000000001100101000011110111) return BLOCK_TYPES.LAVA;
    if ((value & 0b00000000010000110100000101000001) === 0b00000000010000110100000101000001) return BLOCK_TYPES.STONE;
    throw new Error('undefined tile type');
  }

  public getTileValue(x: number, y: number): number {
    return this.tileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)];
  }

  public setTileValue(x: number, y: number, value: number): void {
    this.tileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] = value;
  }

  public getTileRgba(x: number, y: number): [number, number, number, number] {
    const index = ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    return [
      this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 0],
      this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 1],
      this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 2],
      this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 3],
    ];
  }

  public setTileRgba(x: number, y: number, r: number, g: number, b: number, a: number): void {
    const index = ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 0] = r;
    this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 1] = g;
    this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 2] = b;
    this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 3] = a;
  }
}

export default Map;
