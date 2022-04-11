abstract class Shape {

  constructor() {}

  // constructor(source: Shape) {
  //   this.x = source.x;
  //   this.y = source.y;
  //   this.color = source.color;
  // }

  protected abstract copyFieldsInto(clonedShape: Shape): Shape

  abstract clone(): Shape
}

class BaseShape extends Shape {
  x: number
  y: number
  color: string

  protected override copyFieldsInto(clonedShape: BaseShape): BaseShape {
    clonedShape.x = this.x;
    clonedShape.y = this.y;
    clonedShape.color = this.color;
    return clonedShape;
  }

  override clone(): BaseShape {
    let clonedShape = new BaseShape;
    clonedShape = this.copyFieldsInto(clonedShape);
    return clonedShape;
  }
}

class Rectangle extends BaseShape {
  width: number
  height: number

  // constructor(source: Rectangle) {
  //   super(source);
  //   this.width = source.width;
  //   this.height = source.height;
  // }

  protected override copyFieldsInto(clonedShape: Rectangle): Rectangle {
    clonedShape = super.copyFieldsInto(clonedShape);
    clonedShape.width = this.width;
    clonedShape.height = this.height;
  }
}

class Circle extends Shape {
  radius: number

  // constructor(source: Circle) {
  //   super(source);
  //   this.radius = source.radius;
  // }

  override clone(): Shape {
    return new Circle(this)
  }
}

const shapes: Array<Shape> = [];

const circle = Object.create(Circle.prototype);
circle.x = 10
circle.y = 10
circle.radius = 20
shapes.push(circle);

const anotherCircle = circle.clone();
shapes.push(anotherCircle);

const rectangle = Object.create(Rectangle.prototype);
rectangle.width = 10
rectangle.height = 20
shapes.push(rectangle);

console.log(shapes);

// COPY

const shapesCopy: Shape[] = [];

shapes.forEach(shape => {
  const clone = shape.clone();
  shapesCopy.push( clone )
});

console.log(shapesCopy);