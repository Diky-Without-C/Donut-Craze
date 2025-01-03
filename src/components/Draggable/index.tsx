import { ComponentProps, useRef, useCallback } from "react";
import { useDraggable } from "@dnd-kit/core";
import combineRefs from "@utils/combineRef";

interface DraggableProps extends ComponentProps<"div"> {
  id: string;
  condition?: boolean;
  onDraggingStart?: () => void;
  onDraggingEnd?: () => void;
}

export default function Draggable({
  id,
  children,
  condition = true,
  style,
  onDraggingStart,
  onDraggingEnd,
  ...props
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const localRef = useRef<HTMLDivElement>(null);
  const combinedRef = combineRefs(localRef, setNodeRef);

  const getDraggableStyle = useCallback(() => {
    if (!condition || !transform) return {};

    return {
      transform: `translateX(${transform.x}px) translateY(${transform.y}px) scale(1.05)`,
      zIndex: 99,
      transition: "none",
      cursor: "grab",
    };
  }, [condition, transform]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    listeners?.onPointerDown?.(event);
    onDraggingStart?.();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    listeners?.onPointerUp?.(event);
    onDraggingEnd?.();
  };

  return (
    <div
      ref={combinedRef}
      {...listeners}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...attributes}
      {...props}
      style={{ ...style, ...getDraggableStyle() }}
    >
      {children}
    </div>
  );
}
