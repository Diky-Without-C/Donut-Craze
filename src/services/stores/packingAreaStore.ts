import { create } from "zustand";
import Donut from "@core/classes/Donut";
import Packaging from "@core/classes/Packaging";

interface ConveyerStore {
  conveyor: ({ time: Date; item: Donut } | undefined)[];
  setConveyor: (
    conveyor:
      | ({ time: Date; item: Donut } | undefined)[]
      | ((
          self: ({ time: Date; item: Donut } | undefined)[],
        ) => ({ time: Date; item: Donut } | undefined)[]),
  ) => void;
}

interface PackageTableStore {
  packageTable: Packaging[];
  setPackageTable: (
    packageTable: Packaging[] | ((self: Packaging[]) => Packaging[]),
  ) => void;
}

const initialConveyor: (undefined | { time: Date; item: Donut })[] =
  Array(12).fill(undefined);

const useConveyorStore = create<ConveyerStore>((set) => ({
  conveyor: initialConveyor,
  setConveyor: (conveyor) =>
    set((state) => ({
      conveyor:
        typeof conveyor === "function" ? conveyor(state.conveyor) : conveyor,
    })),
}));

const usePackageTableStore = create<PackageTableStore>((set) => ({
  packageTable: [],
  setPackageTable: (packageTable) =>
    set((state) => ({
      packageTable:
        typeof packageTable === "function"
          ? packageTable(state.packageTable)
          : packageTable,
    })),
}));

export { useConveyorStore, usePackageTableStore, initialConveyor };
