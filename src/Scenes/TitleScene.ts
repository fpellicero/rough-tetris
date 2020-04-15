import Scene from "./Scene";
import { RoughCanvas } from "roughjs/bin/canvas";

class TitleScene extends Scene {
  private boxSize = 16;
  private colors = {
    T: "red",
    E: "green",
    R: "purple",
    I: "blue",
    S: "orange",
  };
  public update(dt: number) {}

  public create() {

  }

  private renderT(x: number, y: number) {
    this.canvas.polygon(
      [
        [x, y],
        [x + this.boxSize * 3, y],
        [x + this.boxSize * 3, y + this.boxSize],
        [x + this.boxSize * 2, y + this.boxSize],
        [x + this.boxSize * 2, y + this.boxSize * 3],
        [x + this.boxSize, y + this.boxSize * 3],
        [x + this.boxSize, y + this.boxSize],
        [x, y + this.boxSize],
        [x, y],
      ],
      { fill: this.colors.T, seed: this.Seed }
    );
  }

  private renderE(x: number, y: number) {
    const gapSize = (3 / 5) * this.boxSize;
    this.canvas.polygon(
      [
        [x, y],
        [x + this.boxSize * 2, y],
        [x + this.boxSize * 2, y + gapSize],
        [x + this.boxSize, y + gapSize],
        [x + this.boxSize, y + gapSize * 2],
        [x + this.boxSize * 2, y + gapSize * 2],
        [x + this.boxSize * 2, y + gapSize * 3],
        [x + this.boxSize, y + gapSize * 3],
        [x + this.boxSize, y + gapSize * 4],
        [x + this.boxSize * 2, y + gapSize * 4],
        [x + this.boxSize * 2, y + gapSize * 5],
        [x, y + gapSize * 5],
        [x, y],
      ],
      { fill: this.colors.E, seed: this.Seed }
    );
  }

  private renderR(x: number, y: number) {
    this.canvas.polygon(
      [
        [x, y],
        [x + this.boxSize * 2, y],
        [x + this.boxSize * 2, y + this.boxSize * 2],
        [x + this.boxSize, y + this.boxSize * 2],
        [x + this.boxSize * 2, y + this.boxSize * 3],
        [x + ((this.boxSize * 2) / 3) * 2, y + this.boxSize * 3],
        [x + (this.boxSize * 2) / 3, y + this.boxSize * 2.5],
        [x + (this.boxSize * 2) / 3, y + this.boxSize * 3],
        [x, y + this.boxSize * 3],
        [x, y],
      ],
      { fill: this.colors.R, seed: this.Seed }
    );

    this.canvas.rectangle(
      x + this.boxSize / 1.5,
      y + this.boxSize / 1.5,
      this.boxSize * 0.75,
      this.boxSize * 0.75,
      { fill: "white", fillStyle: "solid", seed: this.Seed }
    );
  }

  private renderI(x: number, y: number) {
    this.canvas.rectangle(x, y, this.boxSize, this.boxSize * 3, {
      fill: this.colors.I,
      seed: this.Seed
    });
  }

  private renderS(x: number, y: number) {
    const gapSize = (3 / 5) * this.boxSize;

    this.canvas.polygon(
      [
        [x, y],
        [x + this.boxSize * 2, y],
        [x + this.boxSize * 2, y + gapSize],
        [x + gapSize, y + gapSize],
        [x + gapSize, y + gapSize * 2],
        [x + this.boxSize * 2, y + gapSize * 2],
        [x + this.boxSize * 2, y + gapSize * 5],
        [x, y + gapSize * 5],
        [x, y + gapSize * 4],
        [x + this.boxSize * 2 - gapSize, y + gapSize * 4],
        [x + this.boxSize * 2 - gapSize, y + gapSize * 3],
        [x, y + gapSize * 3],
      ],
      { fill: this.colors.S, seed: this.Seed }
    );
  }

  public render() {
    let x = 65;
    let y = 100;

    this.renderT(x, y);
    this.renderE((x += 5) + this.boxSize * 3, y);
    this.renderT((x += 5) + this.boxSize * (3 + 2), y);
    this.renderR((x += 5) + this.boxSize * (3 + 2 + 3), y);
    this.renderI((x += 5) + this.boxSize * (3 + 2 + 3 + 2), y);
    this.renderS((x += 5) + this.boxSize * (3 + 2 + 3 + 2 + 1), y);
  }
}

export default TitleScene;
