/**
 * @file command.ts
 * @description implementation of the Command Design Pattern
 */

// COMMAND

/**
 * Key abstraction
 */
abstract class Command {
  protected _app: Application
  protected _editor: Editor
  protected _backup: string

  constructor(app: Application, editor: Editor) {
    this._app = app;
    this._editor = editor;
    this._backup = '';
  }

  saveBackup() {
    console.log('save backup')
    this._backup = this._editor.text
  }

  undo() {
    console.log(`undo backup ${this._backup}`)
    this._editor.text = this._backup
  }

  abstract execute(): boolean
}

class CopyCommand extends Command {
  execute(): boolean {
    this._app.clipboard = this._editor.getSelection()
    return false
  }
}

class CutCommand extends Command {
  execute(): boolean {
    this.saveBackup()
    this._app.clipboard = this._editor.getSelection()
    this._editor.deleteSelection()
    return true
  }
}

class PasteCommand extends Command {
  execute(): boolean {
    this.saveBackup()
    this._editor.replaceSelection(this._app.clipboard)
    return true
  }
}

class UndoCommand extends Command {
  execute(): boolean {
    this._app.undo()
    return false
  }
}

// EOF COMMAND

class CommandHistory {
  private _history: Command[] = []

  push(c: Command) {
    this._history.push(c)
  }

  pop(): Command | undefined {
    return this._history.pop()
  }
}

class Editor {
  text: string = ''

  getSelection(): string {
    console.log('get selection');
    return 'selection01';
  }

  deleteSelection(): void {
    console.log('delete selection')
  }
  
  replaceSelection(text: string) {
    console.log(`replace selection ${text}`)
  }
}

class Application {
  clipboard: string = ''
  editors: Editor[] = []
  activeEditor: Editor = new Editor
  history: CommandHistory = new CommandHistory

  createUI() {
    const copyCommand = new CopyCommand(this, this.activeEditor)
    const copy = () => this.executeCommand(copyCommand)

    const cutCommand = new CutCommand(this, this.activeEditor)
    const cut = () => this.executeCommand(cutCommand)

    const pasteCommand = new PasteCommand(this, this.activeEditor)
    const paste = () => this.executeCommand(pasteCommand)

    const undoCommand = new UndoCommand(this, this.activeEditor)
    const undo = () => this.executeCommand(undoCommand)

    // EXECUTION

    copy()
    console.log('')
    cut()
    console.log('')
    paste()
    console.log('')
    undo()
  }

  executeCommand(command: Command) {
    if (command.execute()) {
      this.history.push(command)
    }
  }

  undo() {
    const command = this.history.pop()
    if (command) {
      command.undo()
    }
  }
}

const app = new Application
app.createUI()