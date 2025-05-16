import { useCallback } from "react";
import { useCashierPackStore } from "@services/stores/cashierStore";
import useLocalStorage from "@hooks/useLocalStorage";
import useGameStore from "@services/stores/gameStore";
import { level } from "@constant/Game/level-data.json";

export default function useCustomerAction() {
  const { game } = useGameStore();
  const { cashierPackages, setCashierPackages } = useCashierPackStore();
  const [currentLevel, setLevel] = useLocalStorage("donut-craze-level", 1);

  const serveOrder = useCallback(
    (currentId: string) => {
      const currentCustomer = game.customers[0];
      const index = cashierPackages.findIndex((item) =>
        currentId.includes(item.id),
      );

      const selectedPackage = cashierPackages[index];
      selectedPackage.donuts.forEach((donut) => {
        if (donut) game.completedOrders.push(donut);
      });

      const isOrderCompleted = currentCustomer.checkOrders(selectedPackage);

      if (isOrderCompleted) {
        game.customers = game.customers.slice(1) || [];

        if (
          game.customers.length === 1 &&
          currentLevel < Object.keys(level).length
        ) {
          setLevel(currentLevel + 1);

          game.setLevel(currentLevel + 1);
        }
      }

      setCashierPackages((self) => self.filter((_, i) => i !== index));
    },
    [game.customers, cashierPackages, setCashierPackages],
  );

  return { serveOrder };
}
