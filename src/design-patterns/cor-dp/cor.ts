 // cor.ts
 // Chain of Responsibility - Behavioral Design Pattern implementation example

export interface IScreen {
  showTooltip(v: string): void
  get tooltip(): string
}

type TRect = {
  x: number
  y: number
  w: number
  h: number
}

interface ComponentWithContextualHelp {
  showHelp(screen: IScreen): void
}

abstract class Component implements ComponentWithContextualHelp {
  tooltipText?: string

  container?: Container

  showHelp(screen: IScreen): void {
    if (this.tooltipText) {
      screen.showTooltip(`Show tooltip text '${this.tooltipText}'`)
    } else {
      if (this.container) {
        this.container.showHelp(screen)
      }
    }
  }
}

abstract class Container extends Component {
  protected _children: Component[] = []

  add(child: Component): void {
    this._children.push(child)
    child.container = this
  }
}

export class Button extends Component {
  protected _title: string

  constructor(title: string) {
    super()
    this._title = title
  }
}

export class Panel extends Container {
  modalHelpText?: string
  private _rect: TRect

  constructor(x: number, y: number, w: number, h: number) {
    super()
    this._rect = { x: x, y: y, w: w, h: h }
  }

  showHelp(screen: IScreen): void {
    if (this.modalHelpText) {
      screen.showTooltip(`Show modal text '${this.modalHelpText}'`)
    } else {
      super.showHelp(screen)
    }
  }
}

export class Dialog extends Container {
  wikiPageURL?: string

  protected _title: string

  constructor(title: string) {
    super()
    this._title = title
  }

  showHelp(screen: IScreen): void {
    if (this.wikiPageURL) {
      screen.showTooltip(`Link to wiki page URL '${this.wikiPageURL}'`)
    } else {
      super.showHelp(screen)
    }
  }
}