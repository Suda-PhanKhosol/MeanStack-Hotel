import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoomStatusComponent } from './show-room-status.component';

describe('ShowRoomStatusComponent', () => {
  let component: ShowRoomStatusComponent;
  let fixture: ComponentFixture<ShowRoomStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRoomStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRoomStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
