import React from 'react';
import { Surface } from 'gl-react-dom';
import { Shaders, Node, GLSL } from 'gl-react';
import Stats from 'stats.js';

import useGetWindowSize from '../hooks/useGetWindowSize';
// import useTrackMousePosition from '../hooks/useTrackMousePosition';

const fragment = require('./shaders/TheBookOfShaders/frag.glsl');

const shaders = Shaders.create({
  practice: {
    frag: GLSL`${fragment.default}`
  }
});

// let payload = 0;

const TheBookOfShaders: React.FC<{ stats: Stats }> = ({ stats }) => {
  const { width, height } = useGetWindowSize();
  // const { x, y } = useTrackMousePosition();
  // const requestRef = useRef(0);

  // timer for animate
  // const [timer, setTimer] = useState(0);
  // const animate = useCallback(() => {
  //   stats.begin();
  //   payload += 0.018;
  //   setTimer(payload);
  //   stats.end();
  //   requestRef.current = window.requestAnimationFrame(animate);
  // }, []);
  // useEffect(() => {
  //   requestRef.current = window.requestAnimationFrame(animate);
  //   return () => window.cancelAnimationFrame(requestRef.current);
  // }, [animate]);
  return (
    <Surface width={400} height={400}>
      <Node
        shader={shaders.practice}
        uniforms={{
          // u_time: timer,
          // u_mouse: [x, y],
          u_resolution: [width, height]
        }}
      />
    </Surface>
  );
};

export default TheBookOfShaders;