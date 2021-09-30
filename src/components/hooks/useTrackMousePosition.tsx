import { useState, useEffect } from "react"

const useTrackMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const updateMousePosition = (e: MouseEvent) => {
    var canvas = document.querySelector(".CanvasClip")
    let offsetLeft = 0
    let offsetTop = 0
    if (canvas !== null && canvas instanceof HTMLElement) {
      offsetLeft = canvas ? canvas?.offsetLeft : 0
      offsetTop = canvas ? canvas?.offsetTop : 0
    }

    setMousePosition({ x: e.clientX - offsetLeft, y: e.clientY - offsetTop })
  }
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])
  return mousePosition
}

export default useTrackMousePosition
