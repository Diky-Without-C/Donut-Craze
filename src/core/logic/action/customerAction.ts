import { useCallback } from "react";
import useCustomersStore from "@services/stores/customersStore";
import { useCashierPackStore } from "@services/stores/cashierStore";
import useLocalStorage from "@hooks/useLocalStorage";
import useGameStore from "@services/stores/gameStore";
import { level } from "@constant/Game/level-data.json";

export default function useCustomerAction() {
  const { customers, setCustomer } = useCustomersStore();
  const { cashierPackages, setCashierPackages } = useCashierPackStore();
  const [currentLevel, setLevel] = useLocalStorage("donut-craze-level", 1);
  const { game } = useGameStore();

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

        if (
          customers.length === 1 &&
          currentLevel < Object.keys(level).length
        ) {
          setLevel(currentLevel + 1);

          game.setLevel(currentLevel + 1);
        }
      }

      setCashierPackages((self) => self.filter((_, i) => i !== index));
    },
    [customers, setCustomer, cashierPackages, setCashierPackages],
  );

  return { serveOrder };
}
