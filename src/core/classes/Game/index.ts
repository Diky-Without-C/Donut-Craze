export default class Game {
  isStart: boolean;
  level: number;

  constructor() {
    this.isStart = false;
    this.level = 1;
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
