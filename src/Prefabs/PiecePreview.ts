import { RoughCanvas } from "roughjs/bin/canvas";
import BasePiece from "./Pieces/BasePiece";
import Config from "../Config";

class PiecePreview {
  constructor(private rough: RoughCanvas, private graphics: CanvasRenderingContext2D) { }

  public render(pieces?: BasePiece[]) {

    if (pieces) {
      this.rough.rectangle(
        Config.Resolution.width - Config.blockSize * 4,
        90,
        Config.blockSize * 4 - 5,
        Config.blockSize * 5,
        { fill: "lightgrey", seed: 1, roughness: 1 }
      );
      
      this.graphics.save();
      this.graphics.font = "12px 'Press Start 2P'";
      this.graphics.fillStyle = 'rgba(0, 0, 0, 1)';
      this.graphics.textAlign = "center";
      this.graphics.textBaseline = "middle";
      this.graphics.fillText("Next", Config.Resolution.width - 50, 75);
      this.graphics.restore();

      
      pieces.forEach((piece, i) => {
        piece.Position  = {
          x: Config.Columns + 1,
          y: 6 + i * 4
        };
  
        piece.render();
      })
    }
  }
}

export default PiecePreview;