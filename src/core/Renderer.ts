class Renderer {
  public gl: WebGL2RenderingContext;

  constructor(canvasID: string) {
    const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
  }

  public clear(r: number, g: number, b: number, a: number): void {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public setViewport(x: number, y: number, w: number, h: number): void {
    this.gl.viewport(x, y, w, h);
  }

  public createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram {
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
    const vertexShader = this.gl.createShader(
      this.gl.VERTEX_SHADER
    ) as WebGLShader;
    this.gl.shaderSource(vertexShader, vertexShaderGLSL);
    this.gl.compileShader(vertexShader);

    return vertexShader;
  }

  public createFragmentShader(fragmentShaderGLSL: string): WebGLShader {
    const fragmentShader = this.gl.createShader(
      this.gl.FRAGMENT_SHADER
    ) as WebGLShader;
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
  public setPixelsRenderer(
    width: number,
    height: number,
    program: WebGLProgram
  ): void {
    // Default Triangles
    const vertices = new Float32Array([
      -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1,
    ]);

    const glBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    const glPosition = this.gl.getAttribLocation(program, 'aPosition');
    this.gl.enableVertexAttribArray(glPosition);
    this.gl.vertexAttribPointer(glPosition, 2, this.gl.FLOAT, false, 0, 0);

    // Texture
    const texture = this.gl.createTexture();
    const glTexture = this.gl.getUniformLocation(program, 'uTexture');

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.uniform1i(glTexture, 0);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );

    // Resolution
    const glResolution = this.gl.getUniformLocation(program, 'uResolution');
    this.gl.uniform2f(glResolution, width, height);
  }

  public pixelsRendering(
    pixels: Uint8Array,
    width: number,
    height: number
  ): void {
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      width,
      height,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels
    );

    // Draw
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  public render(): void {}
}

export default Renderer;
