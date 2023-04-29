import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAttestationComponent } from './new-attestation.component';

describe('NewAttestationComponent', () => {
  let component: NewAttestationComponent;
  let fixture: ComponentFixture<NewAttestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAttestationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
