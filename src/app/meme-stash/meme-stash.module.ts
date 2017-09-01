import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemeStashRoutingModule } from './meme-stash-routing.module';
import { MemeStashComponent } from './meme-stash.component';

@NgModule({
  imports: [
    CommonModule,
    MemeStashRoutingModule
  ],
  declarations: []
})
export class MemeStashModule { }
