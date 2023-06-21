import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailedApplicationsComponent } from './emailed-applications.component';

describe('EmailedApplicationsComponent', () => {
  let component: EmailedApplicationsComponent;
  let fixture: ComponentFixture<EmailedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailedApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
