import {
  ICING_VARIANT,
  TOPPING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";
import { useSelectedTopping } from "@services/stores/toppingAreaStore";
import Draggable from "@components/Draggable";

export default function ToppingTable() {
  return (
    <div className="h-3/5 w-full bg-amber-300">
      <Icing />
      <Topping />
    </div>
  );
}

function Icing() {
  return (
    <div className="flex h-1/2 w-full items-center justify-evenly">
      {ICING_VARIANT.map((icing, index) => {
        return (
          <Draggable
            key={icing.name}
            id={`icing-${index}`}
            className="flex h-3/6 w-1/12 items-center justify-center bg-rose-500 transition-all duration-500"
          >
            {icing.name}
          </Draggable>
        );
      })}
    </div>
  );
}

function Topping() {
  const { selectedToppings, setSelectedToppings } = useSelectedTopping();

  const setSelected = (index: number) => {
    setSelectedToppings(() => {
      const updated = Array(TOPPING_VARIANT.length).fill(false);
      updated[index] = !selectedToppings[index];
      return updated;
    });
  };

  return (
    <div className="flex h-1/2 w-full items-center justify-center gap-x-4">
      {TOPPING_VARIANT.map((topping, index) => {
        return (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className="relative flex h-4/5 w-1/5 cursor-pointer items-center justify-center bg-rose-500"
          >
            {selectedToppings[index] && (
              <Draggable
                id={`topping-${index}`}
                className="absolute -top-1/4 size-14 bg-blue-600"
              ></Draggable>
            )}
            {topping.name}
          </div>
        );
      })}
    </div>
  );
}
