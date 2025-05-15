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
