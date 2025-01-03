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
  setDough: (updater: (self: DoughState) => DoughState) => void;
}

interface ShapedDoughStore {
  shapedDough: (Donut | undefined)[];
  setShapedDough: (
    updater: (self: (Donut | undefined)[]) => (Donut | undefined)[],
  ) => void;
}

interface StoveStore {
  stoveSlot: (Donut | undefined)[];
  setStoveSlot: (
    updater: (self: (Donut | undefined)[]) => (Donut | undefined)[],
  ) => void;
}

interface DrainingStore {
  drainingTray: (Donut | undefined)[];
  setDrainingTray: (
    updater: (self: (Donut | undefined)[]) => (Donut | undefined)[],
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

const useDoughStore = create<DoughStore>((set) => ({
  dough: initialDough,
  setDough: (updater) => set((state) => ({ dough: updater(state.dough) })),
}));

const initialShapedDough: undefined[] = Array(maxDoughSlots).fill(undefined);
const initialStoveSlot: undefined[] = Array(maxStoveSlots).fill(undefined);
const initialDrayningTray: undefined[] =
  Array(maxDrainingSlots).fill(undefined);

const useShapedDoughStore = create<ShapedDoughStore>((set) => ({
  shapedDough: initialShapedDough,
  setShapedDough: (updater) =>
    set((state) => ({ shapedDough: updater(state.shapedDough) })),
}));

const useStoveStore = create<StoveStore>((set) => ({
  stoveSlot: initialStoveSlot,
  setStoveSlot: (updater) =>
    set((state) => ({ stoveSlot: updater(state.stoveSlot) })),
}));

const useDrainingStore = create<DrainingStore>((set) => ({
  drainingTray: initialDrayningTray,
  setDrainingTray: (updater) =>
    set((state) => ({ drainingTray: updater(state.drainingTray) })),
}));

export {
  useDoughStore,
  useShapedDoughStore,
  useStoveStore,
  useDrainingStore,
  initialDough,
};
