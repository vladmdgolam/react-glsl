import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Surface } from 'gl-react-dom';
import { Shaders, Node, GLSL } from 'gl-react';
import Stats from 'stats.js';

import useGetWindowSize from '../hooks/useGetWindowSize';

const fragment = require('./shaders/GLSLPractice/frag.glsl');

const shaders = Shaders.create({
  practice: {
    frag: GLSL`${fragment.default}`
  }
});

let payload = 0;

const GLSLPractice: React.FC<{ stats: Stats }> = ({ stats }) => {
  const { width, height } = useGetWindowSize();
  const requestRef = useRef(0);

  // timer for animate
  const [timer, setTimer] = useState(0);
  const animate = useCallback(() => {
    stats.begin();
    payload += 0.018;
    setTimer(payload);
    stats.end();
    requestRef.current = window.requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, [animate]);
  return (
    <Surface width={400} height={400}>
      <Node
        shader={shaders.practice}
        uniforms={{
          t: timer,
          r: [width, height]
        }}
      />
    </Surface>
  );
};

export default GLSLPractice;