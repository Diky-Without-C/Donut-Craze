import { useDoughStore } from "@services/stores/fryingAreaStore";
import useUpdateState from "./state";
import useDonutAction from "./action/donutAction";
import useTransferItem from "./action/transferItem";
import usePackageAction from "./action/packageAction";
import useTrashAction from "./action/trashAction";
import useCustomerAction from "./action/customerAction";

export default function Game() {
  const { dough } = useDoughStore();
  const { updateVisibleGrid, updateDough } = useUpdateState();
  const {
    moveToStove,
    moveToDrainingTray,
    moveToShelf,
    moveToTable,
    moveToConveyor,
  } = useTransferItem();
  const { shapeDough, addGlaze, addIcing, addTopping } = useDonutAction();
  const { addPackage, moveToPack } = usePackageAction();
  const { moveToTrashCan } = useTrashAction();
  const { serveOrder } = useCustomerAction();

  const updateDonut = (currentId: string, targetId: string) => {
    switch (targetId.replace(/\-\d+/g, "")) {
      case "table":
        if (currentId === "dough") updateDough({ isOnTable: true });
        break;
      case "inside-dough":
        if (currentId === "roller")
          updateDough({ isFlattened: dough.isOnTable });
        break;
      case "dough":
        if (currentId === "mold") shapeDough(targetId);
        break;
      case "stove":
        moveToStove(currentId);
        break;
      case "draining-tray":
        moveToDrainingTray(currentId, targetId);
        break;
      case "trash-can":
        moveToTrashCan(currentId);
        break;
      case "shelf":
        moveToShelf(currentId);
        break;
      case "tableSlot":
        moveToTable(currentId, targetId);
        if (currentId.includes("icing")) {
          addIcing(currentId, targetId);
        } else if (currentId.includes("topping")) {
          addTopping(currentId, targetId);
        }
        break;
      case "glaze":
        addGlaze(currentId, targetId);
        break;
      case "conveyor":
        moveToConveyor(currentId);
        break;
      case "pack-table":
        addPackage(currentId);
        break;
      case "package-inside":
        moveToPack(currentId, targetId);
        break;
      case "customer":
        serveOrder(currentId);
        break;
    }
  };

  return { updateVisibleGrid, updateDonut };
}
