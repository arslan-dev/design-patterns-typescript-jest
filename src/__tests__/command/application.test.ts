// application.test.ts
// Tests for the Application for the Command DP

import Button from "../../design-patterns/command-and-memento-dp/application/components/button"
import { CopyCommand, CutCommand, PasteCommand, UndoCommand } from "../../design-patterns/command-and-memento-dp/command/concrete-commands"
import Application from "../../design-patterns/command-and-memento-dp/application/application"
import Editor from "../../design-patterns/command-and-memento-dp/application/components/editor"
import CommandHistory from "../../design-patterns/command-and-memento-dp/application/components/command-history"
import ACommand from "../../design-patterns/command-and-memento-dp/command/command"

let commandHistory: CommandHistory
let app: Application
let copyCommand: CopyCommand

beforeEach(() => {
  commandHistory = new CommandHistory
  app = new Application(commandHistory)
  copyCommand = new CopyCommand(app)
})

it("should be possible to create new buttons in the application", () => {
  const button1 = new Button(copyCommand)
  app.addButton(button1)

  expect(app.buttons.length).toEqual(1)

  const button2 = new Button(copyCommand)
  app.addButton(button2)

  expect(app.buttons.length).toEqual(2)
})

it("should be possible to add shortcuts, and use the hotkey", () => {
  const editor1 = new Editor()
  editor1.text = "First Editor's text"
  app.addEditor(editor1)

  const cutCommand = new CutCommand(app)

  app.addShortcut("Ctrl+X", cutCommand)
  expect(app.shortcutManager.shortcutMap.size).toEqual(1)

  app.addShortcut("Ctrl+Del", cutCommand)
  expect(app.shortcutManager.shortcutMap.size).toEqual(2)

  app.pressKey("Ctrl+X")
  expect(app.clipboard).toEqual("Fir")
  expect(editor1.text).toEqual("st Editor's text")

  app.pressKey("Ctrl+Del")
  expect(app.clipboard).toEqual("st ")
  expect(editor1.text).toEqual("Editor's text")
})

it("should be possible to open new Editors in the Application and change active editors", () => {
  const editor1 = new Editor()
  app.addEditor(editor1)
  expect(app.editors.length).toEqual(1)
  expect(app.activeEditor).toBe(editor1)

  const editor2 = new Editor
  app.addEditor(editor2)
  expect(app.editors.length).toEqual(2)
  expect(app.activeEditor).toBe(editor2)

  app.setActiveEditor(editor1)
  expect(app.activeEditor).toBe(editor1)

  app.setActiveEditor(editor2)
  expect(app.activeEditor).toBe(editor2)

  const editor3 = new Editor
  app.setActiveEditor(editor3)
  expect(app.activeEditor).not.toBe(editor3)
})

describe("UI tests", () => {

  let editor1: Editor
  let editor2: Editor

  let cutCommand: ACommand
  let pasteCommand: ACommand
  let undoCommand: ACommand

  let copyButton: Button
  let cutButton: Button
  let pasteButton: Button
  let undoButton: Button

  beforeEach(() => {
    editor1 = new Editor()
    editor1.text = "First Editor's text"
    app.addEditor(editor1)

    editor2 = new Editor()
    editor2.text = "Second Editor's text"
    app.addEditor(editor2)

    app.setActiveEditor(editor1)

    // UI and commands
    copyCommand = new CopyCommand(app)
    copyButton = new Button(copyCommand)
    app.addShortcut("Ctrl+C", copyCommand)
    app.addShortcut("Ctrl+Ins", copyCommand)

    cutCommand = new CutCommand(app)
    cutButton = new Button(cutCommand)
    app.addShortcut("Ctrl+X", cutCommand)
    app.addShortcut("Ctrl+Del", cutCommand)

    pasteCommand = new PasteCommand(app)
    pasteButton = new Button(pasteCommand)
    app.addShortcut("Ctrl+V", pasteCommand)
    app.addShortcut("Shift+Ins", pasteCommand)

    undoCommand = new UndoCommand(app)
    undoButton = new Button(undoCommand)
    app.addShortcut("Ctrl+Z", undoCommand)
    app.addShortcut("Ctrl+Backspace", undoCommand)
  })

  test("operation sequence 1", () => {
    cutButton.press() // cut
    expect(app.activeEditor.text).toEqual("st Editor's text")
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")

    app.setActiveEditor(editor2)
    app.pressKey("Ctrl+V") // paste
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.setActiveEditor(editor1)
    app.pressKey("Ctrl+C") // copy
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.setActiveEditor(editor2)
    pasteButton.press() // paste
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("st ond Editor's text")

    // sequence of "undo"s
    undoButton.press()
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.pressKey("Ctrl+Z")
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")

    app.pressKey("Ctrl+Backspace")
    expect(editor1.text).toEqual("First Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")
  })

  test("operation sequence 2", () => {
    app.pressKey("Ctrl+Del") // cut
    expect(app.activeEditor.text).toEqual("st Editor's text")
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")

    app.setActiveEditor(editor2)
    app.pressKey("Shift+Ins") // paste
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.setActiveEditor(editor1)
    copyButton.press() // copy
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.setActiveEditor(editor2)
    pasteButton.press() // paste
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("st ond Editor's text")

    // sequence of "undo"s
    app.pressKey("Ctrl+Z")
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.pressKey("Ctrl+Z")
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")

    app.pressKey("Ctrl+Z")
    expect(editor1.text).toEqual("First Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")
  })

  test("operation sequence 3", () => {
    app.pressKey("Ctrl+X") // cut
    expect(app.activeEditor.text).toEqual("st Editor's text")
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")

    app.setActiveEditor(editor2)
    app.pressKey("Shift+Ins") // paste
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.setActiveEditor(editor1)
    app.pressKey("Ctrl+Ins") // copy
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    app.setActiveEditor(editor2)
    pasteButton.press() // paste
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("st ond Editor's text")

    // sequence of "undo"s
    undoButton.press()
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Firond Editor's text")

    undoButton.press()
    expect(editor1.text).toEqual("st Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")

    undoButton.press()
    expect(editor1.text).toEqual("First Editor's text")
    expect(editor2.text).toEqual("Second Editor's text")
  })
})