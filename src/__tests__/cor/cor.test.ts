// cor.test.ts
// tests for the Chain of Responsibility DP

import { Screen } from "../../design-patterns/cor-dp/screen"
import { Dialog, Panel, Button } from "../../design-patterns/cor-dp/cor"

let screen: Screen

beforeEach(() => {
  screen = new Screen
})

it("should be possible to display a tooltip of the Dialog", () => {
  const dialog = new Dialog("Budget Reports")
  dialog.wikiPageURL = "http://wiki.org"
  dialog.showHelp(screen)
  expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")
})

it("should be possible to display a tooltip of the Panel", () => {
  const panel = new Panel(0, 0, 400, 800)
  panel.modalHelpText = "This panel does..."
  panel.showHelp(screen)
  expect(screen.tooltip).toEqual("Show modal text 'This panel does...'")
})

it("should be possible to display a tooltip of an OK Button", () => {
  const ok = new Button("OK")
  ok.tooltipText = "This is an OK button that..."
  ok.showHelp(screen)
  expect(screen.tooltip).toEqual("Show tooltip text 'This is an OK button that...'")
})

it("should be possible to display a tooltip of a Cancel Button", () => {
  const cancel = new Button("Cancel")
  cancel.tooltipText = "This is an Cancel button that..."
  cancel.showHelp(screen)
  expect(screen.tooltip).toEqual("Show tooltip text 'This is an Cancel button that...'")
})

describe("hierarchy of UI elements", () => {
  let dialog: Dialog
  let panel: Panel
  let ok: Button
  let cancel: Button

  beforeEach(() => {
    dialog = new Dialog("Budget Reports")
    panel = new Panel(0, 0, 400, 800)
    ok = new Button("OK")
    cancel = new Button("Cancel")

    panel.add(ok)
    panel.add(cancel)
    
    dialog.add(panel)
  })

  test("when every UI element has a tooltip", () => {
    dialog.wikiPageURL = "http://wiki.org"
    panel.modalHelpText = "This panel does..."
    ok.tooltipText = "This is an OK button that..."
    cancel.tooltipText = "This is an Cancel button that..."

    cancel.showHelp(screen)
    expect(screen.tooltip).toEqual("Show tooltip text 'This is an Cancel button that...'")

    ok.showHelp(screen)
    expect(screen.tooltip).toEqual("Show tooltip text 'This is an OK button that...'")

    panel.showHelp(screen)
    expect(screen.tooltip).toEqual("Show modal text 'This panel does...'")

    dialog.showHelp(screen)
    expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")
  })

  test("when buttons don't have a tooltip", () => {
    dialog.wikiPageURL = "http://wiki.org"
    panel.modalHelpText = "This panel does..."

    cancel.showHelp(screen)
    expect(screen.tooltip).toEqual("Show modal text 'This panel does...'")

    ok.showHelp(screen)
    expect(screen.tooltip).toEqual("Show modal text 'This panel does...'")

    panel.showHelp(screen)
    expect(screen.tooltip).toEqual("Show modal text 'This panel does...'")

    dialog.showHelp(screen)
    expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")
  })

  test("when nothing but the Dialog has a tooltip", () => {
    dialog.wikiPageURL = "http://wiki.org"

    cancel.showHelp(screen)
    expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")

    ok.showHelp(screen)
    expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")

    panel.showHelp(screen)
    expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")

    dialog.showHelp(screen)
    expect(screen.tooltip).toEqual("Link to wiki page URL 'http://wiki.org'")
  })
})