/// observer.ts
/// Observer DP implementation

import Logger from "../logger"

enum EEventType {
  Open,
  Save
}

interface IEventListener {
  update(filename: string): void
}

type TListener = {
  eventType: EEventType
  eventListener: IEventListener
}

type TListenerSet = TListener[]


class EventManager {
  private _listeners: TListenerSet

  constructor() {
    this._listeners = []
  }

  subscribe(eventType: EEventType, eventListener: IEventListener) {
    const listener: TListener = {
      eventType: eventType,
      eventListener: eventListener
    }
    this._listeners.push(listener)
  }

  unsubscribe(eventType: EEventType, eventListener: IEventListener) {
    const filteredListeners = this._listeners.filter(listener => {
      return listener.eventType != eventType || listener.eventListener != eventListener
    })
    this._listeners = [...filteredListeners]
  }

  notify(eventType: EEventType, data: string) {
    this._listeners.forEach(listener => {
      if (listener.eventType === eventType) {
        listener.eventListener.update(data)
      }
    })
  }
}

class Editor {
  private _filename?: string

  private _eventManager: EventManager
  get eventManager(): EventManager { return this._eventManager }

  constructor() {
    this._eventManager = new EventManager
  }

  openFile(filename: string) {
    this._filename = filename
    this._eventManager.notify(EEventType.Open, filename)
  }

  saveFile(filename: string) {
    this._filename = filename
    this._eventManager.notify(EEventType.Save, filename)
  }
}

class LoggerListener implements IEventListener {
  protected _logFilename: string
  protected _message: string

  constructor(logFilename: string, message: string) {
    this._logFilename = logFilename
    this._message = message
  }

  update(filename: string): void {
    const logMessage = this._message.replace("%s", filename)
    Logger.info(`Log into ${this._logFilename}: ${logMessage}`)
  }
}

class EmailAlertsListener implements IEventListener {
  protected _email: string
  protected _message: string

  constructor(email: string, message: string) {
    this._email = email
    this._message = message
  }

  update(filename: string): void {
    const logMessage = this._message.replace("%s", filename)
    Logger.info(`Send mail to ${this._email}: ${logMessage}`)
  }
}

export { EEventType, Editor, LoggerListener, EmailAlertsListener }