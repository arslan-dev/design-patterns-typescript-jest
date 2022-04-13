/// composite.test.ts

import { Graphic, Dot, Circle, CompoundGraphic } from "../../design-patterns/composite-dp/composite"
import Screen from "../../design-patterns/composite-dp/screen"

let screen: Screen

beforeEach(() => {
  screen = new Screen
})

it("should be able to draw a Dot", () => {
  const dot = new Dot(1, 2)
  dot.draw(screen)
  expect(screen.objects[0]).toEqual("Dot(1,2)")
})

it("should be able to draw a Circle", () => {
  const circle = new Circle(1, 2, 3)
  circle.draw(screen)
  expect(screen.objects[0]).toEqual("Circle(1,2,3)")
})

it("should be able to draw multiple objects at once", () => {
  const all = new CompoundGraphic()
  all.add(new Dot(1, 2))
  all.add(new Circle(5, 3, 10))
  all.draw(screen)

  expect(screen.objects.find(obj => obj === "Dot(1,2)")).not.toBeUndefined()
  expect(screen.objects.find(obj => obj === "Circle(5,3,10)")).not.toBeUndefined()
})

it.skip("should be able to draw moved Graphic correctly", () => {
  expect(1).toEqual(1)
})

it("should be able to draw hierarchy of object", () => {

  const all = new CompoundGraphic()
  all.add(new Dot(1, 2))
  all.add(new Circle(5, 3, 10))

  const components: Graphic[] = [
    new Circle(2, 3, 8),
    new Circle(5, 3, 10),
    new Circle(6, 3, 12),
  ]

  const group = new CompoundGraphic()
  components.forEach(component => group.add(component))
  group.move(100, 100)
  all.add(group)

  all.draw(screen)

  expect(screen.objects.find(obj => obj === "Dot(1,2)")).not.toBeUndefined()
  expect(screen.objects.find(obj => obj === "Circle(5,3,10)")).not.toBeUndefined()

  expect(screen.objects.find(obj => obj === "Circle(102,103,8)")).not.toBeUndefined()
  expect(screen.objects.find(obj => obj === "Circle(105,103,10)")).not.toBeUndefined()
  expect(screen.objects.find(obj => obj === "Circle(106,103,12)")).not.toBeUndefined()
})