/// snapshot.ts
/// undo snapshot

import { IControllableEditor } from "../../command/command"

class Snapshot {
  private _editor: IControllableEditor
  private _text: string

  constructor(editor: IControllableEditor, text: string) {
    this._editor = editor
    this._text = text
  }

  restore() {
    this._editor.text = this._text
  }
}

export default Snapshot