import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WesApplicationsComponent } from './wes-applications.component';

describe('WesApplicationsComponent', () => {
  let component: WesApplicationsComponent;
  let fixture: ComponentFixture<WesApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WesApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WesApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
