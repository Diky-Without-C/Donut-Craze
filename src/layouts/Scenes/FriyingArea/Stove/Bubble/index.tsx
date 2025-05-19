import { useEffect, useRef } from "react";
import Bubbles from "./bubble";

export default function Bubble() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Bubbles(canvasRef.current);
      console.log("");
    }
  }, []);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      ref={canvasRef}
    ></canvas>
  );
}
