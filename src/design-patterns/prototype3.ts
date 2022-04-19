/// prototype3.ts

export class Prototype {
  x!: number
  date!: Date
  circularReference!: ComponentWithBackReference

  clone(): Prototype {
    const clone = Object.create(this)
    clone.date = new Date(this.date)
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this }
    }
    return clone
  }
}

export class ComponentWithBackReference {
  prototype!: Prototype
  // get prototype(): Prototype { return this._prototype }

  constructor(prototype: Prototype) {
    this.prototype = prototype
  }
}