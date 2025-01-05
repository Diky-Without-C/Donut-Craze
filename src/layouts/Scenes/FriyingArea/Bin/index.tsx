import { TrashCanImage } from "@assets/toppingArea/config";
import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";

export default function Bin() {
  return (
    <Droppable id="trash-can-1" className="relative h-1/5 w-2/5">
      <Overlay src={TrashCanImage} className="h-full w-full" />
    </Droppable>
  );
}
