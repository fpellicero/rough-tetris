import Scene from "./Scene";
import Config from "../Config";
import anime from "animejs";
import GameScene from "./GameScene";
import { NormalizedInputEvent } from "../Engine/InputManager";

class TitleScene extends Scene {
  private colors = {
    T: "red",
    E: "green",
    R: "purple",
    I: "blue",
    S: "orange",
  };

  private textOpacity = 0;
  private TitlePosition = {x: 65, y: 0};
  public update(dt: number) {}

  public create() {
    let textAnim = anime({
      targets: this,
      textOpacity: 1,
      direction: 'alternate',
      easing: 'linear',
      duration: 1000,
      loop: true,
      autoplay: false,
    });

    anime({
      targets: this.TitlePosition,
      y: 200,
      easing: 'easeOutBounce',
      duration: 1000,
      complete: () => textAnim.play()
    });

    this.Engine.InputManager.on(NormalizedInputEvent.ACTION, this.startGame);
  }

  public unload() {
    this.Engine.InputManager.off(NormalizedInputEvent.ACTION, this.startGame);
  }

  private startGame = () => {
    this.Engine.startScene(GameScene);
  }

  private renderT(x: number, y: number) {
    this.rough.polygon(
      [
        [x, y],
        [x + Config.blockSize * 3, y],
        [x + Config.blockSize * 3, y + Config.blockSize],
        [x + Config.blockSize * 2, y + Config.blockSize],
        [x + Config.blockSize * 2, y + Config.blockSize * 3],
        [x + Config.blockSize, y + Config.blockSize * 3],
        [x + Config.blockSize, y + Config.blockSize],
        [x, y + Config.blockSize],
        [x, y],
      ],
      { fill: this.colors.T }
    );
  }

  private renderE(x: number, y: number) {
    const gapSize = (3 / 5) * Config.blockSize;
    this.rough.polygon(
      [
        [x, y],
        [x + Config.blockSize * 2, y],
        [x + Config.blockSize * 2, y + gapSize],
        [x + Config.blockSize, y + gapSize],
        [x + Config.blockSize, y + gapSize * 2],
        [x + Config.blockSize * 2, y + gapSize * 2],
        [x + Config.blockSize * 2, y + gapSize * 3],
        [x + Config.blockSize, y + gapSize * 3],
        [x + Config.blockSize, y + gapSize * 4],
        [x + Config.blockSize * 2, y + gapSize * 4],
        [x + Config.blockSize * 2, y + gapSize * 5],
        [x, y + gapSize * 5],
        [x, y],
      ],
      { fill: this.colors.E }
    );
  }

  private renderR(x: number, y: number) {
    this.rough.polygon(
      [
        [x, y],
        [x + Config.blockSize * 2, y],
        [x + Config.blockSize * 2, y + Config.blockSize * 2],
        [x + Config.blockSize, y + Config.blockSize * 2],
        [x + Config.blockSize * 2, y + Config.blockSize * 3],
        [x + ((Config.blockSize * 2) / 3) * 2, y + Config.blockSize * 3],
        [x + (Config.blockSize * 2) / 3, y + Config.blockSize * 2.5],
        [x + (Config.blockSize * 2) / 3, y + Config.blockSize * 3],
        [x, y + Config.blockSize * 3],
        [x, y],
      ],
      { fill: this.colors.R }
    );

    this.rough.rectangle(
      x + Config.blockSize / 1.5,
      y + Config.blockSize / 1.5,
      Config.blockSize * 0.75,
      Config.blockSize * 0.75,
      { fill: "white", fillStyle: "solid" }
    );
  }

  private renderI(x: number, y: number) {
    this.rough.rectangle(x, y, Config.blockSize, Config.blockSize * 3, {
      fill: this.colors.I,
    });
  }

  private renderS(x: number, y: number) {
    const gapSize = (3 / 5) * Config.blockSize;

    this.rough.polygon(
      [
        [x, y],
        [x + Config.blockSize * 2, y],
        [x + Config.blockSize * 2, y + gapSize],
        [x + gapSize, y + gapSize],
        [x + gapSize, y + gapSize * 2],
        [x + Config.blockSize * 2, y + gapSize * 2],
        [x + Config.blockSize * 2, y + gapSize * 5],
        [x, y + gapSize * 5],
        [x, y + gapSize * 4],
        [x + Config.blockSize * 2 - gapSize, y + gapSize * 4],
        [x + Config.blockSize * 2 - gapSize, y + gapSize * 3],
        [x, y + gapSize * 3],
      ],
      { fill: this.colors.S }
    );
  }

  public render() {
    var x = 65;
    this.renderT(x, this.TitlePosition.y);
    this.renderE((x += 5) + Config.blockSize * 3, this.TitlePosition.y);
    this.renderT((x += 5) + Config.blockSize * (3 + 2), this.TitlePosition.y);
    this.renderR((x += 5) + Config.blockSize * (3 + 2 + 3), this.TitlePosition.y);
    this.renderI((x += 5) + Config.blockSize * (3 + 2 + 3 + 2), this.TitlePosition.y);
    this.renderS((x += 5) + Config.blockSize * (3 + 2 + 3 + 2 + 1), this.TitlePosition.y);

    this.graphics.save();
    this.graphics.textBaseline = "middle";
    this.graphics.textAlign = "center";
    this.graphics.font = "18px 'Press Start 2P'";
    this.graphics.fillStyle = `rgba(0, 0, 0, ${this.textOpacity})`;
    this.graphics.fillText("Tap to start", Config.Resolution.width / 2, 400);
    this.graphics.restore();
  }
}

export default TitleScene;
