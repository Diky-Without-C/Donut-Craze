import chance from "@utils/createProbability";
import formatOrders from "./formatOrders";
import countSameOrder from "./countSameOrder";
import Customer from "..";

export default function getOrderDialog(self: Customer) {
  const sameOrder = countSameOrder(self.orders);
  const totalOrders = self.orders.length;

  function buildOrderDescription(
    order: (typeof self.orders)[number],
    count: number | null = null,
    isHalf: boolean = false,
    current: number,
  ): string {
    const { glaze, topping, icing } = order;
    const parts: string[] = [];

    if (current === 0 && totalOrders > 3 && !isHalf && sameOrder.length > 1) {
      parts.push(`${totalOrders} donat.`);
    }

    if (isHalf) {
      if (totalOrders % 2 === 0) {
        parts.push(
          current === 0 ? `${totalOrders} donat, setengah` : "setengahnya lagi",
        );
      } else {
        parts.push(current === 0 ? `${totalOrders} donat,` : "sisanya");
      }
    } else if (count && count > 1) {
      parts.push(String(count));
    }

    if (glaze) {
      parts.push(`donat ${glaze}`);
      if (!topping && !icing && chance(1 / 4)) {
        parts.push("tanpa topping");
      }
    } else {
      parts.push("donat original");
    }

    if (topping && icing) {
      parts.push(`dengan ${icing} dan toping ${topping}`);
    } else if (topping) {
      parts.push(`dengan ${topping}`);
    } else if (icing) {
      parts.push(`dengan ${icing}`);
    }

    return parts.join(" ");
  }

  let orderDialog = sameOrder.map(({ order, count }, index) =>
    buildOrderDescription(order, count, false, index),
  );

  if (chance(1 / 2)) {
    if (sameOrder.length === 2 && sameOrder[0].count > 1) {
      orderDialog = sameOrder.map(({ order }, index) =>
        buildOrderDescription(order, index, true, index),
      );
    }
  }

  const dialog = orderDialog;

  return formatOrders(dialog);
}
