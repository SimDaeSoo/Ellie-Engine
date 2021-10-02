const vertexShaderGLSL = `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0, 1.0);
}`;

const fragmentShaderGLSL = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform sampler2D u_texture;

vec4 getTextureColor(vec2 offset) {
  return texture2D(u_texture, (gl_FragCoord.xy + offset) / uResolution * vec2(1.0, -1.0));
}

void main() {
  vec4 textureColor = getTextureColor(vec2(0.0, 0.0));
  gl_FragColor = textureColor;
}`;

export { fragmentShaderGLSL, vertexShaderGLSL };
