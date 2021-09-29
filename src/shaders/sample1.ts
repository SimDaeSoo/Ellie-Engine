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
uniform float uDeltatime;
uniform sampler2D u_texture;

vec4 getTextureColor(vec2 offset) {
  float b = texture2D(u_texture, (gl_FragCoord.xy + offset) / uResolution).b;
  return vec4(0.0, 0.0, b, 1.0);
}

void main() {
  vec2 coord = gl_FragCoord.xy / uResolution;
  vec4 textureColor = getTextureColor(vec2(0.0, 0.0));
  float value = coord[0] * coord[1] * uDeltatime;
  vec4 vectorValue = vec4(value, value, value, value);
  gl_FragColor = vectorValue * textureColor;
}`;

// `
// #ifdef GL_ES
// precision mediump float;
// #endif

// uniform sampler2D buffer;
// uniform vec2 scale;

// void main() {
//   int currentPositionBuffer = int(texture2D(buffer, (gl_FragCoord.xy + offset) / scale).r);

//   if (currentPositionBuffer == 0) {
//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//   } else {
//     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//   }
// }`

export { fragmentShaderGLSL, vertexShaderGLSL };
