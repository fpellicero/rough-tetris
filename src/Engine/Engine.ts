//@ts-ignore
import rough from 'roughjs/bundled/rough.cjs.js';
import { RoughCanvas } from "roughjs/bin/canvas";
import Scene from "../Scenes/Scene";
import TitleScene from "../Scenes/TitleScene";
import GameScene from '../Scenes/GameScene';

/**
 * This class will be our Game Engine.
 * It will be really simple:
 *  - Creates and provides the graphic context to Scenes.
 *  - Manages active scenes.
 *  - Controls the Game Loop
 */
class Engine {
  private canvas: HTMLCanvasElement = this._createCanvas();
  private roughCanvas: RoughCanvas;
  private activeScenes: Scene[] = [];
  private lastFrameTime: number = Date.now();

  constructor() {
    
    this.roughCanvas = rough.canvas(this.canvas);
    
    this.activeScenes.push(new GameScene(this.roughCanvas));

    this.activeScenes.forEach((scene) => scene.create());
    
    // Start the game loop
    setInterval(this.update, 1000 / 30);
  }
  
  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = 360;
    canvas.height = 640;

    document.body.appendChild(canvas);
    return canvas;
  }

  private clearCanvas() {
    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Cannot clear canvas");
    }

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  private update = () => {
    const now = Date.now();
    const dt = Date.now() - this.lastFrameTime;
    
    // Empty for redraw
    this.clearCanvas();

    // Update the scenes
    this.activeScenes.forEach((scene) => {
      scene.update(dt);
    });

    // Render the scenes
    this.activeScenes.forEach((scene) => {
      scene.render();
    });

    this.lastFrameTime = now;
    // window.requestAnimationFrame(this.update);
  }
}

export default Engine;
