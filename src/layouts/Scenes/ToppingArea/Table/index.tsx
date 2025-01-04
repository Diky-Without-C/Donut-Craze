import { useTableStore } from "@services/stores/toppingAreaStore";
import Donut from "@components/Donut";
import TableMat from "./TableMat";
import Bin from "../Bin";
import Overlay from "@components/Overlay";
import { tableImages } from "@assets/toppingArea/config";

export default function Table() {
  const { table } = useTableStore();

  return (
    <div className="flex h-4/6 w-full flex-col justify-end">
      <div className="relative flex h-4/5 w-full">
        <Overlay
          src={tableImages.main}
          className="left-0 top-0 z-0 h-[104%] w-full"
        />

        <div className="z-10 flex h-full w-full flex-wrap gap-x-2 gap-y-1 p-2">
          {table.map((donut, index) => {
            return (
              <TableMat key={index} id={`tableSlot-${index}`}>
                {donut && <Donut donut={donut} />}
              </TableMat>
            );
          })}
        </div>
      </div>
      <Bin />
    </div>
  );
}
