import Donut from "@components/Donut";
import Droppable from "@components/Droppable";
import { useStockStore } from "@services/stores/toppingAreaStore";

export default function Shelf() {
  const { stock } = useStockStore();

  return (
    <Droppable
      id="shelf"
      className="flex h-3/5 w-2/12 flex-row-reverse flex-wrap-reverse justify-center bg-yellow-500 px-4 py-6"
    >
      {stock.map((donut, index) => {
        return (
          <div
            key={index}
            className="flex h-1/3 w-1/2 items-center justify-center bg-slate-500"
          >
            {donut && <Donut donut={donut} />}
          </div>
        );
      })}
    </Droppable>
  );
}
