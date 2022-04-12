/// application.ts
/// an infrastructure for the Command DP implementation

// APPLICATION SERVICES

import ACommand, { IControllableApplication, IControllableEditor } from "../command/command"
import { ShortcutManager } from "./components/shortcut-manager"

export interface ICommandHistory {
  push(command: ACommand): void
  pop(): ACommand | undefined
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
  get shortcuts(): TShortcutMap

  addEditor(editor: IControllableEditor): void
  get editors(): TEditorList
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
      return this.clipboard
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

  get shortcuts(): TShortcutMap {
    return this._shortcutManager.shortcutMap 
  }

  addEditor(editor: IControllableEditor): void {
    this._editors.push(editor)
  }

  get editors(): TEditorList {
    return this._editors  
  }

  get activeEditor(): IControllableEditor | null {
    if (this._activeEditor) {
      return this._activeEditor
    } else {
      return null
    }
  }

  undo() {
    const command = this._commandHistory.pop()
    if (command) {
      command.undo()
    }
  }
}