import { useDrainingStore } from "@services/stores/fryingAreaStore";
import Droppable from "@components/Droppable";
import Donut from "@components/Donut";
import Overlay from "@components/Overlay";
import { DrainingTrayImage } from "@assets/FryingArea/config";

export default function DrainingTray() {
  const { drainingTray } = useDrainingStore();

  return (
    <div className="relative flex h-2/5 w-11/12 items-center justify-center">
      <Overlay src={DrainingTrayImage} className="h-full min-w-[106%]" />

      <div className="flex h-full w-full flex-row-reverse flex-wrap rounded-lg px-2 py-2">
        {drainingTray.map((donut, index) => {
          return (
            <Droppable
              id={`draining-tray-${index}`}
              key={index}
              className="flex h-1/2 w-1/6 items-center justify-center border"
            >
              {donut && <Donut donut={donut} />}
            </Droppable>
          );
        })}
      </div>
    </div>
  );
}
