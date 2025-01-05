import { useDoughStore } from "@services/stores/fryingAreaStore";
import Droppable from "@components/Droppable";
import Dough from "./Dough";
import Bin from "../Bin";

export default function Table() {
  const { dough } = useDoughStore();

  return (
    <div className="relative flex h-4/6 w-10/12 flex-col justify-end">
      <Droppable
        id="table"
        className="bg-table-primary border-table-secondary relative flex h-4/5 w-full border-4 border-t-0 p-6"
      >
        <div className="bg-table-secondary absolute bottom-0 left-0 h-20 w-[calc(100%+0.25rem)] translate-y-full overflow-x-hidden"></div>
        <div className="relative flex h-full w-full items-center justify-center">
          {dough.isOnTable && <Dough />}
        </div>
      </Droppable>
      <Bin />
    </div>
  );
}
