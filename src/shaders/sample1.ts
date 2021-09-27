const vertexShaderGLSL = `
#version 100
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 100.0;
}`;

const fragmentShaderGLSL = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
  gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
}`;

export { fragmentShaderGLSL, vertexShaderGLSL };
