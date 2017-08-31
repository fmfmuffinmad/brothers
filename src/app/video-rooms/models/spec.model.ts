export class SpecModel {
  _id: string;
  isReady: boolean;
  videoStatus: number;
  name: string;
  photo: string;

  constructor(isReady: boolean, videoStatus: number, id?: string, name?: string, photo?: string) {
    this._id = id;
    this.isReady = isReady;
    this.videoStatus = videoStatus;
    this.name = name || '';
    this.photo = photo || '';
  }
}
