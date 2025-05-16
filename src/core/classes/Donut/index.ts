import suffle from "@utils/shuffle";

interface DonutType {
  glaze?: string;
  topping?: string;
  icing?: string;
}

export default class Donut {
  readonly id: string;
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
    this.side = {
      time: 0,
      state: "base",
    };
  }

  private createId() {
    const char = [..."abcdefghijklmopqrstuvwxyz1234567890"];
    const randomChars = suffle(char).join("");
    return randomChars.slice(0, 8);
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
