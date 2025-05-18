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
import canUseFavoriteOrders from "./checkAvailableFav";
import getRandomVariant from "./getRandomVariant";
import Customer from "..";
import sortOrders from "./sortOrders";

export default function makeOrders(self: Customer) {
  const { qty, allowedOrders, maxVariant } = difficulty[self.difficulty];
  const totalOrders = getRandomValue(qty);
  const ordersPerVariant = Math.ceil(totalOrders / maxVariant);
  const orders: Donut[] = [];

  if (chance(3 / 5)) {
    const favoriteAreValid =
      canUseFavoriteOrders(self.favorite, allowedOrders, maxVariant) &&
      self.favorite.length === totalOrders;

    if (favoriteAreValid) return self.favorite.map((order) => new Donut(order));
  }

  for (let i = 0; i < maxVariant; i++) {
    const allowedOrder = getRandomValue(allowedOrders);

    const glaze = getRandomVariant(allowedOrder.glaze, GLAZE_VARIANT);
    const topping = getRandomVariant(allowedOrder.topping, TOPPING_VARIANT);
    const icing = getRandomVariant(allowedOrder.icing, ICING_VARIANT);

    for (let j = 0; j < ordersPerVariant; j++) {
      orders.push(new Donut({ glaze, topping, icing }));
    }
  }

  return sortOrders(shuffle(orders).slice(0, totalOrders));
}
