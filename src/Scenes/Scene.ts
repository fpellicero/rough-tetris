import Engine from "../Engine/Engine";

class Scene {
  protected get rough() {
    return this.Engine.roughCanvas;
  }

  protected get graphics() {
    return this.Engine.canvas.getContext("2d");
  }

  constructor(protected Engine: Engine) {}

  public create(): void {

  }

  public unload(): void {

  }

  public update(dt: number): void {

  }

  public render(): void {
    
  }
}

export default Scene;