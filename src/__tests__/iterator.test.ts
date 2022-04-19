/// iterator.test.ts
/// Tests for the Iterator DP implementation

import { Facebook } from "../design-patterns/iterator-dp/facebook"
import { EFriendType, IProfile, ISocialNetwork } from "../design-patterns/iterator-dp/iterator"
import IteratorFabric from "../design-patterns/iterator-dp/iterator-fabric"
// import Logger from "../Logger"

let facebook: ISocialNetwork

beforeEach(() => {
  facebook = new Facebook
})

it("should be possible to create and find Facebook Profile", () => {
  const profile1 = facebook.createProfile("Profile1", "profile@mail.test")

  const actualProfile1 = facebook.findProfile(profile1.id)
  expect(actualProfile1).toBe(profile1)
})

describe("tests friends", () => {

  let profile1: IProfile
  let friend1: IProfile
  let friend2: IProfile
  let coworker1: IProfile
  let coworker2: IProfile

  beforeEach(() => {
    facebook = new Facebook

    profile1 = facebook.createProfile("Profile1", "profile@mail.test")
    friend1 = facebook.createProfile("Friend1", "friend1@mail.test")
    friend2 = facebook.createProfile("Friend2", "friend2@mail.test")
    coworker1 = facebook.createProfile("Coworker1", "coworker1@mail.test")
    coworker2 = facebook.createProfile("Coworker2", "coworker2@mail.test")

    profile1.addFriend(friend1, EFriendType.Friend)
    profile1.addFriend(friend2, EFriendType.Friend)
    profile1.addFriend(coworker1, EFriendType.Coworker)

    friend1.addFriend(friend2, EFriendType.Friend)
    friend1.addFriend(coworker1, EFriendType.Coworker)
    friend1.addFriend(coworker2, EFriendType.Coworker)
  })

  it("should be possible to add friends and coworkers to a Profile, and find them in Profile", () => {
    const friends = profile1.friendsOfType(EFriendType.Friend)
    const coworkers = profile1.friendsOfType(EFriendType.Coworker)

    expect(friends.length).toEqual(2)
    expect(coworkers.length).toEqual(1)

    expect(coworkers[0].profile.id).toEqual("Coworker1")
  })

  it("should be possible to add friends and coworkers to a Profile, and find them in Facebook", () => {
    const profile1Friends = facebook.socialGraphRequest("Profile1", EFriendType.Friend)
    const profile1Coworkers = facebook.socialGraphRequest("Profile1", EFriendType.Coworker)

    const friend1Friends = facebook.socialGraphRequest("Friend1", EFriendType.Friend)
    const friend1Coworkers = facebook.socialGraphRequest("Friend1", EFriendType.Coworker)

    expect(profile1Friends.length).toEqual(2)
    expect(profile1Coworkers.length).toEqual(1)

    expect(profile1Coworkers[0].profile.id).toEqual("Coworker1")

    expect(friend1Friends.length).toEqual(1)
    expect(friend1Coworkers.length).toEqual(2)

    expect(friend1Friends[0].profile.id).toEqual("Friend2")
  })

  test("iterator", () => {
    const iteratorFabric = new IteratorFabric(facebook)

    const profile1FriendsIterator = iteratorFabric.createFriendsIterator("Profile1")
    const profile1CoworkersIterator = iteratorFabric.createCoworkersIterator("Profile1")

    const friend1FriendsIterator = iteratorFabric.createFriendsIterator("Friend1")
    const friend1CoworkersIterator = iteratorFabric.createCoworkersIterator("Friend1")

    let tmpProfile: IProfile

    // Profile1 Friends
    expect(profile1FriendsIterator.hasMore()).toEqual(true)
    tmpProfile = profile1FriendsIterator.getNext()
    expect(tmpProfile.id).toEqual("Friend1")

    expect(profile1FriendsIterator.hasMore()).toEqual(true)
    tmpProfile = profile1FriendsIterator.getNext()
    expect(tmpProfile.id).toMatch("Friend2")

    expect(profile1FriendsIterator.hasMore()).toEqual(false)

    // Profile1 Coworkers
    expect(profile1CoworkersIterator.hasMore()).toEqual(true)
    tmpProfile = profile1CoworkersIterator.getNext()
    expect(tmpProfile.id).toEqual("Coworker1")

    expect(profile1CoworkersIterator.hasMore()).toEqual(false)

    // Friend1 Friends
    expect(friend1FriendsIterator.hasMore()).toEqual(true)
    tmpProfile = friend1FriendsIterator.getNext()
    expect(tmpProfile.id).toEqual("Friend2")

    expect(friend1FriendsIterator.hasMore()).toEqual(false)

    // Friend1 Coworkers
    expect(friend1CoworkersIterator.hasMore()).toEqual(true)
    tmpProfile = friend1CoworkersIterator.getNext()
    expect(tmpProfile.id).toEqual("Coworker1")

    expect(friend1CoworkersIterator.hasMore()).toEqual(true)
    tmpProfile = friend1CoworkersIterator.getNext()
    expect(tmpProfile.id).toEqual("Coworker2")

    expect(profile1CoworkersIterator.hasMore()).toEqual(false)
  })
})