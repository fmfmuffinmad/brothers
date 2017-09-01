import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {VideoService} from '../../shared/video.service';
import {Router} from '@angular/router';
import {SpecModel} from '../models/spec.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  constructor(private videoService: VideoService,
              private  router: Router) { }

  ngOnInit() {
  }

  goToRoom(f: NgForm) {
    const sb = this.videoService.getRoomList()
      .subscribe(data => {
        sb.unsubscribe();
        this.videoService
          .createRoom(this.videoService.convertYouTubeLink(f.value.urlinput))
          .then(result => {
            if (this.videoService.currentRoom) {
              this.router.navigate(['video-rooms/room'], { queryParams: {roomId: this.videoService.currentRoom._id}});
            } else {
              alert('Não foi possível criar a sala');
            }
          });
      });
  }

  // TODO: Create the functions below

  // List rooms with details

  // Go to selected room

  // Refresh list (if necessary... Probably not, because firebase db is realtime already)

}
