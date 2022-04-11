/**
 * cor.ts
 * Chain of Responsibility - Behavioral Design Pattern implementation example
 */

interface ComponentWithContextualHelp {
  showHelp(): void
}

abstract class Component implements ComponentWithContextualHelp {
  tooltipText: string = ''

  container?: Container;

  showHelp(): void {
    if (this.tooltipText) {
      console.log(`showing tooltipText "${this.tooltipText}"`)
    } else {
      if (this.container) {
        this.container.showHelp()
      }
    }
  }
}

abstract class Container extends Component {
  protected _children: Component[] = []

  add(child: Component): void {
    this._children.push(child);
    child.container = this;
  }
}

class Button extends Component {
  protected _title: string

  constructor(title: string) {
    super()
    this._title = title
  }
}

class Panel extends Container {
  modalHelpText: string = ''

  constructor(x: number, y: number, w: number, h: number) {
    super()
  }

  showHelp(): void {
    if (this.modalHelpText) {
      console.log(`Show modal text "${this.modalHelpText}"`)
    } else {
      super.showHelp()
    }
  }
}

class Dialog extends Container {
  wikiPageURL: string = ''

  protected _title: string

  constructor(title: string) {
    super()
    this._title = title
  }

  showHelp(): void {
    if (this.wikiPageURL) {
      console.log(`Link to wiki page URL "${this.wikiPageURL}"`)
    } else {
      super.showHelp()
    }
  }
}

class Application {
  createUI(): void {
    const dialog = new Dialog('Budget Reports');
    dialog.wikiPageURL = 'http://wiki.org';

    const panel = new Panel(0, 0, 400, 800);
    panel.modalHelpText = 'This panel does...';

    const ok = new Button('OK');
    ok.tooltipText = 'This is an OK button that...';

    const cancel = new Button('Cancel');
    cancel.tooltipText = 'This is an Cancel button that...';

    panel.add(ok);
    panel.add(cancel);

    dialog.add(panel);

    // TEST RUN

    cancel.showHelp();
    ok.showHelp();
    panel.showHelp();
    dialog.showHelp();
  }
}

const application = new Application;
application.createUI();