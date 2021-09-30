#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform float time;
uniform vec2 mouse;
float twopi = 6.28318530718;

uniform float aspect;
uniform sampler2D image;
uniform sampler2D image2;

// clang-format off
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d);
// clang-format on

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                * 43758.5453123);
}

float circle(in vec2 _st, in float _radius){
    vec2 minus = vec2(0.5);
    // float aspect = resolution.y/resolution.x; 
    // minus.x /= aspect;
	
    // vec2 dist = _st - minus;
    
    //
    vec2 dist = _st - _radius;
    dist.x -= mouse.x;
    dist.y += mouse.y - 1.;

    dist.x *= aspect;

    // шумим круг
    _radius += cnoise2(uv*1000.)*0.07;
    
	return 1.-smoothstep(_radius-(_radius*0.001),
                         _radius+(_radius*0.001),
                         dot(dist,dist));
}

void main() {
    vec4 image1 = texture2D(image, uv);
    vec4 image2 = texture2D(image2, uv);

    // float f = fract(time);  // fraction
    // float y = mix(fract(f), fract(1.0-f), fract(f));

    // gl_FragColor = mix(image1, image2, y);
    vec2 moduv = uv;
    // moduv += cnoise2(vec2(time*uv.y*100.));
    // moduv += cnoise2(moduv*1000.)*0.075;
    // gl_FragColor = vec4(moduv,1.0, 1.0);

    // moduv.y *= aspect;

    float circular = circle(uv,0.5);
    // circular += cnoise2(uv);
    // circular += cnoise2(uv*100.);

    // float circular = circle(moduv,2.5);
    // float circular = circle(uv,0.01);
    // float circular = circle(uv,0.01)*cnoise2(uv)*100.;
    
    gl_FragColor = mix(image1, image2, circular);
    // gl_FragColor = mix(image1, image2, moduv.x > mouse.x ? 1. : 0.);
}
