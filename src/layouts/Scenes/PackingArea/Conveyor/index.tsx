import { useEffect, useState } from "react";
import { useConveyorStore } from "@services/stores/packingAreaStore";
import Droppable from "@components/Droppable";
import Donut from "@components/Donut";
import Overlay from "@components/Overlay";
import { ConveyorImages } from "@assets/PackingArea/config";
import ConveyorTrail from "./Trail";

export default function Conveyor() {
  const { conveyor } = useConveyorStore();
  const [conveyorStates, setConveyorStates] = useState(() =>
    Array(conveyor.length).fill(undefined),
  );

  useEffect(() => {
    if (needsStateSync()) {
      updateConveyorStates();
    }
  }, [conveyor]);

  const needsStateSync = (): boolean => {
    const activeItems = conveyor.filter(Boolean).length;
    const activeStates = conveyorStates.filter(Boolean).length;
    return activeItems !== activeStates;
  };

  const updateConveyorStates = () => {
    const sortedConveyor = [...conveyor]
      .sort((a, b) => {
        if (!a || !b) return -1;
        return a.time.getTime() - b.time.getTime();
      })
      .reverse();

    setConveyorStates(sortedConveyor);
  };

  const calculateDistance = (currentIndex: number): number => {
    const currentItem = conveyor[currentIndex];
    const targetIndex = conveyorStates.findIndex(
      (state) => state?.item.id === currentItem?.item.id,
    );
    return currentItem ? targetIndex : 0;
  };

  return (
    <div className="relative z-10 flex h-3/5 w-10/12 -translate-x-[20%] items-center justify-center p-2">
      <div className="absolute flex h-full w-full items-center justify-end overflow-hidden">
        <ConveyorTrail />
      </div>
      <Overlay src={ConveyorImages.outline} className="h-[105%] min-w-[102%]" />

      <Droppable
        id="conveyor"
        className="relative flex h-full w-full items-center"
      >
        {conveyor.map((state, index) => {
          const distance = calculateDistance(index) * 100;
          const duration = state ? 1500 : 0;

          return (
            <div
              key={index}
              style={{
                transform: `translateX(${distance}%)`,
                transition: `transform ${duration}ms linear`,
              }}
              className="absolute flex h-full w-1/12"
            >
              {state && <Donut donut={state.item} />}
            </div>
          );
        })}
      </Droppable>
    </div>
  );
}
