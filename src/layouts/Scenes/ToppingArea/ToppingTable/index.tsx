import {
  ICING_VARIANT,
  TOPPING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";
import { useSelectedTopping } from "@services/stores/toppingAreaStore";
import Draggable from "@components/Draggable";
import Overlay from "@components/Overlay";
import {
  tableImages,
  icingImages,
  toppingImages,
} from "@assets/toppingArea/config";

export default function ToppingTable() {
  return (
    <div className="relative h-3/5 w-full bg-amber-300">
      <Overlay src={tableImages.topping} className="h-full w-full" />

      <Icing />
      <Topping />
    </div>
  );
}

function Icing() {
  return (
    <div className="flex h-1/2 w-full -translate-y-1/2 items-center justify-evenly">
      {ICING_VARIANT.map((icing, index) => {
        return (
          <Draggable
            key={icing.id}
            id={`icing-${index}`}
            className="relative flex h-32 w-16 items-center justify-center transition-all duration-500"
          >
            <Overlay
              src={icingImages[icing.id as keyof typeof icingImages]}
              className="h-full w-full"
            />
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
    <div className="flex h-1/2 w-full -translate-y-1/3 items-center justify-center">
      {TOPPING_VARIANT.map((topping, index) => {
        return (
          <div
            key={topping.id}
            onClick={() => setSelected(index)}
            className="relative flex h-40 w-28 cursor-pointer items-center justify-center"
          >
            {selectedToppings[index] && (
              <Draggable
                id={`topping-${index}`}
                className="absolute -top-1/4 size-14 bg-blue-600"
              ></Draggable>
            )}
            <Overlay
              src={toppingImages[topping.id as keyof typeof toppingImages]}
              className="h-full w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
