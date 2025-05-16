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
    (packageId: string) => {
      const currentCustomer = game.customers[0];
      const packageIndex = cashierPackages.findIndex((pkg) =>
        packageId.includes(pkg.id),
      );

      if (packageIndex === -1) return;

      const selectedPackage = cashierPackages[packageIndex];
      game.completedOrders.push(selectedPackage);

      const { isOrderCorrect, isOrderAmountCorrect } =
        currentCustomer.checkOrders(selectedPackage);

      if (isOrderCorrect) {
        if (isOrderAmountCorrect) {
          game.customers = game.customers.slice(1);

          const isLastCustomer = game.customers.length === 1;
          const hasNextLevel = currentLevel < Object.keys(level).length;

          if (isLastCustomer && hasNextLevel) {
            const nextLevel = currentLevel + 1;
            setLevel(nextLevel);
            game.setLevel(nextLevel);
          }
        }
      } else {
        game.end();
      }

      setCashierPackages((prev) => prev.filter((_, i) => i !== packageIndex));
    },
    [game, cashierPackages, setCashierPackages, currentLevel, setLevel],
  );

  return { serveOrder };
}
