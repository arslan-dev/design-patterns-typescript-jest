// application.test.ts
// Tests for the Application for the Command DP

import Button from "../../design-patterns/command-dp/application/components/button"
import { CopyCommand } from "../../design-patterns/command-dp/command/concrete-commands"
import Application from "../../design-patterns/command-dp/application/application"
import Editor from "../../design-patterns/command-dp/application/components/editor"
import CommandHistory from "../../design-patterns/command-dp/application/components/command-history"

let commandHistory = new CommandHistory
let application = new Application(commandHistory)
let editor = new Editor
let copyCommand = new CopyCommand(application, editor)

beforeEach(() => {
  commandHistory = new CommandHistory
  application = new Application(commandHistory)
  editor = new Editor
  copyCommand = new CopyCommand(application, editor)
})

test("Create some buttons", () => {
  const button1 = new Button(copyCommand)
  application.addButton(button1)

  expect(application.buttons.length).toEqual(1)

  const button2 = new Button(copyCommand)
  application.addButton(button2)

  expect(application.buttons.length).toEqual(2)
})

test("Create some shortcuts", () => {
  application.addShortcut("Ctrl+C", copyCommand)
  expect(application.shortcuts.length).toEqual(1)
})