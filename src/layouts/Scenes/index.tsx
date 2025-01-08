import { useEffect, useRef, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import useDragHandlers from "@hooks/useDragHandlers";
import CashierArea from "./CashierArea";
import FriyingArea from "./FriyingArea";
import PackingArea from "./PackingArea";
import ToppingArea from "./ToppingArea";
import Arrow from "@components/Arrow";

export default function Scene() {
  const [isOnPantry, setIsOnPantry] = useState(false);
  const { handleDragEnd, handleDragMove } = useDragHandlers();

  const pantryAreaRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToMiddle = () => {
      if (pantryAreaRef.current) {
        const middlePosition = pantryAreaRef.current.scrollWidth / 3;
        pantryAreaRef.current.scrollLeft = middlePosition;
      }
    };
    if (isOnPantry) scrollToMiddle();

    const scrollVertical = () => {
      if (sceneRef.current) {
        const targetScroll = isOnPantry ? sceneRef.current.scrollHeight : 0;

        sceneRef.current.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    };
    scrollVertical();
  }, [isOnPantry]);

  return (
    <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
      <section
        ref={sceneRef}
        className="h-[calc(100%-4rem)] w-full overflow-hidden"
      >
        <section className="relative h-full w-full">
          <CashierArea />
        </section>
        <section
          ref={pantryAreaRef}
          className="scrollbar relative flex h-full w-full overflow-x-auto"
        >
          <section className="absolute flex min-h-full w-[300%] overflow-hidden">
            <FriyingArea />
            <ToppingArea />
            <PackingArea />
          </section>
        </section>
      </section>

      <Arrow
        onClick={() => setIsOnPantry((prev) => !prev)}
        direction={isOnPantry ? "top" : "bottom"}
      ></Arrow>
    </DndContext>
  );
}
