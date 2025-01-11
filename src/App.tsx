import { useEffect } from "react";
import Customer from "@core/classes/Customers";
import { customersList } from "@constant/Customers/customers-list.json";
import useCustomersStore from "@services/stores/customersStore";
import Scene from "@layouts/Scenes";
import suffle from "@utils/shuffle";

export default function App() {
  const { setCustomer } = useCustomersStore();

  useEffect(() => {
    setCustomer(() =>
      suffle(customersList)
        .slice(0, 8)
        .map((customer) => new Customer(customer as Customer)),
    );
  }, []);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <main className="flex h-[641px] max-h-[641px] min-h-[641px] w-[1366px] min-w-[1366px] max-w-[1366px] flex-col items-center justify-center bg-slate-200">
        <nav className="h-16 w-full bg-red-600"></nav>
        <Scene />
      </main>
    </main>
  );
}
