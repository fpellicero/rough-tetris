import { RoughCanvas } from "roughjs/bin/canvas";
import { Point } from "roughjs/bin/geometry";
import Config from "../../Config";

export type TRotation = 0 | 90 | 180 | 270;

type IBlocks = {
  [R in TRotation]: Array<number[]>;
};

type Position = {
  x: number;
  y: number;
};

abstract class BasePiece {
  /**
   * Color of the piece blocks.
   */
  abstract fill: string;
  /**
   * The blocks that form this piece,
   * expressed as cell-offset based on the rotation anchor.
   *
   * @example [[0,0], [0, 1], [1,1], [1, 0]]
   *
   */
  abstract Blocks: IBlocks;
  protected rotation: TRotation = 0;

  constructor(protected graphics: RoughCanvas, public Position: Position) {}

  public getOccupiedCells(position: Position = this.Position) {
    const blocks = this.Blocks[this.rotation];
    return blocks.map(([offsetX, offsetY]) => [
      position.x + offsetX,
      position.y + offsetY,
    ]);
  }
  private getGlobalCoordinates() {
    const globalCellPosition = this.getOccupiedCells();

    return globalCellPosition.map(([globalX, globalY]) => [
      globalX * Config.blockSize + Config.blockSize / 2,
      globalY * Config.blockSize + Config.blockSize / 2,
    ]);
  }

  /**
   * Moves a piece, adding the offset provided.
   * @param {number} x Number of horizontal cells movement
   * @param {number} y Number of vertical cells movement
   * @param {Array<Array<boolean>>} y Number of vertical cells movement
   * @returns {boolean} True if could move, false otherwise
   */
  public move(x: number, y: number, boardMatrix: string[][]): boolean {
    const nextPosition = {
      x: this.Position.x + x,
      y: this.Position.y + y,
    };

    const nextBlocks = this.getOccupiedCells(nextPosition);

    const isBlocked = this._isBlocked(nextBlocks, boardMatrix);

    if (isBlocked) {
      return false;
    }

    this.Position.x += x;
    this.Position.y += y;

    return true;
  }

  private _isBlocked(occupiedCells: number[][], boardMatrix: string[][]) {
    return occupiedCells.find(([x, y]) => {
      if (x < 0 || x > boardMatrix.length - 1) {
        return true;
      }

      if (y < 0 || y > boardMatrix[0].length - 1) {
        return true;
      }

      return boardMatrix[x][y];
    });
  }

  public rotate(boardMatrix: string[][]) {
    
    const _prevRotation = this.rotation;

    this.rotation = ((this.rotation + 90) % 360) as TRotation;

    /*
     * Check if the rotation has moved the piece into an
     * occupied cell, and restore previous rotation if so.
     */
    const cells = this.getOccupiedCells();


    if (this._isBlocked(cells, boardMatrix)) {
      this.rotation = _prevRotation;
    }    
  }

  public render() {
    const globalCoords = this.getGlobalCoordinates();

    globalCoords.forEach(([x, y]) => {
      this.graphics.rectangle(
        x - Config.blockSize / 2,
        y - Config.blockSize / 2,
        Config.blockSize,
        Config.blockSize,
        {
          fill: this.fill,
          hachureAngle: 60 + this.rotation,
          fillWeight: 0.5,
          hachureGap: 3,
        }
      );
    });
  }
}

export default BasePiece;
