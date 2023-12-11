///
/// proxy-v1.0.spec.ts - tests for the Proxy DP implementation
///
/// NOTICE: from 10dec2023:
///   This specs are for historical reasons only
///   proxy-v2.0.spec.ts supersedes this file
///
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///


import { ThirdPartyYouTubeClass, IThirdPartyYouTubeLib, CachedYouTubeClass, YouTubeManager } from "./proxy-v1.0"
import Logger from "../../logger"

beforeEach(() => {
  Logger.clear()
})

test("third party YouTube class", () => {
  const aYouTubeService: IThirdPartyYouTubeLib = new ThirdPartyYouTubeClass()

  const listVideo = aYouTubeService.listVideos
  const video1 = aYouTubeService.getVideoInfo(1)
  const videoData1 = aYouTubeService.downloadVideo(1)

  expect(listVideo.length).toEqual(3)
  expect(video1.name).toEqual("Video1")
  expect(videoData1).toEqual("Data1")
})

test("a YouTube proxy", () => {
  const aYouTubeService: IThirdPartyYouTubeLib = new ThirdPartyYouTubeClass()
  const aYouTubeProxy: IThirdPartyYouTubeLib = new CachedYouTubeClass(aYouTubeService)

  let listVideo = aYouTubeProxy.listVideos
  let video1 = aYouTubeProxy.getVideoInfo(1)
  let videoData1 = aYouTubeProxy.downloadVideo(1)

  expect(listVideo.length).toEqual(3)
  expect(video1.name).toEqual("Video1")
  expect(videoData1).toEqual("Data1")

  const iLogger = Logger.getIterator()
  expect(iLogger.next).toEqual("List cache")
  expect(iLogger.next).toEqual("Cache video info id 1")
  expect(iLogger.next).toEqual("Cache video data id 1")
  expect(iLogger.hasMore()).toEqual(false)

  listVideo = aYouTubeProxy.listVideos
  video1 = aYouTubeProxy.getVideoInfo(1)
  videoData1 = aYouTubeProxy.downloadVideo(1)

  expect(listVideo.length).toEqual(3)
  expect(video1.name).toEqual("Video1")
  expect(videoData1).toEqual("Data1")

  expect(iLogger.hasMore()).toEqual(false)
})

test("a YouTube manager", () => {
  const aYouTubeService: IThirdPartyYouTubeLib = new ThirdPartyYouTubeClass()
  const aYouTubeProxy: IThirdPartyYouTubeLib = new CachedYouTubeClass(aYouTubeService)
  const manager = new YouTubeManager(aYouTubeProxy)

  manager.renderVideoPage(1)
  manager.renderListPanel()

  const iLogger = Logger.getIterator()
  expect(iLogger.next).toEqual("Cache video info id 1")
  expect(iLogger.next).toEqual("Render video page name Video1")
  expect(iLogger.next).toEqual("List cache")
  expect(iLogger.next).toEqual("Video list length is 3")
})