import { useTableStore } from "@services/stores/toppingAreaStore";
import Donut from "@components/Donut";
import TableMat from "./TableMat";
import Bin from "../Bin";

export default function Table() {
  const { table } = useTableStore();

  return (
    <div className="flex h-4/6 w-full flex-col justify-end">
      <div className="bg-table-primary border-table-secondary relative flex h-4/5 w-full flex-wrap gap-x-2 gap-y-1 border-4 p-2">
        <div className="bg-table-secondary absolute bottom-0 left-0 h-20 w-[calc(100%+0.25rem)] translate-y-full overflow-x-hidden"></div>
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
