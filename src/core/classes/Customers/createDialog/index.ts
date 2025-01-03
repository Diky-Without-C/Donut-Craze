import { customerTypes } from "@constant/Customers/customer-types-dialog.json";
import getRandomValue from "@utils/getRandomValue";
import capitalize from "@utils/capitalize";
import getOrderDialog from "./getOrderDialog";
import Customer from "..";

export default function createDialog(self: Customer) {
  const { greetings, prefixes } = customerTypes.find(
    (customer) => customer.type === self.type,
  )!;

  const dialogOrder = [
    getRandomValue(greetings),
    getRandomValue(prefixes),
    getOrderDialog(self),
  ]
    .filter(Boolean)
    .join(" ");

  return capitalize(dialogOrder.trim());
}
