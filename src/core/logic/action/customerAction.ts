import { useCallback } from "react";
import useCustomersStore from "@services/stores/customersStore";
import { useCashierPackStore } from "@services/stores/cashierStore";

export default function useCustomerAction() {
  const { customers, setCustomer } = useCustomersStore();
  const { cashierPackages, setCashierPackages } = useCashierPackStore();

  const serveOrder = useCallback(
    (currentId: string) => {
      const currentCustomer = customers[0];
      const index = cashierPackages.findIndex((item) =>
        currentId.includes(item.id),
      );

      const isOrderCompleted = currentCustomer.checkOrders(
        cashierPackages[index],
      );

      if (isOrderCompleted) {
        setCustomer((self) => self.slice(1) || []);
      }

      setCashierPackages((self) => self.filter((_, i) => i !== index));
    },
    [customers, setCustomer, cashierPackages, setCashierPackages],
  );

  return { serveOrder };
}
