import { difficulty as difficulties } from "@constant/Game/game-detail.json";
import suffle from "@utils/shuffle";
import { CustomerTypes as Type } from "./cutomersType";
import createDialog from "./createDialog";
import makeOrders from "./makeOrders";
import Donut from "../Donut";
import Packaging from "../Packaging";

interface CustomerType {
  name: string;
  type: Type;
  favorite: OrderType;
  difficulty: keyof typeof difficulties;
}

type OrderType = { glaze?: string; topping?: string; icing?: string }[];

export default class Customer {
  readonly id: string;
  name: string;
  type: Type;
  difficulty: keyof typeof difficulties;
  favorite: OrderType;
  orders: Donut[];
  dialog: string;
  orderStack: (Donut | undefined)[] = [];

  constructor({ name, type, favorite, difficulty }: CustomerType) {
    this.id = this.createId();
    this.name = name;
    this.type = type;
    this.difficulty = difficulty;
    this.favorite = favorite;
    this.orders = this.getOrders();
    this.dialog = this.getDialog();
  }

  private createId() {
    const char = [..."abcdefghijklmopqrstuvwxyz1234567890"];
    const randomChars = suffle(char).join("");
    return randomChars.slice(0, 8);
  }

  private getDialog() {
    return createDialog(this);
  }

  private getOrders() {
    return makeOrders(this);
  }

  public checkOrders({ donuts }: Packaging) {
    this.orderStack = [...this.orderStack, ...donuts];
    const validStack = this.orderStack.filter((item) => item !== undefined);

    const orderWithoutId = this.orders.map((order) => {
      const { id, side, ...orderWithoutId } = order;
      return JSON.stringify(orderWithoutId);
    });

    const stackWithoutId = validStack.map((donut) => {
      const { id, side, ...donutWithoutId } = donut;
      return JSON.stringify(donutWithoutId);
    });

    const isEveryElementInArray = (main: string[], sub: string[]) =>
      sub.every((element) => main.includes(element));

    console.log(orderWithoutId, stackWithoutId);
    console.log(isEveryElementInArray(orderWithoutId, stackWithoutId));

    return {
      isOrderCorrect: isEveryElementInArray(orderWithoutId, stackWithoutId),
      isOrderAmountCorrect: validStack.length === this.orders.length,
    };
  }
}
