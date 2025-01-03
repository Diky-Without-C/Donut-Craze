import { ComponentProps } from "react";
import Self from "@core/classes/Donut";
import { DOUGH } from "@constant/Donuts/donuts-detail.json";
import Draggable from "@components/Draggable";

const { color_variant } = DOUGH;

interface DonutProps extends ComponentProps<"div"> {
  donut: Self;
  onDraggingStart?: () => void;
  onDraggingEnd?: () => void;
}

export default function Donut({
  donut,
  className,
  onDraggingStart,
  onDraggingEnd,
  ...props
}: DonutProps) {
  const { color } = donut.side;
  const isCooked = color !== color_variant.base;
  const size = 92;
  const holeSize = 0.3;
  const outerRadius = size / 2;
  const innerRadius = outerRadius * holeSize;
  const center = size / 2;

  const donutPath = `
    M ${center},${center - outerRadius} 
    A ${outerRadius},${outerRadius} 0 1,1 ${center},${center + outerRadius}
    A ${outerRadius},${outerRadius} 0 1,1 ${center},${center - outerRadius}
    M ${center},${center - innerRadius}
    A ${innerRadius},${innerRadius} 0 1,0 ${center},${center + innerRadius}
    A ${innerRadius},${innerRadius} 0 1,0 ${center},${center - innerRadius}
    Z
  `;

  return (
    <Draggable
      {...props}
      id={donut.id}
      onDraggingStart={onDraggingStart}
      onDraggingEnd={onDraggingEnd}
      className="flex items-center justify-center transition-all duration-500"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`${isCooked && "scale-[1.05]"} shrink-0 transition-all duration-500 ${className}`}
      >
        <path
          d={donutPath}
          fill={color}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span>{donut.glaze}</span>
        <span>{donut.icing}</span>
        <span>{donut.topping}</span>
      </div>
    </Draggable>
  );
}
