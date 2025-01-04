import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import { TrashCanImage } from "@assets/toppingArea/config";

export default function Bin() {
  return (
    <Droppable id="trash-can-2" className="relative h-1/5 w-2/6">
      <Overlay src={TrashCanImage} className="h-full w-full" />
    </Droppable>
  );
}
