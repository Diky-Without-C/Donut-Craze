import { GLAZE_VARIANT } from "@constant/Donuts/donuts-detail.json";
import Droppable from "@components/Droppable";

export default function GlazeTable() {
  return (
    <div className="relative flex h-2/6 w-full items-center justify-evenly gap-2 bg-sky-600">
      {GLAZE_VARIANT.map((glaze, index) => {
        return (
          <Droppable
            key={index}
            id={`glaze-${index}`}
            className="relative flex size-44 shrink-0 items-center justify-center rounded-full bg-lime-500"
          >
            {glaze.name}
          </Droppable>
        );
      })}
    </div>
  );
}
