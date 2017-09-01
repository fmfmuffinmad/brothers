import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoomsRoutingModule } from './video-rooms-routing.module';
import { VideoService } from '../shared/video.service';
import { RoomListComponent } from './room-list/room-list.component';
import { PlayerComponent } from './player/player.component';
import { RoomUsersComponent } from './room-users/room-users.component';
import { RoomComponent } from './room/room.component';
import {YoutubePlayerModule} from 'ng2-youtube-player';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {AccordionModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    VideoRoomsRoutingModule,
    YoutubePlayerModule,
    FormsModule,
    ClipboardModule,
    AccordionModule.forRoot()
  ],
  declarations: [
    RoomListComponent,
    PlayerComponent,
    RoomUsersComponent,
    RoomComponent],
  providers: []
})
export class VideoRoomsModule {}
