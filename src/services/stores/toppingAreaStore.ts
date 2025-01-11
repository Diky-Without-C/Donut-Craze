import { create } from "zustand";
import Donut from "@core/classes/Donut";
import { TOPPING_VARIANT } from "@constant/Donuts/donuts-detail.json";

interface StockStore {
  stock: (Donut | undefined)[];
  setStock: (
    stock:
      | (Donut | undefined)[]
      | ((self: (Donut | undefined)[]) => (Donut | undefined)[]),
  ) => void;
}

interface TableStore {
  table: (Donut | undefined)[];
  setTable: (
    table:
      | (Donut | undefined)[]
      | ((self: (Donut | undefined)[]) => (Donut | undefined)[]),
  ) => void;
}

interface SelectedToppingStore {
  selectedToppings: boolean[];
  setSelectedToppings: (
    selectedToppings: boolean[] | ((self: boolean[]) => boolean[]),
  ) => void;
}

const initialStock: (Donut | undefined)[] = Array(6).fill(undefined);
const initialTable: (Donut | undefined)[] = Array(8).fill(undefined);
const initialTopping: boolean[] = Array(TOPPING_VARIANT.length).fill(false);

const useStockStore = create<StockStore>((set) => ({
  stock: initialStock,
  setStock: (stock) =>
    set((state) => ({
      stock: typeof stock === "function" ? stock(state.stock) : stock,
    })),
}));

const useTableStore = create<TableStore>((set) => ({
  table: initialTable,
  setTable: (table) =>
    set((state) => ({
      table: typeof table === "function" ? table(state.table) : table,
    })),
}));

const useSelectedTopping = create<SelectedToppingStore>((set) => ({
  selectedToppings: initialTopping,
  setSelectedToppings: (selectedToppings) =>
    set((state) => ({
      selectedToppings:
        typeof selectedToppings === "function"
          ? selectedToppings(state.selectedToppings)
          : selectedToppings,
    })),
}));

export {
  useStockStore,
  useTableStore,
  useSelectedTopping,
  initialStock,
  initialTable,
  initialTopping,
};
