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
        className="relative flex h-4/5 w-full border-4 border-t-0 border-table-border bg-table-primary p-6"
      >
        <div className="absolute -bottom-1 left-0 h-4 w-[calc(100%+0.25rem)] translate-y-full rounded-br-xl border-b-4 border-r-4 border-table-border bg-table-secondary">
          <div className="absolute left-0 h-16 w-[calc(100%-0.5rem)] translate-y-4 rounded-br-lg bg-gray-400"></div>
        </div>

        <div className="relative flex h-full w-full items-center justify-center">
          {dough.isOnTable && <Dough />}
        </div>
      </Droppable>
      <Bin />
    </div>
  );
}
