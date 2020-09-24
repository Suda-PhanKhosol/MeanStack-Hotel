import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildcommentComponent } from './childcomment.component';

describe('ChildcommentComponent', () => {
  let component: ChildcommentComponent;
  let fixture: ComponentFixture<ChildcommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildcommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
