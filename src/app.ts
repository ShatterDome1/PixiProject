// app.ts

import * as PIXI from "pixi.js";
import { FpsMeter } from "./fps-meter";

interface EngineParams {
  containerId: string;
  app: {
    canvasW: number;
    canvasH: number;
    backgroundColor?: number;
  };
  fpsMax: number;
}

class Engine {
  // Has the following members:
  // loader, renderer, stage defaulted
  public app: PIXI.Application;

  public container: HTMLDivElement;

  // This is used to render simple shapes
  // such as lines rectangles etc
  public graphics: PIXI.Graphics;

  public fpsMax: number;

  constructor(params: EngineParams) {
    this.app = new PIXI.Application(params.app);

    this.container = document.getElementById(
      params.containerId
    )! as HTMLDivElement;
    this.container.appendChild(this.app.view);

    this.graphics = new PIXI.Graphics();

    this.fpsMax = params.fpsMax;
  } // constructor
} // Engine

const engine = new Engine({
  containerId: "game",
  app: {
    canvasW: 800,
    canvasH: 600,
    backgroundColor: 0xcccccc,
  },
  fpsMax: 60,
});

let fpsMeter: FpsMeter;
const sprite = PIXI.Sprite.from("../images/logo.png");

// ==============
// === STATES ===
// ==============

window.onload = load;

function load() {
  create();
} // load

function create() {
  /* ***************************** */
  /* Create your Game Objects here */
  /* ***************************** */

  /* Sprite */
  sprite.anchor.set(0.5);
  sprite.x = engine.app.view.width / 2;
  sprite.y = engine.app.view.height / 2;
  // engine.stage.addChild(sprite);
  engine.app.stage.addChild(sprite);

  /* FPS */
  const fpsMeterItem = document.createElement("div");
  fpsMeterItem.classList.add("fps");
  engine.container.appendChild(fpsMeterItem);

  fpsMeter = new FpsMeter(() => {
    fpsMeterItem.innerHTML =
      "FPS: " + fpsMeter.getFrameRate().toFixed(2).toString();
  });

  setInterval(update, 1000.0 / engine.fpsMax);
  render();
} // create

function update() {
  fpsMeter.updateTime();

  /* ***************************** */
  /* Update your Game Objects here */
  /* ***************************** */
} // update

function render() {
  requestAnimationFrame(render);

  /* ***************************** */
  /* Render your Game Objects here */
  /* ***************************** */

  /* Sprite */
  sprite.rotation += 0.01;

  engine.app.renderer.render(engine.app.stage);
  fpsMeter.tick();
} // render
