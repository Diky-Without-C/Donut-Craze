import { useCallback } from "react";
import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import game from "@core/logic/main";

export default function useDragHandlers() {
  const { updateVisibleGrid, updateDonut } = game();

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      updateVisibleGrid(false);

      if (!over) return;
      const currentId = active.id as string;
      const targetId = over.id as string;

      updateDonut(currentId, targetId);
    },

    [updateVisibleGrid, updateDonut],
  );

  const handleDragMove = useCallback(
    ({ active }: DragMoveEvent) => {
      if (active.id === "mold") {
        updateVisibleGrid(true);
      }
    },
    [updateVisibleGrid],
  );

  return { handleDragEnd, handleDragMove };
}