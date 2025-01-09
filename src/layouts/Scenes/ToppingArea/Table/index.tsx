import { useTableStore } from "@services/stores/toppingAreaStore";
import Donut from "@components/Donut";
import TableMat from "./TableMat";
import Bin from "../Bin";

export default function Table() {
  const { table } = useTableStore();

  return (
    <div className="flex h-4/6 w-full flex-col justify-end">
      <div className="relative flex h-4/5 w-full flex-wrap gap-x-2 gap-y-1 border-4 border-table-border bg-table-primary p-2">
        <div className="absolute -bottom-1 left-0 h-4 w-[calc(100%+0.25rem)] translate-y-full border-b-4 border-r-4 border-table-border bg-table-secondary">
          <div className="absolute -right-1 h-16 w-full translate-y-4 bg-gray-400"></div>
        </div>

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
