import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { MessageService } from 'primeng/api';

export interface DialogData {
  purpose: any,
  type: any,
  data: any,
  studentData: any,
}

@Component({
  selector: 'app-update-instructional-affiliation',
  template: `
    <div class="card text-center">
      <div class="card-header">
        <h2>{{purpose_data.course}}</h2>
      </div>
      <div class="card-body">
        <form [formGroup]="instructionalaffiliationForm">
          <div class="row">
            <div class="col-md-4">Course Name :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="course_name" formControlName="courseName" [ngClass]="{'is-invalid': courseName.invalid && (courseName.dirty || courseName.touched)}"></div>
          </div>
          <div class="row">
            <div class="col-md-4">College Name :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="college_name" formControlName="collegeName" [ngClass]="{'is-invalid': collegeName.invalid && (collegeName.dirty || collegeName.touched)}"></div>
          </div>
          <div class="row">
            <div class="col-md-4">Specialization :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="specializations" formControlName="specialization" [ngClass]="{'is-invalid': specialization.invalid && (specialization.dirty || specialization.touched)}"></div>
          </div>
          <div class="row">
            <div class="col-md-4">Year of Passing :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="year_of_passing" formControlName="yearOfPassing" [ngClass]="{'is-invalid': yearOfPassing.invalid && (yearOfPassing.dirty || yearOfPassing.touched)}"></div>
          </div>
          <div class="row">
            <div class="col-md-4">Duration of Course :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="durations" formControlName="duration" [ngClass]="{'is-invalid': duration.invalid && (duration.dirty || duration.touched)}"></div>
          </div>
          <div class="row">
            <div class="col-md-4">Passed with :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="passed_with" formControlName="passedWith" [ngClass]="{'is-invalid': passedWith.invalid && (passedWith.dirty || passedWith.touched)}"></div>
          </div>
          <div class="row">
            <div class="col-md-4">Degree :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="degrees" formControlName="degree" [ngClass]="{'is-invalid': degree.invalid && (degree.dirty || degree.touched)}"></div>
          </div>
          <br>
          <div><p-button mat-dialog-close label="SAVE" styleClass="p-button-raised p-button-success" (click)="saveInstructionalAffiliation()"></p-button></div>
        </form>
      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
  `,
  styles: [
  ],
  providers: [
    MessageService
  ]
})
export class UpdateInstructionalAffiliationComponent {

  instructionalaffiliationForm: FormGroup;

  //declaration of data get from purpose component 
  type: any;
  purpose: any;
  purpose_data: any;
  studentData: any;

  //new formcontrols
  courseName: FormControl;
  collegeName: FormControl;
  specialization: FormControl;
  yearOfPassing: FormControl;
  duration: FormControl;
  passedWith: FormControl;
  degree: FormControl;

  //new patch values
  course_name: any;
  college_name: any;
  specializations: any;
  year_of_passing: any;
  durations: any;
  passed_with: any;
  degrees: any;

  formData: any;
  token: any;
  user_id: any;
  user_email: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    protected api: ApiService,
    private messageService: MessageService,
  ) {
    this.courseName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.collegeName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.specialization = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.yearOfPassing = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.duration = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]);
    this.passedWith = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.degree = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_email = this.token.data.user.user_email;

    //get data from purpose component stores in another variables
    this.type = this.data.type;
    this.purpose = this.data.purpose;
    this.purpose_data = this.data.data;
    this.studentData = this.data.studentData;

    //save form controls values using form builder
    if (this.purpose != null) {
      this.instructionalaffiliationForm = this.fb.group({
        courseName: this.courseName,
        collegeName: this.collegeName,
        specialization: this.specialization,
        yearOfPassing: this.yearOfPassing,
        duration: this.duration,
        passedWith: this.passedWith,
        degree: this.degree,
      });
    } else {
      console.log('Purpose not found');
    }

    //patch values
    if (this.type == 'edit') {
      this.course_name = this.purpose_data.course;
      this.college_name = this.purpose_data.college;
      this.specializations = this.purpose_data.specialization;
      this.year_of_passing = this.purpose_data.yearofpassing;
      this.durations = this.purpose_data.duration;
      this.passed_with = this.purpose_data.division;
      this.degrees = this.purpose_data.education_type;
    } else { }
  }

  saveInstructionalAffiliation() {
    if (this.purpose == 'instructional' || this.purpose == 'affiliation') {
      this.instructionalaffiliationForm.controls['courseName'].markAsDirty();
      this.instructionalaffiliationForm.controls['collegeName'].markAsDirty();
      this.instructionalaffiliationForm.controls['specialization'].markAsDirty();
      this.instructionalaffiliationForm.controls['yearOfPassing'].markAsDirty();
      this.instructionalaffiliationForm.controls['duration'].markAsDirty();
      this.instructionalaffiliationForm.controls['passedWith'].markAsDirty();
      this.instructionalaffiliationForm.controls['degree'].markAsDirty();
    } else {
      console.log('Purpose not found');
    }

    this.formData = this.instructionalaffiliationForm.value;
    console.log('===========', this.formData);

    this.api.updateInstructionalAffiliation(this.formData, this.user_id, this.user_email, this.purpose, this.type, this.purpose_data.id, this.studentData.id, this.studentData.app_id).subscribe((data: any) => {
      if(data['status'] == 200){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
      }
    })
  }
}
