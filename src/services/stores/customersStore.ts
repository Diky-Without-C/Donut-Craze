import { create } from "zustand";
import Customer from "@core/classes/Customers";

interface CustomerStore {
  customers: Customer[];
  setCustomer: (updater: (self: Customer[]) => Customer[]) => void;
}

const useCustomersStore = create<CustomerStore>((set) => ({
  customers: [],
  setCustomer: (updater) =>
    set((state) => ({ customers: updater(state.customers) })),
}));

export default useCustomersStore;
