import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-rooms',
  templateUrl: './video-rooms.component.html',
  styleUrls: ['./video-rooms.component.scss']
})
export class VideoRoomsComponent {
  safeURL: SafeResourceUrl;
  videoURL: string;

  constructor() {}

  // player: YT.Player;
  // done = false;

  // loadApi() {
  //   const tag = document.createElement('script');
  //   tag.src = 'https://www.youtube.com/iframe_api';
  //   const firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // }
  //
  // onYouTubeIframeAPIReady() {
  //   this.player = new YT.Player('player', {
  //     height: '360',
  //     width: '640',
  //     videoId: 'M7lc1UVf-VE',
  //     events: {
  //       'onReady': this.onPlayerReady,
  //       'onStateChange': this.onPlayerStateChange
  //     }
  //   });
  // }
  //
  // onPlayerReady(event) {
  //   event.target.playVideo();
  // }
  //
  // onPlayerStateChange(event) {
  //   if (event.data === YT.PlayerState.PLAYING && !this.done) {
  //     setTimeout(this.stopVideo, 6000);
  //     this.done = true;
  //   }
  // }
  // stopVideo() {
  //   this.player.stopVideo();
  // }
  //
  // ngOnInit() {
  //   this.loadApi();
  // }


  // constructor(private _sanitizer: DomSanitizer) {
  //   this.videoURL = 'https://www.youtube.com/embed/971RCecaZP8';
  //   this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  //   console.log(this.safeURL);
  // }
  //


}
