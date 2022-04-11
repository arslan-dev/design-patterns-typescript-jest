/**
 * proxy.ts - structural design pattern implementation
 */

interface ThirdPartyYouTubeLib {
  listVideos(): void
  getVideoInfo(id: number): void
  downloadVideo(id: number): void
}

class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {

  listVideos(): void {
    console.log('list videos;')
  }

  getVideoInfo(id: number): void {
    console.log(`get video info id ${id};`)
  }

  downloadVideo(id: number): void {
    console.log(`download video id ${id};`)
  }
}

class CachedYouTubeClass implements ThirdPartyYouTubeLib {
  private _service: ThirdPartyYouTubeLib
  private _listCache: any
  private _videoCache: any
  private _downloadCache: any
  _needReset: boolean

  constructor(service: ThirdPartyYouTubeLib) {
    this._service = service
    this._needReset = false
  }

  listVideos(): void {
    if (!this._listCache || this._needReset) {
      console.log('list cache;');
      this._listCache = this._service.listVideos();
    }
    return this._listCache
  }

  getVideoInfo(id: number): void {
    if (!this._videoCache || this._needReset) {
      console.log(`video cache id ${id};`)
      this._videoCache = this._service.getVideoInfo(id)
    }
    return this._videoCache
  }

  downloadVideo(id: number): void {
    if (!this._downloadCache || this._needReset) {
      this._service.downloadVideo(id);
    }
  }
}

class YouTubeManager {
  protected _service: ThirdPartyYouTubeLib

  constructor(service: ThirdPartyYouTubeLib) {
    this._service = service
  }

  renderVideoPage(id: number) {
    const info = this._service.getVideoInfo(id);
    console.log(`render video page id ${id};`);
  }

  renderListPanel() {
    const list = this._service.listVideos();
    console.log('render list videos;')
  }

  reactOnUserInput() {
    this.renderVideoPage(111);
    this.renderListPanel();
  }
}

const aYouTubeService = new ThirdPartyYouTubeClass();
const aYouTubeProxy = new CachedYouTubeClass(aYouTubeService);
const manager = new YouTubeManager(aYouTubeProxy);
manager.reactOnUserInput();