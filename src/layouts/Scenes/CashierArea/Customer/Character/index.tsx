import { ComponentProps } from "react";
import Droppable from "@components/Droppable";
import Overlay from "@components/Overlay";
import useCustomersStore from "@services/stores/customersStore";

interface CharacterProps extends ComponentProps<"div"> {
  image: string;
}

export default function Character({
  image,
  className,
  ...props
}: CharacterProps) {
  const { customers } = useCustomersStore();

  return (
    <Droppable
      {...props}
      id="customer"
      className={`${className} relative flex h-3/4 w-3/12 items-end justify-center`}
    >
      <span className="absolute top-0 z-10 h-7 -translate-y-20 rounded bg-white/60 px-4 font-mono text-lg font-bold tracking-wide">
        {customers[0].name}
      </span>
      <Overlay src={image} className="min-w-[150%]" />
    </Droppable>
  );
}
