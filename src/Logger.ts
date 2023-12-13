/// Logger.ts
/// simple Logger

import IIterator from "./i-iterator"

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

  static getIterator(): IIterator<string> {
    return InnerLogger.instance.getIterator()
  }
}

class InnerLogger implements IIterator<string> {
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
    this._curPos = -1
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

  getIterator(): IIterator<string> {
    this.resetCurPos()
    return this
  }

  // IIterator implementation

  protected _curPos: number

  protected resetCurPos() {
    this._curPos = -1
  }

  get next(): string | undefined {
    if (this.hasMore()) {
      this._curPos++
      return this._records[this._curPos]
    } else {
      return undefined
    }
  }  

  hasMore(): boolean {
    return this._curPos < this._records.length-1
  }
}