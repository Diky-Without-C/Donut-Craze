import {
  BASE_PRICE,
  GLAZE_VARIANT,
  TOPPING_VARIANT,
  ICING_VARIANT,
} from "@constant/Donuts/donuts-detail.json";
import suffle from "@utils/shuffle";
import { DonutType } from "./donut.type";

export default class Donut {
  readonly id: string;
  price: number;
  glaze?: string;
  topping?: string;
  icing?: string;
  side: {
    time: number;
    state: string;
  };

  constructor({ glaze, topping, icing }: DonutType) {
    this.id = this.createId();
    this.glaze = glaze;
    this.topping = topping;
    this.icing = icing;
    this.price = this.calculatePrice();
    this.side = {
      time: 0,
      state: "base",
    };
  }

  private createId() {
    const char = "abcdefghijklmopqrstuvwxyz1234567890";
    return suffle([...char])
      .slice(0, 8)
      .join("");
  }

  private calculatePrice() {
    const glazePrice =
      GLAZE_VARIANT.find((item) => item.name === this.glaze)?.price ?? 0;
    const toppingPrice =
      TOPPING_VARIANT.find((item) => item.name === this.topping)?.price ?? 0;
    const icingPrice =
      ICING_VARIANT.find((item) => item.name === this.icing)?.price ?? 0;
    return BASE_PRICE + glazePrice + toppingPrice + icingPrice;
  }

  public addGlaze(glaze: string) {
    this.glaze = glaze;
  }

  public addIcing(icing: string) {
    this.icing = icing;
  }

  public addTopping(topping: string) {
    this.topping = topping;
  }
}
