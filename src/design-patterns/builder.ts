class Car {
  private _seats: string;
  private _engine: string;
  private _tripComputer: string;
  private _gps: string;

  setSeats(seatCount: number) { this._seats = `Install ${seatCount} seats` }
  setEngine(engineName: string) { this._engine = `Install ${engineName}` }
  setTripComputer(hasTripComputer: boolean) { this._tripComputer = hasTripComputer ? 'Install computer' : '' }
  setGPS(hasGPS: boolean) { this._gps = hasGPS ? 'Install GPS' : '' }
}

class Manual {
  private _seats: string;
  private _engine: string;
  private _tripComputer: string;
  private _gps: string;

  setSeats(seatCount: number) { this._seats = `Your car model has ${seatCount} seats` }
  setEngine(engineName: string) { this._engine = `The manual for the ${engineName}` }
  setTripComputer(hasTripComputer: boolean) { this._tripComputer = hasTripComputer ? 'The manual for the Trip Computer' : '' }
  setGPS(hasGPS: boolean) { this._gps = hasGPS ? 'The manual for the onboard GPS' : '' }
}

interface Builder {
  reset: () => void

  setSeats(count: number)
  setEngine(engineName: string)
  setTripComputer(hasComputer: boolean)
  setGps(hasGps: boolean)
}

class CarBuilder implements Builder {
  private _car: Car;

  constructor () {
    this.reset()
  }

  reset() {
    this._car = new Car();
  }

  setSeats(count: number) { this._car.setSeats(count) }
  setEngine(engineName: string) { this._car.setEngine(engineName) }
  setTripComputer(hasComputer: boolean) { this._car.setTripComputer(hasComputer) }
  setGps(hasGps: boolean) { this._car.setGPS(hasGps) }

  getProduct(): Car {
    const product = this._car;
    this.reset();
    return product;
  }
}

class CarManualBuilder implements Builder {
  private _manual: Manual;

  constructor () {
    this.reset()
  }

  reset() {
    this._manual = new Manual();
  }

  setSeats(count: number) { this._manual.setSeats(count) }
  setEngine(engineName: string) { this._manual.setEngine(engineName) }
  setTripComputer(hasComputer: boolean) { this._manual.setTripComputer(hasComputer) }
  setGps(hasGps: boolean) { this._manual.setGPS(hasGps) }

  getProduct(): Manual {
    const product = this._manual;
    this.reset();
    return product;
  }
}

class Director {
  private _builder: Builder;

  setBuilder(v: Builder) { this._builder = v }

  constructSportsCar(builder: Builder) {
    builder.reset()
    builder.setSeats(2)
    builder.setEngine('Sport Engine')
    builder.setTripComputer(true)
    builder.setGps(true)
  }

  constructSUV(builder: Builder) {
    builder.reset()
    builder.setSeats(4)
    builder.setEngine('Common Engine')
    builder.setTripComputer(false)
    builder.setGps(false)
  }
}

const carBuilder = new CarBuilder();
const carManualBuilder = new CarManualBuilder();

const director = new Director();

// SPORTS CAR

director.constructSportsCar(carBuilder);
const sportsCar = carBuilder.getProduct();

director.constructSportsCar(carManualBuilder);
const sportsCarManual = carManualBuilder.getProduct();

console.log(sportsCar);
console.log(sportsCarManual);

// SUV

director.constructSUV(carBuilder);
const suv = carBuilder.getProduct();

director.constructSUV(carManualBuilder);
const suvManual = carManualBuilder.getProduct();

console.log(suv);
console.log(suvManual);