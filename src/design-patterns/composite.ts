namespace Composite {

  interface Graphic {
    move(x: number, y: number): void
    draw(): void
  }

  class Dot implements Graphic {
    x: number
    y: number

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    move(x: number, y: number): void {
      this.x += x;
      this.y += y;
    }

    draw(): void {
      console.log(`Drawing a Dot at (${this.x},${this.y})`)
    }
  }

  class Circle extends Dot {
    radius: number

    constructor(x: number, y: number, radius: number) {
      super(x, y);
      this.radius = radius
    }

    draw(): void {
      console.log(`Drawing a Circle with radius ${this.radius} at (${this.x},${this.y})`)
    }
  }

  class CompoundGraphic implements Graphic {
    children: Graphic[] = [];

    add(child: Graphic) {
      this.children.push(child)
    }

    remove(child: Graphic) {
      this.children = this.children.filter(val => val !== child)
    }

    move(x: number, y: number): void {
      this.children.forEach(child => child.move(x, y))
    }

    draw(): void {
      console.log('Drawing a component');
      this.children.forEach(child => child.draw());
      console.log('EOF a component');
    }
  }

  const all = new CompoundGraphic;
  all.add(new Dot(1, 2));
  all.add(new Circle(5, 3, 10));

  const components: Graphic[] = [
    new Circle(2, 3, 8),
    new Circle(5, 3, 10),
    new Circle(6, 3, 12),
  ];

  const group = new CompoundGraphic();
  components.forEach(component => group.add(component));
  group.move(100, 100);
  all.add(group);
  all.draw();
}