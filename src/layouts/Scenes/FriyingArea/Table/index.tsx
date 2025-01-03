import { useDoughStore } from "@services/stores/fryingAreaStore";
import Droppable from "@components/Droppable";
import Dough from "./Dough";
import Bin from "../Bin";

export default function Table() {
  const { dough } = useDoughStore();

  return (
    <div className="relative flex h-3/5 w-9/12 flex-col justify-end bg-red-500">
      <Droppable
        id="table"
        className="relative flex h-4/5 w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-green-400"
      >
        {dough.isOnTable && <Dough />}
      </Droppable>
      <Bin />
    </div>
  );
}
