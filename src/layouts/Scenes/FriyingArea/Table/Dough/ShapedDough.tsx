import {
  useDoughStore,
  useShapedDoughStore,
} from "@services/stores/fryingAreaStore";
import Donut from "@components/Donut";

export default function ShapedDough() {
  const { dough } = useDoughStore();
  const { shapedDough } = useShapedDoughStore();
  const areAllMolded = dough.grid.every((state) => state.isMolded);

  return (
    <div className="absolute flex h-full w-full flex-wrap justify-center gap-x-4 gap-y-2">
      {shapedDough.map((donut, index) => {
        return (
          <div key={index} className="flex size-24 items-center justify-center">
            {donut && (
              <Donut
                donut={donut}
                condition={areAllMolded}
                className={
                  dough.grid[index].isMolded && !areAllMolded
                    ? "pointer-events-none"
                    : ""
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
