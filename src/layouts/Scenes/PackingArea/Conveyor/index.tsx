import { useEffect, useState } from "react";
import { useConveyorStore } from "@services/stores/packingAreaStore";
import Droppable from "@components/Droppable";
import Donut from "@components/Donut";
import Overlay from "@components/Overlay";
import ConveyorTrail from "./Trail";
import { useImageStore } from "@services/stores/assetsStore";

export default function Conveyor() {
  const { conveyor } = useConveyorStore();
  const [conveyorTrails, setConveyorTrails] = useState<typeof conveyor>(
    Array(conveyor.length).fill(undefined),
  );
  const [conveyorStates, setConveyorStates] = useState<boolean[]>(
    Array(conveyor.length).fill(false),
  );
  const [positions, setPositions] = useState<number[]>(
    Array(conveyor.length).fill(0),
  );

  const { images } = useImageStore();
  const { ConveyorImages } = images as { ConveyorImages: { outline: string } };

  const updateConveyorState = (index: number, isHold: boolean) => {
    setConveyorStates((self) =>
      self.map((state, i) => (i === index ? isHold : state)),
    );
  };

  useEffect(() => {
    if (needsStateSync()) {
      updateConveyorTrails();
    }
  }, [conveyor]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      updatePositions();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [positions, conveyorTrails]);

  const needsStateSync = () => {
    const activeItems = conveyor.filter(Boolean).length;
    const activeStates = conveyorTrails.filter(Boolean).length;
    return activeItems !== activeStates;
  };

  const updateConveyorTrails = () => {
    const sortedConveyor = [...conveyor]
      .sort((a, b) => {
        if (!a || !b) return -1;
        return a.time.getTime() - b.time.getTime();
      })
      .reverse();

    setConveyorTrails(sortedConveyor);
  };

  const updatePositions = () => {
    setPositions((prevPositions) =>
      prevPositions.map((position, index) => {
        const distance = (calculateDistance(index) * 100) / conveyor.length;

        if (conveyorStates[index]) {
          return position;
        }

        return Math.min(position + 0.2, distance);
      }),
    );
  };

  const calculateDistance = (currentIndex: number) => {
    const currentItem = conveyor[currentIndex];
    const targetIndex = conveyorTrails.findIndex(
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
        {conveyor.map((state, index) => (
          <div
            key={index}
            style={{
              left: `${positions[index]}%`,
            }}
            className="absolute flex h-full w-1/12"
          >
            {state && (
              <Donut
                onDraggingStart={() => updateConveyorState(index, true)}
                onDraggingEnd={() => updateConveyorState(index, false)}
                donut={state.item}
              />
            )}
          </div>
        ))}
      </Droppable>
    </div>
  );
}
