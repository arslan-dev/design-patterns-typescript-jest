// application.test.ts
// Tests for the Application for the Command DP

import Button from "../../design-patterns/command-dp/application/components/button"
import { CopyCommand } from "../../design-patterns/command-dp/command/concrete-commands"
import Application from "../../design-patterns/command-dp/application/application"
import Editor from "../../design-patterns/command-dp/application/components/editor"
import CommandHistory from "../../design-patterns/command-dp/application/components/command-history"

let commandHistory: CommandHistory
let application: Application
let copyCommand: CopyCommand

beforeEach(() => {
  commandHistory = new CommandHistory
  application = new Application(commandHistory)
  copyCommand = new CopyCommand(application)
})

it("should be possible to create new buttons in the application", () => {
  const button1 = new Button(copyCommand)
  application.addButton(button1)

  expect(application.buttons.length).toEqual(1)

  const button2 = new Button(copyCommand)
  application.addButton(button2)

  expect(application.buttons.length).toEqual(2)
})

it("should be possible to add shortcuts", () => {
  application.addShortcut("Ctrl+C", copyCommand)
  expect(application.shortcuts.size).toEqual(1)

  application.addShortcut("Ctrl+Ins", copyCommand)
  expect(application.shortcuts.size).toEqual(2)
})

it("should be possible to open new Editors in the Application and change active editors", () => {
  const editor1 = new Editor()
  application.addEditor(editor1)
  expect(application.editors.length).toEqual(1)
  expect(application.activeEditor).toBe(editor1)

  const editor2 = new Editor
  application.addEditor(editor2)
  expect(application.editors.length).toEqual(2)
  expect(application.activeEditor).toBe(editor2)

  application.setActiveEditor(editor1)
  expect(application.activeEditor).toBe(editor1)

  application.setActiveEditor(editor2)
  expect(application.activeEditor).toBe(editor2)

  const editor3 = new Editor
  application.setActiveEditor(editor3)
  expect(application.activeEditor).not.toBe(editor3)
})
