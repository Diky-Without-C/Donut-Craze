import Container from "./Container";
import Conveyor from "./Conveyor";
import Table from "./Table";

export default function PackingArea() {
  return (
    <section className="relative flex min-h-full w-1/3 flex-col justify-end">
      <div className="flex h-2/6 w-full">
        <Conveyor />
      </div>
      <div className="flex h-4/6 w-full">
        <Container />
        <Table />
      </div>
    </section>
  );
}
