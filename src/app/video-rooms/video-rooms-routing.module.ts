import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomListComponent} from './room-list/room-list.component';
import {RoomComponent} from './room/room.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: RoomListComponent
  },
  {
    path: 'room',
    component: RoomComponent
  },
  {
    path: 'room/:id',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoomsRoutingModule { }
