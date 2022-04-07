import { Database } from '../design-patterns/singleton'

test('Database has only one instance', () => {
  const instanceA = Database.getInstance()
  expect(instanceA).toBeInstanceOf(Database)

  const instanceB = Database.getInstance()
  expect(instanceB).toBeInstanceOf(Database)
  expect(instanceB).toEqual(instanceA)
})

test('Database\'s constructor does not work', () => {
  const error = new Database()
})