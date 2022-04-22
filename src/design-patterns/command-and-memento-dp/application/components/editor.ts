/// editor.ts

import { IControllableEditor } from "../../command/command"
import Snapshot from "./snapshot"

export default class Editor implements IControllableEditor {
  protected _text: string
  get text(): string { return this._text }
  set text(v: string) { this._text = v }

  constructor() {
    this._text = ""
  }

  createSnapshot(): Snapshot {
    return new Snapshot(this, this._text)
  }

  getSelection(): string {
    return this.text.substring(0, 3)
  }

  deleteSelection(): void {
    this._text = this._text.slice(3)
  }
  
  replaceSelection(text: string) {
    const substr = this.text.substring(0, 3)
    const regexp = new RegExp(substr)
    this._text = this._text.replace(regexp, text)
  }
}