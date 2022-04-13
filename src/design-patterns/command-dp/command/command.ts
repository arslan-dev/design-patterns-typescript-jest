// command.ts

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

export default abstract class ACommand {
  protected _app: IControllableApplication
  protected _editor: IControllableEditor
  protected _backup: string

  constructor(app: IControllableApplication, editor: IControllableEditor) {
    this._app = app
    this._editor = editor
    this._backup = ""
  }

  saveBackup() {
    console.log("save backup")
    this._backup = this._editor.text
  }

  undo() {
    console.log(`undo backup ${this._backup}`)
    this._editor.text = this._backup
  }

  abstract execute(): boolean
}

// const app = new Application
// app.createUI()