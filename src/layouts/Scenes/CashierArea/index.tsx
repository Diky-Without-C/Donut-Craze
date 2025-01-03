import useCustomersStore from "@services/stores/customersStore";
import Cashier from "./Cashier";
import Character from "./Character";
import Table from "./Table";

export default function CashierArea() {
  const { customers } = useCustomersStore();

  return (
    <section className="flex h-full min-w-full snap-start flex-col justify-end">
      <div className="flex h-3/5 w-full items-end">
        <div className="flex h-full w-2/12 translate-y-1/4 items-end justify-end">
          <Cashier />
        </div>
        <Character character={customers[0]} />
      </div>
      <Table />
    </section>
  );
}
