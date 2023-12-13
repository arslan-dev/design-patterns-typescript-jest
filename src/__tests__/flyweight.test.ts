/// flyweight.test.ts
/// Tests for the Flyweight DP

import Logger from "../Logger"
import { Tree, TreeType, Forest, TreeFactory } from "../design-patterns/flyweight"

beforeEach(() => {
  Logger.clear()
})

it("should be able to draw a Tree", () => {
  const treeType = new TreeType("TreeType1", "Green", "TreeType1.png")
  const tree = new Tree(1, 2, treeType)
  tree.draw("Canvas1")
  expect(Logger.lastEntry).toEqual("Draw on a Canvas1 at the coordinates (1,2), name: TreeType1, color: Green, texture: TreeType1.png;")
})

it("should be able to draw a Forest", () => {
  const forest = new Forest
  forest.plantTree(10, 10, "tree1", "red", "tree1.png")
  forest.plantTree(10, 20, "tree1", "red", "tree1.png")
  forest.plantTree(20, 20, "tree2", "brown", "tree2.png")

  forest.draw("Canvas1")

  const records = Logger.records
  expect(records[0]).toEqual("Draw on a Canvas1 at the coordinates (10,10), name: tree1, color: red, texture: tree1.png;")
  expect(records[1]).toEqual("Draw on a Canvas1 at the coordinates (10,20), name: tree1, color: red, texture: tree1.png;")
  expect(records[2]).toEqual("Draw on a Canvas1 at the coordinates (20,20), name: tree2, color: brown, texture: tree2.png;")

  expect(TreeFactory.treeTypes.length).toEqual(2)
})