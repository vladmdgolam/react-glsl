#ifdef GL_ES
precision mediump float;
#endif

varying vec2 uv;
uniform float time;
uniform vec2 u_mouse;
float twopi = 6.28318530718;

// clang-format off
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d);
// clang-format on

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                * 43758.5453123);
}

void main() {
    vec2 st = uv;
    vec3 clrs[4];
        clrs[0] = vec3(0.945,0.616,0.412);
        // clrs[1] = vec3(0.188,0.192,0.204);
        clrs[1] = vec3(1.);
        clrs[2] = vec3(0.714,0.714,0.875);
        clrs[3] = vec3(0.816,0.8,0.69);
    // float color = 0.0;
    // gl_FragColor = vec4(hey, 1.0);

    // vec3 hey = vec3(snoise3(vec3(uv*100., 1.0)));
    
    // float m = 1.0; // multiplier
    // float coeff = -m*uv.y+m;

    // float parabola = -pow(uv.y, 2.) + 1.;

    // float func = 1. - 1.5*abs(sin(time)-uv.y);
    // st += cnoise2(st*400.) * 0.075 * (func > 0. ? func : 0.)*(abs(0.5-cos(time)));
    float func = 1. - 1.5*abs((1.0-u_mouse.y/500.)-uv.y);
    // st += cnoise2(st*400.) * 0.075 * (func > 0. ? func : 0.)*(abs(0.5-u_mouse.x/500.));
    // st += cnoise2(st*(350.+50.*sin(time))) * 0.075 * (func > 0. ? func : 0.)*(abs(0.5-u_mouse.x/500.));
    st += cnoise2(st*(350.+50.*random(vec2(time,time)))) * 0.075 * (func > 0. ? func : 0.)*(abs(0.5-u_mouse.x/500.));

    // st += cnoise2(st*1000.)*0.075*sin(twopi*0.5*(uv.y) + twopi*0.25*sin(time) - twopi*0.25);
    // st += cnoise2(st*1000.)*0.075*uv.y;
    vec3 color = st.x > 0.5 ? clrs[0] : clrs[1];

    gl_FragColor = vec4(color, 1.0);
}
