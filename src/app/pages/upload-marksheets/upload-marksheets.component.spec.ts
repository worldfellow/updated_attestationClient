import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMarksheetsComponent } from './upload-marksheets.component';

describe('UploadMarksheetsComponent', () => {
  let component: UploadMarksheetsComponent;
  let fixture: ComponentFixture<UploadMarksheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMarksheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMarksheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
