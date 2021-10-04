import { BLOCK_TYPES, BLOCK_TYPE_VALUES, TILE_TYPE_BYTES, TILE_VALUE_BYTES } from '../constants';
import { isSharedArrayBufferSupport } from '../utils';

class Map {
  private id: number;
  private threadQuantity: number;
  private _tileRgbaView?: Array<Array<Uint8Array>>;

  private _tileBuffer?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _tileView?: Array<Array<Uint32Array>>;
  private _tileValueBuffer?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _tileValueView?: Array<Array<Float32Array>>;

  private _nextTileBuffer?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _nextTileView?: Array<Array<Uint32Array>>;
  private _nextTileValueBuffer?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _nextTileValueView?: Array<Array<Float32Array>>;

  private _width?: number;
  private _height?: number;
  private _totalWidth?: number;
  private _totalHeight?: number;
  private _splitQuantity?: number;
  private _x?: number;
  private _y?: number;
  private _lookupX?: Array<number>;
  private _lookupY?: Array<number>;

  constructor(id: number, threadQuantity: number) {
    this.id = id;
    this.threadQuantity = threadQuantity;
  }

  public create(x: number, y: number, width: number, height: number, splitQuantity: number = 1): void {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._totalWidth = width * splitQuantity;
    this._totalHeight = height * splitQuantity;
    this._splitQuantity = splitQuantity;
    this._lookupX = new Array(this.totalWidth);
    this._lookupY = new Array(this.totalHeight);
    this._tileRgbaView = [];

    this._tileBuffer = [];
    this._tileView = [];
    this._tileValueBuffer = [];
    this._tileValueView = [];

    this._nextTileBuffer = [];
    this._nextTileView = [];
    this._nextTileValueBuffer = [];
    this._nextTileValueView = [];

    const sharedArrayBufferSupported = isSharedArrayBufferSupport();
    for (let y = 0; y < this.splitQuantity; y++) {
      this._tileRgbaView.push([]);

      this._tileBuffer.push([]);
      this._tileView.push([]);
      this._tileValueBuffer.push([]);
      this._tileValueView.push([]);

      this._nextTileBuffer.push([]);
      this._nextTileView.push([]);
      this._nextTileValueBuffer.push([]);
      this._nextTileValueView.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        if (!sharedArrayBufferSupported) {
          this._tileBuffer[y].push(new ArrayBuffer(width * height * TILE_TYPE_BYTES));
          this._tileValueBuffer[y].push(new ArrayBuffer(width * height * TILE_VALUE_BYTES));
          this._nextTileBuffer[y].push(new ArrayBuffer(width * height * TILE_TYPE_BYTES));
          this._nextTileValueBuffer[y].push(new ArrayBuffer(width * height * TILE_VALUE_BYTES));
        } else {
          this._tileBuffer[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
          this._tileValueBuffer[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
          this._nextTileBuffer[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
          this._nextTileValueBuffer[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
        }
        this._tileRgbaView[y].push(new Uint8Array(this.tileBuffer[y][x]));

        this._tileView[y].push(new Uint32Array(this.tileBuffer[y][x]));
        this._tileValueView[y].push(new Float32Array(this.tileValueBuffer[y][x]));
        this._nextTileView[y].push(new Uint32Array(this.nextTileBuffer[y][x]));
        this._nextTileValueView[y].push(new Float32Array(this.nextTileValueBuffer[y][x]));

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
    tileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    tileValueBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    nextTileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    nextTileValueBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  }): void {
    const { tileBuffer, tileValueBuffer, nextTileBuffer, nextTileValueBuffer, x, y, width, height, splitQuantity } = data;

    this._tileRgbaView = [];

    this._tileBuffer = tileBuffer;
    this._tileView = [];
    this._tileValueBuffer = tileValueBuffer;
    this._tileValueView = [];

    this._nextTileBuffer = nextTileBuffer;
    this._nextTileView = [];
    this._nextTileValueBuffer = nextTileValueBuffer;
    this._nextTileValueView = [];

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

      this._tileView.push([]);
      this._tileValueView.push([]);

      this._nextTileView.push([]);
      this._nextTileValueView.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        this._tileRgbaView[y].push(new Uint8Array(this.tileBuffer[y][x]));

        this._tileView[y].push(new Uint32Array(this.tileBuffer[y][x]));
        this._tileValueView[y].push(new Float32Array(this.tileValueBuffer[y][x]));

        this._nextTileView[y].push(new Uint32Array(this.nextTileBuffer[y][x]));
        this._nextTileValueView[y].push(new Float32Array(this.nextTileValueBuffer[y][x]));

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
    tileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    tileValueBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    nextTileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    nextTileValueBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  } {
    return {
      tileBuffer: this.tileBuffer,
      tileValueBuffer: this.tileValueBuffer,
      nextTileBuffer: this.nextTileBuffer,
      nextTileValueBuffer: this.nextTileValueBuffer,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      splitQuantity: this.splitQuantity,
    };
  }

  public updateState(): void {
    let x, y;
    for (let i = this.totalWidth * this.totalHeight - 1 - this.id; i >= 0; i -= this.threadQuantity) {
      x = i % this.totalWidth;
      y = Math.floor(i / this.totalWidth);
    }
  }

  public applyState(): void {
    let x, y;
    for (let i = this.totalWidth * this.totalHeight - 1 - this.id; i >= 0; i -= this.threadQuantity) {
      x = i % this.totalWidth;
      y = Math.floor(i / this.totalWidth);
    }
  }

  public lookupTileType(value: number): BLOCK_TYPES {
    if ((value & BLOCK_TYPE_VALUES.EMPTY) === 0) return BLOCK_TYPES.EMPTY;
    if ((value & BLOCK_TYPE_VALUES.DIRT) === BLOCK_TYPE_VALUES.DIRT) return BLOCK_TYPES.DIRT;
    if ((value & BLOCK_TYPE_VALUES.SAND) === BLOCK_TYPE_VALUES.SAND) return BLOCK_TYPES.SAND;
    if ((value & BLOCK_TYPE_VALUES.WATER) === BLOCK_TYPE_VALUES.WATER) return BLOCK_TYPES.WATER;
    if ((value & BLOCK_TYPE_VALUES.LAVA) === BLOCK_TYPE_VALUES.LAVA) return BLOCK_TYPES.LAVA;
    if ((value & BLOCK_TYPE_VALUES.STONE) === BLOCK_TYPE_VALUES.STONE) return BLOCK_TYPES.STONE;
    if ((value & BLOCK_TYPE_VALUES.ACID) === BLOCK_TYPE_VALUES.ACID) return BLOCK_TYPES.ACID;
    throw new Error(
      `undefined tile type ${value} / 0b${value
        .toString(2)
        .padStart(32, '0')
        .split('')
        .map((v, i) => (i < 8 ? 0 : v))
        .join('')}`
    );
  }

  /* Getters, Setters */
  private get tileBuffer(): Array<Array<ArrayBuffer | SharedArrayBuffer>> {
    if (!this._tileBuffer) throw new Error('map tileBuffer undefined');
    return this._tileBuffer;
  }

  private get tileValueBuffer(): Array<Array<ArrayBuffer | SharedArrayBuffer>> {
    if (!this._tileValueBuffer) throw new Error('map tileValueBuffer undefined');
    return this._tileValueBuffer;
  }

  private get nextTileBuffer(): Array<Array<ArrayBuffer | SharedArrayBuffer>> {
    if (!this._nextTileBuffer) throw new Error('map nextTilerBuffer undefined');
    return this._nextTileBuffer;
  }

  private get nextTileValueBuffer(): Array<Array<ArrayBuffer | SharedArrayBuffer>> {
    if (!this._nextTileValueBuffer) throw new Error('map nextTileValueBuffer undefined');
    return this._nextTileValueBuffer;
  }

  public get tileRgbaView(): Array<Array<Uint8Array>> {
    if (!this._tileRgbaView) throw new Error('map tile rgba undefined');
    return this._tileRgbaView;
  }

  public get tileView(): Array<Array<Uint32Array>> {
    if (!this._tileView) throw new Error('map tile undefined');
    return this._tileView;
  }

  public get tileValueView(): Array<Array<Float32Array>> {
    if (!this._tileValueView) throw new Error('map tile value undefined');
    return this._tileValueView;
  }

  public get nextTileView(): Array<Array<Uint32Array>> {
    if (!this._nextTileView) throw new Error('map next tile undefined');
    return this._nextTileView;
  }

  public get nextTileValueView(): Array<Array<Float32Array>> {
    if (!this._nextTileValueView) throw new Error('map next tile value undefined');
    return this._nextTileValueView;
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

  private set tileBuffer(bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>) {
    this._tileBuffer = bufferGrid;
  }

  private set tileValueBuffer(bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>) {
    this._tileValueBuffer = bufferGrid;
  }

  private set nextTileBuffer(bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>) {
    this._nextTileBuffer = bufferGrid;
  }

  private set nextTileValueBuffer(bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>) {
    this._nextTileValueBuffer = bufferGrid;
  }

  public set tileRgbaView(tileRgbaView: Array<Array<Uint8Array>>) {
    this._tileRgbaView = tileRgbaView;
  }

  public set tileView(tileView: Array<Array<Uint32Array>>) {
    this._tileView = tileView;
  }

  public set tileValueView(tileValueView: Array<Array<Float32Array>>) {
    this._tileValueView = tileValueView;
  }

  public set nextTileView(nextTileView: Array<Array<Uint32Array>>) {
    this._nextTileView = nextTileView;
  }

  public set nextTileValueView(nextTileValueView: Array<Array<Float32Array>>) {
    this._nextTileValueView = nextTileValueView;
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

  public getTile(x: number, y: number): number {
    return this.tileView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)];
  }

  public setTile(x: number, y: number, value: number): void {
    this.tileView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] = value;
  }

  public getTileValue(x: number, y: number): number {
    return this.tileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)];
  }

  public setTileValue(x: number, y: number, value: number): void {
    this.tileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] = value;
  }

  public plusTileValue(x: number, y: number, value: number): void {
    this.tileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] += value;
  }

  public minusTileValue(x: number, y: number, value: number): void {
    this.tileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] -= value;
  }

  public getNextTile(x: number, y: number): number {
    return this.nextTileView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)];
  }

  public setNextTile(x: number, y: number, value: number): void {
    this.nextTileView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] = value;
  }

  public getNextTileValue(x: number, y: number): number {
    return this.nextTileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)];
  }

  public setNextTileValue(x: number, y: number, value: number): void {
    this.nextTileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] = value;
  }

  public plusNextTileValue(x: number, y: number, value: number): void {
    this.nextTileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] += value;
  }

  public minusNextTileValue(x: number, y: number, value: number): void {
    this.nextTileValueView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] -= value;
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

  public setTileRgba(x: number, y: number, r?: number, g?: number, b?: number, a?: number): void {
    const index = ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    if (r !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 0] = r;
    if (g !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 1] = g;
    if (b !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 2] = b;
    if (a !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 3] = a;
  }
}

export default Map;
