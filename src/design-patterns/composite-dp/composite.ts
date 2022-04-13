export interface IScreen {
  draw(graphicsInstruction: string): void
}

export interface Graphic {
  move(x: number, y: number): void
  draw(screen: IScreen): void
}

export class Dot implements Graphic {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  move(x: number, y: number): void {
    this.x += x
    this.y += y
  }

  draw(screen: IScreen): void {
    screen.draw(`Dot(${this.x},${this.y})`)
  }
}

export class Circle extends Dot {
  radius: number

  constructor(x: number, y: number, radius: number) {
    super(x, y)
    this.radius = radius
  }

  draw(screen: IScreen): void {
    screen.draw(`Circle(${this.x},${this.y},${this.radius})`)
  }
}

export class CompoundGraphic implements Graphic {
  children: Graphic[] = []

  add(child: Graphic) {
    this.children.push(child)
  }

  remove(child: Graphic) {
    this.children = this.children.filter(val => val !== child)
  }

  move(x: number, y: number): void {
    this.children.forEach(child => child.move(x, y))
  }

  draw(screen: IScreen): void {
    this.children.forEach(child => child.draw(screen))
  }
}