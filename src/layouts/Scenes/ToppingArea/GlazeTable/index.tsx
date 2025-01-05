import { GLAZE_VARIANT } from "@constant/Donuts/donuts-detail.json";
import Droppable from "@components/Droppable";
import { glazeImages } from "@assets/toppingArea/config";

export default function GlazeTable() {
  return (
    <div className="flex h-2/6 w-full items-center justify-evenly gap-2 border-4 border-b-0 border-table-border bg-table-primary">
      {GLAZE_VARIANT.map((glaze, index) => {
        return (
          <Droppable
            key={index}
            id={`glaze-${index}`}
            style={{
              backgroundImage: `url(${glazeImages[glaze.id as keyof typeof glazeImages]})`,
              backgroundSize: "100% 100%",
            }}
            className="flex size-44 shrink-0 items-center justify-center rounded-full will-change-transform"
          ></Droppable>
        );
      })}
    </div>
  );
}
