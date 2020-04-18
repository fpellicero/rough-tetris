//@ts-ignore
import rough from 'roughjs/bundled/rough.cjs.js';
import { RoughCanvas } from "roughjs/bin/canvas";
import Scene from "../Scenes/Scene";
import TitleScene from "../Scenes/TitleScene";
import GameScene from '../Scenes/GameScene';
import Config from '../Config';
import InputManager from './InputManager';

/**
 * This class will be our Game Engine.
 * It will be really simple:
 *  - Creates and provides the graphic context to Scenes.
 *  - Manages active scenes.
 *  - Controls the Game Loop
 */
class Engine {
  public canvas: HTMLCanvasElement = this._createCanvas();
  public roughCanvas: RoughCanvas;
  public InputManager = new InputManager()
  private activeScenes: Scene[] = [];
  private lastFrameTime: number = performance.now();

  constructor() {
    
    this.roughCanvas = rough.canvas(this.canvas);
    
    this.activeScenes.push(new TitleScene(this));

    this.activeScenes.forEach((scene) => scene.create());
    
    // Start the game loop
    window.requestAnimationFrame(this.update);
  }
  
  private _createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = Config.Resolution.width;
    canvas.height = Config.Resolution.height;

    document.body.appendChild(canvas);
    return canvas;
  }

  public startScene(NextScene: typeof Scene) {
    this.activeScenes.forEach(s => s.unload());

    this.activeScenes = [new NextScene(this)];
    this.activeScenes.forEach(s => s.create());
  }

  private clearCanvas() {
    const context = this.canvas.getContext("2d");

    if (!context) {
      throw new Error("Cannot clear canvas");
    }

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  private update = () => {
    const now = performance.now();
    const dt = now - this.lastFrameTime;

    if (dt < 1000 / Config.FPS) {
      window.requestAnimationFrame(this.update);
      return;
    }
    
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
    window.requestAnimationFrame(this.update);
  }
}

export default Engine;
