import Scene from "./Scene";
import O_Piece from "../Prefabs/Pieces/O";
import Z_Piece from "../Prefabs/Pieces/Z";
import T_Piece from "../Prefabs/Pieces/T";
import I_Piece from "../Prefabs/Pieces/I";
import S_Piece from "../Prefabs/Pieces/S";
import J_Piece from "../Prefabs/Pieces/J";
import L_Piece from "../Prefabs/Pieces/L";
import BasePiece from "../Prefabs/Pieces/BasePiece";
import Board from "../Prefabs/Board";
import { getMatrix } from "../Utils/matrix";
import Config from "../Config";

const availablePieces = [O_Piece, Z_Piece, T_Piece, I_Piece, S_Piece, J_Piece, L_Piece];

class GameScene extends Scene {

  private currentPiece?: BasePiece;
  private pieces: BasePiece[] = [];
  private Board?: Board;
  
  private Speed = 500;
  public create() {
    this.spawnPiece();
    this.Board = new Board(this.canvas);

    window.addEventListener("keydown", this._handleKeyboardInput);
  }

  private spawnPiece() {
    const piece = availablePieces[Math.floor(Math.random() * 100) % availablePieces.length];

    this.currentPiece = new piece(this.canvas, {x: Math.floor(Config.Columns / 2), y: 1})
  }

  private timeSinceLastDown: number = 0;
  private _shouldMoveDown(dt: number): boolean {
    this.timeSinceLastDown += dt;

    if (this.timeSinceLastDown < this.Speed) {
      return false;
    }

    this.timeSinceLastDown = 0;
    return true;
  }

  private _handleKeyboardInput = (e: KeyboardEvent) => {
    const matrix = this.getBoardMatrix();
    switch(e.key) {
      case "ArrowRight":
        this.currentPiece?.move(1, 0, matrix);
        break;
      case "ArrowLeft":
        this.currentPiece?.move(-1, 0, matrix);
        break;
      case "ArrowDown":
        const moved = this.currentPiece?.move(0, 1, matrix);
        if (moved) this.timeSinceLastDown = 0;
        break;
      case " ":
        this.currentPiece?.rotate();
        break;
    }
  }

  private getBoardMatrix = (): boolean[][] => {
    const matrix = getMatrix(Config.Columns, Config.Rows, false);
    
    this.pieces.forEach((piece) => {
      const blocks = piece.getOccupiedCells();
      blocks.forEach(([x, y]) => matrix[x][y] = true);
    });
    return matrix;
  }

  public update(dt: number) {
    if (!this.currentPiece) {
      this.spawnPiece();
    }
    
    if(this.currentPiece && this._shouldMoveDown(dt)) {
      const moved = this.currentPiece.move(0, 1, this.getBoardMatrix());
      if (!moved) {
        this.pieces.push(this.currentPiece);
        this.currentPiece = undefined;
      }
    }
  }

  public render() {
    this.currentPiece?.render();
    this.Board?.render();
    this.pieces.forEach((piece) => piece.render());
  }
}

export default GameScene;