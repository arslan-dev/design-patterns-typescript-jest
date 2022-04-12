// command-history.ts

import { ICommandHistory } from "../application"
import ACommand from "../../command/command"

export default class CommandHistory implements ICommandHistory {
  private _history: ACommand[]

  constructor() {
    this._history = []
  }

  // ICommandHistory interface implementation

  push(c: ACommand) {
    this._history.push(c)
  }

  pop(): ACommand | undefined {
    return this._history.pop()
  }
}