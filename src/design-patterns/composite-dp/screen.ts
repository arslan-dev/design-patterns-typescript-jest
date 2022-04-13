/// screen.ts

import { Graphic } from "./composite"

export default class Screen {
  private _objects: string[]
  get objects() { return this._objects }

  constructor() {
    this._objects = []
  }

  draw(graphicsInstruction: string) {
    this._objects.push(graphicsInstruction)
  }
}