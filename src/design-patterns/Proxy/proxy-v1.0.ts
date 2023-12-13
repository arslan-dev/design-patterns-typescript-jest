///
/// proxy-v1.0.ts - Proxy DP implementation
///
/// NOTICE: from 10dec2023:
///   This module is for historical reasons only
///   proxy-v2.0.ts supersedes this file
///
/// AUTHOR: Arslan Dev, arslan.dev@gmail.com
///

import Logger from "../../Logger"

type TVideoInfo = {
  id: number
  name: string
  data: string
}

type TListVideoInfo = TVideoInfo[]

export interface IThirdPartyYouTubeLib {
  get listVideos(): TListVideoInfo
  getVideoInfo(id: number): TVideoInfo | undefined
  downloadVideo(id: number): string | undefined
}

export class ThirdPartyYouTubeClass implements IThirdPartyYouTubeLib {

  protected _listVideos: TListVideoInfo = [
    { id: 1, name: "Video1", data: "Data1" },
    { id: 2, name: "Video2", data: "Data2" },
    { id: 3, name: "Video3", data: "Data3" }
  ]

  get listVideos(): TListVideoInfo {
    return this._listVideos
  }

  getVideoInfo(id: number): TVideoInfo | undefined {
    return this._listVideos.find( (v: TVideoInfo) => v.id === id )
  }

  downloadVideo(id: number): string | undefined {
    const video = this.getVideoInfo(id)
    if (video) {
      return video.data
    }
    return undefined
  }
}

export class CachedYouTubeClass implements IThirdPartyYouTubeLib {
  private _service: IThirdPartyYouTubeLib
  private _listCache?: TListVideoInfo
  private _videoCache?: TVideoInfo
  private _downloadCache?: string
  needReset: boolean

  constructor(service: IThirdPartyYouTubeLib) {
    this._service = service
    this.needReset = false
  }

  get listVideos(): TListVideoInfo {
    if (!this._listCache || this.needReset) {
      Logger.info("List cache")
      this._listCache = this._service.listVideos
    }
    return this._listCache
  }

  getVideoInfo(id: number): TVideoInfo | undefined {
    if (!this._videoCache || this.needReset) {
      Logger.info(`Cache video info id ${id}`)
      this._videoCache = this._service.getVideoInfo(id)
    }
    return this._videoCache
  }

  downloadVideo(id: number): string | undefined {
    if (!this._downloadCache || this.needReset) {
      Logger.info(`Cache video data id ${id}`)
      this._downloadCache = this._service.downloadVideo(id)
    }
    return this._downloadCache
  }
}

export class YouTubeManager {
  protected _service: IThirdPartyYouTubeLib

  constructor(service: IThirdPartyYouTubeLib) {
    this._service = service
  }

  renderVideoPage(id: number) {
    const info = this._service.getVideoInfo(id)
    if (info) {
      Logger.info(`Render video page name ${info.name}`)
    }
  }

  renderListPanel() {
    const list = this._service.listVideos
    Logger.info(`Video list length is ${list.length}`)
  }
}
