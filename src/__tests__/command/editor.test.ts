/// editor.test.ts
/// for simplicity all selections are in (0, 3) range

import Editor from "../../design-patterns/command-dp/application/components/editor"
import { IControllableEditor } from "../../design-patterns/command-dp/command/command"

let editor: IControllableEditor

beforeEach(() => {
  editor = new Editor()
  editor.text = "Test Text"
})

it("should be possible add some text inside the editor", () => {
  const selection = editor.getSelection()
  expect(selection).toEqual("Tes")

  expect(editor.text).toEqual("Test Text")
})

it("should be possible to delete text inside the editor", () => {
  editor.deleteSelection() 
  expect(editor.text).toEqual("t Text")
})

it("should be possible to replace text inside the editor", () => {
  editor.replaceSelection("But") 
  expect(editor.text).toEqual("Butt Text")
})