///
/// adapter-v2.0.spec.ts - tests for the Adapter DP implementation
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///

import { RoundPeg, RoundOpening, SquarePeg, SquareToRoundAdapter } from "./adapter-v2.0"

describe("Adapter DP", () => {
  test("A round peg of the right size should fit into the round opening", () => {
    const roundPeg5 = new RoundPeg({ diameter: 5 })
    const roundOpening6 = new RoundOpening({ diameter: 6 })
    const roundOpening5 = new RoundOpening({ diameter: 5 })
    const roundOpening4 = new RoundOpening({ diameter: 4 })

    expect(roundOpening6.canFitIntoItself(roundPeg5)).toStrictEqual(true)
    expect(roundOpening5.canFitIntoItself(roundPeg5)).toStrictEqual(true)
    expect(roundOpening4.canFitIntoItself(roundPeg5)).toStrictEqual(false)
  })

  // test("A square peg should not fit into the round opening") can not be accomplished
  // expect(roundOpening6.canFitIntoItself(squarePeg5)) gives static error
  
  test("A square peg of the right size can fit into the round opening via adapter", () => {
    const squarePeg5 = new SquarePeg({ width: 6 })
    const roundOpening9 = new RoundOpening({ diameter: 9 })
    const roundOpening8 = new RoundOpening({ diameter: 8 })
    const squarePeg5ViaAdapter = new SquareToRoundAdapter(squarePeg5)

    expect( roundOpening9.canFitIntoItself(squarePeg5ViaAdapter) ).toStrictEqual(true)
    expect( roundOpening8.canFitIntoItself(squarePeg5ViaAdapter) ).toStrictEqual(false)
  })
})