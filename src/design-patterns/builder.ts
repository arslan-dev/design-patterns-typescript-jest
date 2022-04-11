export enum EEngineType {
  FrontEngine   = "Front Engine",
  RearMidEngine = "Rear Mid Engine"
}

export class Car {
  private _numberOfSeats?: number
  private _engineType?: EEngineType
  private _hasTripComputer?: boolean
  private _hasGPS?: boolean

  setSeats(numberOfSeats: number)           { this._numberOfSeats = numberOfSeats }
  setEngine(engineType: EEngineType)        { this._engineType = engineType }
  setTripComputer(hasTripComputer: boolean) { this._hasTripComputer = hasTripComputer }
  setGPS(hasGPS: boolean)                   { this._hasGPS = hasGPS }

  getNumberOfSeats(): number {
    if (this._numberOfSeats) {
      return this._numberOfSeats
    } else {
      throw "The Car object has not yet been initialized"
    }
  }

  getInstalledEngineType(): EEngineType {
    if (this._engineType) {
      return this._engineType
    } else {
      throw "The Car object has not yet been initialized"
    }
  }

  hasTripComputer(): boolean {
    if (this._hasTripComputer !== undefined) {
      return this._hasTripComputer
    } else {
      throw "The Car object has not yet been initialized"
    }
  }

  hasGPS(): boolean {
    if (this._hasGPS !== undefined) {
      return this._hasGPS
    } else {
      throw "The Car object has not yet been initialized"
    }
  }
}

export class Manual {
  private _numberOfSeats?: number
  private _engineType?: EEngineType
  private _hasTripComputer?: boolean
  private _hasGPS?: boolean

  setSeats(numberOfSeats: number)           { this._numberOfSeats = numberOfSeats }
  setEngine(engineType: EEngineType)        { this._engineType = engineType }
  setTripComputer(hasTripComputer: boolean) { this._hasTripComputer = hasTripComputer }
  setGPS(hasGPS: boolean)                   { this._hasGPS = hasGPS }

  getSeatInformation(): string {
    if (this._numberOfSeats) {
      return `Installed seats: ${this._numberOfSeats}`
    } else {
      throw "The Manual object has not yet been initialized"
    }
  }

  getEngineInformation(): string {
    if (this._engineType) {
      return `Installed engine: ${this._engineType}`
    } else {
      throw "The Manual object has not yet been initialized"
    }
  }

  getTripComputerManual(): string {
    if (this._hasTripComputer !== undefined) {
      if (this._hasTripComputer) {
        return "Trip Computer manual"
      } else {
        return "No Trip Computer installed"
      }
    } else {
      throw "The Manual object has not yet been initialized"
    }
  }

  getGPSManual(): string {
    if (this._hasGPS !== undefined) {
      if (this._hasGPS) {
        return "GPS manual"
      } else {
        return "No GPS installed"
      }
    } else {
      throw "The Manual object has not yet been initialized"
    }
  }
}

interface Builder {
  reset: () => void

  setSeats(numberOfSeats: number): void
  setEngine(engineType: EEngineType): void
  setTripComputer(hasTripComputer: boolean): void
  setGps(hasGps: boolean): void
}

export class CarBuilder implements Builder {
  private _car!: Car

  constructor () {
    this.reset()
  }

  reset() {
    this._car = new Car()
  }

  setSeats(numberOfSeats: number)           { this._car.setSeats(numberOfSeats) }
  setEngine(engineType: EEngineType)        { this._car.setEngine(engineType) }
  setTripComputer(hasTripComputer: boolean) { this._car.setTripComputer(hasTripComputer) }
  setGps(hasGps: boolean)                   { this._car.setGPS(hasGps) }

  getProduct(): Car {
    const product = this._car
    this.reset()
    return product
  }
}

export class CarManualBuilder implements Builder {
  private _manual!: Manual

  constructor () {
    this.reset()
  }

  reset() {
    this._manual = new Manual()
  }

  setSeats(numberOfSeats: number)           { this._manual.setSeats(numberOfSeats) }
  setEngine(engineType: EEngineType)        { this._manual.setEngine(engineType) }
  setTripComputer(hasTripComputer: boolean) { this._manual.setTripComputer(hasTripComputer) }
  setGps(hasGps: boolean)                   { this._manual.setGPS(hasGps) }

  getProduct(): Manual {
    const product = this._manual
    this.reset()
    return product
  }
}

export class Director {

  constructSportsCar(builder: Builder) {
    builder.reset()
    builder.setSeats(2)
    builder.setEngine(EEngineType.RearMidEngine)
    builder.setTripComputer(true)
    builder.setGps(true)
  }

  constructSUV(builder: Builder) {
    builder.reset()
    builder.setSeats(4)
    builder.setEngine(EEngineType.FrontEngine)
    builder.setTripComputer(false)
    builder.setGps(false)
  }
}
