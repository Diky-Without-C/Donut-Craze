import { customersList } from "@constant/Customers/customers-list.json";
import useCustomersStore from "@services/stores/customersStore";
import suffle from "@utils/shuffle";
import Customer from "../Customers";

interface GameType {
  queueLength: number;
}

export default class Game {
  isStart: boolean;
  customerAmount: number = 0;
  queue: Customer[] = [];

  constructor({ queueLength }: GameType) {
    this.isStart = false;
    this.customerAmount = queueLength;
  }

  private init() {
    const { setCustomer } = useCustomersStore();

    setCustomer(() =>
      suffle(customersList)
        .slice(0, 8)
        .map((customer) => new Customer(customer as Customer)),
    );
  }

  public start() {
    this.isStart = true;
    this.init();
  }

  public end() {
    this.isStart = false;
  }
}

const game = new Game({ queueLength: 6 });
game.start();

console.log(game.isStart);
