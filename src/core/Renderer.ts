import { fragmentShaderGLSL, vertexShaderGLSL } from '../shaders/sample1';

class Renderer {
  public gl: WebGL2RenderingContext;
  public program: WebGLProgram;
  public vertexShader: WebGLShader;
  public fragmentShader: WebGLShader;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;

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
    this.gl.detachShader(this.program, this.vertexShader);
    this.gl.detachShader(this.program, this.fragmentShader);
    this.gl.deleteShader(this.vertexShader);
    this.gl.deleteShader(this.fragmentShader);

    // draw
    this.gl.useProgram(this.program);
  }

  public render(): void {
    const uTime = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(uTime, (Date.now() % 1000) / 1000);
    this.gl.drawArrays(this.gl.POINTS, 0, 1);
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
