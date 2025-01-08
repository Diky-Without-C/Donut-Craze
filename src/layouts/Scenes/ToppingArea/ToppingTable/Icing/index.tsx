import { useState } from "react";
import { ICING_VARIANT } from "@constant/Donuts/donuts-detail.json";
import Draggable from "@components/Draggable";
import { icingImages } from "@assets/toppingArea/config";
import Overlay from "@components/Overlay";

export default function Icing() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="relative -top-20 flex h-1/2 w-full items-center justify-around">
      {ICING_VARIANT.map((icing, index) => (
        <Draggable
          key={icing.id}
          id={`icing-${index}`}
          onDraggingStart={() => setSelected(index)}
          onDraggingEnd={() => setSelected(null)}
          className="relative flex h-32 w-16 items-center justify-center"
        >
          <Overlay
            src={icingImages[icing.id as keyof typeof icingImages]}
            className={`${selected === index ? "rotate-180" : "rotate-0"} transition-all duration-200`}
          />
        </Draggable>
      ))}
    </div>
  );
}
