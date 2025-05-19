import Package from "@components/Package";
import Packaging from "@core/classes/Packaging";

export default function Container() {
  return (
    <section className="flex h-full w-5/12 pl-0.5">
      <div className="relative flex h-4/5 w-full justify-center rounded-tl-xl border-4 border-table-border bg-table-primary px-6">
        <div className="absolute -bottom-1 -right-1 h-4 w-[calc(100%+0.5rem)] translate-y-full rounded-bl-xl border-b-4 border-l-4 border-table-border bg-table-secondary">
          <div className="absolute right-0 h-16 w-[calc(100%-0.5rem)] translate-y-4 rounded-bl-lg bg-gray-400"></div>
        </div>

        <div className="relative -top-4 flex h-full flex-wrap items-center gap-x-2 gap-y-1 px-1">
          <Package pack={new Packaging({ size: 3 })} />
          <Package pack={new Packaging({ size: 1 })} />
          <Package pack={new Packaging({ size: 6 })} />
          <Package pack={new Packaging({ size: 4 })} />
        </div>
      </div>
    </section>
  );
}
