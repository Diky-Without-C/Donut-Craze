const pi2 = 2 * Math.PI;

const MAX_BUBBLES = 100;
const MIN_BUBBLE_SIZE = 5;
const MAX_BUBBLE_SIZE = 10;

const LIFETIME_HEIGHT_RATIO = 4000 / 300;

type Position = {
  x: number;
  y: number;
};

class Bubbles {
  static forEach(canvases: HTMLCanvasElement[]): Bubbles[] {
    return canvases.map((canvas) => new Bubbles(canvas));
  }

  static isVisible(): boolean {
    if ("visibilityState" in document) {
      return document.visibilityState !== "hidden";
    }
    if ("hidden" in document) {
      return !(document as any).hidden;
    }
    return true;
  }

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bubbles: Bubble[] = [];
  firstSpawn = true;
  width: number = 0;
  height: number = 0;
  sizeChangeTimeout?: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas context not available");
    this.ctx = context;

    this.requestAnimationFrame();

    document.addEventListener(
      typeof (document as any).msHidden !== "undefined"
        ? "msvisibilitychange"
        : typeof (document as any).webkitHidden !== "undefined"
          ? "webkitvisibilitychange"
          : "visibilitychange",
      this.documentVisibilityChange.bind(this),
      false,
    );
  }

  requestAnimationFrame() {
    requestAnimationFrame(this.draw.bind(this));
  }

  documentVisibilityChange() {
    if (this.firstSpawn) return;
    this.firstSpawn = true;
    this.bubbles = [];
  }

  calcCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    const { width, height } = rect;
    if (this.width !== width || this.height !== height) {
      const scale = window.devicePixelRatio;
      const scaledWidth = Math.floor(width * scale);
      const scaledHeight = Math.floor(height * scale);

      this.canvas.width = scaledWidth;
      this.canvas.height = scaledHeight;
      this.ctx.scale(scale, scale);

      if (
        this.width !== undefined &&
        this.height !== undefined &&
        (width > this.width || height > this.height)
      ) {
        if (this.sizeChangeTimeout !== undefined)
          clearTimeout(this.sizeChangeTimeout);
        this.sizeChangeTimeout = window.setTimeout(
          this.documentVisibilityChange.bind(this),
          250,
        );
      }
    }

    this.width = width;
    this.height = height;
  }

  spawnBubble(timeStamp: number) {
    this.bubbles.push(new Bubble(timeStamp, this));
  }

  spawnBubbles(timeStamp: number) {
    while (this.bubbles.length < Math.ceil(MAX_BUBBLES / 2)) {
      this.spawnBubble(timeStamp);
    }
  }

  drawBubbles(timeStamp: number) {
    let i = 0;
    while (i < this.bubbles.length) {
      const bubble = this.bubbles[i];
      const timeFrac = bubble.getTimeFrac(timeStamp);
      if (timeFrac >= 1) {
        this.bubbles.splice(i, 1);
        continue;
      } else if (timeFrac >= 0.5 && !bubble.nextSpawned) {
        bubble.nextSpawned = true;
        this.spawnBubble(timeStamp);
      }

      bubble.draw(timeFrac);
      i++;
    }
  }

  draw(timeStamp: number) {
    this.calcCanvasSize();
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.spawnBubbles(timeStamp);
    this.drawBubbles(timeStamp);
    this.firstSpawn = false;

    this.requestAnimationFrame();
  }
}

class Bubble {
  static random(min: number, max: number): number {
    return Math.floor(
      Math.random() * (Math.round(max) - Math.round(min) + 1) + Math.round(min),
    );
  }

  static easeInSine(f: number): number {
    return 1 - Math.cos((f * Math.PI) / 2);
  }

  static easeInOutSine(f: number): number {
    return -(Math.cos(Math.PI * f) - 1) / 2;
  }

  static getLifeTime(height: number): number {
    return Bubble.random(
      height * LIFETIME_HEIGHT_RATIO,
      height * LIFETIME_HEIGHT_RATIO * 2,
    );
  }

  static getSize(): number {
    return Bubble.random(MIN_BUBBLE_SIZE, MAX_BUBBLE_SIZE);
  }

  static getAlpha(): number {
    return Bubble.random(20, 70) / 100;
  }

  static getPos(width: number, _height: number, size: number): Position {
    return { x: Bubble.random(0, width), y: size * 2 };
  }

  static getWobbleCoefficient(): number {
    return Bubble.random(-100, 100) / 10;
  }

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bubbles: Bubbles;
  alpha: number;
  size: number;
  pos: Position;
  wobbleCoefficient: number;
  lifeStart: number;
  lifeTime: number;
  nextSpawned?: boolean;

  constructor(lifeStart: number, bubbles: Bubbles) {
    this.bubbles = bubbles;
    this.canvas = this.bubbles.canvas;
    this.ctx = this.bubbles.ctx;

    this.alpha = Bubble.getAlpha();
    this.size = Bubble.getSize();
    this.pos = Bubble.getPos(
      this.bubbles.width,
      this.bubbles.height,
      this.size,
    );
    this.wobbleCoefficient = Bubble.getWobbleCoefficient();

    this.lifeStart = lifeStart;
    this.lifeTime = Bubble.getLifeTime(this.bubbles.height);
    if (this.bubbles.firstSpawn) {
      this.lifeStart -= this.lifeTime * (Bubble.random(0, 100) / 100);
    }
  }

  getTimeFrac(timeStamp: number): number {
    return (timeStamp - this.lifeStart) / this.lifeTime;
  }

  getWobble(timeFrac: number): number {
    return this.size * Math.sin(timeFrac * pi2) * this.wobbleCoefficient;
  }

  draw(timeFrac: number) {
    const riseHeight = this.bubbles.height + this.size / 2 + this.pos.y;
    const x = this.pos.x + this.getWobble(timeFrac);
    const y =
      this.bubbles.height +
      this.pos.y -
      Bubble.easeInSine(timeFrac) * riseHeight;

    const floorDist = Math.min(
      Math.max((this.bubbles.height - y) / (this.bubbles.height * 0.1), 0),
      1,
    );

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size / 2, 0, pi2);
    this.ctx.fillStyle = `rgba(254, 240, 138, ${this.alpha * floorDist})`;
    this.ctx.fill();
  }
}

export default Bubbles;
