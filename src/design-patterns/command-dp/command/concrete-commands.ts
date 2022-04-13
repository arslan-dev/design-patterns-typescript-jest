/// concrete-commands.ts

import ACommand from "./command"

export class CopyCommand extends ACommand {
  execute(): boolean {
    if (this._app.activeEditor) {
      this._app.clipboard = this._app.activeEditor.getSelection()
    }
    return false
  }
}

export class CutCommand extends ACommand {
  execute(): boolean {
    if (this._app.activeEditor) {
      this.saveBackup()
      this._app.clipboard = this._app.activeEditor.getSelection()
      this._app.activeEditor.deleteSelection()
      return true
    } else {
      return false
    }
  }
}

export class PasteCommand extends ACommand {
  execute(): boolean {
    if (this._app.activeEditor) {
      this.saveBackup()
      this._app.activeEditor.replaceSelection(this._app.clipboard)
      return true
    } else {
      return false
    }
  }
}

export class UndoCommand extends ACommand {
  execute(): boolean {
    this._app.undo()
    return false
  }
}