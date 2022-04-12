/// application.ts
/// an infrastructure for the Command DP implementation

// APPLICATION SERVICES

import ACommand, { IControllableApplication, IControllableEditor } from "../command/command"
import { ShortcutManager } from "./components/shorcut-manager"

export interface ICommandHistory {
  push(command: ACommand): void
  pop(): ACommand | undefined
}

export interface IButton {
  set command(v: ACommand)
  press(): void
}

type TButtonList = IButton[]
// export type TShortcutMap = Map<string, ACommand>
export type TShortcutMap = {
  [key: string]: ACommand;
};

export interface IShortcutManager {
  get shortcutMap(): TShortcutMap
  onKeyPress(key: string, command: ACommand): void
  pressKey(key: string): void
}

export interface IApplication {
  addButton(button: IButton): void
  get buttons(): TButtonList

  addShortcut(key: string, command: ACommand): void
  get shortcuts(): TShortcutList
}

export default class Application implements IControllableApplication, IApplication {
  private _clipboard?: string
  private _buttons: TButtonList
  private _shortcutManager: IShortcutManager

  editors: IControllableEditor[]
  activeEditor?: IControllableEditor
  private _commandHistory: ICommandHistory

  // SETTERS GETTERS

  get clipboard(): string {
    if (this._clipboard) {
      return this.clipboard
    }
    return ""
  }
  set clipboard(v: string) { this._clipboard = v }

  constructor(commandHistory: ICommandHistory) {
    this.editors = []
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

  get shortcuts(): TShortcutList {
    return this._shortcutManager 
  }

  // createUI() {
  //   const copyCommand = new CopyCommand(this, this.activeEditor)
  //   const copy = () => this.executeCommand(copyCommand)

  //   const cutCommand = new CutCommand(this, this.activeEditor)
  //   const cut = () => this.executeCommand(cutCommand)

  //   const pasteCommand = new PasteCommand(this, this.activeEditor)
  //   const paste = () => this.executeCommand(pasteCommand)

  //   const undoCommand = new UndoCommand(this, this.activeEditor)
  //   const undo = () => this.executeCommand(undoCommand)

  //   // EXECUTION

  //   copy()
  //   console.log('')
  //   cut()
  //   console.log('')
  //   paste()
  //   console.log('')
  //   undo()
  // }

  // executeCommand(command: Command) {
  //   if (command.execute()) {
  //     this._history.push(command)
  //   }
  // }

  undo() {
    const command = this._commandHistory.pop()
    if (command) {
      command.undo()
    }
  }
}