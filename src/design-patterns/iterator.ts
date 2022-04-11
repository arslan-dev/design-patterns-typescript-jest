// iterator.ts
// Iterator Design Patter implementation example

class Profile {
  getEmail(): string {
    return 'test@profile.mail'
  }
}

type ProfileIteratorCache = ProfileIterator[]

interface SocialNetwork {
  createFriendsIterator(profileId: string): ProfileIterator
  createCoworkersIterator(profileId: string): ProfileIterator
}

class Facebook implements SocialNetwork {

  socialGraphRequest(profileId: string, type: string): ProfileIteratorCache {
    console.log(`Requesting graph request for profileId ${profileId}/${type}`)
    return [new FacebookIterator()]
  }

  createFriendsIterator(profileId: string): ProfileIterator {
    return new FacebookIterator(this, profileId, 'friends')
  }

  createCoworkersIterator(profileId: string): ProfileIterator {
    return new FacebookIterator(this, profileId, 'coworkers')
  }
}

interface ProfileIterator {
  getNext(): ProfileIterator
  hasMore(): boolean
}

class FacebookIterator implements ProfileIterator {
  private _facebook: Facebook
  private _profileId: string
  private _type: string

  private _currentPosition: number
  private _cache: ProfileIteratorCache

  constructor(facebook: Facebook, profileId: string, type: string) {
    this._facebook = facebook
    this._profileId = profileId
    this._type = type

    this._currentPosition = 0
    this._cache = []
  }

  lazyInit() {
    if (!this._cache) {
      this._cache = this._facebook.socialGraphRequest(this._profileId, this._type)
    }
  }

  getNext(): ProfileIterator {
    if (this.hasMore()) {
      this._currentPosition += 1
      return this._cache[this._currentPosition]
    }
  }

  hasMore(): boolean {
    this.lazyInit()
    return this._currentPosition < this._cache.length
  }
}

// CLIENTS

class SocialSpammer {
  send(iterator: ProfileIterator, message: string) {
    while (iterator.hasMore()) {
      const profile = iterator.getNext()
      console.log(`Send email to ${profile.getEmail()}: "${message}"`)
    }
  }
}

class Application {
  network: SocialNetwork
  spammer: SocialSpammer

  constructor() {

  }
}