import Customer from "../Customers";
import Packaging from "../Packaging";

export default class Game {
  isStart: boolean;
  level: number;
  customers: Customer[];
  completedOrders: Packaging[];

  constructor() {
    this.isStart = false;
    this.level = 1;
    this.customers = [];
    this.completedOrders = [];
  }

  public start() {
    this.isStart = true;
  }

  public end() {
    this.isStart = false;
  }

  public setLevel(level: number) {
    this.level = level;
  }
}
