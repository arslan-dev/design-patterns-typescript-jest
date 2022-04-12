/// shortcut-manager.ts

import { IShortcutManager, TShortcutMap } from "../application"
import ACommand from "../../command/command"

export class ShortcutManager implements IShortcutManager {
  protected _map: TShortcutMap
  get shortcutMap(): TShortcutMap { return this._map }

  constructor() {
    this._map = new Map
  }

  onKeyPress(key: string, command: ACommand) {
    this._map.set(key, command)
  }

  pressKey(key: string): void {
    const command = this._map.get(key)
    if (command) {
      command.execute()
    }
  }

}