export class VideoModel {
  title: string;
  thumbnail: string;
  id: string;

  constructor(title: string, thumbnail: string, id: string) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.id = id;
  }
}
