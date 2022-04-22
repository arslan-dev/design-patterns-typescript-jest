/// button.ts

import ACommand from "../../command/command"
import { IButton } from "../application"

export default class Button implements IButton {
  protected _command!: ACommand

  constructor(command: ACommand) {
    this._command = command
  }

  set command(v: ACommand) {
    this._command = this.command
  }

  press(): void {
    return this._command.execute()
  }
}