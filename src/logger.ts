/// logger.ts
/// simple Logger

type TRecord = string[]

export default class Logger {
  static info(str: string) {
    InnerLogger.instance.info(str)
  }

  static get records(): TRecord {
    return InnerLogger.instance.records
  }

  static clear() {
    InnerLogger.instance.clear()
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

  info(str: string) {
    this._records.push(str)
  }

  clear() {
    this._records = []
  }
}