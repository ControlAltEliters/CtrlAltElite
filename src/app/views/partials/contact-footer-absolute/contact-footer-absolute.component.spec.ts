import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFooterAbsoluteComponent } from './contact-footer-absolute.component';

describe('ContactFooterAbsoluteComponent', () => {
  let component: ContactFooterAbsoluteComponent;
  let fixture: ComponentFixture<ContactFooterAbsoluteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFooterAbsoluteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFooterAbsoluteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
