/// shortcut-manager.ts

import { IShortcutManager, TShortcutMap } from "../application"
import ACommand from "../../command/command"

export class ShortcutManager implements IShortcutManager {
  protected _list: TShortcutMap
  get shortcutMap(): TShortcutMap { return this._list }

  constructor() {
    this._list = {}
  }

  onKeyPress(key: string, command: ACommand) {
    this._list[key] = command
  }

  pressKey(key: string): void {
    this._list[key].execute()
  }

}