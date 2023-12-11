///
/// proxy-v2.0.ts - Proxy DP implementation
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///

export class Subject {
  request(): void {
    console.log("RealSubject: Handling request.")
  }
}

export class Proxy extends Subject {
  private _subject: Subject
  
  constructor(subject: Subject) {
    super()
    this._subject = subject
  }

  authorizeTheRequest() {
    console.log("Proxy: Authorizing the request...")
    return true
  }

  request(): void {
    if (this.authorizeTheRequest()) {
      console.log("Proxy: Request authorized!")
      this._subject.request()
      console.log("Proxy: Security logging...")
    } 
  }
}