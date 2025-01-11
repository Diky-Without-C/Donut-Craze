import { create } from "zustand";
import Packaging from "@core/classes/Packaging";

interface CashierPackStore {
  cashierPackages: Packaging[];
  setCashierPackages: (
    packages: Packaging[] | ((self: Packaging[]) => Packaging[]),
  ) => void;
}

const useCashierPackStore = create<CashierPackStore>((set) => ({
  cashierPackages: [],
  setCashierPackages: (packages) =>
    set((state) => ({
      cashierPackages:
        typeof packages === "function"
          ? packages(state.cashierPackages)
          : packages,
    })),
}));

export { useCashierPackStore };
