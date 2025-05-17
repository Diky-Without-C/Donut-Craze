import { useDoughStore } from "@services/stores/fryingAreaStore";
import Draggable from "@components/Draggable";
import Dough from "../Table/Dough";
import {
  DoughContainer,
  MolderImage,
  RollerImage,
} from "@assets/FryingArea/config";
import Overlay from "@components/Overlay";

export default function Counter() {
  const { dough } = useDoughStore();

  return (
    <div className="relative flex h-1/4 w-10/12 justify-between rounded-t-md border-4 border-table-border bg-table-primary p-2">
      <div className="relative flex h-full w-32 items-center justify-center p-3">
        <Overlay src={DoughContainer} className="h-full w-full" />

        <div className="relative flex h-[7rem] w-[7rem] items-center justify-center pb-2">
          {!dough.isOnTable && <Dough />}
        </div>
      </div>
      <div className="flex h-full w-3/6 justify-around">
        <div className="relative flex h-full w-1/4 items-center justify-center">
          <Draggable
            id="roller"
            className={`${dough.isFlattened && "rolling"} relative z-10 flex h-10 w-28 shrink-0 items-center`}
          >
            <Overlay src={RollerImage} />
          </Draggable>
        </div>
        <div className="flex h-full w-1/4 items-center justify-center">
          <Draggable
            id="mold"
            className="relative z-10 size-24 shrink-0 rounded-full"
          >
            <Overlay src={MolderImage} className="h-full w-full" />
          </Draggable>
        </div>
      </div>
    </div>
  );
}
