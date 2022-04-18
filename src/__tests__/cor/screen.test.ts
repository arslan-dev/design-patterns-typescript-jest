// screen.test.ts
// Tests for the Chain of Responsibility DP's fake Screen component

import { Screen } from "../../design-patterns/cor-dp/screen"

it("should be able to display tooltip on the screen, but only once", () => {
  const screen = new Screen
  screen.showTooltip("test")
  expect(screen.tooltip).toEqual("test")
  expect(screen.tooltip).toEqual("")
})