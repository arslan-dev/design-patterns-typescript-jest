/// editor.test.ts

import Editor from "../../design-patterns/command-dp/application/components/editor"
import { IControllableEditor } from "../../design-patterns/command-dp/command/command"

let editor: IControllableEditor

beforeEach(() => {
  editor = new Editor
})

it("should be possible add some text inside the editor", () => {
  editor.text = "Test Text"
  const selection = editor.getSelection(0, 3)
  expect(selection).toEqual("Tes")
})