const vertexShaderGLSL = `
#version 100
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 200.0;
}`;

const fragmentShaderGLSL = `
#ifdef GL_ES
precision mediump float;
#endif

vec3 red() {
  return vec3(1.0, 0., 0.);
}

void main() {
	gl_FragColor = vec4(red(), 1.0);
}`;

export { fragmentShaderGLSL, vertexShaderGLSL };
