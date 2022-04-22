// command-history.ts

import { ICommandHistory } from "../application"
import Snapshot from "./snapshot"

export default class CommandHistory implements ICommandHistory {
  private _history: Snapshot[]

  constructor() {
    this._history = []
  }

  // ICommandHistory interface implementation

  push(command: Snapshot) {
    this._history.push(command)
  }

  pop(): Snapshot | undefined {
    return this._history.pop()
  }
}