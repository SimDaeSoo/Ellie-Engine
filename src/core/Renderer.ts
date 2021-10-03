class Renderer {
  public gl: WebGL2RenderingContext;

  constructor(canvasID: string, width: number, height: number) {
    const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
  }

  public clear(r: number, g: number, b: number, a: number): void {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public setViewport(x: number, y: number, w: number, h: number): void {
    this.gl.viewport(x, y, w, h);
  }

  public createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = this.gl.createProgram() as WebGLProgram;

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);

    this.gl.linkProgram(program);

    this.gl.detachShader(program, vertexShader);
    this.gl.detachShader(program, fragmentShader);

    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);

    return program;
  }

  public createVertexShader(vertexShaderGLSL: string): WebGLShader {
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER) as WebGLShader;
    this.gl.shaderSource(vertexShader, vertexShaderGLSL);
    this.gl.compileShader(vertexShader);

    return vertexShader;
  }

  public createFragmentShader(fragmentShaderGLSL: string): WebGLShader {
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER) as WebGLShader;
    this.gl.shaderSource(fragmentShader, fragmentShaderGLSL);
    this.gl.compileShader(fragmentShader);

    return fragmentShader;
  }

  public useProgram(program: WebGLProgram): void {
    this.gl.useProgram(program);
  }

  public deleteProgram(program: WebGLProgram): void {
    this.gl.deleteProgram(program);
  }

  // Samples..
  public setPixelsRenderer(program: WebGLProgram, width: number, height: number, splitQuantity: number): void {
    // Default Triangles
    const glBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glBuffer);

    const glPosition = this.gl.getAttribLocation(program, 'a_position');
    this.gl.enableVertexAttribArray(glPosition);
    this.gl.vertexAttribPointer(glPosition, 2, this.gl.FLOAT, false, 0, 0);

    // Texture
    const texture = this.gl.createTexture();
    const glTexture = this.gl.getUniformLocation(program, 'u_texture');

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.uniform1i(glTexture, 0);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    // Resolution
    const glResolution = this.gl.getUniformLocation(program, 'u_resolution');
    this.gl.uniform2f(glResolution, width, height);

    const vertices: Array<number> = [];
    for (let y = 0; y < splitQuantity; y++) {
      for (let x = 0; x < splitQuantity; x++) {
        vertices.push(
          -1 + x * (1 / splitQuantity) * 2,
          1 - y * (1 / splitQuantity) * 2,
          -1 + (x + 1) * (1 / splitQuantity) * 2,
          1 - y * (1 / splitQuantity) * 2,
          -1 + (x + 1) * (1 / splitQuantity) * 2,
          1 - (y + 1) * (1 / splitQuantity) * 2,
          -1 + x * (1 / splitQuantity) * 2,
          1 - y * (1 / splitQuantity) * 2,
          -1 + (x + 1) * (1 / splitQuantity) * 2,
          1 - (y + 1) * (1 / splitQuantity) * 2,
          -1 + x * (1 / splitQuantity) * 2,
          1 - (y + 1) * (1 / splitQuantity) * 2
        );
      }
    }
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
  }

  public pixelsRendering(pixelGrids: Array<Array<Uint8Array>>, width: number, height: number): void {
    for (let y = 0; y < pixelGrids.length; y++) {
      for (let x = 0; x < pixelGrids[y].length; x++) {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixelGrids[y][x]);

        this.gl.drawArrays(this.gl.TRIANGLES, (y * pixelGrids[y].length + x) * 6, 6);
      }
    }
  }

  public render(): void {}
}

export default Renderer;
