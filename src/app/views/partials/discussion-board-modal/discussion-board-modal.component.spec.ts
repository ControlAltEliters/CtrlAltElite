import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionBoardModalComponent } from './discussion-board-modal.component';

describe('DiscussionBoardModalComponent', () => {
  let component: DiscussionBoardModalComponent;
  let fixture: ComponentFixture<DiscussionBoardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionBoardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
