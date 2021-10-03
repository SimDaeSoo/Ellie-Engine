import {
  BLOCKS,
  BLOCK_TYPES,
  BLOCK_TYPE_LOOKUP,
  TILE_TYPE_BYTES,
  TILE_VALUE_BYTES,
} from '../constants';
import { isSharedArrayBufferSupport } from '../utils';

class Map {
  private id: number;
  private threadQuantity: number;
  private _tileTypePropertyBufferGrid?: Array<
    Array<ArrayBuffer | SharedArrayBuffer>
  >;
  private _tileTypeProperties?: Array<Array<Uint8Array>>;
  private _tileValueBufferGrid?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _tileValues?: Array<Array<Float32Array>>;
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
    this.simulator = this.stepGenerator(8, 10000);
  }

  public update(): void {
    this.simulator.next();
  }

  public clear(id: number, threadQuantity: number): void {
    for (
      let i = id;
      i < this.totalWidth * this.totalHeight;
      i += threadQuantity
    ) {
      const x = i % this.totalWidth;
      const y = Math.floor(i / this.totalWidth);

      this.setTileProperties(x, y, 0, 0, 0, 0);
      this.setTileValue(x, y, 0);
    }
  }

  public create(
    x: number,
    y: number,
    width: number,
    height: number,
    splitQuantity: number = 1
  ): void {
    this._tileTypePropertyBufferGrid = [];
    this._tileTypeProperties = [];
    this._tileValueBufferGrid = [];
    this._tileValues = [];
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
      this._tileTypePropertyBufferGrid.push([]);
      this._tileTypeProperties.push([]);
      this._tileValueBufferGrid.push([]);
      this._tileValues.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        if (!sharedArrayBufferSupported) {
          this._tileTypePropertyBufferGrid[y].push(
            new ArrayBuffer(width * height * TILE_TYPE_BYTES)
          );
          this._tileValueBufferGrid[y].push(
            new ArrayBuffer(width * height * TILE_VALUE_BYTES)
          );
        } else {
          this._tileTypePropertyBufferGrid[y].push(
            new SharedArrayBuffer(width * height * TILE_TYPE_BYTES)
          );
          this._tileValueBufferGrid[y].push(
            new SharedArrayBuffer(width * height * TILE_VALUE_BYTES)
          );
        }
        this._tileTypeProperties[y].push(
          new Uint8Array(this.tileTypePropertyBufferGrid[y][x])
        );
        this._tileValues[y].push(
          new Float32Array(this.tileValueBufferGrid[y][x])
        );
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
    tileTypePropertyBufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    tileValueBufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  }): void {
    const {
      tileTypePropertyBufferGrid,
      tileValueBufferGrid,
      x,
      y,
      width,
      height,
      splitQuantity,
    } = data;

    this._tileTypePropertyBufferGrid = tileTypePropertyBufferGrid;
    this._tileValueBufferGrid = tileValueBufferGrid;
    this._tileTypeProperties = [];
    this._tileValues = [];
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
      this._tileTypeProperties.push([]);
      this._tileValues.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        this._tileTypeProperties[y].push(
          new Uint8Array(this.tileTypePropertyBufferGrid[y][x])
        );
        this._tileValues[y].push(
          new Float32Array(this.tileValueBufferGrid[y][x])
        );
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
    tileTypePropertyBufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    tileValueBufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  } {
    return {
      tileTypePropertyBufferGrid: this.tileTypePropertyBufferGrid,
      tileValueBufferGrid: this.tileValueBufferGrid,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      splitQuantity: this.splitQuantity,
    };
  }

  private *stepGenerator(limitDuration: number, accumulateLimit: number) {
    let step = this.simulateGenerator(
      this.id,
      this.threadQuantity,
      limitDuration,
      accumulateLimit
    );

    while (true) {
      if (step.next(Date.now()).done) {
        step = this.simulateGenerator(
          this.id,
          this.threadQuantity,
          limitDuration,
          accumulateLimit
        );
      }
      yield;
    }
  }

  private *simulateGenerator(
    id: number,
    threadQuantity: number,
    limitDuration: number,
    accumulateLimit: number
  ) {
    let accumulate = 0;
    let begin = Date.now();

    for (
      let i = this.totalWidth * this.totalHeight - 1 - id;
      i >= 0;
      i -= threadQuantity
    ) {
      if (++accumulate >= accumulateLimit) {
        accumulate = 0;
        if (Date.now() - begin >= limitDuration) {
          begin = yield;
        }
      }

      const x = i % this.totalWidth;
      const y = Math.floor(i / this.totalWidth);
      const type = this.getBlockType(x, y);
      if (type === BLOCK_TYPES.EMPTY || type === BLOCK_TYPES.STONE) continue;

      const properties = this.getTileProperties(x, y);

      if (y + 1 < this.totalHeight) {
        const targetBlockType = this.getBlockType(x, y + 1);
        if (targetBlockType === BLOCK_TYPES.EMPTY) {
          this.setTileProperties(x, y, 0, 0, 0, 0);
          this.setTileProperties(x, y + 1, ...properties);
          continue;
        } else if (
          type !== BLOCK_TYPES.WATER &&
          targetBlockType === BLOCK_TYPES.WATER
        ) {
          this.setTileProperties(x, y, ...BLOCKS.WATER, 255);
          this.setTileProperties(x, y + 1, ...properties);
          continue;
        }
      }

      if (y + 1 < this.totalHeight && x + 1 < this.totalWidth) {
        const targetBlockType = this.getBlockType(x + 1, y + 1);
        if (targetBlockType === BLOCK_TYPES.EMPTY) {
          this.setTileProperties(x, y, 0, 0, 0, 0);
          this.setTileProperties(x + 1, y + 1, ...properties);
          continue;
        } else if (
          type !== BLOCK_TYPES.WATER &&
          targetBlockType === BLOCK_TYPES.WATER
        ) {
          this.setTileProperties(x, y, ...BLOCKS.WATER, 255);
          this.setTileProperties(x + 1, y + 1, ...properties);
          continue;
        }
      }

      if (y + 1 < this.totalHeight && x - 1 >= 0) {
        const targetBlockType = this.getBlockType(x - 1, y + 1);
        if (targetBlockType === BLOCK_TYPES.EMPTY) {
          this.setTileProperties(x, y, 0, 0, 0, 0);
          this.setTileProperties(x - 1, y + 1, ...properties);
          continue;
        } else if (
          type !== BLOCK_TYPES.WATER &&
          targetBlockType === BLOCK_TYPES.WATER
        ) {
          this.setTileProperties(x, y, ...BLOCKS.WATER, 255);
          this.setTileProperties(x - 1, y + 1, ...properties);
          continue;
        }
      }

      if (
        (type === BLOCK_TYPES.WATER || type === BLOCK_TYPES.LAVA) &&
        x + 1 < this.totalWidth
      ) {
        const targetBlockType = this.getBlockType(x + 1, y);
        if (targetBlockType === BLOCK_TYPES.EMPTY) {
          this.setTileProperties(x, y, 0, 0, 0, 0);
          this.setTileProperties(x + 1, y, ...properties);
          continue;
        }
      }
      if (
        (type === BLOCK_TYPES.WATER || type === BLOCK_TYPES.LAVA) &&
        x - 1 >= 0
      ) {
        const targetBlockType = this.getBlockType(x - 1, y);
        if (targetBlockType === BLOCK_TYPES.EMPTY) {
          this.setTileProperties(x, y, 0, 0, 0, 0);
          this.setTileProperties(x - 1, y, ...properties);
          continue;
        }
      }
    }

    return;
  }

  private get tileTypePropertyBufferGrid(): Array<
    Array<ArrayBuffer | SharedArrayBuffer>
  > {
    if (!this._tileTypePropertyBufferGrid)
      throw new Error('map tilerBuffer undefined');
    return this._tileTypePropertyBufferGrid;
  }

  private get tileValueBufferGrid(): Array<
    Array<ArrayBuffer | SharedArrayBuffer>
  > {
    if (!this._tileValueBufferGrid)
      throw new Error('map tilerBuffer undefined');
    return this._tileValueBufferGrid;
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

  public get tileTypeProperties(): Array<Array<Uint8Array>> {
    if (!this._tileTypeProperties)
      throw new Error('map tile properties undefined');
    return this._tileTypeProperties;
  }

  public get tileValues(): Array<Array<Float32Array>> {
    if (!this._tileValues) throw new Error('map tile value undefined');
    return this._tileValues;
  }

  private set tileTypePropertyBufferGrid(
    bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>
  ) {
    this._tileTypePropertyBufferGrid = bufferGrid;
  }

  private set tileValueBufferGrid(
    bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>
  ) {
    this._tileValueBufferGrid = bufferGrid;
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

  public set tileTypeProperties(tileTypeProperties: Array<Array<Uint8Array>>) {
    this._tileTypeProperties = tileTypeProperties;
  }

  public set tileValues(tileValues: Array<Array<Float32Array>>) {
    this._tileValues = tileValues;
  }

  public getTileProperty(x: number, y: number, index: number): number {
    return this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES +
        index
    ];
  }

  public getTileValue(x: number, y: number): number {
    return this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES
    ];
  }

  public setTileProperty(
    x: number,
    y: number,
    index: number,
    property: number
  ): void {
    this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES +
        index
    ] = property;
  }

  public setTileValue(x: number, y: number, value: number): void {
    this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES
    ] = value;
  }

  public getTileProperties(
    x: number,
    y: number
  ): [number, number, number, number] {
    const index =
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    return [
      this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 0],
      this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 1],
      this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 2],
      this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 3],
    ];
  }

  public getBlockType(x: number, y: number): BLOCK_TYPES {
    const index =
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    return BLOCK_TYPE_LOOKUP[
      this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 0]
    ];
  }

  public setTileProperties(
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a: number
  ): void {
    const index =
      ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 0] = r;
    this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 1] = g;
    this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 2] = b;
    this.tileTypeProperties[this.lookupY[y]][this.lookupX[x]][index + 3] = a;
  }
}

export default Map;
