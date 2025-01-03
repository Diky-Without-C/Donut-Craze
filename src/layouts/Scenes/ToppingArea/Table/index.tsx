import { useTableStore } from "@services/stores/toppingAreaStore";
import Donut from "@components/Donut";
import TableMat from "./TableMat";
import Bin from "../Bin";

export default function Table() {
  const { table } = useTableStore();

  return (
    <div className="flex h-4/6 w-full flex-col justify-end bg-red-500">
      <div className="flex h-4/5 w-full flex-wrap gap-x-2 gap-y-1 bg-green-400 p-2">
        {table.map((donut, index) => {
          return (
            <TableMat key={index} id={`tableSlot-${index}`}>
              {donut && <Donut donut={donut} />}
            </TableMat>
          );
        })}
      </div>
      <Bin />
    </div>
  );
}
