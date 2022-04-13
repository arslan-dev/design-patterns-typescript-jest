// command.ts

import ICloneable from "../i-cloneable"

export interface IControllableApplication {
  get clipboard(): string
  set clipboard(v: string)

  get activeEditor(): IControllableEditor | null

  undo(): void
}

export interface IControllableEditor {
  get text(): string
  set text(v: string)

  getSelection(): string
  deleteSelection(): void
  replaceSelection(v: string): void
}

type TBackup = {
  editor: IControllableEditor,
  text: string
}

export default abstract class ACommand implements ICloneable<ACommand> {
  protected _app: IControllableApplication
  protected _backup?: TBackup

  constructor(app: IControllableApplication) {
    this._app = app
  }

  saveBackup() {
    if (this._app.activeEditor) {
      this._backup = {
        editor: this._app.activeEditor,
        text: this._app.activeEditor.text
      }
    }
  }

  undo() {
    if (this._backup) {
      this._backup.editor.text = this._backup.text
    }
  }

  historicalCopy() {
    const copy = Object.assign({}, this)
    copy._backup
  }

  abstract execute(): boolean
}

// const app = new Application
// app.createUI()