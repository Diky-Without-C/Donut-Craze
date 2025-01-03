import Package from "@components/Package";
import Packaging from "@core/classes/Packaging";

export default function Container() {
  return (
    <section className="flex h-full w-5/12 flex-wrap items-center bg-pink-300 p-1">
      <Package pack={new Packaging({ size: 3 })} />
      <Package pack={new Packaging({ size: 1 })} />
      <Package pack={new Packaging({ size: 6 })} />
      <Package pack={new Packaging({ size: 4 })} />
    </section>
  );
}
