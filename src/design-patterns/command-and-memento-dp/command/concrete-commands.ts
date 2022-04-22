/// concrete-commands.ts

import ACommand from "./command"

class CopyCommand extends ACommand {
  execute(): void {
    const editor = this._app.activeEditor
    if (editor) {
      this._app.clipboard = editor.getSelection()
    }
  }
}

class CutCommand extends ACommand {
  execute(): void {
    const editor = this._app.activeEditor
    if (editor) {
      this._app.saveSnapshot(editor)
      this._app.clipboard = editor.getSelection()
      editor.deleteSelection()
    }
  }
}

class PasteCommand extends ACommand {
  execute(): void {
    const editor = this._app.activeEditor
    if (editor) {
      this._app.saveSnapshot(editor)
      editor.replaceSelection(this._app.clipboard)
    }
  }
}

class UndoCommand extends ACommand {
  execute(): void {
    this._app.undo()
  }
}

export { CopyCommand, CutCommand, PasteCommand, UndoCommand }