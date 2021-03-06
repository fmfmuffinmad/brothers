import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUsersComponent } from './room-users.component';

describe('RoomUsersComponent', () => {
  let component: RoomUsersComponent;
  let fixture: ComponentFixture<RoomUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
