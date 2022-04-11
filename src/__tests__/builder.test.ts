import { CarBuilder, CarManualBuilder, Director, EEngineType, Car, Manual } from "../design-patterns/builder"


// // SPORTS CAR


// // SUV

// director.constructSUV(carBuilder);
// const suv = carBuilder.getProduct();

// director.constructSUV(carManualBuilder);
// const suvManual = carManualBuilder.getProduct();

// console.log(suv);
// console.log(suvManual);

let carBuilder: CarBuilder
let carManualBuilder: CarManualBuilder
let director: Director

beforeEach(() => {
  carBuilder = new CarBuilder()
  carManualBuilder = new CarManualBuilder()

  director = new Director()
})

test("Sports car > Build a Car and a Manual", () => {
  director.constructSportsCar(carBuilder)
  const sportsCar = carBuilder.getProduct()
  expect( sportsCar.getNumberOfSeats() ).toEqual( 2 )
  expect( sportsCar.getInstalledEngineType() ).toEqual( EEngineType.RearMidEngine )
  expect( sportsCar.hasTripComputer() ).toEqual( true )
  expect( sportsCar.hasGPS() ).toEqual( true )

  director.constructSportsCar(carManualBuilder)
  const sportsCarManual = carManualBuilder.getProduct()
  expect( sportsCarManual.getSeatInformation() ).toEqual("Installed seats: 2")
  expect( sportsCarManual.getEngineInformation() ).toEqual("Installed engine: Rear Mid Engine")
  expect( sportsCarManual.getTripComputerManual() ).toEqual("Trip Computer manual")
  expect( sportsCarManual.getGPSManual() ).toEqual("GPS manual")
})

test("SUV > Build a Car and a Manual", () => {
  director.constructSUV(carBuilder)
  const suv = carBuilder.getProduct()
  expect( suv.getNumberOfSeats() ).toEqual( 4 )
  expect( suv.getInstalledEngineType() ).toEqual( EEngineType.FrontEngine )
  expect( suv.hasTripComputer() ).toEqual( false )
  expect( suv.hasGPS() ).toEqual( false )

  director.constructSUV(carManualBuilder)
  const suvManual = carManualBuilder.getProduct()
  expect( suvManual.getSeatInformation() ).toEqual("Installed seats: 4")
  expect( suvManual.getEngineInformation() ).toEqual("Installed engine: Front Engine")
  expect( suvManual.getTripComputerManual() ).toEqual("No Trip Computer installed")
  expect( suvManual.getGPSManual() ).toEqual("No GPS installed")
})

test("Shouldn't be able to use uninitialized values", () => {
  const car = new Car()
  expect( () => car.getNumberOfSeats() ).toThrow("The Car object has not yet been initialized")
  expect( () => car.getInstalledEngineType() ).toThrowError("The Car object has not yet been initialized")

  const manual = new Manual()
  expect( () => manual.getSeatInformation() ).toThrowError("The Manual object has not yet been initialized")
  expect( () => manual.getEngineInformation() ).toThrowError("The Manual object has not yet been initialized")
})