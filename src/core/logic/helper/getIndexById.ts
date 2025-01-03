import Donut from "@core/classes/Donut";

export default function getIndex(
  array: (Donut | undefined)[] | ({ time: Date; item: Donut } | undefined)[],
  id: string,
) {
  return array.findIndex((data) => {
    if (!data) return false;

    return data instanceof Donut ? data.id === id : data.item?.id === id;
  });
}
