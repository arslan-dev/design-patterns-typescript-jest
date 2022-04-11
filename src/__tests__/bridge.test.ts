import { TV, RemoteControl, Radio, AdvancedRemoteControl } from "../design-patterns/bridge"

let tv: TV
let remote: RemoteControl

let radio: Radio
let advancedRemote: AdvancedRemoteControl

// TV Channel Names:
//   0: "Channel 1"
//   1: "Channel 2"

// Radio Channel Names:
//   0: "Radio wave 1"
//   1: "Radio wave 2"

describe("Case of an ordinary Remote when the TV is on", () => {

  beforeEach(() => {
    tv = new TV()
    remote = new RemoteControl(tv)

    // turn on the device
    remote.togglePower()
  })

  test("Remote control must be able to turn the TV on and off", () => {
    expect( tv.screenIsOn() ).toEqual(true)

    // turn off the device
    remote.togglePower()
    expect( tv.screenIsOn() ).toEqual(false)
  })

  test("Remote control must be able to turn the volume up", () => {
    const tvLoudnessA = tv.getLoudnessLevel()
    remote.volumeUp()
    const tvLoudnessB = tv.getLoudnessLevel()
    expect( tvLoudnessB ).toBeGreaterThan( tvLoudnessA )
  })

  test("Remote control must be able to turn the volume down", () => {
    const tvLoudnessA = tv.getLoudnessLevel()
    remote.volumeDown()
    const tvLoudnessB = tv.getLoudnessLevel()
    expect( tvLoudnessB ).toBeLessThan( tvLoudnessA )
  })

  test("Remote control must be able to change the channel", () => {
    const currentChannelNameA = tv.getCurrentChannelName()
    expect( currentChannelNameA ).toEqual( "Channel 1" )

    remote.channelUp()
    const currentChannelNameB = tv.getCurrentChannelName()
    expect( currentChannelNameB ).toEqual( "Channel 2" )

    remote.channelDown()
    const currentChannelNameC = tv.getCurrentChannelName()
    expect( currentChannelNameC ).toEqual( "Channel 1" )
  })
})

describe("Case of an ordinary Remote when the TV is off", () => {

  beforeEach(() => {
    tv = new TV()
    remote = new RemoteControl(tv)
  })

  test("If TV is not on—Remote control cannot turn the volume up", () => {
    const tvLoudnessA = tv.getLoudnessLevel()
    expect( tvLoudnessA ).toEqual( 0 )
    remote.volumeUp()
    const tvLoudnessB = tv.getLoudnessLevel()
    expect( tvLoudnessB ).toEqual( 0 )
  })

  test("If TV is not on—the Remote control cannot turn the volume down", () => {
    const tvLoudnessA = tv.getLoudnessLevel()
    expect( tvLoudnessA ).toEqual( 0 )
    remote.volumeDown()
    const tvLoudnessB = tv.getLoudnessLevel()
    expect( tvLoudnessB ).toEqual( 0 )
  })

  test("The remote should not change channels when the TV is turned off", () => {
    const currentChannelNameA = tv.getCurrentChannelName()
    expect( currentChannelNameA ).toBeNull()

    remote.channelUp()
    const currentChannelNameB = tv.getCurrentChannelName()
    expect( currentChannelNameB ).toBeNull()

    remote.channelDown()
    const currentChannelNameC = tv.getCurrentChannelName()
    expect( currentChannelNameC ).toBeNull()
  })
})


describe("Case of an Advanced Remote when the Radio is on", () => {

  beforeEach(() => {
    radio = new Radio()
    advancedRemote = new AdvancedRemoteControl(radio)

    // turn on the device
    advancedRemote.togglePower()
  })

  test("Remote control must be able to turn the Radio on and off", () => {
    expect( radio.isMakingNoise() ).toEqual(true)

    // turn off the device
    advancedRemote.togglePower()
    expect( radio.isMakingNoise() ).toEqual(false)
  })

  test("Remote control must be able to turn Radio's volume up", () => {
    const radioNoisinessA = radio.getNoisinessLevel()
    advancedRemote.volumeUp()
    const radioNoisinessB = radio.getNoisinessLevel()
    expect( radioNoisinessB ).toBeGreaterThan( radioNoisinessA )
  })

  test("Remote control must be able to turn Radio's volume down", () => {
    const radioNoisinessA = radio.getNoisinessLevel()
    advancedRemote.volumeDown()
    const radioNoisinessB = radio.getNoisinessLevel()
    expect( radioNoisinessB ).toBeLessThan( radioNoisinessA )
  })

  test("Remote control must be able to change Radio's channel", () => {
    const currentRadioWaveNameA = radio.getRadioWaveName()
    expect( currentRadioWaveNameA ).toEqual( "Radio wave 1" )

    advancedRemote.channelUp()
    const currentRadioWaveNameB = radio.getRadioWaveName()
    expect( currentRadioWaveNameB ).toEqual( "Radio wave 2" )

    advancedRemote.channelDown()
    const currentRadioWaveNameC = radio.getRadioWaveName()
    expect( currentRadioWaveNameC ).toEqual( "Radio wave 1" )
  })

  test("Remote should be able to mute the volume of a Radio; when pressed again—should recover the previous value", () => {
    advancedRemote.volumeUp()
    const radioNoisinessA = radio.getNoisinessLevel()

    advancedRemote.mute()
    const radioNoisinessB = radio.getNoisinessLevel()

    expect( radioNoisinessB ).toBeLessThan( radioNoisinessA )
    expect( radioNoisinessB ).toEqual( 0 )

    advancedRemote.mute()
    const radioNoisinessC = radio.getNoisinessLevel()
    expect( radioNoisinessC ).toEqual( radioNoisinessA)
    expect( radioNoisinessC ).not.toEqual( 0 )
  })
})


describe("Case of an Advanced Remote when the Radio is off", () => {

  beforeEach(() => {
    radio = new Radio()
    advancedRemote = new AdvancedRemoteControl(radio)
  })

  test("Remote control cannot turn Radio's volume up", () => {
    const radioNoisinessA = radio.getNoisinessLevel()
    expect( radioNoisinessA ).toEqual( 0 )
    advancedRemote.volumeUp()
    const radioNoisinessB = radio.getNoisinessLevel()
    expect( radioNoisinessB ).toEqual( 0 )
  })

  test("Remote control cannot turn Radio's volume down", () => {
    const radioNoisinessA = radio.getNoisinessLevel()
    expect( radioNoisinessA ).toEqual( 0 )
    advancedRemote.volumeDown()
    const radioNoisinessB = radio.getNoisinessLevel()
    expect( radioNoisinessB ).toEqual( 0 )
  })

  test("Remote control cannot change Radio's channels", () => {
    const currentRadioWaveNameA = radio.getRadioWaveName()
    expect( currentRadioWaveNameA ).toBeNull()

    advancedRemote.channelUp()
    const currentRadioWaveNameB = radio.getRadioWaveName()
    expect( currentRadioWaveNameB ).toBeNull()

    advancedRemote.channelDown()
    const currentRadioWaveNameC = radio.getRadioWaveName()
    expect( currentRadioWaveNameC ).toBeNull()
  })
})