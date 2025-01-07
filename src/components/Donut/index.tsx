import { ComponentProps } from "react";
import Self from "@core/classes/Donut";
import Draggable from "@components/Draggable";
import Overlay from "@components/Overlay";
import {
  DonutImages,
  GlazeImages,
  IcingImages,
  ToppingImages,
} from "@assets/Donut/config";
import {
  GLAZE_VARIANT,
  ICING_VARIANT,
  TOPPING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";

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

  const glazeId = GLAZE_VARIANT.find(
    (variant) => variant.name === donut.glaze,
  )?.id;
  const glazeSrc = GlazeImages[glazeId as keyof typeof GlazeImages];

  const icingId = ICING_VARIANT.find(
    (variant) => variant.name === donut.icing,
  )?.id;
  const icingSrc = IcingImages[icingId as keyof typeof IcingImages];

  const toppingId = TOPPING_VARIANT.find(
    (variant) => variant.name === donut.topping,
  )?.id;
  const toppingSrc = ToppingImages[toppingId as keyof typeof ToppingImages];

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
      {donut.glaze && (
        <Overlay src={glazeSrc} className="h-[115%] min-w-[115%] shrink-0" />
      )}
      {donut.icing && (
        <Overlay src={icingSrc} className="h-[115%] min-w-[115%] shrink-0" />
      )}
      {donut.topping && (
        <Overlay src={toppingSrc} className="h-[115%] min-w-[115%] shrink-0" />
      )}
    </Draggable>
  );
}
