import { useCallback } from "react";
import Donut from "@core/classes/Donut";
import {
  GLAZE_VARIANT,
  ICING_VARIANT,
  TOPPING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";
import { useDoughStore } from "@services/stores/fryingAreaStore";
import {
  useSelectedTopping,
  useTableStore,
} from "@services/stores/toppingAreaStore";
import useUpdateStates from "../state";
import getIndex from "../helper/getIndexById";

export default function useDonutAction() {
  const { setDough } = useDoughStore();
  const { table } = useTableStore();
  const { updateShapeDough } = useUpdateStates();
  const { setSelectedToppings } = useSelectedTopping();

  const shapeDough = useCallback(
    (targetId: string) => {
      setDough((self) => {
        const updated = [...self.grid];
        const areAllMolded = updated.every((state) => state.isMolded);

        if (areAllMolded) return self;

        const index = +targetId.replace(/\D/g, "");
        if (updated[index]) updated[index].isMolded = true;

        updateShapeDough(index, new Donut({}));
        return { ...self, grid: updated };
      });
    },
    [setDough, updateShapeDough],
  );

  const addGlaze = useCallback(
    (currentId: string, targetId: string) => {
      const glazeIndex = +targetId.replace(/\D/g, "");
      const tableIndex = getIndex(table, currentId);
      if (!table[tableIndex] || table[tableIndex].glaze) return;

      table[tableIndex].addGlaze(GLAZE_VARIANT[glazeIndex].name);
    },
    [table],
  );

  const addIcing = useCallback(
    (currentId: string, targetId: string) => {
      const icingIndex = +currentId.replace(/\D/g, "");
      const tableIndex = +targetId.replace(/\D/g, "");
      const donut = table[tableIndex];
      if (!donut || donut.icing || !donut.glaze) return;

      donut.addIcing(ICING_VARIANT[icingIndex].name);
    },
    [table],
  );

  const addTopping = useCallback(
    (currentId: string, targetId: string) => {
      const topping = +currentId.replace(/\D/g, "");
      const tableIndex = +targetId.replace(/\D/g, "");
      const donut = table[tableIndex];
      if (!donut || donut.topping || !donut.glaze) return;

      donut.addTopping(TOPPING_VARIANT[topping].name);
      setSelectedToppings((self) => self.map(() => false));
    },
    [table, setSelectedToppings],
  );

  return { shapeDough, addGlaze, addIcing, addTopping };
}
