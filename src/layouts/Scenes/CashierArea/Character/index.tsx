import { ComponentProps } from "react";
import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";

interface CharacterProps extends ComponentProps<"div"> {
  image: string;
}

export default function Character({
  image,
  className,
  ...props
}: CharacterProps) {
  return (
    <Droppable
      {...props}
      id="customer"
      className={`${className} relative flex h-3/4 w-3/12 items-end justify-center`}
    >
      <Overlay src={image} className="min-w-[150%]" />
    </Droppable>
  );
}
