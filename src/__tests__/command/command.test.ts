// command.test.ts
// Tests for the Command Design Pattern

import Application from "../../design-patterns/command-dp/application/application"
import CommandHistory from "../../design-patterns/command-dp/application/components/command-history"
import { CopyCommand, CutCommand, PasteCommand, UndoCommand } from "../../design-patterns/command-dp/command/concrete-commands"
import Editor from "../../design-patterns/command-dp/application/components/editor"


// TEST STARTS

let app: Application
let editor1: Editor
let editor2: Editor
// let copyButton: Button
// let cutButton: Button
// let pasteButton: Button
// let undoButton: Button
// let shortcuts: Shortcuts

beforeEach(() => {

  const commandHistory = new CommandHistory()
  app = new Application(commandHistory)

  editor1 = new Editor()
  editor1.text = "First Editor's text"
  app.addEditor(editor1)

  editor2 = new Editor()
  editor2.text = "Second Editor's text"
  app.addEditor(editor2)

  app.setActiveEditor(editor1)

  // copyButton = new Button()
  // cutButton = new Button
  // pasteButton = new Button
  // undoButton = new Button
  // shortcuts = new Shortcuts
})

test("the copy command", () => {
  const copyCommand = new CopyCommand(app)
  app.executeCommand(copyCommand)

  expect(app.activeEditor.text).toEqual("First Editor's text")
  expect(app.clipboard).toEqual("Fir") 
})

test("the cut command", () => {
  const cutCommand = new CutCommand(app)
  app.executeCommand(cutCommand)

  expect(app.activeEditor.text).toEqual("st Editor's text")
  expect(app.clipboard).toEqual("Fir") 
})

test("the paste command", () => {
  const copyCommand = new CopyCommand(app)
  app.executeCommand(copyCommand)

  app.setActiveEditor(editor2)
  const pasteCommand = new PasteCommand(app)
  app.executeCommand(pasteCommand)

  expect(app.activeEditor.text).toEqual("Firond Editor's text")
})

test.skip("the undo command", () => {
  const copyCommand = new CopyCommand(app)
  const cutCommand = new CutCommand(app)
  const pasteCommand = new PasteCommand(app)

  expect(editor1.text).toEqual("First Editor's text")
  expect(editor2.text).toEqual("Second Editor's text")

  app.executeCommand(cutCommand)
  expect(app.activeEditor.text).toEqual("st Editor's text")
  expect(editor1.text).toEqual("st Editor's text")
  expect(editor2.text).toEqual("Second Editor's text")

  app.setActiveEditor(editor2)
  app.executeCommand(pasteCommand)
  expect(editor1.text).toEqual("st Editor's text")
  expect(editor2.text).toEqual("Firond Editor's text")

  app.setActiveEditor(editor1)
  app.executeCommand(copyCommand)
  expect(editor1.text).toEqual("st Editor's text")
  expect(editor2.text).toEqual("Firond Editor's text")

  app.setActiveEditor(editor2)
  app.executeCommand(pasteCommand)
  expect(editor1.text).toEqual("st Editor's text")
  expect(editor2.text).toEqual("st ond Editor's text")

  // sequence of "undo"s

  const undoCommand = new UndoCommand(app)
  app.executeCommand(undoCommand)
  expect(editor1.text).toEqual("st Editor's text")
  expect(editor2.text).toEqual("Firond Editor's text")

  app.executeCommand(undoCommand)
  expect(editor1.text).toEqual("st Editor's text")
  expect(editor2.text).toEqual("Second Editor's text")

  app.executeCommand(undoCommand)
  expect(editor1.text).toEqual("First Editor's text")
  expect(editor2.text).toEqual("Second Editor's text")
})

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