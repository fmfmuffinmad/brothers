import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VideoRoomsComponent} from './video-rooms/video-rooms.component';
import {MemeStashComponent} from './meme-stash/meme-stash.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent,
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'video-rooms',
    component: VideoRoomsComponent,
    loadChildren: './video-rooms/video-rooms.module#VideoRoomsModule'
  },
  {
    path: 'meme-stash',
    component: MemeStashComponent,
    loadChildren: './meme-stash/meme-stash.module#MemeStashModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
