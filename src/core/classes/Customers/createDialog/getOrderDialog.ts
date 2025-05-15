import chance from "@utils/createProbability";
import formatOrders from "./formatOrders";
import countSameOrder from "./countSameOrder";
import numberToText from "./numberToText";
import Customer from "..";

export default function getOrderDialog(self: Customer) {
  const groupedOrders = countSameOrder(self.orders);
  const totalOrders = self.orders.length;

  function describeOrder(
    order: (typeof self.orders)[number],
    count: number | null = null,
    isHalfPortion: boolean = false,
    index: number,
  ): string {
    const { glaze, topping, icing } = order;
    const description: string[] = [];

    const showIntro =
      index === 0 &&
      !isHalfPortion &&
      totalOrders > 3 &&
      groupedOrders.length > 1;

    if (showIntro) {
      description.push(`${totalOrders} donat.`);
    }

    if (isHalfPortion) {
      const isEven = totalOrders % 2 === 0;
      description.push(
        index === 0
          ? `${totalOrders} donat, ${isEven ? "setengah" : ""}`
          : isEven
            ? "setengahnya lagi"
            : "sisanya",
      );
    } else if (count && count > 1) {
      description.push(numberToText(count));
    }

    // Donut type
    if (glaze) {
      description.push(`donat ${glaze}`);
      if (!topping && !icing && chance(1 / 4)) {
        description.push("tanpa topping");
      }
    } else {
      description.push("donat original");
    }

    // Extras
    if (topping && icing) {
      description.push(`dengan ${icing} dan toping ${topping}`);
    } else if (topping) {
      description.push(`dengan ${topping}`);
    } else if (icing) {
      description.push(`dengan ${icing}`);
    }

    return description.join(" ");
  }

  function generateDialog(): string[] {
    const useHalfPortion =
      chance(1 / 2) && groupedOrders.length === 2 && groupedOrders[0].count > 1;

    return groupedOrders.map(({ order, count }, index) =>
      describeOrder(order, count, useHalfPortion, index),
    );
  }

  return formatOrders(generateDialog());
}
