import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import { TrashCanImage } from "@assets/PackingArea/config";

export default function Bin() {
  return (
    <Droppable id="trash-can-3" className="relative h-1/5 w-2/5">
      <Overlay src={TrashCanImage} className="h-full w-full" />
    </Droppable>
  );
}
