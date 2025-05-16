import Customer from "../Customers";

export default class Game {
  isStart: boolean;
  level: number;
  customers: Customer[];

  constructor() {
    this.isStart = false;
    this.level = 1;
    this.customers = [];
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
