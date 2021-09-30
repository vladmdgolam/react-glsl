import React, { useState, useEffect, useCallback, useRef } from "react"
import { Surface } from "gl-react-dom"
import { Shaders, Node, GLSL } from "gl-react"
import Stats from "stats.js"

// import useGetWindowSize from "../hooks/useGetWindowSize"
import useTrackMousePosition from "../hooks/useTrackMousePosition"

const fragment = require("./shaders/my/frag2.glsl")

const shaders = Shaders.create({
  practice: {
    frag: GLSL`${fragment.default}`,
  },
})

let payload = 0

// const ImageShader: React.FC<{ stats: Stats }> = ({ stats }) => {
const ImageShader: React.FC<{ stats: Stats }> = ({ stats }) => {
  const { x, y } = useTrackMousePosition()
  const requestRef = useRef(0)

  // image

  // timer for animate
  const [timer, setTimer] = useState(0)
  const animate = useCallback(() => {
    stats.begin()
    payload += 0.018
    setTimer(payload)
    stats.end()
    requestRef.current = window.requestAnimationFrame(animate)
  }, [stats])
  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(requestRef.current)
  }, [animate])

  // const image = process.env.PUBLIC_URL + "/images/1.png"
  // console.log(image.width)

  const width = 572
  const height = 1234

  return (
    <Surface width={width/2} height={height/2}>
      <Node
        shader={shaders.practice}
        uniforms={{
          time: timer,
          mouse: [x*2 / width, y*2 / height],
          image: process.env.PUBLIC_URL + "/images/1.png",
          image2: process.env.PUBLIC_URL + "/images/2.png",
          aspect: 572/1234
        }}
      />
    </Surface>
  )
}

export default ImageShader
