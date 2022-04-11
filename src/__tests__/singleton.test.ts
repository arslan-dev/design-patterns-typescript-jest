import { Database } from '../design-patterns/singleton'

test('Database has only one instance', () => {
  const instanceA = Database.getInstance()
  expect(instanceA).toBeInstanceOf(Database)

  const instanceB = Database.getInstance()
  expect(instanceB).toBeInstanceOf(Database)
  expect(instanceB).toEqual(instanceA)
})

test('Database instances have the same engine', () => {
  const instanceA = Database.getInstance()
  const engineA = instanceA.engine
  expect(typeof engineA === 'string').toEqual(true)

  const instanceB = Database.getInstance()
  const engineB = instanceB.engine
  expect(engineB).toEqual(engineA)
})