import { ComponentProps } from "react";
import Self from "@core/classes/Donut";
import Draggable from "@components/Draggable";
import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";
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
  const { images } = useImageStore();
  const { DonutImages, GlazeImages, IcingImages, ToppingImages } =
    images as Record<string, Record<string, string>>;

  const { state } = donut.side;
  const isCooked = state !== "base";

  function getImageSrc(
    variantList: { name: string; id: string }[],
    selectedName: string | undefined,
    imageMap: Record<string, string>,
  ) {
    const id = variantList.find((v) => v.name === selectedName)?.id;
    return imageMap[id as keyof typeof imageMap];
  }

  const glazeSrc = getImageSrc(GLAZE_VARIANT, donut.glaze, GlazeImages);
  const icingSrc = getImageSrc(ICING_VARIANT, donut.icing, IcingImages);
  const toppingSrc = getImageSrc(TOPPING_VARIANT, donut.topping, ToppingImages);

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
