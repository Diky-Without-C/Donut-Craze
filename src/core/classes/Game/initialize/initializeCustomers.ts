import { customersList } from "@constant/Customers/customers-list.json";
import Customer from "@core/classes/Customers";
import suffle from "@utils/shuffle";
import { level } from "@constant/Game/level-data.json";

export default function initializeCustomers(currentLevel: string) {
  const difficulties = suffle(level[currentLevel as keyof typeof level]);
  const shuffledCustomers = suffle(customersList).slice(0, difficulties.length);

  const customers = shuffledCustomers.map((customer, index) => {
    return new Customer({
      ...customer,
      difficulty: difficulties[index],
    } as Customer);
  });

  return customers;
}
