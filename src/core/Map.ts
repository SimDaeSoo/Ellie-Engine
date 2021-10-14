import { BLOCK_TYPES, BLOCK_TYPE_VALUES, BLOCK_WEIGHT, TILE_TYPE_BYTES, TILE_PROPERTIES_BYTES, BLOCKS, BLOCK_PROPERTIES, TILE_PROPERTY } from '../constants';
import { isSharedArrayBufferSupport } from '../utils';

class Map {
  public id: number;
  public threadQuantity: number;
  public chunkSize: number = 0;

  public tileRgbaView: Array<Array<Uint8Array>> = [];
  public tileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>> = [];
  public tileView: Array<Array<Uint32Array>> = [];
  public tilePropertiesBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>> = [];
  public tilePropertiesView: Array<Array<Int8Array>> = [];
  public chunkBuffer: ArrayBuffer | SharedArrayBuffer = isSharedArrayBufferSupport() ? new SharedArrayBuffer(1) : new ArrayBuffer(1);
  public chunkView: Uint8Array = new Uint8Array(this.chunkBuffer);
  public nextChunkBuffer: ArrayBuffer | SharedArrayBuffer = isSharedArrayBufferSupport() ? new SharedArrayBuffer(1) : new ArrayBuffer(1);
  public nextChunkView: Uint8Array = new Uint8Array(this.nextChunkBuffer);

  public width: number = 0;
  public height: number = 0;
  public totalWidth: number = 0;
  public totalHeight: number = 0;
  public splitQuantity: number = 0;
  public x: number = 0;
  public y: number = 0;
  public lookupX: Array<number> = [];
  public lookupY: Array<number> = [];
  public chunkLookupX: Array<number> = [];
  public chunkLookupY: Array<number> = [];

  constructor(id: number, threadQuantity: number) {
    this.id = id;
    this.threadQuantity = threadQuantity;
  }

  public update(offset: number, reverse: boolean): void {
    let beginX =
      Math.floor((this.totalWidth / (this.threadQuantity - (this.threadQuantity > 1 ? 1 : 0))) * (this.id + 1)) - (this.threadQuantity > 1 ? offset : 0);
    let endX = Math.floor((this.totalWidth / (this.threadQuantity - (this.threadQuantity > 1 ? 1 : 0))) * this.id) - (this.threadQuantity > 1 ? offset : 0);
    let x, tile, type, isMovable, isLiquid, scala, targetX, targetY, stateChanged, l, r, u, d, stable, falling;
    let lifeTime = 0;

    if (beginX > this.totalWidth) beginX = this.totalWidth;
    if (endX < 0) endX = 0;

    for (let y = this.totalHeight - 1; y >= 0; y--) {
      for (let _x = beginX - 1; _x >= endX; _x--) {
        x = reverse ? endX + (beginX - _x - 1) : _x;
        if (!this.isChunkDirty(x, y)) {
          x -= x % this.chunkSize;
          continue;
        }

        tile = this.getTile(x, y);
        type = this.lookupTileType(tile);
        isMovable = !(type === BLOCK_TYPES.EMPTY || type === BLOCK_TYPES.STONE || type === BLOCK_TYPES.OBSIDIAN || type === BLOCK_TYPES.IRON);
        if (!isMovable) continue;

        lifeTime = this.getTileProperties(x, y, TILE_PROPERTY.LIFE);
        if ((lifeTime <= 0 && type !== BLOCK_TYPES.EMPTY) || (lifeTime > 0 && type === BLOCK_TYPES.EMPTY)) {
          this.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
          this.setTileProperties(x, y, TILE_PROPERTY.LIFE, 0);
          this.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          this.setTileRgba(x, y, 0, 0, 0, 0);
          continue;
        }

        targetX = x;
        targetY = y;
        isLiquid = type === BLOCK_TYPES.WATER || type === BLOCK_TYPES.LAVA || type === BLOCK_TYPES.ACID;
        stateChanged = false;

        // Update Tile State
        switch (type) {
          case BLOCK_TYPES.WATER: {
            l = x > 0 ? this.lookupTileType(this.getTile(x - 1, y)) : undefined;
            u = y > 0 ? this.lookupTileType(this.getTile(x, y - 1)) : undefined;
            r = x < this.totalWidth - 1 ? this.lookupTileType(this.getTile(x + 1, y)) : undefined;
            d = y < this.totalHeight - 1 ? this.lookupTileType(this.getTile(x, y + 1)) : undefined;

            if (l === BLOCK_TYPES.LAVA) {
              this.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileRgba(x - 1, y, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileProperties(x, y, TILE_PROPERTY.LIFE, 120);
              this.setTileProperties(x - 1, y, TILE_PROPERTY.LIFE, 120);
              stateChanged = true;
            } else if (r === BLOCK_TYPES.LAVA) {
              this.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileRgba(x + 1, y, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileProperties(x, y, TILE_PROPERTY.LIFE, 120);
              this.setTileProperties(x + 1, y, TILE_PROPERTY.LIFE, 120);
              stateChanged = true;
            } else if (u === BLOCK_TYPES.LAVA) {
              this.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileRgba(x, y - 1, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileProperties(x, y, TILE_PROPERTY.LIFE, 120);
              this.setTileProperties(x, y - 1, TILE_PROPERTY.LIFE, 120);
              stateChanged = true;
            } else if (d === BLOCK_TYPES.LAVA) {
              this.setTileRgba(x, y, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileRgba(x, y + 1, ...BLOCKS[BLOCK_TYPES.OBSIDIAN], Math.floor(32 + Math.random() * 223));
              this.setTileProperties(x, y, TILE_PROPERTY.LIFE, 120);
              this.setTileProperties(x, y + 1, TILE_PROPERTY.LIFE, 120);
              stateChanged = true;
            }
            break;
          }
          case BLOCK_TYPES.ACID: {
            l = x > 0 ? this.lookupTileType(this.getTile(x - 1, y)) : undefined;
            u = y > 0 ? this.lookupTileType(this.getTile(x, y - 1)) : undefined;
            r = x < this.totalWidth - 1 ? this.lookupTileType(this.getTile(x + 1, y)) : undefined;
            d = y < this.totalHeight - 1 ? this.lookupTileType(this.getTile(x, y + 1)) : undefined;

            if (l === BLOCK_TYPES.STONE || l === BLOCK_TYPES.DIRT || l === BLOCK_TYPES.SAND || l === BLOCK_TYPES.PEBBLE || l === BLOCK_TYPES.WATER) {
              this.addingTileProperties(x - 1, y, TILE_PROPERTY.LIFE, -2);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            } else if (r === BLOCK_TYPES.STONE || r === BLOCK_TYPES.DIRT || r === BLOCK_TYPES.SAND || r === BLOCK_TYPES.PEBBLE || r === BLOCK_TYPES.WATER) {
              this.addingTileProperties(x + 1, y, TILE_PROPERTY.LIFE, -2);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            } else if (u === BLOCK_TYPES.STONE || u === BLOCK_TYPES.DIRT || u === BLOCK_TYPES.SAND || u === BLOCK_TYPES.PEBBLE || u === BLOCK_TYPES.WATER) {
              this.addingTileProperties(x, y - 1, TILE_PROPERTY.LIFE, -2);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            } else if (d === BLOCK_TYPES.STONE || d === BLOCK_TYPES.DIRT || d === BLOCK_TYPES.SAND || d === BLOCK_TYPES.PEBBLE || d === BLOCK_TYPES.WATER) {
              this.addingTileProperties(x, y + 1, TILE_PROPERTY.LIFE, -2);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            }
            break;
          }
          case BLOCK_TYPES.LAVA: {
            l = x > 0 ? this.lookupTileType(this.getTile(x - 1, y)) : undefined;
            u = y > 0 ? this.lookupTileType(this.getTile(x, y - 1)) : undefined;
            r = x < this.totalWidth - 1 ? this.lookupTileType(this.getTile(x + 1, y)) : undefined;
            d = y < this.totalHeight - 1 ? this.lookupTileType(this.getTile(x, y + 1)) : undefined;

            if (
              l === BLOCK_TYPES.STONE ||
              l === BLOCK_TYPES.DIRT ||
              l === BLOCK_TYPES.SAND ||
              l === BLOCK_TYPES.IRON ||
              l === BLOCK_TYPES.PEBBLE ||
              l === BLOCK_TYPES.ACID
            ) {
              this.addingTileProperties(x - 1, y, TILE_PROPERTY.LIFE, -3);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            } else if (
              r === BLOCK_TYPES.STONE ||
              r === BLOCK_TYPES.DIRT ||
              r === BLOCK_TYPES.SAND ||
              r === BLOCK_TYPES.IRON ||
              r === BLOCK_TYPES.PEBBLE ||
              r === BLOCK_TYPES.ACID
            ) {
              this.addingTileProperties(x + 1, y, TILE_PROPERTY.LIFE, -3);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            } else if (
              u === BLOCK_TYPES.STONE ||
              u === BLOCK_TYPES.DIRT ||
              u === BLOCK_TYPES.SAND ||
              u === BLOCK_TYPES.IRON ||
              u === BLOCK_TYPES.PEBBLE ||
              u === BLOCK_TYPES.ACID
            ) {
              this.addingTileProperties(x, y - 1, TILE_PROPERTY.LIFE, -3);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            } else if (
              d === BLOCK_TYPES.STONE ||
              d === BLOCK_TYPES.DIRT ||
              d === BLOCK_TYPES.SAND ||
              d === BLOCK_TYPES.IRON ||
              d === BLOCK_TYPES.PEBBLE ||
              d === BLOCK_TYPES.ACID
            ) {
              this.addingTileProperties(x, y + 1, TILE_PROPERTY.LIFE, -3);
              this.addingTileProperties(x, y, TILE_PROPERTY.LIFE, -1);
              lifeTime--;
              stateChanged = true;
            }
            break;
          }
        }
        if (stateChanged) {
          this.setChunkDirty(x, y);
          continue;
        }

        // Move
        this.addingTileProperties(x, y, TILE_PROPERTY.SCALA, 2);
        scala = this.getTileProperties(x, y, TILE_PROPERTY.SCALA);
        stable = this.getTileProperties(x, y, TILE_PROPERTY.STABLE);
        falling = false;

        for (let i = 0; i < scala + BLOCK_PROPERTIES[type][1]; i++) {
          if (targetY < this.totalHeight - 1 && this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX, targetY + 1)))) {
            if (targetX < this.totalWidth - 1 && Math.random() < BLOCK_PROPERTIES[type][2]) {
              this.setTileProperties(targetX + 1, targetY, TILE_PROPERTY.STABLE, 0);
            }
            if (targetX > 0 && Math.random() < BLOCK_PROPERTIES[type][2]) {
              this.setTileProperties(targetX - 1, targetY, TILE_PROPERTY.STABLE, 0);
            }
            falling = true;
            targetY++;
          } else if (!stable && !reverse) {
            if (
              targetY < this.totalHeight - 1 &&
              targetX < this.totalWidth - 1 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX + 1, targetY + 1)))
            ) {
              targetX++;
              targetY++;
              falling = true;
            } else if (
              targetY < this.totalHeight - 1 &&
              targetX > 0 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX - 1, targetY + 1)))
            ) {
              targetX--;
              targetY++;
              falling = true;
            } else if (
              (falling || isLiquid) &&
              targetY < this.totalHeight - 1 &&
              targetX < this.totalWidth - 1 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX + 1, targetY)))
            ) {
              targetX++;
            } else if (
              (falling || isLiquid) &&
              targetY < this.totalHeight - 1 &&
              targetX > 0 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX - 1, targetY)))
            ) {
              targetX--;
            } else {
              this.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
              break;
            }
          } else if (!stable) {
            if (targetY < this.totalHeight - 1 && targetX > 0 && this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX - 1, targetY + 1)))) {
              targetX--;
              targetY++;
              falling = true;
            } else if (
              targetY < this.totalHeight - 1 &&
              targetX < this.totalWidth - 1 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX + 1, targetY + 1)))
            ) {
              targetX++;
              targetY++;
              falling = true;
            } else if (
              (falling || isLiquid) &&
              targetY < this.totalHeight - 1 &&
              targetX > 0 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX - 1, targetY)))
            ) {
              targetX--;
            } else if (
              (falling || isLiquid) &&
              targetY < this.totalHeight - 1 &&
              targetX < this.totalWidth - 1 &&
              this.compareTileDensity(type, this.lookupTileType(this.getTile(targetX + 1, targetY)))
            ) {
              targetX++;
            } else {
              this.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
              break;
            }
          } else {
            this.setTileProperties(x, y, TILE_PROPERTY.SCALA, 0);
            break;
          }
        }

        // Swap
        if (targetX !== x || targetY !== y) {
          this.setTileProperties(x, y, TILE_PROPERTY.STABLE, 0);
          this.swapTile(x, y, targetX, targetY);
        } else if (!isLiquid && targetX === x && targetY === y) {
          this.setTileProperties(x, y, TILE_PROPERTY.STABLE, 1);
        }
      }
    }
  }

  public create(x: number, y: number, width: number, height: number, splitQuantity: number = 1, chunkSize: number = 16): void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.totalWidth = width * splitQuantity;
    this.totalHeight = height * splitQuantity;
    this.splitQuantity = splitQuantity;
    this.lookupX = new Array(this.totalWidth);
    this.lookupY = new Array(this.totalHeight);
    this.chunkSize = chunkSize;
    this.chunkLookupX = new Array(this.totalWidth);
    this.chunkLookupY = new Array(this.totalHeight);
    this.tileRgbaView = [];
    this.tileBuffer = [];
    this.tileView = [];
    this.tilePropertiesBuffer = [];
    this.tilePropertiesView = [];

    const sharedArrayBufferSupported = isSharedArrayBufferSupport();

    for (let x = 0; x < this.totalWidth; x++) {
      this.chunkLookupX[x] = Math.floor(x / this.chunkSize);
    }
    for (let y = 0; y < this.totalHeight; y++) {
      this.chunkLookupY[y] = Math.floor(y / this.chunkSize) * Math.ceil(this.totalWidth / chunkSize);
    }

    if (sharedArrayBufferSupported) {
      this.chunkBuffer = new SharedArrayBuffer(Math.ceil(this.totalWidth / chunkSize) * Math.ceil(this.totalHeight / chunkSize));
      this.nextChunkBuffer = new SharedArrayBuffer(Math.ceil(this.totalWidth / chunkSize) * Math.ceil(this.totalHeight / chunkSize));
    } else {
      this.chunkBuffer = new ArrayBuffer(Math.ceil(this.totalWidth / chunkSize) * Math.ceil(this.totalHeight / chunkSize));
      this.nextChunkBuffer = new ArrayBuffer(Math.ceil(this.totalWidth / chunkSize) * Math.ceil(this.totalHeight / chunkSize));
    }
    this.chunkView = new Uint8Array(this.chunkBuffer);
    this.nextChunkView = new Uint8Array(this.nextChunkBuffer);

    for (let y = 0; y < this.splitQuantity; y++) {
      this.tileRgbaView.push([]);

      this.tileBuffer.push([]);
      this.tileView.push([]);
      this.tilePropertiesBuffer.push([]);
      this.tilePropertiesView.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        if (!sharedArrayBufferSupported) {
          this.tileBuffer[y].push(new ArrayBuffer(width * height * TILE_TYPE_BYTES));
          this.tilePropertiesBuffer[y].push(new ArrayBuffer(width * height * TILE_PROPERTIES_BYTES));
        } else {
          this.tileBuffer[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
          this.tilePropertiesBuffer[y].push(new SharedArrayBuffer(width * height * TILE_TYPE_BYTES));
        }
        this.tileRgbaView[y].push(new Uint8Array(this.tileBuffer[y][x]));

        this.tileView[y].push(new Uint32Array(this.tileBuffer[y][x]));
        this.tilePropertiesView[y].push(new Int8Array(this.tilePropertiesBuffer[y][x]));

        for (let offsetX = 0; offsetX < width; offsetX++) {
          this.lookupX[x * width + offsetX] = x;
        }
      }

      for (let offsetY = 0; offsetY < height; offsetY++) {
        this.lookupY[y * height + offsetY] = y;
      }
    }
  }

  public import(data: {
    tileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    tilePropertiesBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    chunkBuffer: ArrayBuffer | SharedArrayBuffer;
    nextChunkBuffer: ArrayBuffer | SharedArrayBuffer;
    chunkSize: number;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
  }): void {
    const { tileBuffer, tilePropertiesBuffer, chunkBuffer, nextChunkBuffer, chunkSize, x, y, width, height, splitQuantity } = data;

    this.tileRgbaView = [];
    this.chunkBuffer = chunkBuffer;
    this.nextChunkBuffer = nextChunkBuffer;
    this.tileBuffer = tileBuffer;
    this.tileView = [];
    this.tilePropertiesBuffer = tilePropertiesBuffer;
    this.tilePropertiesView = [];

    this.width = width;
    this.height = height;
    this.totalWidth = width * splitQuantity;
    this.totalHeight = height * splitQuantity;
    this.splitQuantity = splitQuantity;
    this.x = x;
    this.y = y;
    this.lookupX = new Array(this.totalWidth);
    this.lookupY = new Array(this.totalHeight);
    this.chunkSize = chunkSize;
    this.chunkLookupX = new Array(this.totalWidth);
    this.chunkLookupY = new Array(this.totalHeight);
    this.chunkView = new Uint8Array(this.chunkBuffer);
    this.nextChunkView = new Uint8Array(this.nextChunkBuffer);

    for (let x = 0; x < this.totalWidth; x++) {
      this.chunkLookupX[x] = Math.floor(x / this.chunkSize);
    }
    for (let y = 0; y < this.totalHeight; y++) {
      this.chunkLookupY[y] = Math.floor(y / this.chunkSize) * Math.ceil(this.totalWidth / chunkSize);
    }

    for (let y = 0; y < this.splitQuantity; y++) {
      this.tileRgbaView.push([]);

      this.tileView.push([]);
      this.tilePropertiesView.push([]);

      for (let x = 0; x < this.splitQuantity; x++) {
        this.tileRgbaView[y].push(new Uint8Array(this.tileBuffer[y][x]));

        this.tileView[y].push(new Uint32Array(this.tileBuffer[y][x]));
        this.tilePropertiesView[y].push(new Int8Array(this.tilePropertiesBuffer[y][x]));

        for (let offsetX = 0; offsetX < width; offsetX++) {
          this.lookupX[x * width + offsetX] = x;
        }
      }
      for (let offsetY = 0; offsetY < height; offsetY++) {
        this.lookupY[y * height + offsetY] = y;
      }
    }
  }

  public export(): {
    tileBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    tilePropertiesBuffer: Array<Array<ArrayBuffer | SharedArrayBuffer>>;
    chunkBuffer: ArrayBuffer | SharedArrayBuffer;
    nextChunkBuffer: ArrayBuffer | SharedArrayBuffer;
    x: number;
    y: number;
    width: number;
    height: number;
    splitQuantity: number;
    chunkSize: number;
  } {
    return {
      tileBuffer: this.tileBuffer,
      tilePropertiesBuffer: this.tilePropertiesBuffer,
      chunkBuffer: this.chunkBuffer,
      nextChunkBuffer: this.nextChunkBuffer,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      splitQuantity: this.splitQuantity,
      chunkSize: this.chunkSize,
    };
  }

  public lookupTileType(value: number): BLOCK_TYPES {
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.EMPTY]) === 0) return BLOCK_TYPES.EMPTY;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.IRON]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.IRON]) return BLOCK_TYPES.IRON;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.DIRT]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.DIRT]) return BLOCK_TYPES.DIRT;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.PEBBLE]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.PEBBLE]) return BLOCK_TYPES.PEBBLE;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.SAND]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.SAND]) return BLOCK_TYPES.SAND;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.WATER]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.WATER]) return BLOCK_TYPES.WATER;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.LAVA]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.LAVA]) return BLOCK_TYPES.LAVA;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.STONE]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.STONE]) return BLOCK_TYPES.STONE;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.ACID]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.ACID]) return BLOCK_TYPES.ACID;
    if ((value & BLOCK_TYPE_VALUES[BLOCK_TYPES.OBSIDIAN]) === BLOCK_TYPE_VALUES[BLOCK_TYPES.OBSIDIAN]) return BLOCK_TYPES.OBSIDIAN;

    return BLOCK_TYPES.EMPTY;
    // throw new Error(
    //   `undefined tile type ${value} / 0b${value
    //     .toString(2)
    //     .padStart(32, '0')
    //     .split('')
    //     .map((v, i) => (i < 8 ? 0 : v))
    //     .join('')}`
    // );
  }

  public isChunkDirty(x: number, y: number): boolean {
    return !!this.chunkView[this.chunkLookupY[y] + this.chunkLookupX[x]];
  }

  public setChunkDirty(x: number, y: number): void {
    if (y < this.totalHeight - 1) {
      this.chunkView[this.chunkLookupY[y + 1] + this.chunkLookupX[x]] = 1;
      this.nextChunkView[this.chunkLookupY[y + 1] + this.chunkLookupX[x]] = 1;
    }
    if (x < this.totalWidth - 1) {
      this.chunkView[this.chunkLookupY[y] + this.chunkLookupX[x + 1]] = 1;
      this.nextChunkView[this.chunkLookupY[y] + this.chunkLookupX[x + 1]] = 1;
    }
    if (y > 0) {
      this.chunkView[this.chunkLookupY[y - 1] + this.chunkLookupX[x]] = 1;
      this.nextChunkView[this.chunkLookupY[y - 1] + this.chunkLookupX[x]] = 1;
    }
    if (x > 0) {
      this.chunkView[this.chunkLookupY[y] + this.chunkLookupX[x - 1]] = 1;
      this.nextChunkView[this.chunkLookupY[y] + this.chunkLookupX[x - 1]] = 1;
    }
    this.chunkView[this.chunkLookupY[y] + this.chunkLookupX[x]] = 1;
    this.nextChunkView[this.chunkLookupY[y] + this.chunkLookupX[x]] = 1;
  }

  public updateChunks(): void {
    for (let i = 0; i < this.nextChunkView.byteLength; i++) {
      this.chunkView[i] = this.nextChunkView[i] ? 1 : 0;
      this.nextChunkView[i] = 0;
    }
  }

  public getTile(x: number, y: number): number {
    return this.tileView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)];
  }

  public setTile(x: number, y: number, value: number): void {
    this.tileView[this.lookupY[y]][this.lookupX[x]][(y % this.height) * this.width + (x % this.width)] = value;
    this.setChunkDirty(x, y);
  }

  public swapTile(x1: number, y1: number, x2: number, y2: number): void {
    [
      this.tileView[this.lookupY[y1]][this.lookupX[x1]][(y1 % this.height) * this.width + (x1 % this.width)],
      this.tileView[this.lookupY[y2]][this.lookupX[x2]][(y2 % this.height) * this.width + (x2 % this.width)],
      this.tilePropertiesView[this.lookupY[y1]][this.lookupX[x1]][((y1 % this.height) * this.width + (x1 % this.width)) * TILE_PROPERTIES_BYTES],
      this.tilePropertiesView[this.lookupY[y2]][this.lookupX[x2]][((y2 % this.height) * this.width + (x2 % this.width)) * TILE_PROPERTIES_BYTES],
      this.tilePropertiesView[this.lookupY[y1]][this.lookupX[x1]][((y1 % this.height) * this.width + (x1 % this.width)) * TILE_PROPERTIES_BYTES + 1],
      this.tilePropertiesView[this.lookupY[y2]][this.lookupX[x2]][((y2 % this.height) * this.width + (x2 % this.width)) * TILE_PROPERTIES_BYTES + 1],
      this.tilePropertiesView[this.lookupY[y1]][this.lookupX[x1]][((y1 % this.height) * this.width + (x1 % this.width)) * TILE_PROPERTIES_BYTES + 2],
      this.tilePropertiesView[this.lookupY[y2]][this.lookupX[x2]][((y2 % this.height) * this.width + (x2 % this.width)) * TILE_PROPERTIES_BYTES + 2],
    ] = [
      this.tileView[this.lookupY[y2]][this.lookupX[x2]][(y2 % this.height) * this.width + (x2 % this.width)],
      this.tileView[this.lookupY[y1]][this.lookupX[x1]][(y1 % this.height) * this.width + (x1 % this.width)],
      this.tilePropertiesView[this.lookupY[y2]][this.lookupX[x2]][((y2 % this.height) * this.width + (x2 % this.width)) * TILE_PROPERTIES_BYTES],
      this.tilePropertiesView[this.lookupY[y1]][this.lookupX[x1]][((y1 % this.height) * this.width + (x1 % this.width)) * TILE_PROPERTIES_BYTES],
      this.tilePropertiesView[this.lookupY[y2]][this.lookupX[x2]][((y2 % this.height) * this.width + (x2 % this.width)) * TILE_PROPERTIES_BYTES + 1],
      this.tilePropertiesView[this.lookupY[y1]][this.lookupX[x1]][((y1 % this.height) * this.width + (x1 % this.width)) * TILE_PROPERTIES_BYTES + 1],
      this.tilePropertiesView[this.lookupY[y2]][this.lookupX[x2]][((y2 % this.height) * this.width + (x2 % this.width)) * TILE_PROPERTIES_BYTES + 2],
      this.tilePropertiesView[this.lookupY[y1]][this.lookupX[x1]][((y1 % this.height) * this.width + (x1 % this.width)) * TILE_PROPERTIES_BYTES + 2],
    ];
    this.setChunkDirty(x1, y1);
    this.setChunkDirty(x2, y2);
  }

  public getTileProperties(x: number, y: number, index: number): number {
    return this.tilePropertiesView[this.lookupY[y]][this.lookupX[x]][((y % this.height) * this.width + (x % this.width)) * TILE_PROPERTIES_BYTES + index];
  }

  public setTileProperties(x: number, y: number, property: TILE_PROPERTY, value: number): void {
    this.tilePropertiesView[this.lookupY[y]][this.lookupX[x]][((y % this.height) * this.width + (x % this.width)) * TILE_PROPERTIES_BYTES + property] = value;
  }

  public addingTileProperties(x: number, y: number, property: TILE_PROPERTY, value: number): void {
    this.tilePropertiesView[this.lookupY[y]][this.lookupX[x]][((y % this.height) * this.width + (x % this.width)) * TILE_PROPERTIES_BYTES + property] += value;
  }

  public setTileRgba(x: number, y: number, r: number, g: number, b: number, a: number): void {
    const index = ((y % this.height) * this.width + (x % this.width)) * TILE_TYPE_BYTES;
    if (r !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 0] = r;
    if (g !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 1] = g;
    if (b !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 2] = b;
    if (a !== undefined) this.tileRgbaView[this.lookupY[y]][this.lookupX[x]][index + 3] = a;
    this.setChunkDirty(x, y);
  }

  public compareTileDensity(type: BLOCK_TYPES, compareType: BLOCK_TYPES): boolean {
    return compareType !== BLOCK_TYPES.LAVA && BLOCK_WEIGHT[type] > BLOCK_WEIGHT[compareType];
  }
}

export default Map;
