/// mediator.ts
/// Mediator DP implementation

import Logger from "../Logger"

enum EEventType {
  Click,
  KeyPress,
  Check
}

interface IMediator {
  notify(sender: Component, event: EEventType): void
}

class AuthenticationDialog implements IMediator {
  title: string
  loginCheckbox!: Checkbox

  loginUsername!: TextInput
  loginPassword!: TextInput

  registrationUsername!: TextInput
  registrationPassword!: TextInput
  registrationEmail!: TextInput

  okButton!: Button
  cancelButton!: Button

  constructor() {
    this.title = ""
  }
  
  notify(sender: Component, event: EEventType): void {
    if (sender === this.loginCheckbox && event === EEventType.Check) {
      if (this.loginCheckbox.checked) {
        this.title = "Log in"
        Logger.info("Show login form components.")
        Logger.info("Hide registration form components.")
      } else {
        this.title = "Register"
        Logger.info("Show registration form components.")
        Logger.info("Hide login form components.")
      }
    }
    if (sender === this.okButton && event === EEventType.Click) {
      if (this.loginCheckbox.checked) {
        Logger.info("Try to fine a user using login credentials.")
      } else {
        Logger.info("Create a user account.")
        Logger.info("Log in that user.")
      }
    }
  }

}

class Component {
  protected _dialog: IMediator

  constructor(dialog: IMediator) {
    this._dialog = dialog
  }

  click() {
    this._dialog.notify(this, EEventType.Click)
  }

  keypress() {
    this._dialog.notify(this, EEventType.KeyPress)
  }
}

class Button extends Component {}
class TextInput extends Component {}

class Checkbox extends Component {
  checked: boolean

  constructor(dialog: IMediator, checked: boolean) {
    super(dialog)
    this.checked = checked
  }

  check() {
    this.checked = !this.checked
    this._dialog.notify(this, EEventType.Check)
  }
}

class AuthenticationDialogBuilder {
  protected _dialog: AuthenticationDialog

  constructor(dialog: AuthenticationDialog) {
    this._dialog = dialog
  }

  addLoginCheckbox(checked: boolean): Checkbox {
    const loginCheckbox = new Checkbox(this._dialog, checked)
    this._dialog.loginCheckbox = loginCheckbox
    return loginCheckbox
  }

  addLoginUsernameTextInput(): TextInput {
    const loginUsername = new TextInput(this._dialog)
    this._dialog.loginUsername = loginUsername
    return loginUsername
  }

  addLoginPasswordTextInput(): TextInput {
    const loginPassword = new TextInput(this._dialog)
    this._dialog.loginPassword = loginPassword
    return loginPassword
  }

  addRegistrationUsernameTextInput(): TextInput {
    const registrationUsername = new TextInput(this._dialog)
    this._dialog.registrationUsername = registrationUsername
    return registrationUsername
  }

  addRegistrationPasswordTextInput(): TextInput {
    const registrationPassword = new TextInput(this._dialog)
    this._dialog.registrationPassword = registrationPassword
    return registrationPassword
  }

  addRegistrationEmailTextInput(): TextInput {
    const registrationEmail = new TextInput(this._dialog)
    this._dialog.registrationEmail = registrationEmail
    return registrationEmail
  }

  addOkButton(): Button {
    const okButton = new Button(this._dialog)
    this._dialog.okButton = okButton 
    return okButton
  }

  addCancelButton(): Button {
    const cancelButton = new Button(this._dialog)
    this._dialog.cancelButton = cancelButton 
    return cancelButton
  }
}

export { AuthenticationDialog, AuthenticationDialogBuilder }