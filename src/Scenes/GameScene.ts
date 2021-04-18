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
import Config from "../Config";
import PiecePreview from "../Prefabs/PiecePreview";
import Score from "../Prefabs/Score";
import TitleScene from "./TitleScene";
import { NormalizedInputEvent } from "../Engine/InputManager";

const availablePieces = [
  O_Piece,
  Z_Piece,
  T_Piece,
  I_Piece,
  S_Piece,
  J_Piece,
  L_Piece,
];

enum States {
  PLAYING,
  SCORING,
  PAUSED,
  GAME_OVER
}

class GameScene extends Scene {
  private nextPieces?: BasePiece[];
  private currentPiece?: BasePiece;
  private pieces: BasePiece[] = [];
  private Board: Board;
  private NextPiecePreview?: PiecePreview;
  private State: States = States.PLAYING;
  private Score?: Score;
  private _combo: number;

  private Speed = 300;
  public create() {
    this.nextPieces = [];
    this.spawnPiece();
    this.Board = new Board(this.rough);
    this.NextPiecePreview = new PiecePreview(this.rough, this.graphics);
    this.Score = new Score(this.graphics);

    this.Engine.InputManager.on(NormalizedInputEvent.ANY, this.handleInput);
  }

  public unload() {
    this.Engine.InputManager.off(NormalizedInputEvent.ANY, this.handleInput)
  }

  private spawnPiece = () => {
    //@ts-ignore
    const randomPiece = (): BasePiece =>
      new availablePieces[
        Math.floor(Math.random() * 100) % availablePieces.length
      ](this.rough, { x: 0, y: 0 });

    if (this.nextPieces.length === 0) {
      for (let i = 0; i < 1; i++) {
        this.nextPieces.push(randomPiece());
      }
    }

    const startPosition = { x: Math.floor(Config.Columns / 2), y: 1 };
    this.currentPiece = this.nextPieces.shift();
    this.nextPieces.push(randomPiece());

    this.currentPiece.Position = startPosition;
  };

  private timeSinceLastDown: number = 0;
  private _shouldMoveDown(dt: number): boolean {
    this.timeSinceLastDown += dt;

    if (this.timeSinceLastDown < this.Speed) {
      return false;
    }

    this.timeSinceLastDown = 0;
    return true;
  }

  private handleInput = ({detail: action}: {detail: NormalizedInputEvent}) => {
    switch (action) {
      case NormalizedInputEvent.RIGHT:
        this.currentPiece?.move(1, 0, this.Board.Matrix);
        break;
      case NormalizedInputEvent.LEFT:
        this.currentPiece?.move(-1, 0, this.Board.Matrix);
        break;
      case NormalizedInputEvent.DOWN:
        const moved = this.currentPiece?.move(0, 1, this.Board.Matrix);
        if (moved) this.timeSinceLastDown = 0;
        break;
      case NormalizedInputEvent.ACTION:
        if (this.State === States.GAME_OVER) {
          this.restartGame();
          return;
        }
        this.currentPiece?.rotate(this.Board.Matrix);
        break;
    }
  };

  private _checkGameOver(): boolean {
    const matrix = this.Board.Matrix;
    for (let x = 0; x < Config.Columns; x++) {
      if (matrix[x][0]) {
        this._gameOver();
        return true;
      }
    }
    return false;
  }

  private restartGame = () => {
    this.Engine.startScene(TitleScene)
  }
  private _gameOver() {
    this.State = States.GAME_OVER;
  }

  public update(dt: number) {
    if (this.State === States.PLAYING) {
      if (!this.currentPiece) {
        this.spawnPiece();
      }
  
      if (this.currentPiece && this._shouldMoveDown(dt)) {
        const moved = this.currentPiece.move(0, 1, this.Board.Matrix);
        if (!moved) {
          this.Board.addPiece(this.currentPiece);
          this.currentPiece = undefined;

          this.State = States.SCORING;
          this._combo = 0;
        }
      }
    }

    if (this.State === States.SCORING) {
      const scored = this.Board.removeFirstFullLine();

      if (!scored) {
        if (!this._checkGameOver()) {
          this.State = States.PLAYING;
        }
      } else {
        this._combo++;
        this.Score.add(((1000 - this.Speed) / 10) * this._combo);
        this.Speed -= 10;
      }
    }
  }

  public render() {
    this.Board?.render();
    this.currentPiece?.render();
    this.pieces.forEach((piece) => piece.render());
    this.NextPiecePreview?.render(this.nextPieces);
    this.Score.render();

    if (this.State === States.GAME_OVER) {
      this.graphics.save();
      this.graphics.fillStyle = "rgba(255, 255, 255, 0.7)";
      this.graphics.fillRect(0, 0, Config.Resolution.width, Config.Resolution.height);
      
      this.graphics.font = "25px 'Press Start 2P'";
      this.graphics.fillStyle = "rgb(0, 0, 0)";
      this.graphics.textAlign = "center";
      this.graphics.textBaseline = "bottom";
      this.graphics.fillText("GAME OVER", Config.Resolution.width / 2 - 32, Config.Resolution.height / 2);
      
      this.graphics.restore();
    }
  }
}

export default GameScene;
