import Draggable from "@components/Draggable";
import Donut from "@components/Donut";
import Packagig from "@core/classes/Packaging";
import Droppable from "@components/Droppable";

interface PackageProps {
  pack: Packagig;
  isOpen?: boolean;
}

export default function Package({ pack, isOpen = false }: PackageProps) {
  const { height, width } = pack.size;

  return (
    <Draggable
      id={`package-${pack.id}`}
      style={{ height: `${height * 7}rem`, width: `${width * 7}rem` }}
      className="bg-red-600 p-1"
    >
      <div className="h-full w-full bg-blue-400">
        <div className="flex h-full w-full flex-wrap items-center justify-evenly">
          {isOpen &&
            pack.donuts.map((donut, index) => {
              return (
                <Droppable
                  key={index}
                  id={`package-inside-${index}`}
                  className="flex size-[6.5rem] items-center justify-center border"
                >
                  {donut && <Donut donut={donut} />}
                </Droppable>
              );
            })}
        </div>
      </div>
    </Draggable>
  );
}
