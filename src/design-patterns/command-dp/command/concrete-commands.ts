/// concrete-commands.ts

import Command from "./command"

export class CopyCommand extends Command {
  execute(): boolean {
    this._app.clipboard = this._editor.getSelection
    return false
  }
}

export class CutCommand extends Command {
  execute(): boolean {
    this.saveBackup()
    this._app.clipboard = this._editor.getSelection
    this._editor.deleteSelection()
    return true
  }
}

export class PasteCommand extends Command {
  execute(): boolean {
    this.saveBackup()
    this._editor.replaceSelection(this._app.clipboard)
    return true
  }
}

export class UndoCommand extends Command {
  execute(): boolean {
    this._app.undo()
    return false
  }
}