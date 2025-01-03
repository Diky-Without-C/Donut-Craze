import Droppable from "@components/Droppable";

export default function Bin() {
  return (
    <div className="flex h-1/4 w-3/5 items-end">
      <Droppable
        id="trash-can-3"
        className="h-full w-full bg-emerald-600"
      ></Droppable>
    </div>
  );
}
