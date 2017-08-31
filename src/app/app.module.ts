import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { AuthService } from './shared/auth.service';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CollapseModule} from 'ngx-bootstrap';
import { VideoRoomsRoutingModule } from './video-rooms/video-rooms-routing.module';
import {VideoRoomsComponent} from './video-rooms/video-rooms.component';
import { MemeStashRoutingModule } from './meme-stash/meme-stash-routing.module';
import {MemeStashComponent} from './meme-stash/meme-stash.component';
import { DatabaseService } from './shared/database.service';
import {VideoService} from './shared/video.service';
import {HttpModule} from '@angular/http';
// /dist

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VideoRoomsComponent,
    MemeStashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DashboardRoutingModule,
    FormsModule,
    CollapseModule.forRoot()
  ],
  providers: [AuthService, DatabaseService, VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
