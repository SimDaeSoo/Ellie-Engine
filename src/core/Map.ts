import { TILE_BYTES } from '../constants';
import { isSharedArrayBufferSupport } from '../utils';

class Map {
  private _tileBufferGrid?: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
  private _tileProperties?: Array<Array<Uint8Array>>;
  private _width?: number;
  private _height?: number;
  private _totalWidth?: number;
  private _totalHeight?: number;
  private _splitQuantity?: number;
  private _x?: number;
  private _y?: number;
  private _lookupX?: Array<number>;
  private _lookupY?: Array<number>;

  public create(
    x: number,
    y: number,
    width: number,
    height: number,
    splitQuantity: number = 1
  ): void {
    this._tileBufferGrid = [];
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._totalWidth = width * splitQuantity;
    this._totalHeight = height * splitQuantity;
    this._tileProperties = [];
    this._splitQuantity = splitQuantity;
    this._lookupX = new Array(this.totalWidth);
    this._lookupY = new Array(this.totalHeight);

    const sharedArrayBufferSupported = isSharedArrayBufferSupport();
    for (let y = 0; y < this.splitQuantity; y++) {
      this._tileBufferGrid.push([]);
      this._tileProperties.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        if (!sharedArrayBufferSupported) {
          this._tileBufferGrid[y].push(
            new ArrayBuffer(width * height * TILE_BYTES)
          );
        } else {
          this._tileBufferGrid[y].push(
            new SharedArrayBuffer(width * height * TILE_BYTES)
          );
        }
        this._tileProperties[y].push(new Uint8Array(this.tileBufferGrid[y][x]));
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
    this._tileProperties = [];
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
      this._tileProperties.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        this._tileProperties[y].push(new Uint8Array(this.tileBufferGrid[y][x]));
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

  public get tileProperties(): Array<Array<Uint8Array>> {
    if (!this._tileProperties) throw new Error('map tile properties undefined');
    return this._tileProperties;
  }

  private set tileBufferGrid(
    bufferGrid: Array<Array<ArrayBuffer | SharedArrayBuffer>>
  ) {
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

  public set tileProperties(tileProperties: Array<Array<Uint8Array>>) {
    this._tileProperties = tileProperties;
  }

  public getTileProperty(x: number, y: number, index: number): number {
    return this.tileProperties[this.lookupY[y]][this.lookupX[x]][
      ((y % this.height) * this.width + (x % this.width)) * TILE_BYTES + index
    ];
  }

  public setTileProperty(
    x: number,
    y: number,
    index: number,
    property: number
  ): void {
    this.tileProperties[this.lookupY[y]][this.lookupX[x]][
      ((y % this.height) * this.width + (x % this.width)) * TILE_BYTES + index
    ] = property;
  }

  public setTileProperties(
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a: number
  ): void {
    const index = (y % this.height) * this.width + (x % this.width);
    this.tileProperties[this.lookupY[y]][this.lookupX[x]][
      index * TILE_BYTES + 0
    ] = r;
    this.tileProperties[this.lookupY[y]][this.lookupX[x]][
      index * TILE_BYTES + 1
    ] = g;
    this.tileProperties[this.lookupY[y]][this.lookupX[x]][
      index * TILE_BYTES + 2
    ] = b;
    this.tileProperties[this.lookupY[y]][this.lookupX[x]][
      index * TILE_BYTES + 3
    ] = a;
  }
}

export default Map;
