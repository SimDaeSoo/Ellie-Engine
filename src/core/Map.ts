import { TILE_BYTES } from '../constants';

class Map {
  public buffer?: SharedArrayBuffer;
  public size?: Float64Array;
  public properties?: Uint8Array;
  public values?: Float32Array;

  public create(width: number, height: number): void {
    this.buffer = new SharedArrayBuffer(width * height * TILE_BYTES + 16);
    this.properties = new Uint8Array(this.buffer);
    this.values = new Float32Array(this.buffer);
    this.size = new Float64Array(this.buffer, this.buffer.byteLength - 16, 2);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index: number = y * width + x;
        const foreground: number = Math.random() < 0.5 ? 1 : 0;

        this.properties[index * 8] = foreground; // frontground
        this.properties[index * 8 + 1] = 1; // background
        this.properties[index * 8 + 2] = 2; // other property 1
        this.properties[index * 8 + 3] = 3; // other property 2
        this.values[index * 2 + 1] = 100; // tile value
      }
    }

    this.size[0] = width;
    this.size[1] = height;
  }

  public load(buffer: SharedArrayBuffer): void {
    this.buffer = buffer;
    this.properties = new Uint8Array(this.buffer);
    this.values = new Float32Array(this.buffer);
    this.size = new Float64Array(this.buffer, this.buffer.byteLength - 16, 2);
  }

  public getForeground(x: number, y: number): number {
    if (this.size && this.properties) {
      return this.properties[(y * this.size[0] + x) * 8];
    } else {
      throw new Error();
    }
  }

  public setForeground(x: number, y: number, foreground: number): void {
    if (this.size && this.properties) {
      this.properties[(y * this.size[0] + x) * 8] = foreground;
    } else {
      throw new Error();
    }
  }

  public getBackground(x: number, y: number): number {
    if (this.size && this.properties) {
      return this.properties[(y * this.size[0] + x) * 8 + 1];
    } else {
      throw new Error();
    }
  }

  public setBackground(x: number, y: number, background: number): void {
    if (this.size && this.properties) {
      this.properties[(y * this.size[0] + x) * 8 + 1] = background;
    } else {
      throw new Error();
    }
  }

  public getValue(x: number, y: number): number {
    if (this.size && this.values) {
      return this.values[(y * this.size[0] + x) * 2 + 1];
    } else {
      throw new Error();
    }
  }

  public setValue(x: number, y: number, value: number): number {
    if (this.size && this.values) {
      return this.values[(y * this.size[0] + x) * 2 + 1];
    } else {
      throw new Error();
    }
  }

  public get width(): number {
    if (this.size) {
      return this.size[0];
    } else {
      throw new Error();
    }
  }

  public get height(): number {
    if (this.size) {
      return this.size[0];
    } else {
      throw new Error();
    }
  }
}

export default Map;
