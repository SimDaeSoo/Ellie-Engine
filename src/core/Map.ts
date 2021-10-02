import { TILE_BYTES } from '../constants';

class Map {
  private _tileBuffer?: SharedArrayBuffer;
  private _width?: number;
  private _height?: number;
  private _properties?: Uint8Array;

  public create(width: number, height: number): void {
    this.tileBuffer = new SharedArrayBuffer(width * height * TILE_BYTES);
    this.properties = new Uint8Array(this.tileBuffer);
    this.width = width;
    this.height = height;
  }

  public import(data: {
    tileBuffer: SharedArrayBuffer;
    width: number;
    height: number;
  }): void {
    const { tileBuffer, width, height } = data;

    this.tileBuffer = tileBuffer;
    this.properties = new Uint8Array(this.tileBuffer);
    this.width = width;
    this.height = height;
  }

  public export(): {
    tileBuffer: SharedArrayBuffer;
    width: number;
    height: number;
  } {
    return {
      tileBuffer: this.tileBuffer,
      width: this.width,
      height: this.height,
    };
  }

  private get tileBuffer(): SharedArrayBuffer {
    if (!this._tileBuffer) throw new Error('map tilerBuffer undefined');
    return this._tileBuffer;
  }

  public get width(): number {
    if (!this._width) throw new Error('map width undefined');
    return this._width;
  }

  public get height(): number {
    if (!this._height) throw new Error('map height undefined');
    return this._height;
  }

  public get properties(): Uint8Array {
    if (!this._properties) throw new Error('map properties undefined');
    return this._properties;
  }

  private set tileBuffer(buffer: SharedArrayBuffer) {
    this._tileBuffer = buffer;
  }

  public set width(width: number) {
    this._width = width;
  }

  public set height(height: number) {
    this._height = height;
  }

  public set properties(properties: Uint8Array) {
    this._properties = properties;
  }

  public getTileProperty(x: number, y: number, index: number): number {
    return this.properties[(y * this.width + x) * TILE_BYTES + index];
  }

  public setTileProperty(
    x: number,
    y: number,
    index: number,
    property: number
  ): void {
    this.properties[(y * this.width + x) * TILE_BYTES + index] = property;
  }
}

export default Map;
