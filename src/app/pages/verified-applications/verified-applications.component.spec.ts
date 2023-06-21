import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedApplicationsComponent } from './verified-applications.component';

describe('VerifiedApplicationsComponent', () => {
  let component: VerifiedApplicationsComponent;
  let fixture: ComponentFixture<VerifiedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
