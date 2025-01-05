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
      className="bg-table-primary border-table-secondary relative h-3/5 w-2/12 rounded-bl-md border-b-4 border-l-4 pr-1"
    >
      <div className="absolute bottom-0 right-0 h-20 w-[calc(100%+0.25rem)] translate-y-full overflow-x-hidden">
        <div className="bg-table-secondary h-full w-full translate-x-2 skew-x-12"></div>
      </div>

      <div className="flex h-full w-full flex-row-reverse flex-wrap-reverse items-center justify-center px-4 py-6">
        <Overlay
          src={tableImages.shelf}
          className="h-full min-w-[108%] shrink-0"
        />

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
