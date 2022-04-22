// command.ts

import Snapshot from "../application/components/snapshot"

// import ICloneable from "../i-cloneable"

export interface IControllableApplication {
  get clipboard(): string
  set clipboard(v: string)

  get activeEditor(): IControllableEditor | undefined
  saveSnapshot(editor: IControllableEditor): void

  undo(): void
}

export interface IControllableEditor {
  get text(): string
  set text(v: string)

  createSnapshot(): Snapshot

  getSelection(): string
  deleteSelection(): void
  replaceSelection(v: string): void
}

// type TBackup = {
//   editor: IControllableEditor,
//   text: string
// }

export default abstract class ACommand {
  protected _app: IControllableApplication
  // protected _backup?: TBackup

  constructor(app: IControllableApplication) {
    this._app = app
  }

  // saveBackup(editor: IControllableEditor) {
    // const snapshot = editor.createSnapshot()
    // this._app.saveSnapshot(snapshot)
  //   if (this._app.activeeditor) {
  //     this._backup = {
  //       editor: this._app.activeeditor,
  //       text: this._app.activeeditor.text
  //     }
  //   }
  // }

  undo() {
    this._app.undo()
    // if (this._backup) {
    //   this._backup.editor.text = this._backup.text
    // }
  }

  // historicalCopy() {
  //   const copy = Object.assign({}, this)
  //   copy._backup
  // }

  abstract execute(): void
}

// const app = new Application
// app.createUI()