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

void main() {
  vec2 coord = gl_FragCoord.xy / uResolution;
  gl_FragColor = vec4(coord[0] * uDeltatime, coord[0] * uDeltatime, coord[0] * uDeltatime, 1.0);
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
