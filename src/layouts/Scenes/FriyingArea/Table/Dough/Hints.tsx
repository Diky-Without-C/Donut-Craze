import Droppable from "@components/Droppable";

interface HintsProps {
  grid: {
    isVisible: boolean;
    isMolded: boolean;
  }[];
  isDelay: boolean;
}

export default function Hints({ grid, isDelay }: HintsProps) {
  return (
    <>
      {grid.map(({ isVisible, isMolded }, index) => {
        const opacity =
          (isVisible || isMolded) && !isDelay ? "opacity-100" : "opacity-0";
        const border = isMolded ? "border-opacity-0" : "";
        const areAllMolded = grid.every((state) => state.isMolded);

        return isMolded ? (
          <div
            className={`${areAllMolded ? "before:bg-transparent" : "before:bg-[#ffc798]"} relative flex size-24 scale-90 items-center justify-center rounded-full bg-table-primary before:absolute before:size-8 before:rounded-full before:content-['']`}
          ></div>
        ) : (
          <Droppable
            key={index}
            id={`dough-${index}`}
            className={`${opacity} ${border} flex size-24 items-center justify-center rounded-full border-[0.4rem] border-dashed border-white`}
          />
        );
      })}
    </>
  );
}
