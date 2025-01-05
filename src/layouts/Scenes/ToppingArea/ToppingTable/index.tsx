import {
  ICING_VARIANT,
  TOPPING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";
import { useSelectedTopping } from "@services/stores/toppingAreaStore";
import Draggable from "@components/Draggable";
import {
  icingImages,
  toppingImages,
  toppingCrumpImages,
} from "@assets/toppingArea/config";
import Overlay from "@components/Overlay";

export default function ToppingTable() {
  return (
    <div className="flex h-4/6 w-full">
      <div className="relative flex h-4/5 w-full flex-col gap-x-2 gap-y-1 rounded-xl rounded-l-none rounded-br-none border-4 border-l-0 border-table-border bg-table-primary p-2">
        <div className="bg-table-secondary absolute -bottom-1 left-0 h-4 w-[calc(100%+0.25rem)] translate-y-full rounded-br-xl border-b-4 border-r-4 border-table-border">
          <div className="absolute left-0 h-16 w-[calc(100%-0.5rem)] translate-y-4 bg-gray-400"></div>
        </div>

        <Icing />
        <Topping />
      </div>
    </div>
  );
}

function Icing() {
  return (
    <div className="relative -top-20 flex h-1/2 w-full items-center justify-around">
      {ICING_VARIANT.map((icing, index) => {
        return (
          <Draggable
            key={icing.id}
            id={`icing-${index}`}
            className="flex h-32 w-16 items-center justify-center transition-all duration-500 will-change-transform"
          >
            <Overlay src={icingImages[icing.id as keyof typeof icingImages]} />
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
    <div className="flex h-1/2 w-full items-center justify-around">
      {TOPPING_VARIANT.map((topping, index) => {
        return (
          <div
            key={topping.id}
            onClick={() => setSelected(index)}
            className="relative -top-12 flex h-48 w-24 cursor-pointer items-center justify-center will-change-transform"
          >
            <Overlay
              src={toppingImages[topping.id as keyof typeof toppingImages]}
            />

            {selectedToppings[index] && (
              <Draggable
                id={`topping-${index}`}
                className="absolute -top-1/3 flex size-14 items-center justify-center"
              >
                <div className="relative flex size-28 shrink-0 items-center justify-center">
                  <Overlay
                    src={
                      toppingCrumpImages[
                        topping.id as keyof typeof toppingCrumpImages
                      ]
                    }
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
