import { useCallback } from "react";
import Donut from "@core/classes/Donut";
import {
  useDoughStore,
  useShapedDoughStore,
  useStoveStore,
  useDrainingStore,
  initialDough,
} from "@services/stores/fryingAreaStore";
import {
  useStockStore,
  useTableStore,
} from "@services/stores/toppingAreaStore";
import {
  useConveyorStore,
  usePackageTableStore,
} from "@services/stores/packingAreaStore";
import Packagig from "@core/classes/Packaging";

export default function useUpdateStates() {
  const { setDough } = useDoughStore();
  const { setShapedDough } = useShapedDoughStore();
  const { setStoveSlot } = useStoveStore();
  const { setDrainingTray } = useDrainingStore();
  const { setStock } = useStockStore();
  const { setTable } = useTableStore();
  const { setConveyor } = useConveyorStore();
  const { packageTable, setPackageTable } = usePackageTableStore();

  const updateVisibleGrid = useCallback(
    (show: boolean) => {
      setDough((self) => ({
        ...self,
        grid: self.grid.map((state) => ({ ...state, isVisible: show })),
      }));
    },
    [setDough],
  );

  const updateDough = useCallback(
    (object: {}) => {
      setDough((self) => ({ ...self, ...object }));
      updateVisibleGrid(false);
    },
    [setDough],
  );

  const updateShapeDough = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      setShapedDough((self) => {
        const updated = [...self];
        updated[index] = value;

        setDough((prevDough) => {
          const isTableAvailable =
            updated.every((state) => !state) &&
            prevDough.grid.every((state) => state.isMolded);

          if (isTableAvailable) return initialDough;

          return prevDough;
        });

        return updated;
      });
    },
    [setShapedDough, setDough],
  );

  const updateStove = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      setStoveSlot((self) => {
        const updated = [...self];
        updated[index] = value;
        return updated;
      });
    },
    [setStoveSlot],
  );

  const updateDrainingTray = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      setDrainingTray((self) => {
        const updated = [...self];
        updated[index] = value;
        return updated;
      });
    },
    [setDrainingTray],
  );

  const updateStock = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      setStock((self) => {
        const updated = [...self];
        updated[index] = value;
        return updated;
      });
    },
    [setStock],
  );

  const updateTable = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      setTable((self) => {
        const updated = [...self];
        updated[index] = value;
        return updated;
      });
    },
    [setTable],
  );

  const updateConveyor = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      setConveyor((self) => {
        const updated = [...self];
        updated[index] = value ? { time: new Date(), item: value } : undefined;
        return updated;
      });
    },
    [setConveyor],
  );

  const updatePackTable = useCallback(
    (index: number, value: Packagig) => {
      if (index === -1) return;

      setPackageTable((self) => {
        const updated = [...self];
        updated[index] = value;
        return updated;
      });
    },
    [setPackageTable],
  );

  const updatePackageContent = useCallback(
    (index: number, value?: Donut) => {
      if (index === -1) return;

      if (!packageTable[0]) return;
      const pack = packageTable[0];
      const updated = [...pack.donuts];

      updated[index] = value;

      pack.donuts = updated;
    },
    [packageTable],
  );

  return {
    updateVisibleGrid,
    updateDough,
    updateShapeDough,
    updateStove,
    updateDrainingTray,
    updateStock,
    updateTable,
    updateConveyor,
    updatePackTable,
    updatePackageContent,
  };
}
