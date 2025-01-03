import { useCallback } from "react";
import {
  useShapedDoughStore,
  useStoveStore,
  useDrainingStore,
} from "@services/stores/fryingAreaStore";
import {
  useStockStore,
  useTableStore,
} from "@services/stores/toppingAreaStore";
import { useConveyorStore } from "@services/stores/packingAreaStore";
import isFull from "../helper/checkArrayFull";
import getIndex from "../helper/getIndexById";
import useUpdateState from "../state";

export default function useTransferItem() {
  const { shapedDough } = useShapedDoughStore();
  const { stoveSlot, setStoveSlot } = useStoveStore();
  const { drainingTray, setDrainingTray } = useDrainingStore();
  const { stock, setStock } = useStockStore();
  const { table } = useTableStore();
  const { conveyor, setConveyor } = useConveyorStore();
  const {
    updateShapeDough,
    updateStove,
    updateDrainingTray,
    updateStock,
    updateTable,
  } = useUpdateState();

  const moveToStove = useCallback(
    (currentId: string) => {
      const index = getIndex(shapedDough, currentId);
      if (!shapedDough[index] || isFull(stoveSlot)) return;

      setStoveSlot((self) => {
        const updated = [...self];
        const availableIndex = updated.findIndex((state) => !state);
        updated[availableIndex] = shapedDough[index];
        return updated;
      });

      updateShapeDough(index, undefined);
    },
    [shapedDough, setStoveSlot, updateShapeDough],
  );

  const moveToDrainingTray = useCallback(
    (currentId: string) => {
      const index = getIndex(stoveSlot, currentId);
      if (!stoveSlot[index] || isFull(drainingTray)) return;

      setDrainingTray((self) => {
        const updated = [...self];
        const availableIndex = updated.findIndex((state) => !state);
        updated[availableIndex] = stoveSlot[index];
        return updated;
      });

      updateStove(index, undefined);
    },
    [stoveSlot, setStoveSlot, setDrainingTray],
  );

  const moveToShelf = useCallback(
    (currentId: string) => {
      const drainingIndex = getIndex(drainingTray, currentId);
      const stoveIndex = getIndex(stoveSlot, currentId);
      if (isFull(stock)) return;

      if (drainingTray[drainingIndex]) {
        setStock((self) => {
          const updated = [...self];
          const availableIndex = updated.findIndex((state) => !state);
          updated[availableIndex] = drainingTray[drainingIndex];
          return updated;
        });
        updateDrainingTray(drainingIndex, undefined);
      } else if (stoveSlot[stoveIndex]) {
        setStock((self) => {
          const updated = [...self];
          const availableIndex = updated.findIndex((state) => !state);
          updated[availableIndex] = stoveSlot[stoveIndex];
          return updated;
        });
        updateStove(stoveIndex, undefined);
      }
    },
    [drainingTray, stoveSlot, stock, updateDrainingTray, updateStove],
  );

  const moveToTable = useCallback(
    (currentId: string, targetId: string) => {
      const tableIndex = +targetId.replace(/\D/g, "");
      const stockIndex = getIndex(stock, currentId);
      const drainingIndex = getIndex(drainingTray, currentId);
      const changeIndex = getIndex(table, currentId);

      if (table[tableIndex] || isFull(table)) return;

      if (stock[stockIndex]) {
        updateTable(tableIndex, stock[stockIndex]);
        updateStock(stockIndex, undefined);
      } else if (drainingTray[drainingIndex]) {
        updateTable(tableIndex, drainingTray[drainingIndex]);
        updateDrainingTray(drainingIndex, undefined);
      } else if (table[changeIndex]) {
        updateTable(tableIndex, table[changeIndex]);
        updateTable(changeIndex, undefined);
      }
    },
    [stock, drainingTray, table, updateTable, updateStock, updateDrainingTray],
  );

  const moveToConveyor = useCallback(
    (currentId: string) => {
      const index = getIndex(table, currentId);
      const donut = table[index];
      if (!donut || isFull(conveyor)) return;

      setConveyor((self) => {
        const updated = [...self];
        const availableIndex = updated.findIndex((state) => !state);
        updated[availableIndex] = donut
          ? { time: new Date(), item: donut }
          : undefined;
        return updated;
      });

      updateTable(index, undefined);
    },
    [table, setConveyor, updateTable],
  );

  return {
    moveToStove,
    moveToDrainingTray,
    moveToShelf,
    moveToTable,
    moveToConveyor,
  };
}
