export const vertexShader = `
precision highp float;

uniform float uTime;
uniform float uSpeed;

uniform vec2 uViewportSizes;
uniform float uStrength;
uniform float uMobile;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 p = position;

  p.z = (sin(p.x * 4.0 + uTime) * 0.5 + cos(p.y * 2.0 + uTime) * 0.5) * (0.1 + uSpeed * 0.5);

  vec4 newPosition = modelViewMatrix * vec4(p, 1.0);

  newPosition.z += sin(newPosition.x / uViewportSizes.x * uMobile / 2.0) * abs(uStrength);

  gl_Position = projectionMatrix * newPosition;
}
`;