import Draggable from "@components/Draggable";
import Donut from "@components/Donut";
import Packagig from "@core/classes/Packaging";
import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import { boxes } from "@assets/PackingArea/config";

interface PackageProps {
  pack: Packagig;
  isOpen?: boolean;
}

export default function Package({ pack, isOpen = false }: PackageProps) {
  const { height, width } = pack.size;
  const size = isOpen ? 6.5 : 6;
  const image = boxes[`box${width * height}` as keyof typeof boxes];

  return (
    <Draggable
      id={`package-${pack.id}`}
      style={{ height: `${height * size}rem`, width: `${width * size}rem` }}
      className="relative flex items-center justify-center p-1"
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
                className="z-10 flex items-center justify-center"
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
