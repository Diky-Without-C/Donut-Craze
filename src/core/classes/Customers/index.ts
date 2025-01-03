import { difficulty } from "@constant/Game/game-detail.json";
import suffle from "@utils/shuffle";
import { CustomerTypes as Type } from "./cutomers.type";
import createDialog from "./createDialog";
import makeOrders from "./makeOrders";
import Donut from "../Donut";
import Packaging from "../Packaging";

interface CustomerType {
  name: string;
  type: Type;
  favorite: OrderType;
}

type OrderType = { glaze?: string; topping?: string; icing?: string }[];

export default class Customer {
  id: string;
  name: string;
  type: Type;
  difficulty: keyof typeof difficulty;
  favorite: OrderType;
  orders: Donut[];
  dialog: string;
  totalPrice: number;
  orderStack: (Donut | undefined)[] = [];

  constructor({ name, type, favorite }: CustomerType) {
    this.id = this.createId();
    this.name = name;
    this.type = type;
    this.difficulty = "hard";
    this.favorite = favorite;
    this.orders = this.getOrders();
    this.dialog = this.getDialog();
    this.totalPrice = this.getTotalPrice();
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

  private getTotalPrice() {
    return this.orders.map((order) => order.price).reduce((a, b) => a + b, 0);
  }

  public checkOrders({ donuts }: Packaging) {
    this.orderStack = [...this.orderStack, ...donuts];
    const validStack = this.orderStack.filter((item) => item !== undefined);

    if (validStack.length >= this.orders.length) {
      return true;
    }

    return false;
  }
}
