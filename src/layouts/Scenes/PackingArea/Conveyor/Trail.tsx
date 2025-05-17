import { useRef, useEffect } from "react";
import { useImageStore } from "@services/stores/assetsStore";

export default function ConveyorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const { images } = useImageStore();
  const { ConveyorImages } = images as { ConveyorImages: { trail: string } };

  useEffect(() => {
    let animationFrameId: number;
    let position = 0;

    const animateTrail = () => {
      if (trailRef.current) {
        position = (position - 0.1) % 100;
        trailRef.current.style.transform = `translateX(${position}%)`;
      }
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute flex h-[90%] min-w-[200%] rotate-180">
      <div
        ref={trailRef}
        className="flex w-full"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
        }}
      >
        <img
          src={ConveyorImages.trail}
          className="h-full translate-x-2"
          style={{ flexShrink: 0, width: "100%" }}
        />
        <img
          src={ConveyorImages.trail}
          className="h-full"
          style={{ flexShrink: 0, width: "100%" }}
        />
      </div>
    </div>
  );
}
