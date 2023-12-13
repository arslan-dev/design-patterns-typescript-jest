import Logger from "../Logger"

export class TreeType {
  private _name: string
  private _color: string
  private _texture: string

  get name() { return this._name }
  get color() { return this._color }
  get texture() { return this._texture }

  constructor(name: string, color: string, texture: string) {
    this._name = name
    this._color = color
    this._texture = texture
  }

  draw(canvas: string, x: number, y: number) {
    Logger.info(`Draw on a ${canvas} at the coordinates (${x},${y}), name: ${this._name}, color: ${this._color}, texture: ${this._texture};`)
  }
}

export class TreeFactory {
  static treeTypes: TreeType[] = []

  static getTreeType(name: string, color: string, texture: string): TreeType {
    let treeType = this.treeTypes.find(tt => {
      return tt.name === name &&
        tt.color === color &&
        tt.texture === texture
    })
    if (!treeType) {
      treeType = new TreeType(name, color, texture)
      this.treeTypes.push(treeType)
    }
    return treeType
  }

  static displayAllCreatedTreeTypes() {
    this.treeTypes.forEach(treeType => Logger.info(treeType))
  }
}

export class Tree {
  x: number
  y: number
  treeType: TreeType

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x
    this.y = y
    this.treeType = treeType
  }

  draw(canvas: string) {
    this.treeType.draw(canvas, this.x, this.y)
  }
}

export class Forest {
  trees: Tree[] = []

  plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string)
  {
    const treeType = TreeFactory.getTreeType(name, color, texture)
    const tree = new Tree(x, y, treeType)
    this.trees.push(tree)
  }

  draw(canvas: string) {
    this.trees.forEach(tree => {
      tree.draw(canvas) 
    })
  }
}