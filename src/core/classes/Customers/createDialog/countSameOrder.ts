import Donut from "@core/classes/Donut";

export default function countSameOrder(orders: Donut[]) {
  const sameOrder: Map<string, { order: Donut; count: number }> = new Map();

  orders.forEach((order) => {
    const { id, ...orderWithoutId } = order;
    const key = JSON.stringify(orderWithoutId);

    if (sameOrder.has(key)) {
      sameOrder.get(key)!.count += 1;
    } else {
      sameOrder.set(key, { order, count: 1 });
    }
  });

  return Array.from(sameOrder.values()).sort((a, b) => a.count - b.count);
}
