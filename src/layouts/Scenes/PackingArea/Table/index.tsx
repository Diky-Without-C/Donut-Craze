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
    <div className="flex h-full w-5/12 flex-col">
      <section className="relative flex h-4/5 w-full items-center rounded-tr-xl border-4 border-l-0 border-table-border bg-table-primary">
        <div className="absolute -bottom-1 left-0 h-4 w-[calc(100%+0.25rem)] translate-y-full rounded-br-xl border-b-4 border-r-4 border-table-border bg-table-secondary">
          <div className="absolute left-0 h-16 w-[calc(100%-0.5rem)] translate-y-4 rounded-br-lg bg-gray-400"></div>
        </div>

        <Droppable
          id="pack-table"
          className="flex h-full w-9/12 flex-wrap items-center justify-center gap-x-2 gap-y-1"
        >
          {packageTable.map((pack) => {
            return <Package key={pack.id} pack={pack} isOpen={true} />;
          })}
        </Droppable>
        <div className="flex h-full w-3/12 items-center justify-center">
          <SubmitButton onClick={handleSubmit} />
        </div>
      </section>
      <Bin />
    </div>
  );
}
