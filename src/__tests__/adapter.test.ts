import { RoundHole, RoundPeg, SquarePeg, makeSquarePegAdapter } from '../design-patterns/adapter'

test('Round peg fits in round hole', () => {
  const roundHole = new RoundHole(5)
  const roundPeg = new RoundPeg(5)
  expect( roundHole.fits(roundPeg) ).toEqual(true)
})

test ('Square peg adapter can be a substitute for a Round peg', () => {
  const roundHole = new RoundHole(5)
  const smallSquarePeg = new SquarePeg(5)
  const largeSquarePeg = new SquarePeg(8)

  const smallSquarePegAdapter = makeSquarePegAdapter(smallSquarePeg)
  const largeSquarePegAdapter = makeSquarePegAdapter(largeSquarePeg)

  expect( roundHole.fits(smallSquarePegAdapter) ).toEqual(true)
  expect( roundHole.fits(largeSquarePegAdapter) ).toEqual(false)
})