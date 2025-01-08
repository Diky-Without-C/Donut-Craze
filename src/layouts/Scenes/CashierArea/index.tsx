import useCustomersStore from "@services/stores/customersStore";
import Cashier from "./Cashier";
import Character from "./Character";
import Table from "./Table";
import Dialog from "./Character/Dialog";

export default function CashierArea() {
  const { customers } = useCustomersStore();

  return (
    <section className="flex h-full min-w-full snap-start flex-col justify-end">
      <div className="flex h-4/6 w-full items-end">
        <div className="relative flex h-full w-3/12 items-end justify-end">
          <Cashier />
        </div>
        <div className="relative flex h-full w-9/12 items-end">
          {customers[0] && <Character character={customers[0]} />}
          {customers[0] && <Dialog character={customers[0]} />}
        </div>
      </div>
      <Table />
    </section>
  );
}
