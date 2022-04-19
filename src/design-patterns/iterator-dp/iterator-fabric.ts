/// iterator-fabric.ts

import { IProfileIterator, EFriendType, ISocialNetwork } from "./iterator"
import FacebookIterator from "./facebook-iterator"

interface IIteratorFabric {
  createFriendsIterator(profileId: string): IProfileIterator
  createCoworkersIterator(profileId: string): IProfileIterator
}

export default class IteratorFabric implements IIteratorFabric {
  private _facebook: ISocialNetwork

  constructor(facebook: ISocialNetwork) {
    this._facebook = facebook
  }

  createFriendsIterator(profileId: string): IProfileIterator {
    return new FacebookIterator(this._facebook, profileId, EFriendType.Friend)
  }

  createCoworkersIterator(profileId: string): IProfileIterator {
    return new FacebookIterator(this._facebook, profileId, EFriendType.Coworker)
  }
}