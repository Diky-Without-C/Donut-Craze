import { useCallback } from "react";
import Packaging from "@core/classes/Packaging";
import { PackagigType } from "@core/classes/Packaging/packaging.type";
import {
  useConveyorStore,
  usePackageTableStore,
} from "@services/stores/packingAreaStore";
import useUpdateStates from "../state";
import getIndex from "../helper/getIndexById";
import isFull from "../helper/checkArrayFull";

export default function usePackageAction() {
  const { packageTable } = usePackageTableStore();
  const { conveyor } = useConveyorStore();
  const { updatePackTable, updateConveyor } = useUpdateStates();

  const addPackage = useCallback(
    (currentId: string) => {
      if (packageTable[0] || !currentId.includes("package")) return;

      const size = Number(currentId.replace(/\D/g, "")) as PackagigType["size"];
      updatePackTable(0, new Packaging({ size }));
    },
    [updatePackTable, packageTable],
  );

  const moveToPack = useCallback(
    (currentId: string, targetId: string) => {
      const currentIndex = getIndex(conveyor, currentId);
      const targetIndex = Number(targetId.replace(/\D/g, ""));

      const donut = conveyor[currentIndex]?.item;
      if (!packageTable[0]) return;

      const pack = packageTable[0];
      if (isFull(pack.donuts)) return;

      const updated = [...pack.donuts];
      const packIndex = getIndex(updated, currentId);
      if (updated[packIndex]) {
        if (!updated[targetIndex]) {
          updated[targetIndex] = updated[packIndex];
          updated[packIndex] = undefined;
        }
      } else {
        if (!updated[targetIndex]) {
          updated[targetIndex] = donut;
          updateConveyor(currentIndex, undefined);
        }
      }

      pack.donuts = updated;
    },
    [conveyor, packageTable, updateConveyor],
  );

  return { addPackage, moveToPack };
}
