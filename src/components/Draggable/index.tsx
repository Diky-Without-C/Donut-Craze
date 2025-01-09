import {
  ComponentProps,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
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
  className,
  onDraggingStart,
  onDraggingEnd,
  ...props
}: DraggableProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragEndTimeout, setDragEndTimeout] = useState<number | null>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const localRef = useRef<HTMLDivElement>(null);
  const combinedRef = combineRefs(localRef, setNodeRef);

  const getDraggableStyle = useCallback(() => {
    if (!condition) return {};

    if (transform || isDragging) {
      return {
        transform: transform
          ? `translateX(${transform.x}px) translateY(${transform.y}px) scale(1.05)`
          : undefined,
        zIndex: 9999,
        transition: transform ? "none" : "",
      };
    }

    return {};
  }, [condition, transform, isDragging]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    listeners?.onPointerDown?.(event);
    onDraggingStart?.();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    listeners?.onPointerUp?.(event);
    onDraggingEnd?.();

    setDragEndTimeout(
      setTimeout(() => {
        setIsDragging(false);
        setDragEndTimeout(null);
      }, 500),
    );
  };

  useEffect(() => {
    return () => {
      if (dragEndTimeout) {
        clearTimeout(dragEndTimeout);
      }
    };
  }, [dragEndTimeout]);

  return (
    <div
      ref={combinedRef}
      {...listeners}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...attributes}
      {...props}
      style={{ ...style, ...getDraggableStyle() }}
      className={`${className} ${isDragging ? "cursor-grabbing" : "cursor-grab"} transition-all duration-500`}
    >
      {children}
    </div>
  );
}
