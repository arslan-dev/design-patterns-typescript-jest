// screen.ts
// pseudo screen infrastructure created in order to test Chain of Responsibility DP

import { IScreen } from "./cor"

export class Screen implements IScreen {
  private _tooltip: string

  constructor() {
    this._tooltip = ""
  }

  showTooltip(v: string): void {
    this._tooltip = v
  }

  get tooltip(): string {
    const tooltip = this._tooltip
    this._tooltip = ""
    return tooltip
  }
}