import {SpecModel} from './spec.model';
import {VideoModel} from './video.model';

export class RoomModel {
  _id: string;
  specs: SpecModel[];
  currentVideoId: string;
  currentVideoTime: number;
  videoList: VideoModel[];

  constructor(specs: SpecModel[], currentVideoId: string, videoList: VideoModel[], currentVideoTime?: number) {
    // this._id = id;
    this.specs = specs;
    this.currentVideoId = currentVideoId;
    this.currentVideoTime = currentVideoTime || 0;
    this.videoList = videoList || [];
  }
}
