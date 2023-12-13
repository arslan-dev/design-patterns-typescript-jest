/// decorator.test.ts
/// Tests for the Decorator DP implementation

import { DataSource, FileDataSource, CompressionDecorator, EncryptionDecorator } from "../design-patterns/decorator"
import Logger from "../Logger"

const salaryRecords = "salaryRecords"  

beforeEach(() => {
  Logger.clear()
})

it("should be able to write and read data", () => {
  const source: DataSource = new FileDataSource("some-file.dat")
  source.writeData(salaryRecords)
  const readData = source.readData()

  expect(readData).toEqual(salaryRecords)

  const records = Logger.records
  expect(records[0]).toEqual("Write data 'salaryRecords'")
  expect(records[1]).toEqual("Read data 'salaryRecords'")
})

describe("test decorators", () => {
  let source: DataSource

  beforeEach(() => {
    source = new FileDataSource("some-file.dat")
  })

  it("should be able to compress the data", () => {
    source = new CompressionDecorator(source)
    source.writeData(salaryRecords)
    const readData = source.readData()
    expect(readData).toEqual(salaryRecords)

    const records = Logger.records
    expect(records[0]).toEqual("Compressing... done: 'salaryRecords_compressed'")
    expect(records[1]).toEqual("Write data 'salaryRecords_compressed'")
    expect(records[2]).toEqual("Read data 'salaryRecords_compressed'")
    expect(records[3]).toEqual("Decompressing... done: 'salaryRecords'")
  })

  it("should be able to encrypt the data", () => {
    source = new EncryptionDecorator(source)
    source.writeData(salaryRecords)
    const readData = source.readData()
    expect(readData).toEqual(salaryRecords)

    const records = Logger.records
    expect(records[0]).toEqual("Encrypting... done: 'salaryRecords_encrypted'")
    expect(records[1]).toEqual("Write data 'salaryRecords_encrypted'")
    expect(records[2]).toEqual("Read data 'salaryRecords_encrypted'")
    expect(records[3]).toEqual("Decrypting... done: 'salaryRecords'")
  })

  it("should be able to compress, then encrypt the data", () => {
    source = new EncryptionDecorator(source)
    source = new CompressionDecorator(source)
    source.writeData(salaryRecords)
    const readData = source.readData()
    expect(readData).toEqual(salaryRecords)

    const records = Logger.records
    expect(records[0]).toEqual("Compressing... done: 'salaryRecords_compressed'")
    expect(records[1]).toEqual("Encrypting... done: 'salaryRecords_compressed_encrypted'")
    expect(records[2]).toEqual("Write data 'salaryRecords_compressed_encrypted'")
    expect(records[3]).toEqual("Read data 'salaryRecords_compressed_encrypted'")
    expect(records[4]).toEqual("Decrypting... done: 'salaryRecords_compressed'")
    expect(records[5]).toEqual("Decompressing... done: 'salaryRecords'")
  })

  it("should be able to encrypt, then compress the data", () => {
    source = new CompressionDecorator(source)
    source = new EncryptionDecorator(source)
    source.writeData(salaryRecords)
    const readData = source.readData()
    expect(readData).toEqual(salaryRecords)

    const records = Logger.records
    expect(records[0]).toEqual("Encrypting... done: 'salaryRecords_encrypted'")
    expect(records[1]).toEqual("Compressing... done: 'salaryRecords_encrypted_compressed'")
    expect(records[2]).toEqual("Write data 'salaryRecords_encrypted_compressed'")
    expect(records[3]).toEqual("Read data 'salaryRecords_encrypted_compressed'")
    expect(records[4]).toEqual("Decompressing... done: 'salaryRecords_encrypted'")
    expect(records[5]).toEqual("Decrypting... done: 'salaryRecords'")
  })
})

// it("should be able to compress and encrypt data", () => {

//     source = new EncryptionDecorator(source);
//     source.writeData(salaryRecords);