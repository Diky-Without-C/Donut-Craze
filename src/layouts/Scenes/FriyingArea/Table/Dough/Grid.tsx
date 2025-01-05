import Droppable from "@components/Droppable";

interface DoughGridsProps {
  grid: {
    isVisible: boolean;
    isMolded: boolean;
  }[];
  isDelay: boolean;
}

export default function DoughGrids({ grid, isDelay }: DoughGridsProps) {
  const areAllMolded = grid.every((state) => state.isMolded);

  return (
    <>
      {grid.map(({ isVisible, isMolded }, index) => {
        const opacity =
          (isVisible || isMolded) && !isDelay ? "opacity-100" : "opacity-0";
        const border = isMolded
          ? "border-[0.4rem] border-solid border-white before:absolute before:size-8 before:rounded-full before:border-[0.4rem] before:border-inherit"
          : "border-[0.4rem] border-dashed border-white";
        const transition = areAllMolded
          ? "border-opacity-0 transition-colors duration-300"
          : "";

        return (
          <Droppable
            key={index}
            id={`dough-${index}`}
            className={`${opacity} ${border} ${transition} flex size-24 items-center justify-center rounded-full`}
          />
        );
      })}
    </>
  );
}
