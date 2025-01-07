import Icing from "./Icing";
import Topping from "./Topping";

export default function ToppingTable() {
  return (
    <div className="flex h-4/6 w-full">
      <div className="relative flex h-4/5 w-full flex-col gap-x-2 gap-y-1 rounded-xl rounded-l-none rounded-br-none border-4 border-l-0 border-table-border bg-table-primary p-2">
        <div className="absolute -bottom-1 left-0 h-4 w-[calc(100%+0.25rem)] translate-y-full rounded-br-xl border-b-4 border-r-4 border-table-border bg-table-secondary">
          <div className="absolute left-0 h-16 w-[calc(100%-0.5rem)] translate-y-4 bg-gray-400"></div>
        </div>

        <Icing />
        <Topping />
      </div>
    </div>
  );
}
