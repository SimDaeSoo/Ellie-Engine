const vertexShaderGLSL = `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0, 1.0);
}`;

const fragmentShaderGLSL = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform sampler2D u_texture;

vec4 getTextureColor(vec2 offset) {
  return texture2D(u_texture, (gl_FragCoord.xy + offset) / u_resolution * vec2(1.0, -1.0));
}

void main() {
  vec4 textureColor = getTextureColor(vec2(0.0, 0.0));
  gl_FragColor = textureColor;
}`;

export { fragmentShaderGLSL, vertexShaderGLSL };
