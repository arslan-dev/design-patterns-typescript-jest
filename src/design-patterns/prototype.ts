// abstract class Shape<Type> {
//   // abstract clone(): Shape
//   static abstract constructFromPrototype(prototype: Type): Type
// }

// class BaseShape extends Shape {
//   x: number
//   y: number
//   color: string

//   protected override copyFieldsInto(clonedShape: BaseShape): BaseShape {
//     clonedShape.x = this.x;
//     clonedShape.y = this.y;
//     clonedShape.color = this.color;
//     return clonedShape;
//   }

//   override clone(): BaseShape {
//     let clonedShape = new BaseShape;
//     clonedShape = this.copyFieldsInto(clonedShape);
//     return clonedShape;
//   }
// }
interface ICloneable {
  clone(): ICloneable
}

class Shape implements ICloneable {
  protected _x?: number
  protected _y?: number
  get x(): number | undefined { return this._x }
  get y(): number | undefined { return this._y }

  static constructTrivially(x: number, y: number): Shape {
    const shape = new Shape
    shape._x = x
    shape._y = y
    return shape
  }

  static constructFromPrototype(prototype: Shape): Shape {
    const shape = new Shape
    shape._x = prototype.x
    shape._y = prototype.y
    return shape
  }

  clone(): Shape {
    return Shape.constructFromPrototype(this)    
  }
}


export class Rectangle extends Shape {
  protected _width?: number
  protected _height?: number

  get width(): number | undefined { return this._width }
  get height(): number | undefined { return this._height }

  static constructTrivially(x: number, y: number, width: number, height: number): Rectangle {
    const rectangle = super.constructTrivially(x, y)
    const rectangle = new Rectangle
    rectangle._width = width
    rectangle._height = height
    return rectangle
  }

  static constructFromPrototype(prototype: Rectangle): Rectangle {
    const rectangle = new Rectangle
    rectangle._width = prototype.width
    rectangle._height = prototype.height
    return rectangle
  }

  clone(): Rectangle {
    return Rectangle.constructFromPrototype(this)    
  }
}

// class Circle extends Shape {
//   radius: number

//   // constructor(source: Circle) {
//   //   super(source);
//   //   this.radius = source.radius;
//   // }

//   override clone(): Shape {
//     return new Circle(this)
//   }
// }
