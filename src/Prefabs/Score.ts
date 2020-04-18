import Config from "../Config";
import { AnimeInstance } from "animejs";
import anime from "animejs";

class Score {
  private value: number = 0;
  private _anim?: AnimeInstance;
  constructor(private graphics: CanvasRenderingContext2D) {}

  public add(score: number) {
    if (this._anim) {
      this._anim.seek(this._anim.duration);
    }

    this._anim = anime({
      targets: this,
      value: this.value + score,
      duration: 500,
      easing: `easeOutExpo`,
      round: true
    })
  }

  public render() {
    this.graphics.save();

    this.graphics.font = "12px 'Press Start 2P'";
    this.graphics.textAlign = "center";  
    this.graphics.textBaseline = "middle";
    this.graphics.fillStyle = 'rgba(0, 0, 0)';
    this.graphics.fillText("Score", Config.Resolution.width - 30, 10);
    
    this.graphics.font = "16px 'Press Start 2P'";
    this.graphics.fillText(this.value.toString(), Config.Resolution.width - 30, 30);


    this.graphics.restore();
  }
}

export default Score;
