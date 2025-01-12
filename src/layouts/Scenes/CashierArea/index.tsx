import Cashier from "./Cashier";
import Table from "./Table";
import Customer from "./Customer";

export default function CashierArea() {
  return (
    <section className="flex h-full min-w-full snap-start flex-col justify-end">
      <div className="flex h-4/6 w-full items-end">
        <div className="relative flex h-full w-3/12 items-end justify-end">
          <Cashier />
        </div>
        <div className="relative flex h-full w-9/12 items-end overflow-hidden">
          <Customer />
        </div>
      </div>
      <Table />
    </section>
  );
}
