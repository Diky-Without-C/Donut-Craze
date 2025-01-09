import {
  useShapedDoughStore,
  useStoveStore,
  useDrainingStore,
} from "@services/stores/fryingAreaStore";
import {
  useConveyorStore,
  usePackageTableStore,
} from "@services/stores/packingAreaStore";
import {
  useStockStore,
  useTableStore,
} from "@services/stores/toppingAreaStore";
import getIndex from "../helper/getIndexById";
import useUpdateState from "../state";

export default function useTrashAction() {
  const { shapedDough } = useShapedDoughStore();
  const { stoveSlot } = useStoveStore();
  const { drainingTray } = useDrainingStore();
  const { stock } = useStockStore();
  const { table } = useTableStore();
  const { conveyor } = useConveyorStore();
  const { setPackageTable } = usePackageTableStore();
  const { packageTable } = usePackageTableStore();
  const {
    updateShapeDough,
    updateStove,
    updateDrainingTray,
    updateStock,
    updateTable,
    updateConveyor,
    updatePackageContent,
  } = useUpdateState();

  const moveToTrashCan = (currentId: string) => {
    updateShapeDough(getIndex(shapedDough, currentId));
    updateStove(getIndex(stoveSlot, currentId));
    updateDrainingTray(getIndex(drainingTray, currentId));
    updateStock(getIndex(stock, currentId));
    updateTable(getIndex(table, currentId));
    updateConveyor(getIndex(conveyor, currentId));
    if (currentId.includes("package")) setPackageTable(() => []);
    if (packageTable[0] && packageTable[0].donuts)
      updatePackageContent(getIndex(packageTable[0].donuts, currentId));
  };

  return { moveToTrashCan };
}
