import Package from "@components/Package";
import { useCashierPackStore } from "@services/stores/cashierStore";

export default function Table() {
  const { cashierPackages } = useCashierPackStore();
  cashierPackages.sort((a, b) => b.donuts.length - a.donuts.length);

  return (
    <div className="flex h-2/6 w-full items-end justify-center bg-slate-600">
      {cashierPackages.map((pack) => {
        return (
          <div className="scale-90" key={pack.id}>
            <Package pack={pack}></Package>
          </div>
        );
      })}
    </div>
  );
}
