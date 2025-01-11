import { TOPPING_VARIANT } from "@constant/Donuts/donuts-detail.json";
import { useSelectedTopping } from "@services/stores/toppingAreaStore";
import Draggable from "@components/Draggable";
import {
  toppingImages,
  toppingCrumpImages,
  labelImages,
} from "@assets/toppingArea/config";
import Overlay from "@components/Overlay";

export default function Topping() {
  const { selectedToppings, setSelectedToppings } = useSelectedTopping();

  const setSelected = (index: number) => {
    setSelectedToppings(() => {
      const updated = Array(TOPPING_VARIANT.length).fill(false);
      updated[index] = !selectedToppings[index];
      return updated;
    });
  };

  return (
    <div className="flex h-1/2 w-full items-center justify-around">
      {TOPPING_VARIANT.map((topping, index) => {
        return (
          <div
            key={topping.id}
            onClick={() => setSelected(index)}
            className="relative -top-12 flex h-48 w-24 cursor-pointer items-center justify-center"
          >
            <Overlay
              src={toppingImages[topping.id as keyof typeof toppingImages]}
            />
            <Overlay
              src={labelImages[topping.id as keyof typeof labelImages]}
              className="bottom-2 z-10 translate-x-5 rotate-6 scale-75"
            />

            {selectedToppings[index] && (
              <Draggable
                id={`topping-${index}`}
                className="absolute -top-12 flex size-14 items-center justify-center"
              >
                <div className="relative z-10 flex size-28 shrink-0 items-center justify-center">
                  <Overlay
                    src={
                      toppingCrumpImages[
                        topping.id as keyof typeof toppingCrumpImages
                      ]
                    }
                    className="translate-x-8"
                  />
                </div>
              </Draggable>
            )}
          </div>
        );
      })}
    </div>
  );
}
