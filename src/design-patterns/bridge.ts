
// ABSTRACTION

export class RemoteControl {
  protected _device: Device

  constructor(device: Device) {
    this._device = device
  }

  togglePower() {
    if (this._device.isEnabled()) {
      this._device.disable()
    } else {
      this._device.enable()
    }
  }

  volumeDown() {
    this._device.setVolume(this._device.getVolume() - 10)
  }

  volumeUp() {
    this._device.setVolume(this._device.getVolume() + 10)
  }

  channelDown() {
    this._device.setChannel(this._device.getChannel() - 1)
  }

  channelUp() {
    this._device.setChannel(this._device.getChannel() + 1)
  }
}

export class AdvancedRemoteControl extends RemoteControl {
  protected _isMuted: boolean
  protected _volumeValBeforeMute: number | undefined

  constructor(device: Device) {
    super(device)
    this._isMuted = false
  }

  /**
   * Should save the volume value before mute;
   * should recover the value when the mute button was pressed again
   */
  mute() {
    if (!this._isMuted) {
      this._volumeValBeforeMute = this._device.getVolume()
      this._device.setVolume(0)
      this._isMuted = true
    } else {
      if (this._volumeValBeforeMute) {
        this._device.setVolume(this._volumeValBeforeMute)
      }
      this._isMuted = false
    }
  }
}

// IMPLEMENTATION

interface Device {
  isEnabled(): boolean
  enable(): void
  disable(): void
  getVolume(): number
  setVolume(percent: number): void
  getChannel(): number
  setChannel(channel: number): void
}

export class TV implements Device {
  protected _powerAdapterIsOn: boolean
  protected _volume: number // in percents
  protected _channel: number

  constructor() {
    this._powerAdapterIsOn = false
    this._volume = 25
    this._channel = 0
  }

  // INTERFACE IMPLEMENTATION

  isEnabled(): boolean {
    return this._powerAdapterIsOn
  }

  enable(): void {
    this._powerAdapterIsOn = true
  }

  disable(): void {
    this._powerAdapterIsOn = false
  }

  getVolume(): number {
    return this._volume
  }

  setVolume(percent: number): void {
    this._volume = percent
  }

  getChannel(): number {
    return this._channel
  }

  setChannel(channel: number): void {
    this._channel = channel
  }

  // EOF INTERFACE IMPLEMENTATION

  screenIsOn(): boolean {
    return this._powerAdapterIsOn
  }

  getLoudnessLevel(): number {
    if (this._powerAdapterIsOn) {
      return this._volume
    } else {
      return 0
    }
  }

  getCurrentChannelName(): string | null {
    if (this._powerAdapterIsOn) {
      return `Channel ${this._channel+1}`
    } else {
      return null
    }
  }
}

export class Radio implements Device {
  protected _powerAdapterIsOn: boolean
  protected _volume: number // in percents
  protected _channel: number

  constructor() {
    this._powerAdapterIsOn = false
    this._volume = 25
    this._channel = 0
  }

  // INTERFACE IMPLEMENTATION

  isEnabled(): boolean {
    return this._powerAdapterIsOn
  }

  enable(): void {
    this._powerAdapterIsOn = true
  }

  disable(): void {
    this._powerAdapterIsOn = false
  }

  getVolume(): number {
    return this._volume
  }

  setVolume(percent: number): void {
    this._volume = percent
  }

  getChannel(): number {
    return this._channel
  }

  setChannel(channel: number): void {
    this._channel = channel
  }

  // EOF INTERFACE IMPLEMENTATION

  isMakingNoise(): boolean {
    return this._powerAdapterIsOn
  }

  getNoisinessLevel(): number {
    if (this._powerAdapterIsOn) {
      return this._volume
    } else {
      return 0
    }
  }

  getRadioWaveName(): string | null {
    if (this._powerAdapterIsOn) {
      return `Radio wave ${this._channel+1}`
    } else {
      return null
    }
  }
}
