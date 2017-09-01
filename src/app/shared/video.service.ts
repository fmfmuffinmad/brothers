import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Uss} from './uss';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {RoomModel} from '../video-rooms/models/room.model';
import {SpecModel} from '../video-rooms/models/spec.model';
import {AuthService} from './auth.service';
import {VideoModel} from '../video-rooms/models/video.model';

class Room {
}

@Injectable()
export class VideoService {
  uss = new Uss();
  user: any;
  ytVideoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  ytTimeRegex = /(?:\&t\=(.+))/i;
  currentRoom: RoomModel;
  currentSpec: SpecModel;

  // observables
  rooms: FirebaseListObservable<any[]>;
  room: FirebaseObjectObservable<any>;
  _specs: FirebaseListObservable<any[]>;
  _spec: FirebaseObjectObservable<any>;
  _vLists: FirebaseListObservable<any[]>;
  _vList: FirebaseObjectObservable<any>;

  constructor(private http: Http,
              private db: AngularFireDatabase,
              private authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  convertYouTubeLink(link: string): string {
    const id = link.match(this.ytVideoIdRegex);
    if (id) {
      if (id.length === 2) {
        return id[1];
      }
    }
    return '';
  }

  getVideoInfo(id: string) {
    return this.http
      .get(` https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${this.uss.ytAPIKey}&part=snippet`)
      .map( response => response.json());
  }

  addVideoToList(id: string) {
    // TODO: fix map error when other users join the room
    const sb = this.getVideoInfo(id)
      .subscribe(
        data => {
          sb.unsubscribe();
          const video = new VideoModel(
            data.items[0].snippet.localized.title,
            `https://img.youtube.com/vi/${data.items[0].id}/2.jpg`,
            data.items[0].id);
          this.currentRoom.videoList.push(video);
          this.updateRoom(this.currentRoom._id, this.currentRoom);
        },
        error2 => {
          return null;
        }
      );
  }

  getRoomList(): FirebaseListObservable<any[]> {
    this.rooms = this.db.list(`/rooms`);
    return this.rooms;
  }

  getRoom(uid: string): FirebaseObjectObservable<any> {
    this.room = this.db.object(`/rooms/${uid}`);
    return this.room;
  }

  getSpecList(): FirebaseListObservable<any[]> {
    this._specs = this.db.list(`/rooms/${this.currentRoom._id}/specs`);
    return this._specs;
  }

  // getSpec(uid: string): FirebaseObjectObservable<any> {
  //   this.room = this.db.object(`/rooms/${uid}`);
  //   return this.room;
  // }

  addSpecToRoom() {
    const spec = this.createSpec();
    this.currentSpec = spec;
    if (this.currentRoom.specs) {
      this.currentRoom.specs.push(spec);
    } else {
      this.currentRoom.specs = [spec];
    }
    return this.room.update(this.currentRoom);
  }

  updateSpecInRoom(spec: SpecModel) {
    this.currentRoom.specs[this.currentRoom.specs.map(spc => {
      return spc._id;
    }).indexOf(this.currentSpec._id)] = spec;
    return this.room.update(this.currentRoom);
    // console.log(this.currentRoom.specs.map(spc => {
    //   return spc._id;
    // }).indexOf(this.currentSpec._id));
  }

  createSpec(): SpecModel {
    if (this.user) {
      const spec = new SpecModel(
        false,
        -1,
        new Date().getUTCMilliseconds().toString(),
        this.user.displayName,
        this.user.photoURL);
      return spec;
    }

    const spec = new SpecModel(false, -1, new Date().getUTCMilliseconds().toString());
    return spec;
  }

  createRoom(id: string): Promise<any> {
    const sb = this.getVideoInfo(id);
    const room = new RoomModel([], id, []);
    return this.rooms.push(room)
      .then(result => {
        this.currentRoom = room;
        // console.log(result);
        this.currentRoom._id = result.key;
        // this.currentSpec = spec;
        this.addVideoToList(id);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  leaveRoom() {
    this.currentRoom = null;
    this.currentSpec = null;
  }

  setRoom(uid: string, room: object) {
    this.db.object(`/rooms/${uid}`).set(room);
  }

  updateRoom(uid: string, room: object) {
    this.db.object(`/rooms/${uid}`).update(room);
  }

  removeRoom(uid: string) {
    this.db.object(`/rooms/${uid}`).remove();
  }
}
