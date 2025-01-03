import Shelf from "./Shelf";
import Table from "./Table";
import Ticket from "./Ticket";
import GlazeTable from "./GlazeTable";
import ToppingTable from "./ToppingTable";

export default function ToppingArea() {
  return (
    <section className="relative flex min-h-full w-1/3">
      <Shelf />
      <div className="h-full w-6/12">
        <GlazeTable />
        <Table />
      </div>
      <div className="flex h-full w-4/12 flex-col justify-between">
        <div className="flex h-1/5 w-1/4 justify-center">
          <Ticket />
        </div>
        <ToppingTable />
      </div>
    </section>
  );
}
