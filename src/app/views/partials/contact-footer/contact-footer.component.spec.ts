import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFooterComponent } from './contact-footer.component';

describe('ContactFooterComponent', () => {
  let component: ContactFooterComponent;
  let fixture: ComponentFixture<ContactFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
