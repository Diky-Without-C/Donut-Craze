import Draggable from "@components/Draggable";
import Donut from "@components/Donut";
import Packagig from "@core/classes/Packaging";
import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";

interface PackageProps {
  pack: Packagig;
  isOpen?: boolean;
}

export default function Package({ pack, isOpen = false }: PackageProps) {
  const { height, width } = pack.size;
  const size = isOpen ? 6.5 : 6;
  const { images } = useImageStore();
  const { boxes } = images as {
    boxes: Record<string, { open: string; closed: string }>;
  };
  const image = boxes[`box${width * height}` as keyof typeof boxes];

  return (
    <Draggable
      id={`package-${pack.id}`}
      style={{ height: `${height * size}rem`, width: `${width * size}rem` }}
      className="relative flex items-center justify-center p-1 transition-none"
    >
      <Overlay
        src={isOpen ? image.open : image.closed}
        className={`h-[${isOpen ? 115 : 102}%] min-w-[${isOpen ? 115 : 102}%]`}
      />

      <div className="h-full w-full">
        <div className="flex h-full w-full flex-wrap items-center justify-evenly">
          {isOpen &&
            pack.donuts &&
            pack.donuts.map((donut, index) => (
              <Droppable
                key={index}
                id={`package-inside-${index}`}
                className="flex items-center justify-center"
                style={{
                  width: `${size - 0.5}rem`,
                  height: `${size - 0.5}rem`,
                }}
              >
                {donut && <Donut donut={donut} />}
              </Droppable>
            ))}
        </div>
      </div>
    </Draggable>
  );
}
