import { RoughCanvas } from "roughjs/bin/canvas";

abstract class Scene {
  protected Seed: number = 1;
  private seedChangeInterval: number;
  constructor(protected canvas: RoughCanvas) {
    // @ts-ignore
    this.seedChangeInterval  = setInterval(() => {
      this.Seed = Math.floor(Math.random() * 1000);
    }, 500)
  }

  unload() {
    clearInterval(this.seedChangeInterval);
  }

  public abstract create(): void;

  public abstract update(dt: number): void;

  public abstract render(): void;
}

export default Scene;