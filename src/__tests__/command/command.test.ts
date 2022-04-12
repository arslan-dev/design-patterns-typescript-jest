// command.test.ts
// Tests for the Command Design Pattern

import { Command, CopyCommand, CutCommand, PasteCommand, UndoCommand } from "../../design-patterns/command-dp/command/command"
import { Application } from "../../design-patterns/command-dp/application/application"


// TEST STARTS

// let application: Application
// let copyButton: Button
// let cutButton: Button
// let pasteButton: Button
// let undoButton: Button
// let shortcuts: Shortcuts

// beforeEach(() => {

//   copyButton = new Button
//   cutButton = new Button
//   pasteButton = new Button
//   undoButton = new Button
//   shortcuts = new Shortcuts
// })

test("Test copy command", () => {
  // const copyCommand = new CopyCommand()
  // copyButton.setCommand

  // director.constructSportsCar(carBuilder)
  // const sportsCar = carBuilder.getProduct()
  // expect( sportsCar.getNumberOfSeats() ).toEqual( 2 )
  // expect( sportsCar.getInstalledEngineType() ).toEqual( EEngineType.RearMidEngine )
  // expect( sportsCar.hasTripComputer() ).toEqual( true )
  // expect( sportsCar.hasGPS() ).toEqual( true )

  // director.constructSportsCar(carManualBuilder)
  // const sportsCarManual = carManualBuilder.getProduct()
  // expect( sportsCarManual.getSeatInformation() ).toEqual("Installed seats: 2")
  // expect( sportsCarManual.getEngineInformation() ).toEqual("Installed engine: Rear Mid Engine")
  // expect( sportsCarManual.getTripComputerManual() ).toEqual("Trip Computer manual")
  // expect( sportsCarManual.getGPSManual() ).toEqual("GPS manual")
})

  // createUI() {
  //   const copyCommand = new CopyCommand(this, this.activeEditor)
  //   const copy = () => this.executeCommand(copyCommand)

  //   const cutCommand = new CutCommand(this, this.activeEditor)
  //   const cut = () => this.executeCommand(cutCommand)

  //   const pasteCommand = new PasteCommand(this, this.activeEditor)
  //   const paste = () => this.executeCommand(pasteCommand)

  //   const undoCommand = new UndoCommand(this, this.activeEditor)
  //   const undo = () => this.executeCommand(undoCommand)

  //   // EXECUTION

  //   copy()
  //   console.log('')
  //   cut()
  //   console.log('')
  //   paste()
  //   console.log('')
  //   undo()
  // }

  // executeCommand(command: Command) {
  //   if (command.execute()) {
  //     this._history.push(command)
  //   }
  // }