/// mediator.test.ts
/// tests for the Mediator DP implementation

import { AuthenticationDialog, AuthenticationDialogBuilder } from "../design-patterns/mediator"
import Logger from "../logger"

beforeEach(() => {
  Logger.clear()
})

test("authentication dialog", () => {
  const app = new AuthenticationDialog()
  const appBuilder = new AuthenticationDialogBuilder(app)

  appBuilder.addLoginCheckbox(true)
  expect(app.loginCheckbox.checked).toEqual(true)

  appBuilder.addLoginUsernameTextInput()
  appBuilder.addLoginPasswordTextInput()

  appBuilder.addRegistrationUsernameTextInput()
  appBuilder.addRegistrationPasswordTextInput()
  appBuilder.addRegistrationEmailTextInput()

  appBuilder.addOkButton()
  appBuilder.addCancelButton()

  const iLogs = Logger.getIterator()

  app.loginCheckbox.check() // should be register
  expect(app.title).toEqual("Register")
  expect(iLogs.next).toEqual("Show registration form components.")
  expect(iLogs.next).toEqual("Hide login form components.")

  app.loginCheckbox.check() // should be login
  expect(app.title).toEqual("Log in")
  expect(iLogs.next).toEqual("Show login form components.")
  expect(iLogs.next).toEqual("Hide registration form components.")

  app.okButton.click() // should be login
  expect(iLogs.next).toEqual("Try to fine a user using login credentials.")

  app.loginCheckbox.check() // should be register
  expect(iLogs.next).toEqual("Show registration form components.")
  expect(iLogs.next).toEqual("Hide login form components.")
  app.okButton.click() 
  expect(iLogs.next).toEqual("Create a user account.")
  expect(iLogs.next).toEqual("Log in that user.")
})