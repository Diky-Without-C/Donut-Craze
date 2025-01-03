import { usePackageTableStore } from "@services/stores/packingAreaStore";
import { useCashierPackStore } from "@services/stores/cashierStore";
import Droppable from "@components/Droppable";
import Package from "@components/Package";
import Bin from "../Bin";
import SubmitButton from "./submitButton";

export default function Table() {
  const { packageTable, setPackageTable } = usePackageTableStore();
  const { setCashierPackages } = useCashierPackStore();

  const handleSubmit = () => {
    if (packageTable[0].donuts.some((donut) => donut)) {
      setCashierPackages((self) => [...self, packageTable[0]]);
      setPackageTable(() => []);
    }
  };

  return (
    <div className="flex h-full w-5/12 flex-col bg-red-500">
      <section className="flex h-3/4 w-full items-center bg-green-400">
        <Droppable
          id="pack-table"
          className="flex h-full w-5/6 flex-wrap items-center justify-center gap-x-2 gap-y-1"
        >
          {packageTable.map((pack) => {
            return <Package key={pack.id} pack={pack} isOpen={true} />;
          })}
        </Droppable>
        <div className="flex h-full w-1/6 items-center justify-center">
          <SubmitButton onClick={handleSubmit} />
        </div>
      </section>
      <Bin />
    </div>
  );
}
