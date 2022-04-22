/// application.ts
/// an infrastructure for the Command DP implementation

// APPLICATION SERVICES

import ACommand, { IControllableApplication, IControllableEditor } from "../command/command"
import { ShortcutManager } from "./components/shortcut-manager"
import Snapshot from "./components/snapshot"

export interface ICommandHistory {
  push(command: Snapshot): void
  pop(): Snapshot | undefined
}

export interface IButton {
  set command(v: ACommand)
  press(): void
}

type TButtonList = IButton[]
type TEditorList = IControllableEditor[]
export type TShortcutMap = Map<string, ACommand>

export interface IShortcutManager {
  get shortcutMap(): TShortcutMap
  onKeyPress(key: string, command: ACommand): void
  pressKey(key: string): void
}

export interface IApplication {
  addButton(button: IButton): void
  get buttons(): TButtonList

  addShortcut(key: string, command: ACommand): void
  get shortcutManager(): IShortcutManager
  pressKey(key: string): void

  addEditor(editor: IControllableEditor): void
  get editors(): TEditorList
  setActiveEditor(editor: IControllableEditor): void

  executeCommand(command: ACommand): void
}

export default class Application implements IControllableApplication, IApplication {
  private _clipboard?: string
  private _buttons: TButtonList
  private _shortcutManager: IShortcutManager

  private _editors: TEditorList
  private _activeEditor?: IControllableEditor

  private _commandHistory: ICommandHistory

  get clipboard(): string {
    if (this._clipboard) {
      return this._clipboard
    }
    return ""
  }
  set clipboard(v: string) { this._clipboard = v }

  constructor(commandHistory: ICommandHistory) {
    this._editors = []
    this._buttons = []
    this._shortcutManager = new ShortcutManager

    this._commandHistory = commandHistory
  }

  addButton(button: IButton): void {
    this._buttons.push(button)
  }

  get buttons(): TButtonList {
    return this._buttons  
  }

  addShortcut(key: string, command: ACommand): void {
    this._shortcutManager.onKeyPress(key, command)    
  }

  get shortcutManager(): IShortcutManager {
    return this._shortcutManager
  }

  pressKey(key: string): void {
    this.shortcutManager.pressKey(key)
  }

  addEditor(editor: IControllableEditor): void {
    this._editors.push(editor)
    this.setActiveEditor(editor)
  }

  get editors(): TEditorList {
    return this._editors  
  }

  get activeEditor(): IControllableEditor | undefined {
    return this._activeEditor
  }

  setActiveEditor(editor: IControllableEditor): void {
    if (this._editors.includes(editor)) {
      this._activeEditor = editor
    }
  }

  executeCommand(command: ACommand): void {
    command.execute()
  }

  saveSnapshot(editor: IControllableEditor): void {
    const snapshot = editor.createSnapshot()
    this._commandHistory.push(snapshot)
  }

  undo() {
    const snapshot = this._commandHistory.pop()
    if (snapshot) {
      snapshot.restore()
    }
  }
}