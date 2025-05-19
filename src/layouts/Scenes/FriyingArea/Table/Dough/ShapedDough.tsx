import { useShapedDoughStore } from "@services/stores/fryingAreaStore";
import Donut from "@components/Donut";

export default function ShapedDough() {
  const { shapedDough } = useShapedDoughStore();

  return (
    <div className="absolute flex h-full w-full flex-wrap justify-center gap-x-4 gap-y-2">
      {shapedDough.map((donut, index) => {
        return (
          <div key={index} className="flex size-24 items-center justify-center">
            {donut && <Donut donut={donut} />}
          </div>
        );
      })}
    </div>
  );
}
