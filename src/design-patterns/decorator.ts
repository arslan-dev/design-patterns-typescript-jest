// decorator.ts

import Logger from "../Logger"
export interface DataSource {
  writeData(data: string): void
  readData(): string
}

export class FileDataSource implements DataSource {
  protected _data: string

  constructor(filename: string) {
    this._data = ""
  }

  writeData(data: string) {
    Logger.info(`Write data '${data}'`)
    this._data = data
  }

  readData(): string {
    const data = this._data
    Logger.info(`Read data '${data}'`)
    return data
  }
}

class DataSourceDecorator implements DataSource {
  protected _wrappedDataSource: DataSource

  constructor(source: DataSource) {
    this._wrappedDataSource = source
  }

  writeData(data: string): void {
    this._wrappedDataSource.writeData(data)
  }

  readData(): string {
    return this._wrappedDataSource.readData()
  }
}

export class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    data += "_encrypted"
    Logger.info(`Encrypting... done: '${data}'`)
    super.writeData(data)
  }

  readData(): string {
    let tmp = super.readData()
    tmp = tmp.replace(/_encrypted/, "")
    Logger.info(`Decrypting... done: '${tmp}'`)
    return tmp
  }
}

export class CompressionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    data += "_compressed"
    Logger.info(`Compressing... done: '${data}'`)
    super.writeData(data)
  }

  readData(): string {
    let tmp = super.readData()
    tmp = tmp.replace(/_compressed/, "")
    Logger.info(`Decompressing... done: '${tmp}'`)
    return tmp
  }
}