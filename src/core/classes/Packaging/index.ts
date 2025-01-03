import suffle from "@utils/shuffle";
import { PackagigType } from "./packaging.type";
import Donut from "../Donut";

export default class Packaging {
  readonly id: string;
  donuts: (Donut | undefined)[];
  size: { width: number; height: number };

  constructor({ size }: PackagigType) {
    this.id = this.createId(size);
    this.size = this.getSize(size);
    this.donuts = Array.from({ length: size }, () => undefined);
  }

  private createId(size: PackagigType["size"]) {
    const char = "abcdefghijklmopqrstuvwxyz";
    return (
      size +
      suffle([...char])
        .slice(0, 8)
        .join("")
    );
  }

  private getSize(size: PackagigType["size"]) {
    const width = size % 3 === 0 ? 3 : size % 2 === 0 ? 2 : 1;
    const height = size > 3 ? 2 : 1;
    return { width, height };
  }
}
