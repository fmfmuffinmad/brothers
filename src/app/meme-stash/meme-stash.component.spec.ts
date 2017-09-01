import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeStashComponent } from './meme-stash.component';

describe('MemeStashComponent', () => {
  let component: MemeStashComponent;
  let fixture: ComponentFixture<MemeStashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeStashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeStashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
