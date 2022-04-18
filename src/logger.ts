/// logger.ts
/// simple Logger

type TRecord = string[]

interface ISerializable {
  toString(): string
}

export default class Logger {
  static info(v: ISerializable) {
    InnerLogger.instance.info(v)
  }

  static get records(): TRecord {
    return InnerLogger.instance.records
  }

  static clear() {
    InnerLogger.instance.clear()
  }

  static get lastEntry(): string | null {
    return InnerLogger.instance.lastEntry
  }
}

class InnerLogger {
  private static _instance: InnerLogger

  static get instance(): InnerLogger {
    if (!InnerLogger._instance) {
      InnerLogger._instance = new InnerLogger
    }
    return InnerLogger._instance
  }

  private _records: TRecord
  public get records(): TRecord {
    return this._records
  }

  private constructor() {
    this._records = []
  }

  info(str: ISerializable) {
    this._records.push(str.toString())
  }

  clear() {
    this._records = []
  }

  get lastEntry(): string | null {
    if (this._records.length) {
      return this._records[this._records.length-1]
    } else {
      return null
    }
  }
}