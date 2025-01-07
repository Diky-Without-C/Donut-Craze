import { ICING_VARIANT } from "@constant/Donuts/donuts-detail.json";
import Draggable from "@components/Draggable";
import { icingImages } from "@assets/toppingArea/config";
import Overlay from "@components/Overlay";

export default function Icing() {
  return (
    <div className="relative -top-20 flex h-1/2 w-full items-center justify-around">
      {ICING_VARIANT.map((icing, index) => {
        return (
          <Draggable
            key={icing.id}
            id={`icing-${index}`}
            className="flex h-32 w-16 items-center justify-center transition-all duration-500 will-change-transform"
          >
            <Overlay src={icingImages[icing.id as keyof typeof icingImages]} />
          </Draggable>
        );
      })}
    </div>
  );
}
