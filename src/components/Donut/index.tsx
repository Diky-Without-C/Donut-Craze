import { ComponentProps } from "react";
import Self from "@core/classes/Donut";
import Draggable from "@components/Draggable";
import Overlay from "@components/Overlay";
import { DonutImages } from "@assets/Donut/config";

interface DonutProps extends ComponentProps<"div"> {
  donut: Self;
  condition?: boolean;
  onDraggingStart?: () => void;
  onDraggingEnd?: () => void;
}

export default function Donut({
  donut,
  condition,
  className,
  onDraggingStart,
  onDraggingEnd,
  ...props
}: DonutProps) {
  const { state } = donut.side;
  const isCooked = state !== "base";

  return (
    <Draggable
      {...props}
      id={donut.id}
      condition={condition}
      onDraggingStart={onDraggingStart}
      onDraggingEnd={onDraggingEnd}
      className={`${isCooked ? "scale-105" : "scale-90"} flex size-24 items-center justify-center transition-all duration-1000 will-change-transform ${className}`}
    >
      <Overlay
        src={DonutImages[state as keyof typeof DonutImages]}
        className="h-[115%] min-w-[115%] shrink-0"
      />

      <div className="absolute flex flex-col items-center">
        <span>{donut.glaze}</span>
        <span>{donut.icing}</span>
        <span>{donut.topping}</span>
      </div>
    </Draggable>
  );
}
