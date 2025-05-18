import { useEffect, useRef, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import useDragHandlers from "@hooks/useDragHandlers";
import Button from "@components/Button";
import CashierArea from "./CashierArea";
import FriyingArea from "./FriyingArea";
import PackingArea from "./PackingArea";
import ToppingArea from "./ToppingArea";
import Transition from "./Transition";

export default function Scene() {
  const [isOnPantry, setIsOnPantry] = useState(false);
  const [shouldShowPantry, setShouldShowPantry] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const pantryRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  const { handleDragEnd, handleDragMove } = useDragHandlers();

  const togglePantryView = () => {
    setIsOnPantry((prev) => !prev);
    setTransitionKey((prev) => prev + 1);

    const timeout = setTimeout(() => {
      setShouldShowPantry(!isOnPantry);
    }, 600);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    if (isOnPantry && pantryRef.current) {
      const middle = pantryRef.current.scrollWidth / 3;
      pantryRef.current.scrollLeft = middle;
    }
  }, [isOnPantry]);

  useEffect(() => {
    const pantry = pantryRef.current;
    if (!pantry) return;

    const onWheel = (e: WheelEvent) => {
      if (isOnPantry && e.deltaY !== 0) {
        e.preventDefault();
        pantry.scrollLeft += e.deltaY;
      }
    };

    pantry.addEventListener("wheel", onWheel, { passive: false });
    return () => pantry.removeEventListener("wheel", onWheel);
  }, [isOnPantry]);

  return (
    <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
      <section
        ref={sceneRef}
        className="relative h-[calc(100%-4rem)] w-full overflow-hidden"
      >
        {transitionKey > 0 && <Transition key={transitionKey} />}

        <section
          className={`${shouldShowPantry ? "hidden" : "block"} relative h-full w-full`}
        >
          <CashierArea />
        </section>

        <section
          ref={pantryRef}
          className="scrollbar relative h-full w-full overflow-x-auto"
        >
          <section className="ceramic-pattern absolute flex min-h-full w-[300%] overflow-hidden">
            <FriyingArea />
            <ToppingArea />
            <PackingArea />
          </section>
        </section>
      </section>

      <Button onClick={togglePantryView} />
    </DndContext>
  );
}
