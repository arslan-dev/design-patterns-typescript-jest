class TreeType {
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
    console.log(`Draw on a ${canvas} at the coordinates (${x},${y});`)
  }
}

class TreeFactory {
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
    this.treeTypes.forEach(treeType => console.log(treeType))
  }
}

class Tree {
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

class Forest {
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

const forest = new Forest
forest.plantTree(10, 10, 'tree1', 'red', 'tree1.png')
forest.plantTree(10, 20, 'tree1', 'red', 'tree1.png')
forest.plantTree(20, 20, 'tree2', 'brown', 'tree2.png')

for(let i=0; i<5; i++) {
  forest.plantTree(10*i, 30, 'tree1', 'blue', 'tree1.png')
}

for(let i=0; i<5; i++) {
  forest.plantTree(20*i, 40, 'tree2', 'brown', 'tree2.png')
}

forest.draw('canvas01')

TreeFactory.displayAllCreatedTreeTypes()