export default function formatOrders(orders: string[]): string {
  return orders.length > 1
    ? orders.slice(0, -1).join(", ") + " dan " + orders.slice(-1)
    : orders[0] || "";
}
