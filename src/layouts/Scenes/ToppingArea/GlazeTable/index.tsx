import { GLAZE_VARIANT } from "@constant/Donuts/donuts-detail.json";
import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import { tableImages, glazeImages } from "@assets/toppingArea/config";

export default function GlazeTable() {
  return (
    <div className="relative flex h-2/6 w-full items-center justify-evenly gap-2">
      <Overlay src={tableImages.glaze} className="h-full w-full" />

      {GLAZE_VARIANT.map((glaze, index) => {
        return (
          <Droppable
            key={index}
            id={`glaze-${index}`}
            className="relative flex size-44 shrink-0 items-center justify-center rounded-full"
          >
            <Overlay src={glazeImages[glaze.id as keyof typeof glazeImages]} />
          </Droppable>
        );
      })}
    </div>
  );
}
