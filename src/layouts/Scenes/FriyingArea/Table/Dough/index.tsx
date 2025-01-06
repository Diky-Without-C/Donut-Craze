import { useEffect, useState } from "react";
import { DOUGH } from "@constant/Donuts/donuts-detail.json";
import { useDoughStore } from "@services/stores/fryingAreaStore";
import Draggable from "@components/Draggable";
import Droppable from "@components/Droppable";
import DoughGrids from "./Grid";
import ShapedDough from "./ShapedDough";

const { color_variant } = DOUGH;

export default function Dough() {
  const [isDelay, setIsDelay] = useState(true);
  const { dough } = useDoughStore();
  const { isOnTable, isFlattened, grid } = dough;
  const areAllMolded = grid.every((state) => state.isMolded);

  useEffect(() => {
    if (isFlattened) {
      const timeout = setTimeout(() => setIsDelay(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [isFlattened]);

  const size = isFlattened
    ? "absolute h-[14rem] w-[30rem] rounded-3xl transition-all duration-[1200ms]"
    : isOnTable
      ? "size-28 rounded-full"
      : "h-[5.5rem] w-[7rem] rounded-[3rem]";

  const backgroundColor = areAllMolded ? "transparent" : color_variant.base;

  return (
    <Draggable
      id="dough"
      condition={!isOnTable}
      className={`${size} ${areAllMolded && "transition-colors duration-1000"} p-4`}
      style={{ backgroundColor }}
    >
      <Droppable
        id="inside-dough"
        className="relative flex h-full w-full flex-wrap items-center justify-center gap-x-4 gap-y-2"
      >
        {isFlattened && (
          <>
            <DoughGrids grid={grid} isDelay={isDelay} />
            <ShapedDough />
          </>
        )}
      </Droppable>
    </Draggable>
  );
}
