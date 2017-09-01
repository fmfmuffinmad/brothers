import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {VideoService} from '../../shared/video.service';
import {SpecModel} from '../models/spec.model';
import {VideoModel} from '../models/video.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  // component related
  // TODO: Review component variables to see if they are necessary
  roomLink: string;
  roomId: string;
  roomReady = false;
  specReady = false;
  specs: SpecModel[];
  videoList: any[];

  // subscriptions
  sub: Subscription;
  roomSub: Subscription;
  specsSub: Subscription;

  // video related
  SMALL_WIDTH = window.innerWidth * 0.92;
  SMALL_HEIGHT = window.innerWidth * 0.7;
  MEDIUM_WIDTH = 560;
  MEDIUM_HEIGHT = 340;
  LARGE_WIDTH = 640;
  LARGE_HEIGHT = 385;
  id = 'RPCItVuXMkI';
  player;
  ytEvent;
  loading = false;
  width = 450;
  height = 300;
  thumb = `https://img.youtube.com/vi/${this.id}/2.jpg`;

  // DOM related
  copiado = false;

  constructor(private route: ActivatedRoute,
              private videoService: VideoService,
              private router: Router) {
    if (window.innerWidth < 1199) {
      if (window.innerWidth  < 768) {
        console.log('small player');
        this.width = this.SMALL_WIDTH;
        this.height = this.SMALL_HEIGHT;
      } else {
        console.log('medium player');
        this.width = this.MEDIUM_WIDTH;
        this.height = this.MEDIUM_HEIGHT;
      }
    } else {
      console.log('large player');
      this.width = this.LARGE_WIDTH;
      this.height = this.LARGE_HEIGHT;
    }
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    // ...
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    if (this.videoService.currentRoom.specs.length < 2) {
      this.videoService.removeRoom(this.roomId);
    } else {
      this.videoService.currentRoom.specs.splice(this.videoService.currentRoom.specs.indexOf(this.videoService.currentSpec, 1));
      this.videoService.updateRoom(this.videoService.currentRoom._id, this.videoService.currentRoom);
    }
  }

  ngOnInit() {
    const sb = this.videoService.getRoomList()
      .subscribe(
        data => {
          this.sub = this.route.queryParams.subscribe(
            params => {
              if (params['roomId']) {
                sb.unsubscribe();
                const sb2 = this.videoService.getRoom(params['roomId'])
                  .subscribe( data3 => {
                    // console.log(data3);
                    this.videoService.currentRoom = data3;
                    this.videoService.currentRoom._id = data3.$key;
                    this.videoService.addSpecToRoom()
                      .then( d => {
                        this.id = this.videoService.currentRoom.currentVideoId;
                        this.roomReady = true;
                        this.roomId = this.videoService.currentRoom._id;
                        this.roomLink = `${window.location.origin}/video-rooms/room?roomId=${this.videoService.currentRoom._id}`;
                        this.roomSub = this.videoService.getRoom(this.roomId).subscribe(
                          data2 => {
                            this.roomUpdate(data2);
                          },
                          error2 => {
                            this.roomNotFound(error2);
                          }
                        );
                        this.specsSub = this.videoService.getSpecList().subscribe( data4 => {
                          this.specUpdate(data4);
                        },
                          error2 => {
                            this.roomNotFound(error2);
                          });
                      })
                      .catch( error => {
                        this.roomNotFound(error);
                      });
                    sb2.unsubscribe();
                },
                    error2 => {
                      this.roomNotFound(error2);
                    });
              }
            },
            error3 => {
              this.roomNotFound(error3);
            }
          );
        },
        error4 => {
          this.roomNotFound(error4);
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.videoService.currentRoom.specs.length < 2) {
      this.videoService.removeRoom(this.roomId);
    }
  }

  // Room Update Events

  roomNotFound(error: any) {
    alert('Não foi possível encontrar a sala');
    console.log(error);
    this.router.navigate(['video-rooms']);
  }

  roomUpdate(data: any) {
    // console.log(data);
    this.videoList = data.videoList;
    if (this.videoService.currentRoom !== data) {
      this.videoService.currentRoom = data;
    }
    if (!this.loading) {
      if (this.videoService.currentRoom.currentVideoId !== this.id) {
        this.setVideo(this.videoService.currentRoom.currentVideoId);
        this.id = this.videoService.currentRoom.currentVideoId;
      }
    }
  }

  specUpdate(data: any) {
    this.specs = data;
    this.videoService.currentRoom.specs = data;
    // console.log(data);
    if (this.player) {
      if (data.filter(obj => obj.isReady === false).length === 0) {
        this.playVideo();
        // console.log('play');
      } else {
        this.pauseVideo();
        // console.log('pause');
      }
    }
  }

  // End of Room Update Events

  // Room Functions

  addVideo(dom: any) {
    const v = this.videoService.convertYouTubeLink(dom.value);
    if (v) {
      if (!this.videoService.currentRoom.videoList.map(vid => vid.id ).find(vid => vid === v)) {
        this.videoService.addVideoToList(v);
      } else {
        alert('Video já está na lista');
      }
    } else {
      alert('Link inválido');
    }

  }

  changeRoomVideo(id: string) {
    // console.log(id);
    this.videoService.currentRoom.currentVideoId = id;
    this.videoService.updateRoom(this.videoService.currentRoom._id, this.videoService.currentRoom);
    // this.setVideo('ofZIXZI6AH0');
  }

  setSpecReady() {
    this.specReady = !this.specReady;
    const spec = this.videoService.currentSpec;
    spec.isReady = this.specReady;
    this.videoService.updateSpecInRoom(spec);
  }

  setSpecNotReady() {
    this.specReady = false;
    const spec = this.videoService.currentSpec;
    spec.isReady = this.specReady;
    this.videoService.updateSpecInRoom(spec);
  }

  removeFromVideoList(video: VideoModel) {
    this.videoService.currentRoom.videoList.splice(this.videoService.currentRoom.videoList.indexOf(video, 1));
    this.videoService.updateRoom(this.videoService.currentRoom._id, this.videoService.currentRoom);
  }

  currentVideoInOnList () {
    return this.videoService.currentRoom.videoList.map(vid =>  vid.id ).indexOf(this.id);
  }

  moveVideo(direction: string, id: string, video: VideoModel) {
    const vidIndex = this.videoService.currentRoom.videoList.map(vid => vid.id ).indexOf(id);
    switch (direction) {
      case 'up':
        if (vidIndex > 0) {
          this.videoService.currentRoom.videoList.splice(vidIndex, 1);
          this.videoService.currentRoom.videoList.splice(vidIndex - 1, 0, video);
          this.videoService.updateRoom(this.videoService.currentRoom._id, this.videoService.currentRoom);
        }
        break;
      case 'down':
        if (vidIndex < this.videoService.currentRoom.videoList.length) {
          this.videoService.currentRoom.videoList.splice(vidIndex, 1);
          this.videoService.currentRoom.videoList.splice(vidIndex + 1, 0, video);
          this.videoService.updateRoom(this.videoService.currentRoom._id, this.videoService.currentRoom);
        }
        break;
    }
  }

  nextVideo() {
    if (this.currentVideoInOnList() + 1 < this.videoService.currentRoom.videoList.length) {
      this.changeRoomVideo(this.videoService.currentRoom.videoList[this.currentVideoInOnList() + 1].id);
    }
  }

  previousVideo() {
    if (this.currentVideoInOnList() > 0) {
      this.changeRoomVideo(this.videoService.currentRoom.videoList[this.currentVideoInOnList() - 1].id);
    }
  }

  // End of Room Functions

  // Player Functions

  onStateChange(event) {
    this.ytEvent = event.data;
    // video loading
    if (event.data === 3) {
      this.loading = true;
      this.setSpecNotReady();
      // TODO: register current video time
    }
    // video playing
    if (event.data === 1 && this.loading) {
      this.loading = false;
      this.pauseVideo();
      this.specReady = false;
    }
    if (event.data === 1 && this.specs.filter(obj => obj.isReady === false).length > 0) {
      this.pauseVideo();
    }
    // video paused
    if (event.data === 2 && this.specReady) {
      this.setSpecNotReady();
    }
    // video ended
    if (event.data === 0) {
      if (this.currentVideoInOnList() + 1 < this.videoService.currentRoom.videoList.length) {
        this.changeRoomVideo(this.videoService.currentRoom.videoList[this.currentVideoInOnList() + 1].id);
      }
    }
  }

  savePlayer(player) {
    this.player = player;
    this.playVideo();
  }

  playVideo() {
    this.player.playVideo();
    // console.log(this.player.getVideoUrl());
  }

  pauseVideo() {
    this.player.pauseVideo();
    // console.log(this.player.getCurrentTime());
  }

  setVideo(vid: string) {
    this.player.loadVideoById(vid);
  }

  cueVideo() {
    this.videoService.getVideoInfo('lol');
  }

  // End of Player Functions
}
