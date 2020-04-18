import SwipeListener from "swipe-listener";
import Config from "../Config";

export enum NormalizedInputEvent {
  RIGHT = "input:right",
  LEFT = "input:left",
  DOWN = "input:down",
  ACTION = "input:action",
  ANY = "input"
}

type InputManagerCallback = (e: CustomEvent<NormalizedInputEvent>) => void;

/**
 * Unifies all input methods into standard commands
 */
class InputManager {
  private swipeListener;
  constructor() {
    window.addEventListener("keypress", this.handleKeyboard);
    window.addEventListener("click", this.handleClick);

    this.swipeListener = new SwipeListener(window);

    // @ts-ignore
    window.addEventListener("swiping", this.handleSwiping);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  public on(event: NormalizedInputEvent, callback: InputManagerCallback) {
    window.addEventListener(event, callback);
  }

  public off(event: NormalizedInputEvent, callback: InputManagerCallback) {
    window.removeEventListener(event, callback);
  }

  //#region Trigger Input Events
  private Trigger(event: NormalizedInputEvent) {
    const eventDetails = { detail: event};
    window.dispatchEvent(new CustomEvent(event, eventDetails))
    
    window.dispatchEvent(new CustomEvent(NormalizedInputEvent.ANY, eventDetails));
  }
  //#endregion

  private handleKeyboard = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        this.Trigger(NormalizedInputEvent.RIGHT);
        break;
      case "ArrowLeft":
        this.Trigger(NormalizedInputEvent.LEFT)
        break;
      case "ArrowDown":
        this.Trigger(NormalizedInputEvent.DOWN);
        break;
      case " ":
        this.Trigger(NormalizedInputEvent.ACTION);
        break;
    }
  }

  private lastSwipingPosition?: number[];
  private handleSwiping = (e: CustomEvent) => {
    const {detail: {x, y}} = e;
    if (!this.lastSwipingPosition) {
      this.lastSwipingPosition = [x[0], y[0]];
    }

    const isLeft = x[1] - this.lastSwipingPosition[0] < -Config.blockSize;
    const isRight = x[1] - this.lastSwipingPosition[0] > Config.blockSize;
    const isDown = y[1] - this.lastSwipingPosition[1] > Config.blockSize;

    if (!isLeft && !isRight && !isDown) {
      return;
    } 
    this.lastSwipingPosition = [x[1], y[1]];

    if (isDown) {
      this.Trigger(NormalizedInputEvent.DOWN);
      return;
    }

    if (isLeft) {
      this.Trigger(NormalizedInputEvent.LEFT);
      return;
    }

    if (isRight) {
      this.Trigger(NormalizedInputEvent.RIGHT);
      return;
    }


  }

  private handleMouseUp = () => this.lastSwipingPosition = null;

  private handleClick = (e: MouseEvent) => {
    this.Trigger(NormalizedInputEvent.ACTION);
  }
}

export default InputManager;