import Package from "@components/Package";
import { useCashierPackStore } from "@services/stores/cashierStore";

export default function Table() {
  const { cashierPackages } = useCashierPackStore();
  cashierPackages.sort((a, b) => b.donuts.length - a.donuts.length);

  return (
    <div className="flex h-2/6 w-full justify-center border-t-4 border-[#908887] bg-[#e7d7d5]">
      <div className="relative -top-4 flex h-full w-3/6 gap-1">
        {cashierPackages.map((pack) => {
          return <Package key={pack.id} pack={pack}></Package>;
        })}
      </div>
    </div>
  );
}
