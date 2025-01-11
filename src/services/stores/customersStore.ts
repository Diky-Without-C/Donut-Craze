import { create } from "zustand";
import Customer from "@core/classes/Customers";

interface CustomerStore {
  customers: Customer[];
  setCustomer: (
    customers: Customer[] | ((self: Customer[]) => Customer[]),
  ) => void;
}

const useCustomersStore = create<CustomerStore>((set) => ({
  customers: [],
  setCustomer: (customers) =>
    set((state) => ({
      customers:
        typeof customers === "function"
          ? customers(state.customers)
          : customers,
    })),
}));

export default useCustomersStore;
