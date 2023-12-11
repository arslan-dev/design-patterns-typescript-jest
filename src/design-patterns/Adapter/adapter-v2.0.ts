///
/// adapter-v2.0.ts - Adapter DP implementation
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///

abstract class RoundPegBase {
  abstract get diameter(): number
}

export class RoundPeg extends RoundPegBase {
  private _diameter: number
  get diameter(): number { return this._diameter }

  constructor({ diameter }: { diameter: number }) {
    super()
    this._diameter = diameter
  }
}

export class RoundOpening {
  private _diameter: number
  get diameter(): number { return this._diameter}

  constructor({ diameter }: { diameter: number }) {
    this._diameter = diameter
  }

  canFitIntoItself(peg: RoundPegBase) {
    return this.diameter >= peg.diameter
  }
}

export class SquarePeg {
  private _width: number
  get width(): number { return this._width}

  constructor({ width }: { width: number }) {
    this._width = width
  }
}

export class SquareToRoundAdapter extends RoundPegBase {
  private _squarePeg: SquarePeg

  constructor (squarePeg: SquarePeg) {
    super()
    this._squarePeg = squarePeg
  }

  get diameter(): number {
    return Math.sqrt(2 * Math.pow(this._squarePeg.width, 2))
  }
}