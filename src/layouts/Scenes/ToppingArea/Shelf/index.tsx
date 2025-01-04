import Donut from "@components/Donut";
import Droppable from "@components/Droppable";
import { useStockStore } from "@services/stores/toppingAreaStore";
import Overlay from "@components/Overlay";
import { tableImages } from "@assets/toppingArea/config";

export default function Shelf() {
  const { stock } = useStockStore();

  return (
    <Droppable
      id="shelf"
      className="relative flex h-3/5 w-2/12 justify-center px-4 py-6"
    >
      <Overlay
        src={tableImages.shelf}
        className="top-0 z-0 h-full min-w-[107%] flex-shrink-0"
      />

      <div className="z-20 flex h-full w-full flex-row-reverse flex-wrap-reverse">
        {stock.map((donut, index) => {
          return (
            <div
              key={index}
              className="flex h-1/3 w-1/2 items-center justify-center"
            >
              {donut && <Donut donut={donut} />}
            </div>
          );
        })}
      </div>
    </Droppable>
  );
}
