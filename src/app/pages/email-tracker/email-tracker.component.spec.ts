import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTrackerComponent } from './email-tracker.component';

describe('EmailTrackerComponent', () => {
  let component: EmailTrackerComponent;
  let fixture: ComponentFixture<EmailTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
