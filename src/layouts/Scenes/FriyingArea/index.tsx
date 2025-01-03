import DrainingTray from "./DrainingTray";
import Counter from "./Counter";
import Stove from "./Stove";
import Table from "./Table";

export default function FryingArea() {
  return (
    <section className="flex min-h-full w-1/3 items-end">
      <div className="flex h-full w-6/12 flex-col items-center justify-end">
        <Counter />
        <Table />
      </div>
      <div className="flex h-full w-6/12 flex-col">
        <DrainingTray />
        <Stove />
      </div>
    </section>
  );
}
