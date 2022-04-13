/// screen.test.ts

import Screen from "../../design-patterns/composite-dp/screen"

it("should be able to draw raw graphics instructions", () => {
  const screen = new Screen
  screen.draw("instruction 1")
  screen.draw("instruction 2")
  screen.draw("instruction 3")

  for (let i=1; i<=3; i++) {
    const obj = screen.objects[i-1]
    expect(obj).toEqual(`instruction ${i}`)
  }
})