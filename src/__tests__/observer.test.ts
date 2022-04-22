/// observer.test.ts
/// Tests for the Observer DP implementation

import { EEventType, Editor, LoggerListener, EmailAlertsListener } from "../design-patterns/observer"
import Logger from "../logger"

test("observer", () => {
  const editor = new Editor

  const logger = new LoggerListener(
    "/path/to/log.txt",
    "Someone has opened the file: %s"
  )
  editor.eventManager.subscribe(EEventType.Open, logger)

  const emailer = new EmailAlertsListener(
    "admin@example.com",
    "Someone has changed the file: %s"
  )
  editor.eventManager.subscribe(EEventType.Save, emailer)
  editor.eventManager.subscribe(EEventType.Save, logger)

  const iLogs = Logger.getIterator()

  editor.openFile("/path/to/file.txt")
  expect(iLogs.next).toEqual("Log into /path/to/log.txt: Someone has opened the file: /path/to/file.txt")

  editor.saveFile("/path/to/file.txt")
  expect(iLogs.next).toEqual("Send mail to admin@example.com: Someone has changed the file: /path/to/file.txt")
  expect(iLogs.next).toEqual("Log into /path/to/log.txt: Someone has opened the file: /path/to/file.txt")

  editor.eventManager.unsubscribe(EEventType.Open, logger)
  editor.openFile("/path/to/file.txt")
  expect(iLogs.hasMore()).toEqual(false)

  editor.eventManager.unsubscribe(EEventType.Save, logger)
  editor.saveFile("/path/to/file.txt")
  expect(iLogs.hasMore()).toEqual(true)
  expect(iLogs.next).toEqual("Send mail to admin@example.com: Someone has changed the file: /path/to/file.txt")
})