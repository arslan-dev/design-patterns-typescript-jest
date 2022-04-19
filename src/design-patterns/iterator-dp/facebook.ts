/// facebook.ts
/// Facebook ISocialNetwork implementation

import { ISocialNetwork, IProfile, TFriendList, EFriendType, TFriend, TProfileList } from "./iterator"

class Profile implements IProfile {
  protected _id: string
  protected _email: string
  protected _friends: TFriendList

  get id(): string { return this._id }
  get email(): string { return this._email }
  get friends(): TFriendList { return this._friends }

  constructor(id: string, email: string) {
    this._id = id
    this._email = email
    this._friends = []
  }

  friendsOfType(friendType: EFriendType): TFriendList {
    return this._friends.filter((f: TFriend) => f.type === friendType)
  }

  addFriend(profile: Profile, friendType: EFriendType): void {
    this._friends.push({
      profile: profile,
      type: friendType
    })
  }
}

export class Facebook implements ISocialNetwork {

  private _profiles: TProfileList
  get profiles(): TProfileList { return this._profiles }

  constructor() {
    this._profiles = []
  }

  createProfile(id: string, email: string): IProfile {
    const profile = new Profile(id, email) 
    this._profiles.push(profile)
    return profile
  }

  findProfile(profileId: string): IProfile | undefined {
    return this._profiles.find((p: IProfile) => p.id === profileId) 
  }

  socialGraphRequest(profileId: string, type: EFriendType): TFriendList {
    const profile = this.findProfile(profileId)
    if (profile) {
      return profile.friendsOfType(type)
    } else {
      return []
    }
  }

}