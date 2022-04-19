// iterator.ts
// Iterator Design Patter implementation example

export enum EFriendType {
  Friend,
  Coworker
}

export type TFriend = {
  profile: IProfile
  type: EFriendType
}

export type TFriendList = TFriend[]

export interface IProfile {
  get id(): string
  get email(): string
  get friends(): TFriendList

  friendsOfType(friendType: EFriendType): TFriendList
  addFriend(profile: IProfile, friendType: EFriendType): void
}

export type TProfileList = IProfile[]

export interface ISocialNetwork {
  get profiles(): TProfileList
  createProfile(id: string, email: string): IProfile
  findProfile(profileId: string): IProfile | undefined
  socialGraphRequest(profileId: string, type: EFriendType): TFriendList
}

export interface IProfileIterator {
  getNext(): IProfile | undefined
  hasMore(): boolean
}

// CLIENTS

export class SocialSpammer {
  send(iterator: IProfileIterator, message: string) {
    while (iterator.hasMore()) {
      const profile = iterator.getNext()
      if (profile) {
        console.log(`Send email to ${profile.email}: "${message}"`)
      }
    }
  }
}

// class Application {
//   network: SocialNetwork
//   spammer: SocialSpammer

//   constructor() {

//   }
// }