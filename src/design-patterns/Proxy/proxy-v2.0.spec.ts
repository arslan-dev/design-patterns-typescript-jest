import { Subject } from "./proxy-v2.0"

describe("Proxy DP specs", () => {
  it("should normally handle request without proxy", () => {
    const subject = new Subject()

    const logSpy = jest.spyOn(console, "log")
    subject.request()
    expect(logSpy).toHaveBeenCalledWith("RealSubject: Handling request.")

  })
})