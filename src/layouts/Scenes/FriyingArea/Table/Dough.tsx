import { useEffect, useState } from "react";
import { DOUGH } from "@constant/Donuts/donuts-detail.json";
import {
  useDoughStore,
  useShapedDoughStore,
} from "@services/stores/fryingAreaStore";
import Draggable from "@components/Draggable";
import Droppable from "@components/Droppable";
import Donut from "@components/Donut";
const { color_variant } = DOUGH;

interface DoughGridsProps {
  grid: {
    isVisible: boolean;
    isMolded: boolean;
  }[];
  isDelay: boolean;
}

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

  return (
    <Draggable
      id="dough"
      condition={!isOnTable}
      className={`${
        isFlattened
          ? "absolute h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-3xl transition-all duration-[1200ms]"
          : "size-24 rounded-full"
      } ${areAllMolded && "transition-colors duration-1000"} p-4`}
      style={{
        backgroundColor: areAllMolded ? "transparent" : color_variant.base,
      }}
    >
      <Droppable
        id="inside-dough"
        className="relative flex h-full w-full flex-wrap justify-center gap-x-4 gap-y-2"
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

function DoughGrids({ grid, isDelay }: DoughGridsProps) {
  const areAllMolded = grid.every((state) => state.isMolded);

  return grid.map(({ isVisible, isMolded }, i) => (
    <Droppable
      key={i}
      id={`dough-${i}`}
      className={`${
        (isVisible || isMolded) && !isDelay ? "opacity-100" : "opacity-0"
      } ${
        isMolded
          ? "border-[0.4rem] border-solid border-white before:absolute before:size-8 before:rounded-full before:border-[0.4rem] before:border-inherit"
          : "border-[0.4rem] border-dashed border-white"
      } ${
        areAllMolded && "border-opacity-0 transition-colors duration-300"
      } flex size-24 items-center justify-center rounded-full`}
    ></Droppable>
  ));
}

function ShapedDough() {
  const { dough } = useDoughStore();
  const { shapedDough } = useShapedDoughStore();
  const areAllMolded = dough.grid.every((state) => state.isMolded);

  return (
    <div className="absolute flex h-full w-full flex-wrap justify-center gap-x-4 gap-y-2">
      {shapedDough.map((donut, i) => {
        return (
          areAllMolded && (
            <div key={i} className="flex size-24 items-center justify-center">
              {donut && <Donut donut={donut} />}
            </div>
          )
        );
      })}
    </div>
  );
}
