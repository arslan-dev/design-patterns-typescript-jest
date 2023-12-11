///
/// adapter-v1.0.ts - Adapter DP implementation
///
/// NOTICE: from 10dec2023:
///   This module is for historical reasons only
///   adapter-v2.0.ts supersedes this file
///
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///

// TODO: try with js proxy

export class RoundPeg {
  private _radius: number
  getRadius() { return this._radius }

  constructor(radius: number) {
    this._radius = radius
  }
}

export class RoundHole {
  private _radius: number
  getRadius() { return this._radius }

  constructor(radius: number) {
    this._radius = radius
  }

  fits(peg: RoundPeg) {
    return this.getRadius() >= peg.getRadius()
  }
}

export class SquarePeg {
  private _width: number
  getWidth() { return this._width }

  constructor(width: number) {
    this._width = width
  }
}

class SquarePegAdapter extends RoundPeg {
  private _peg: SquarePeg | undefined

  init(peg: SquarePeg) {
    this._peg = peg
  }

  getRadius() {
    if (this._peg) {
      return this._peg.getWidth() * Math.sqrt(2) / 2
    } else {
      return Infinity
    }
  }
}

export function makeSquarePegAdapter(peg: SquarePeg): SquarePegAdapter {
  const squarePegAdapter = new SquarePegAdapter(-1)
  squarePegAdapter.init(peg)

  return squarePegAdapter
}
