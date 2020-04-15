import { RoughCanvas } from "roughjs/bin/canvas";
import Config from "../Config";

class Board {
  constructor(private graphics: RoughCanvas) {

  }

  public create() {

  }

  public render() {
    const height = Config.Rows * Config.blockSize;
    const width = Config.Columns * Config.blockSize;
    this.graphics.linearPath([
      [1,0],
      [1, height],
      [width, height],
      [width, 0]
    ], {maxRandomnessOffset: 0, strokeWidth: 1})

    /* for (let i = 0; i < Config.Rows; i++) {
      this.graphics.linearPath([
        [1, i * Config.blockSize],
        [width, i * Config.blockSize]
      ], {maxRandomnessOffset: 0, stroke: "grey"})
    }

    for (let i = 0; i < Config.Columns; i++) {
      this.graphics.linearPath([
        [i * Config.blockSize, 0],
        [i * Config.blockSize, height]
      ], {maxRandomnessOffset: 0, stroke: "grey"})
    } */
  }
}

export default Board;
