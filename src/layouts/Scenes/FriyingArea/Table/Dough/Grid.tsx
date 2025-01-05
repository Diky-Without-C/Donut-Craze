import Droppable from "@components/Droppable";

interface DoughGridsProps {
  grid: {
    isVisible: boolean;
    isMolded: boolean;
  }[];
  isDelay: boolean;
}

export default function DoughGrids({ grid, isDelay }: DoughGridsProps) {
  return (
    <>
      {grid.map(({ isVisible, isMolded }, index) => {
        const opacity =
          (isVisible || isMolded) && !isDelay ? "opacity-100" : "opacity-0";
        const border = isMolded ? "border-opacity-0" : "";

        return (
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
