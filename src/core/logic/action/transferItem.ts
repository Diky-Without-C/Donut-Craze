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
    (currentId: string, targetId: string) => {
      const index = getIndex(shapedDough, currentId);
      const changeIndex = getIndex(stoveSlot, currentId);
      const stoveIndex = Number(targetId.replace(/\D/g, ""));

      if (isFull(stoveSlot) || stoveSlot[stoveIndex]) return;

      if (shapedDough[index]) {
        setStoveSlot((self) => {
          const updated = [...self];
          updated[stoveIndex] = shapedDough[index];
          return updated;
        });

        updateShapeDough(index, undefined);
      } else if (stoveSlot[changeIndex]) {
        setStoveSlot((self) => {
          const updated = [...self];
          updated[stoveIndex] = stoveSlot[changeIndex];
          return updated;
        });

        updateStove(changeIndex, undefined);
      }
    },
    [shapedDough, stoveSlot, setStoveSlot, updateShapeDough, updateStove],
  );

  const moveToDrainingTray = useCallback(
    (currentId: string, targetId: string) => {
      const index = getIndex(stoveSlot, currentId);
      const changeIndex = getIndex(drainingTray, currentId);
      const drainingIndex = Number(targetId.replace(/\D/g, ""));

      if (isFull(drainingTray) || drainingTray[drainingIndex]) return;

      if (stoveSlot[index]) {
        setDrainingTray((self) => {
          const updated = [...self];
          updated[drainingIndex] = stoveSlot[index];
          return updated;
        });

        updateStove(index, undefined);
      } else if (drainingTray[changeIndex]) {
        setDrainingTray((self) => {
          const updated = [...self];
          updated[drainingIndex] = drainingTray[changeIndex];
          return updated;
        });

        updateDrainingTray(changeIndex, undefined);
      }
    },
    [
      stoveSlot,
      drainingTray,
      setStoveSlot,
      setDrainingTray,
      updateDrainingTray,
    ],
  );

  const moveToShelf = useCallback(
    (currentId: string, targetId: string) => {
      const drainingIndex = getIndex(drainingTray, currentId);
      const stoveIndex = getIndex(stoveSlot, currentId);
      const stockIndex = Number(targetId.replace(/\D/g, ""));
      const changeIndex = getIndex(stock, currentId);

      if (isFull(stock) || stock[stockIndex]) return;

      if (drainingTray[drainingIndex]) {
        setStock((self) => {
          const updated = [...self];
          updated[stockIndex] = drainingTray[drainingIndex];
          return updated;
        });

        updateDrainingTray(drainingIndex, undefined);
      } else if (stoveSlot[stoveIndex]) {
        setStock((self) => {
          const updated = [...self];
          updated[stockIndex] = stoveSlot[stoveIndex];
          return updated;
        });

        updateStove(stoveIndex, undefined);
      } else if (stock[changeIndex]) {
        setStock((self) => {
          const updated = [...self];
          updated[stockIndex] = stock[changeIndex];
          return updated;
        });

        updateStock(changeIndex, undefined);
      }
    },
    [
      drainingTray,
      stoveSlot,
      stock,
      updateDrainingTray,
      updateStove,
      updateStock,
    ],
  );

  const moveToTable = useCallback(
    (currentId: string, targetId: string) => {
      const tableIndex = Number(targetId.replace(/\D/g, ""));
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
      const stockIndex = getIndex(stock, currentId);

      if (isFull(conveyor)) return;

      if (table[index]) {
        const donut = table[index];

        setConveyor((self) => {
          const updated = [...self];
          const availableIndex = updated.findIndex((state) => !state);
          updated[availableIndex] = donut
            ? { time: new Date(), item: donut }
            : undefined;
          return updated;
        });

        updateTable(index, undefined);
      } else if (stock[stockIndex]) {
        const donut = stock[stockIndex];

        setConveyor((self) => {
          const updated = [...self];
          const availableIndex = updated.findIndex((state) => !state);
          updated[availableIndex] = donut
            ? { time: new Date(), item: donut }
            : undefined;
          return updated;
        });

        updateStock(stockIndex, undefined);
      }
    },
    [table, stock, setConveyor, updateTable, updateStock],
  );

  return {
    moveToStove,
    moveToDrainingTray,
    moveToShelf,
    moveToTable,
    moveToConveyor,
  };
}
