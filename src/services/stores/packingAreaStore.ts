import { create } from "zustand";
import Donut from "@core/classes/Donut";
import Packagig from "@core/classes/Packaging";

interface conveyerStore {
  conveyor: ({ time: Date; item: Donut } | undefined)[];
  setConveyor: (
    updater: (
      self: ({ time: Date; item: Donut } | undefined)[],
    ) => ({ time: Date; item: Donut } | undefined)[],
  ) => void;
}

interface packageTableStore {
  packageTable: Packagig[];
  setPackageTable: (updater: (self: Packagig[]) => Packagig[]) => void;
}

const initialConveyor: undefined[] = Array(12).fill(undefined);

const useConveyorStore = create<conveyerStore>((set) => ({
  conveyor: initialConveyor,
  setConveyor: (updater) =>
    set((state) => ({ conveyor: updater(state.conveyor) })),
}));

const usePackageTableStore = create<packageTableStore>((set) => ({
  packageTable: [],
  setPackageTable: (updater) =>
    set((state) => ({ packageTable: updater(state.packageTable) })),
}));

export { useConveyorStore, usePackageTableStore };
