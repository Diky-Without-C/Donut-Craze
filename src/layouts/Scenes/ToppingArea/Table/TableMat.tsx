import { ReactNode } from "react";
import Droppable from "@components/Droppable";

interface TableMatProps {
  children?: ReactNode;
  id: string;
}

export default function TableMat({ children, id }: TableMatProps) {
  return (
    <Droppable
      id={id}
      className="flex h-[calc(50%-0.5rem)] w-[calc(25%-0.5rem)] items-center justify-center rounded border-[0.25rem] border-dashed border-orange-400 border-opacity-70"
    >
      {children}
    </Droppable>
  );
}
