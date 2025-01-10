import Donut from "@components/Donut";
import Droppable from "@components/Droppable";
import { useStockStore } from "@services/stores/toppingAreaStore";
import Overlay from "@components/Overlay";
import { tableImages } from "@assets/toppingArea/config";

export default function Shelf() {
  const { stock } = useStockStore();

  return (
    <div className="relative h-3/5 w-2/12 border-b-4 border-l-4 border-table-border bg-table-primary pr-1">
      <div className="absolute -bottom-1 right-0 h-4 w-[calc(100%+0.25rem)] translate-y-full rounded-bl-xl border-b-4 border-l-4 border-table-border bg-table-secondary">
        <div className="absolute right-0 h-16 w-[calc(100%-0.5rem)] translate-y-4 rounded-bl-lg bg-gray-400"></div>
      </div>

      <div className="flex h-full w-full flex-row-reverse flex-wrap-reverse items-center justify-center px-4 py-6">
        <Overlay
          src={tableImages.shelf}
          className="h-full min-w-[108%] shrink-0"
        />

        {stock.map((donut, index) => {
          return (
            <Droppable
              key={index}
              id={`shelf-${index}`}
              className="flex h-1/3 w-1/2 items-center justify-center"
            >
              {donut && <Donut donut={donut} />}
            </Droppable>
          );
        })}
      </div>
    </div>
  );
}
