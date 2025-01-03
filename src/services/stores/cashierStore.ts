import { create } from "zustand";
import Packaging from "@core/classes/Packaging";

interface CashierPackStore {
  cashierPackages: Packaging[];
  setCashierPackages: (updater: (self: Packaging[]) => Packaging[]) => void;
}

const useCashierPackStore = create<CashierPackStore>((set) => ({
  cashierPackages: [],
  setCashierPackages: (updater) =>
    set((state) => ({ cashierPackages: updater(state.cashierPackages) })),
}));

export { useCashierPackStore };
