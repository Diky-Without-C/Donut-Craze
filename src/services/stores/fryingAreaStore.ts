import { create } from "zustand";
import Donut from "@core/classes/Donut";
import { fryingArea } from "@constant/Game/game-detail.json";

const { maxDoughSlots, maxDrainingSlots, maxStoveSlots } = fryingArea;

interface GridCell {
  isVisible: boolean;
  isMolded: boolean;
}

interface DoughState {
  isOnTable: boolean;
  isFlattened: boolean;
  grid: GridCell[];
}

interface DoughStore {
  dough: DoughState;
  setDough: (dough: DoughState | ((self: DoughState) => DoughState)) => void;
}

interface ShapedDoughStore {
  shapedDough: (Donut | undefined)[];
  setShapedDough: (
    shapedDough:
      | (Donut | undefined)[]
      | ((self: (Donut | undefined)[]) => (Donut | undefined)[]),
  ) => void;
}

interface StoveStore {
  stoveSlot: (Donut | undefined)[];
  setStoveSlot: (
    stoveSlot:
      | (Donut | undefined)[]
      | ((self: (Donut | undefined)[]) => (Donut | undefined)[]),
  ) => void;
}

interface DrainingStore {
  drainingTray: (Donut | undefined)[];
  setDrainingTray: (
    drainingTray:
      | (Donut | undefined)[]
      | ((self: (Donut | undefined)[]) => (Donut | undefined)[]),
  ) => void;
}

const initialGridCell: GridCell = {
  isVisible: false,
  isMolded: false,
};

const initialDough: DoughState = {
  isOnTable: false,
  isFlattened: false,
  grid: Array.from({ length: maxDoughSlots }, () => ({ ...initialGridCell })),
};

const initialShapedDough: undefined[] = Array(maxDoughSlots).fill(undefined);
const initialStoveSlot: undefined[] = Array(maxStoveSlots).fill(undefined);
const initialDrainingTray: undefined[] =
  Array(maxDrainingSlots).fill(undefined);

const useDoughStore = create<DoughStore>((set) => ({
  dough: initialDough,
  setDough: (dough) =>
    set((state) => ({
      dough: typeof dough === "function" ? dough(state.dough) : dough,
    })),
}));

const useShapedDoughStore = create<ShapedDoughStore>((set) => ({
  shapedDough: initialShapedDough,
  setShapedDough: (shapedDough) =>
    set((state) => ({
      shapedDough:
        typeof shapedDough === "function"
          ? shapedDough(state.shapedDough)
          : shapedDough,
    })),
}));

const useStoveStore = create<StoveStore>((set) => ({
  stoveSlot: initialStoveSlot,
  setStoveSlot: (stoveSlot) =>
    set((state) => ({
      stoveSlot:
        typeof stoveSlot === "function"
          ? stoveSlot(state.stoveSlot)
          : stoveSlot,
    })),
}));

const useDrainingStore = create<DrainingStore>((set) => ({
  drainingTray: initialDrainingTray,
  setDrainingTray: (drainingTray) =>
    set((state) => ({
      drainingTray:
        typeof drainingTray === "function"
          ? drainingTray(state.drainingTray)
          : drainingTray,
    })),
}));

export {
  useDoughStore,
  useShapedDoughStore,
  useStoveStore,
  useDrainingStore,
  initialDough,
  initialShapedDough,
  initialStoveSlot,
  initialDrainingTray,
};
