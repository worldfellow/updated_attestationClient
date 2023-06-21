import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedApplicationsComponent } from './signed-applications.component';

describe('SignedApplicationsComponent', () => {
  let component: SignedApplicationsComponent;
  let fixture: ComponentFixture<SignedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
