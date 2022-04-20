/// logger.test.ts
/// Tests for the simple Logger

import Logger from "../logger"

test("Logger should log", () => {
  Logger.clear()

  Logger.info("log1")
  Logger.info("log2")
  Logger.info("log3")

  const records = Logger.records
  for (let i=3; i>=1; i--) {
    expect(records[i-1]).toEqual(`log${i}`)
  }
})

it("should be able to clear logger records", () => {
  Logger.info("log1")
  Logger.info("log2")
  Logger.info("log3")

  Logger.clear()

  const records = Logger.records
  expect(records.length).toEqual(0)
})

test("last entry should be the last logged record", () => {
  Logger.info("log1")
  Logger.info("log2")
  Logger.info("log3")

  const lastEntry = Logger.lastEntry
  expect(lastEntry).toEqual("log3")
})

test("last entry of an empty Logger records should be null", () => {
  Logger.clear()

  const lastEntry = Logger.lastEntry
  expect(lastEntry).toBeNull()
})

test("logger iterator", () => {
  Logger.clear()
  
  Logger.info("log1")
  Logger.info("log2")
  Logger.info("log3")

  const iterator = Logger.getIterator()

  expect(iterator.hasMore()).toEqual(true)
  expect(iterator.next).toEqual("log1")
  expect(iterator.next).toEqual("log2")
  expect(iterator.next).toEqual("log3")
  expect(iterator.hasMore()).toEqual(false)
})

test("new iterator should start from the start", () => {
  Logger.clear()

  Logger.info("log1")
  let iterator = Logger.getIterator()

  expect(iterator.hasMore()).toEqual(true)
  expect(iterator.next).toEqual("log1")
  expect(iterator.hasMore()).toEqual(false)

  iterator = Logger.getIterator()

  expect(iterator.hasMore()).toEqual(true)
  expect(iterator.next).toEqual("log1")
  expect(iterator.hasMore()).toEqual(false)
})