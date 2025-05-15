import { useCashierPackStore } from "@services/stores/cashierStore";
import {
  useDoughStore,
  useShapedDoughStore,
  useStoveStore,
  useDrainingStore,
  initialDough,
  initialShapedDough,
  initialStoveSlot,
  initialDrainingTray,
} from "@services/stores/fryingAreaStore";
import {
  useConveyorStore,
  usePackageTableStore,
  initialConveyor,
} from "@services/stores/packingAreaStore";
import {
  useStockStore,
  useTableStore,
  useSelectedTopping,
  initialStock,
  initialTable,
  initialTopping,
} from "@services/stores/toppingAreaStore";
import useCustomersStore from "@services/stores/customersStore";

import useLocalStorage from "@hooks/useLocalStorage";
import initializeCustomers from "./initializeCustomers";

export default function useInitialize() {
  const [currentLevel] = useLocalStorage("donut-craze-level", 1);

  const stores = {
    setCustomer: useCustomersStore().setCustomer,
    setCashierPackages: useCashierPackStore().setCashierPackages,
    setDough: useDoughStore().setDough,
    setShapedDough: useShapedDoughStore().setShapedDough,
    setStoveSlot: useStoveStore().setStoveSlot,
    setDrainingTray: useDrainingStore().setDrainingTray,
    setConveyor: useConveyorStore().setConveyor,
    setPackageTable: usePackageTableStore().setPackageTable,
    setStock: useStockStore().setStock,
    setTable: useTableStore().setTable,
    setSelectedToppings: useSelectedTopping().setSelectedToppings,
  };

  const initialValues = {
    setCashierPackages: [],
    setDough: initialDough,
    setShapedDough: initialShapedDough,
    setStoveSlot: initialStoveSlot,
    setDrainingTray: initialDrainingTray,
    setConveyor: initialConveyor,
    setPackageTable: [],
    setStock: initialStock,
    setTable: initialTable,
    setSelectedToppings: initialTopping,
  };

  const init = () => {
    stores.setCustomer(initializeCustomers(String(currentLevel)));

    stores.setCashierPackages(initialValues.setCashierPackages);
    stores.setDough(initialValues.setDough);
    stores.setShapedDough(initialValues.setShapedDough);
    stores.setStoveSlot(initialValues.setStoveSlot);
    stores.setDrainingTray(initialValues.setDrainingTray);
    stores.setConveyor(initialValues.setConveyor);
    stores.setPackageTable(initialValues.setPackageTable);
    stores.setStock(initialValues.setStock);
    stores.setSelectedToppings(initialValues.setSelectedToppings);
  };

  return { init };
}
