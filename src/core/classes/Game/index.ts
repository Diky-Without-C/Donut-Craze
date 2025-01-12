export default class Game {
  isStart: boolean;

  constructor() {
    this.isStart = false;
  }

  public start() {
    this.isStart = true;
  }

  public end() {
    this.isStart = false;
  }
}
