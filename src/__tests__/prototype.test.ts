/// prototype.test.ts
/// Tests for the Prototype DP implementation

import { Prototype, ComponentWithBackReference } from "../design-patterns/prototype-dp/prototype3"
import { Rectangle } from "../design-patterns/prototype-dp/prototype"

test("dates should be equal", () => {
  const date1 = new Date()
  const date2 = new Date(date1)
  expect(date2).toEqual(date1)
})

test("prototype", () => {
  const p1 = new Prototype
  p1.x = 245
  p1.date = new Date()
  p1.circularReference = new ComponentWithBackReference(p1)

  const p2 = p1.clone()
  expect(p2.x).toEqual(p1.x)
  expect(p2.date).toEqual(p1.date)
  expect(p2.circularReference).toEqual(p1.circularReference)
  expect(p2.circularReference.prototype).toEqual(p1.circularReference.prototype)
})

test("Object: create()", () => {
  const obj1 = {
    a: "a",
    b: 5
  }
  const obj2 = Object.create(obj1)

  expect(obj2.a).toEqual(obj1.a)
  expect(obj2.b).toEqual(obj1.b)

  // const date1 = new Date()
  // const date2 = Object.create(date1)
  // expect(date2.getDate()).toBeInstanceOf(date1.getDate())
})

test("Object: assign()", () => {
  const obj1 = {
    a: "a",
    b: 5
  }
  const obj2 = Object.assign({}, obj1)

  expect(obj2.a).toEqual(obj1.a)
  expect(obj2.b).toEqual(obj1.b)
})

test.skip("Rectangle clone", () => {
  const rect1 = {
    width: 100,
    height: 50
  }
  const rect2 = new Rectangle(rect1)
  expect(rect2.width).toEqual(rect1.width)
  expect(rect2.height).toEqual(rect1.height)
})

// test("should be able to construct, construct from prototype and clone a Rectangle", () => {
  // const rectangle = Rectangle.constructTrivially(100, 50)
  // expect(rectangle.width).toEqual(100)
  // expect(rectangle.height).toEqual(50)

  // const rectangleFromPrototype = Rectangle.constructFromPrototype(rectangle)
  // expect(rectangleFromPrototype.width).toEqual(100)
  // expect(rectangleFromPrototype.height).toEqual(50)
  // expect(rectangleFromPrototype).not.toBe(rectangle)

  // const clonedRectangle = rectangle.clone()
  // expect(clonedRectangle.width).toEqual(100)
  // expect(clonedRectangle.height).toEqual(50)
  // expect(clonedRectangle).not.toBe(rectangle)
// })

// const shapes: Array<Shape> = [];

// const circle = Object.create(Circle.prototype);
// circle.x = 10
// circle.y = 10
// circle.radius = 20
// shapes.push(circle);

// const anotherCircle = circle.clone();
// shapes.push(anotherCircle);

// const rectangle = Object.create(Rectangle.prototype);
// rectangle.width = 10
// rectangle.height = 20
// shapes.push(rectangle);

// console.log(shapes);

// // COPY

// const shapesCopy: Shape[] = [];

// shapes.forEach(shape => {
//   const clone = shape.clone();
//   shapesCopy.push( clone )
// });

// console.log(shapesCopy);