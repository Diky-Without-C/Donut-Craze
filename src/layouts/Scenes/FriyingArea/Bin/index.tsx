import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";

export default function Bin() {
  const { images } = useImageStore();
  const { TrashCanImage } = images as {
    TrashCanImage: string;
  };

  return (
    <Droppable id="trash-can-1" className="relative h-1/5 w-2/5">
      <Overlay src={TrashCanImage} className="h-full w-full" />
    </Droppable>
  );
}
