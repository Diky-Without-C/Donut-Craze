import { useDoughStore } from "@services/stores/fryingAreaStore";
import Draggable from "@components/Draggable";
import Dough from "../Table/Dough";

export default function Counter() {
  const { dough } = useDoughStore();

  return (
    <div className="mb-4 flex h-1/4 w-9/12 rounded-lg bg-slate-400">
      <div className="h-full w-2/4 p-4">
        <div className="flex h-full w-full cursor-pointer items-center justify-center rounded border-[0.5rem] border-double border-white bg-orange-300">
          {!dough.isOnTable && <Dough />}
        </div>
      </div>
      <div className="relative flex h-full w-1/4 items-center justify-center">
        <Draggable
          id="roller"
          className={`${dough.isFlattened && "rolling"} relative z-10 flex h-6 w-4/6 cursor-pointer items-center rounded bg-orange-400 transition-all duration-500 before:absolute before:right-0 before:h-1/2 before:w-1/6 before:translate-x-full before:bg-orange-100 after:absolute after:left-0 after:h-1/2 after:w-1/6 after:-translate-x-full after:bg-orange-100`}
        ></Draggable>
      </div>
      <div className="flex h-full w-1/4 items-center justify-center">
        <Draggable
          id="mold"
          className="z-10 size-20 cursor-pointer rounded-full bg-red-500 transition-all duration-500"
        ></Draggable>
      </div>
    </div>
  );
}
