import Donut from "@core/classes/Donut";

export default function sortOrders(order: Donut[]) {
  const getSortWeight = (donut: Donut) => {
    const glazeWeight = donut.glaze ? 1 : 0;
    const icingWeight = donut.icing ? 2 : 0;
    const toppingWeight = donut.topping ? 4 : 0;
    return glazeWeight + icingWeight + toppingWeight;
  };

  return order.sort((a, b) => getSortWeight(a) - getSortWeight(b));
}
