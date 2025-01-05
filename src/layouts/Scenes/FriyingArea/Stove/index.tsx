import { useEffect, useState, useRef } from "react";
import { DOUGH } from "@constant/Donuts/donuts-detail.json";
import { useStoveStore } from "@services/stores/fryingAreaStore";
import Droppable from "@components/Droppable";
import Donut from "@components/Donut";
import { StoveImage } from "@assets/FryingArea/config";
import Overlay from "@components/Overlay";

export default function Stove() {
  const { stoveSlot } = useStoveStore();
  const [fryingStates, setFryingStates] = useState<boolean[]>(
    Array(stoveSlot.length).fill(true),
  );

  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  const updateFryingState = (index: number, isFrying: boolean) => {
    setFryingStates((self) =>
      self.map((state, i) => (i === index ? isFrying : state)),
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((self) => {
        const newTime = self >= 100 ? 0 : self + 1;
        timeRef.current = newTime;
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [stoveSlot]);

  useEffect(() => {
    stoveSlot.forEach((donut, index) => {
      if (!donut) return;

      const { time: doughTime } = DOUGH;
      const { side } = donut;

      if (side.time >= 60) return;

      if (fryingStates[index]) {
        side.time += 0.1;
      }

      if (side.time >= doughTime.cooked) {
        side.state = "cooked";
      }

      if (side.time >= doughTime.over_cooked) {
        side.state = "over_cooked";
      }

      if (side.time >= doughTime.burned) {
        side.state = "burned";
      }
    });
  }, [time]);

  return (
    <Droppable
      id="stove"
      className="relative flex h-3/5 w-11/12 justify-center"
    >
      <Overlay src={StoveImage} className="h-[90%] min-w-[104%]" />

      <div className="relative flex h-3/4 w-full justify-center p-5">
        <div className="relative top-5 flex h-full w-full flex-wrap gap-y-2">
          {stoveSlot.map((donut, index) => {
            const isFrying = fryingStates[index];

            return (
              <div key={index} className="flex h-1/2 w-3/12">
                {donut && (
                  <div
                    className={`${isFrying && "frying"} flex h-full w-full justify-center`}
                  >
                    <Donut
                      onDraggingStart={() => updateFryingState(index, false)}
                      onDraggingEnd={() => updateFryingState(index, true)}
                      donut={donut}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Droppable>
  );
}
