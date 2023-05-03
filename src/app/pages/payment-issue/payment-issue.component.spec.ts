import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentIssueComponent } from './payment-issue.component';

describe('PaymentIssueComponent', () => {
  let component: PaymentIssueComponent;
  let fixture: ComponentFixture<PaymentIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
