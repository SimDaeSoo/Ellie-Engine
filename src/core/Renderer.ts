const vertexShaderGLSL = `
#version 100
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 64.0;
}`;

const fragmentShaderGLSL = `
#version 100
void main() {
  gl_FragColor = vec4(0.18, 0.54, 0.34, 1.0);
}`;

class Renderer {
  constructor(gl: WebGL2RenderingContext) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(vertexShader, vertexShaderGLSL);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fragmentShader, fragmentShaderGLSL);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram() as WebGLProgram;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    // initialize
    gl.enableVertexAttribArray(0);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);

    // draw
    gl.useProgram(program);
    gl.drawArrays(gl.POINTS, 0, 1);

    // clean
    gl.useProgram(null);
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
  }
}

export default Renderer;