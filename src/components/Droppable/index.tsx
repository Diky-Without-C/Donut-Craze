import { useDroppable } from "@dnd-kit/core";
import { ComponentProps } from "react";

interface DroppableProps extends ComponentProps<"div"> {
  id: string;
}

export default function Droppable({ id, children, ...props }: DroppableProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} {...props}>
      {children}
    </div>
  );
}
