///
/// proxy-v2.0.spec.ts - tests for the Proxy DP implementation
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///

import { Subject, Proxy } from "./proxy-v2.0"

describe("Proxy DP specs", () => {
  it("should normally handle request without proxy", () => {
    const realSubject = new Subject()

    const logSpy = jest.spyOn(console, "log")
    realSubject.request()
    expect(logSpy).toHaveBeenCalledWith("RealSubject: Handling request.")
  })

  it("should add before and after actions with the proxy", () => {
    const realSubject = new Subject()
    const proxy = new Proxy(realSubject)

    const logSpy = jest.spyOn(console, "log")
    proxy.request()
    expect(logSpy).toHaveBeenCalledWith("Proxy: Authorizing the request...")
    expect(logSpy).toHaveBeenCalledWith("Proxy: Request authorized!")
    expect(logSpy).toHaveBeenCalledWith("RealSubject: Handling request.")
    expect(logSpy).toHaveBeenCalledWith("Proxy: Security logging...")
  })
})