/// facebook-iterator.ts

import { IProfileIterator, EFriendType, ISocialNetwork, TFriendList, IProfile } from "./iterator"

export default class FacebookIterator implements IProfileIterator {
  private _socialNetwork: ISocialNetwork
  private _profileId: string
  private _type: EFriendType

  private _currentPosition: number
  private _friendListCache: TFriendList

  constructor(facebook: ISocialNetwork, profileId: string, type: EFriendType) {
    this._socialNetwork = facebook
    this._profileId = profileId
    this._type = type

    this._currentPosition = -1
    this._friendListCache = []
  }

  lazyInit() {
    if (!this._friendListCache.length) {
      this._friendListCache = this._socialNetwork.socialGraphRequest(this._profileId, this._type)
    }
  }

  getNext(): IProfile | undefined {
    if (this.hasMore()) {
      this._currentPosition += 1
      return this._friendListCache[this._currentPosition].profile
    }
  }

  hasMore(): boolean {
    this.lazyInit()
    return this._currentPosition < this._friendListCache.length-1
  }
}