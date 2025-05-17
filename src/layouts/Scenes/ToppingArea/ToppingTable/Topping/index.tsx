import { useRef } from "react";
import { TOPPING_VARIANT } from "@constant/Donuts/donuts-detail.json";
import { useSelectedTopping } from "@services/stores/toppingAreaStore";
import Draggable from "@components/Draggable";
import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";

export default function Topping() {
  const { selectedToppings, setSelectedToppings } = useSelectedTopping();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { images } = useImageStore();
  const { toppingImages, toppingCrumpImages, labelImages } = images as Record<
    string,
    Record<string, string>
  >;

  const clearSelection = () => {
    setSelectedToppings(Array(TOPPING_VARIANT.length).fill(false));
  };

  const handleSelectTopping = (index: number) => {
    setSelectedToppings((prev) => {
      const updated = Array(TOPPING_VARIANT.length).fill(false);
      updated[index] = !prev[index];
      return updated;
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      clearSelection();
    }, 2000);
  };

  const handleDragStart = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDragEnd = () => {
    clearSelection();
  };

  return (
    <div className="flex h-1/2 w-full items-center justify-around">
      {TOPPING_VARIANT.map((topping, index) => {
        const isSelected = selectedToppings[index];
        const toppingId = topping.id as keyof typeof toppingImages;

        return (
          <div
            key={topping.id}
            onClick={() => handleSelectTopping(index)}
            className="relative -top-12 flex h-48 w-24 cursor-pointer items-center justify-center"
          >
            <Overlay src={toppingImages[toppingId]} />
            <Overlay
              src={labelImages[toppingId]}
              className="bottom-2 z-10 translate-x-5 rotate-6 scale-75"
            />

            {isSelected && (
              <Draggable
                id={`topping-${index}`}
                onDraggingStart={handleDragStart}
                onDraggingEnd={handleDragEnd}
                className="absolute -top-12 flex size-14 items-center justify-center"
              >
                <div className="relative z-10 flex size-28 shrink-0 items-center justify-center">
                  <Overlay
                    src={toppingCrumpImages[toppingId]}
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
