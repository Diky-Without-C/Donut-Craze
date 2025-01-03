import { create } from "zustand";
import Donut from "@core/classes/Donut";
import { TOPPING_VARIANT } from "@constant/Donuts/donuts-detail.json";

interface StockStore {
  stock: (Donut | undefined)[];
  setStock: (
    updater: (self: (Donut | undefined)[]) => (Donut | undefined)[],
  ) => void;
}

interface TableStore {
  table: (Donut | undefined)[];
  setTable: (
    updater: (self: (Donut | undefined)[]) => (Donut | undefined)[],
  ) => void;
}

interface SelectedToppingStore {
  selectedToppings: boolean[];
  setSelectedToppings: (updater: (self: boolean[]) => boolean[]) => void;
}

const initialStock: undefined[] = Array(6).fill(undefined);
const initialTable: undefined[] = Array(8).fill(undefined);
const initialTopping: boolean[] = Array(TOPPING_VARIANT.length).fill(false);

const useStockStore = create<StockStore>((set) => ({
  stock: initialStock,
  setStock: (updater) => set((state) => ({ stock: updater(state.stock) })),
}));

const useTableStore = create<TableStore>((set) => ({
  table: initialTable,
  setTable: (updater) => set((state) => ({ table: updater(state.table) })),
}));

const useSelectedTopping = create<SelectedToppingStore>((set) => ({
  selectedToppings: initialTopping,
  setSelectedToppings: (updater) =>
    set((state) => ({ selectedToppings: updater(state.selectedToppings) })),
}));

export { useStockStore, useTableStore, useSelectedTopping };
