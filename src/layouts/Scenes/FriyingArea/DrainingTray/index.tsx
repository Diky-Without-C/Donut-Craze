import { useDrainingStore } from "@services/stores/fryingAreaStore";
import Droppable from "@components/Droppable";
import Donut from "@components/Donut";

export default function DrainingTray() {
  const { drainingTray } = useDrainingStore();

  return (
    <Droppable
      id="draining-tray"
      className="flex h-2/5 w-11/12 items-center justify-center px-2 py-2"
    >
      <div className="flex h-full w-full flex-row-reverse flex-wrap rounded-lg border-[0.5rem] border-stone-400 bg-stone-600 px-2">
        {drainingTray.map((donut, index) => {
          return (
            <div
              key={index}
              className="flex h-1/2 w-1/6 items-center justify-center"
            >
              {donut && <Donut donut={donut} />}
            </div>
          );
        })}
      </div>
    </Droppable>
  );
}
