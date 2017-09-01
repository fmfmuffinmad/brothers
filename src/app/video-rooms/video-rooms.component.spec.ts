import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRoomsComponent } from './video-rooms.component';

describe('VideoRoomsComponent', () => {
  let component: VideoRoomsComponent;
  let fixture: ComponentFixture<VideoRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
