import { RoughCanvas } from "roughjs/bin/canvas";
import Config from "../Config";
import BasePiece from "./Pieces/BasePiece";
import { getMatrix, transpose } from "../Utils/matrix";

class Board {
  public Matrix: string[][];
  constructor(private graphics: RoughCanvas) {
    this.Matrix = getMatrix(Config.Columns, Config.Rows, "");
  }

  public create() {}

  public removeFirstFullLine(): boolean {
    let fullLine: number = -1;

    for (let y = 0; y < Config.Rows; y++) {
      let isFull = true;
      for (let x = 0; x < Config.Columns; x++) {
        isFull = !!this.Matrix[x][y];
        if (!isFull) {
          break;
        }
      }

      if (isFull) {
        fullLine = y;
        break;
      }
    }

    if (fullLine === -1) {
      return false;
    }

    const nextMatrix = transpose(this.Matrix);
    nextMatrix.splice(fullLine, 1);
    nextMatrix.unshift(Array(Config.Columns).fill(""));
    this.Matrix = transpose(nextMatrix);
    return true;
  }

  public addPiece(piece: BasePiece) {
    const blocks = piece.getOccupiedCells();

    blocks.forEach(([x, y]) => {
      this.Matrix[x][y] = piece.fill;
    });
  }

  private renderGrid() {
    const height = Config.Rows * Config.blockSize;
    const width = Config.Columns * Config.blockSize;
    
    for (let i = 1; i < Config.Rows; i++) {
      this.graphics.linearPath(
        [
          [1, i * Config.blockSize],
          [width, i * Config.blockSize],
        ],
        { stroke: "aliceblue", bowing: 1, seed: i }
      );
    }

    for (let i = 1; i < Config.Columns; i++) {
      this.graphics.linearPath(
        [
          [i * Config.blockSize, 0],
          [i * Config.blockSize, height],
        ],
        { stroke: "aliceblue", bowing: 1, seed: i }
      );
    }
  }

  public render() {
    const height = Config.Rows * Config.blockSize;
    const width = Config.Columns * Config.blockSize;

    this.renderGrid();

    this.graphics.linearPath(
      [
        [1, 0],
        [1, height],
        [width, height],
        [width, 0],
      ],
      { strokeWidth: 1, seed: 345 }
    );

    for (let x = 0; x < this.Matrix.length; x++) {
      for (let y = 0; y < this.Matrix[0].length; y++) {
        const color = this.Matrix[x][y];
        if (color) {
          this.graphics.rectangle(
            x * Config.blockSize,
            y * Config.blockSize,
            Config.blockSize,
            Config.blockSize,
            { fill: color, maxRandomnessOffset: 0, fillStyle: "zigzag" }
          );
        }
      }
    }
  }
}

export default Board;
