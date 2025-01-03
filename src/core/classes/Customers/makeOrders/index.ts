import { difficulty } from "@constant/Game/game-detail.json";
import {
  GLAZE_VARIANT,
  TOPPING_VARIANT,
  ICING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";
import getRandomValue from "@utils/getRandomValue";
import shuffle from "@utils/shuffle";
import chance from "@utils/createProbability";
import Donut from "@core/classes/Donut";
import Customer from "..";

export default function makeOrders(self: Customer) {
  const { qty, allowedOrders, maxVariant } = difficulty[self.difficulty];
  const totalOrders = getRandomValue(qty);
  const ordersPerVariant = Math.ceil(totalOrders / maxVariant);
  const orders: Donut[] = [];

  const getRandomVariant = (
    allowed: boolean,
    variants: { name: string; price: number }[],
  ) => (allowed ? getRandomValue(variants)?.name : undefined);

  for (let i = 0; i < maxVariant; i++) {
    const allowedOrder = getRandomValue(allowedOrders);

    const glaze = getRandomVariant(allowedOrder.glaze, GLAZE_VARIANT);
    const topping = getRandomVariant(allowedOrder.topping, TOPPING_VARIANT);
    const icing = getRandomVariant(allowedOrder.icing, ICING_VARIANT);

    for (let j = 0; j < ordersPerVariant; j++) {
      orders.push(new Donut({ glaze, topping, icing }));
    }
  }

  if (chance(1 / 2)) {
    if (self.favorite.length === totalOrders)
      return self.favorite.map((order) => new Donut(order));
  }

  const getSortWeight = (donut: Donut) => {
    const glazeWeight = donut.glaze ? 1 : 0;
    const icingWeight = donut.icing ? 2 : 0;
    const toppingWeight = donut.topping ? 4 : 0;
    return glazeWeight + icingWeight + toppingWeight;
  };

  return shuffle(orders)
    .slice(0, totalOrders)
    .sort((a, b) => getSortWeight(a) - getSortWeight(b));
}
