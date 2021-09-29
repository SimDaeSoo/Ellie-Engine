import { fragmentShaderGLSL, vertexShaderGLSL } from '../shaders/sample1';

class Renderer {
  public gl: WebGL2RenderingContext;
  public program: WebGLProgram;
  public vertexShader: WebGLShader;
  public fragmentShader: WebGLShader;
  public width: number;
  public height: number;

  constructor(gl: WebGL2RenderingContext, width: number, height: number) {
    this.gl = gl;
    this.width = width;
    this.height = height;
    this.gl.viewport(0, 0, this.width, this.height);

    this.vertexShader = this.gl.createShader(
      this.gl.VERTEX_SHADER
    ) as WebGLShader;
    this.gl.shaderSource(this.vertexShader, vertexShaderGLSL);
    this.gl.compileShader(this.vertexShader);

    this.fragmentShader = this.gl.createShader(
      this.gl.FRAGMENT_SHADER
    ) as WebGLShader;
    this.gl.shaderSource(this.fragmentShader, fragmentShaderGLSL);
    this.gl.compileShader(this.fragmentShader);

    this.program = this.gl.createProgram() as WebGLProgram;
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);

    this.debug();

    this.gl.detachShader(this.program, this.vertexShader);
    this.gl.detachShader(this.program, this.fragmentShader);
    this.gl.deleteShader(this.vertexShader);
    this.gl.deleteShader(this.fragmentShader);

    // draw
    const vertices = new Float32Array([
      -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1,
    ]);

    const glBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, glBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    const glPosition = this.gl.getAttribLocation(this.program, 'aPosition');
    this.gl.enableVertexAttribArray(glPosition);
    this.gl.vertexAttribPointer(glPosition, 2, this.gl.FLOAT, false, 0, 0);

    const texture = this.gl.createTexture();
    const glTexture = this.gl.getUniformLocation(this.program, 'uTexture');
    const rgba = new Uint8Array([0, 0, 255, 255]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      1,
      1,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      rgba
    );
    this.gl.uniform1i(glTexture, 0);

    this.gl.useProgram(this.program);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    const glResolution = this.gl.getUniformLocation(
      this.program,
      'uResolution'
    );
    this.gl.uniform2f(glResolution, this.width, this.height);
  }

  public render(): void {
    const dt = Math.sin(((Date.now() % 2000) / 1000) * Math.PI);
    const glDeltatime = this.gl.getUniformLocation(this.program, 'uDeltatime');
    this.gl.uniform1f(glDeltatime, dt);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  public debug(): void {
    if (
      !this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)
    ) {
      console.log(this.gl.getShaderInfoLog(this.vertexShader));
    }

    if (
      !this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)
    ) {
      console.log(this.gl.getShaderInfoLog(this.fragmentShader));
    }

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.log(this.gl.getProgramInfoLog(this.program));
    }
  }
}

export default Renderer;

/*
gl.uniform1f (floatUniformLoc, v);                 // float
gl.uniform1fv(floatUniformLoc, [v]);               // float 또는 float 배열
gl.uniform2f (vec2UniformLoc, v0, v1);             // vec2
gl.uniform2fv(vec2UniformLoc, [v0, v1]);           // vec2 또는 vec2 배열
gl.uniform3f (vec3UniformLoc, v0, v1, v2);         // vec3
gl.uniform3fv(vec3UniformLoc, [v0, v1, v2]);       // vec3 또는 vec3 배열
gl.uniform4f (vec4UniformLoc, v0, v1, v2, v4);     // vec4
gl.uniform4fv(vec4UniformLoc, [v0, v1, v2, v4]);   // vec4 또는 vec4 배열
 
gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 또는 mat2 배열
gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 또는 mat3 배열
gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 또는 mat4 배열
 
gl.uniform1i (intUniformLoc, v);                   // int
gl.uniform1iv(intUniformLoc, [v]);                 // int 또는 int 배열
gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 또는 ivec2 배열
gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 또는 ivec3 배열
gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 또는 ivec4 배열
 
gl.uniform1i (sampler2DUniformLoc, v);             // sampler2D (texture)
gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 또는 sampler2D 배열
 
gl.uniform1i (samplerCubeUniformLoc, v);           // samplerCube (texture)
gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 또는 samplerCube 배열
*/
