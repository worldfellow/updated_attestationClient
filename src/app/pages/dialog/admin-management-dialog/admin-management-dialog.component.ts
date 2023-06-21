import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { MessageService } from 'primeng/api';

export interface DialogData {
  function_type: any,
  purpose_name: any,
  id: any;
}

@Component({
  selector: 'app-admin-management-dialog',
  template: `
    <div>
      <div class="card text-center">
        <div class="card-header">
          <h2>Add New {{purpose_name}}</h2>
        </div>
        <div class="card-body">
        <form [formGroup]="adminManagementForm">
          <div class="row tabs" *ngIf="collegeTrue">
            <div class="col-md-4">Collge Name<span style="color: red;">*</span> :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="college_name" formControlName="collegeName" [ngClass]="{'is-invalid': collegeName.invalid && (collegeName.dirty || collegeName.touched)}"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Contact Person :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="contact_person_name" formControlName="contactPersonName"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Contact Number :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="contact_no" formControlName="contactNo"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Email Address<span style="color: red;">*</span> :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="emails" formControlName="email" [ngClass]="{'is-invalid': email.invalid && (email.dirty || email.touched)}"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Alternate Contact Person :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="alternate_contact_person_name" formControlName="alternateContactPersonName"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Alternate Contact Number :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="alternate_contact_no" formControlName="alternateContactNo"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Alternate Email Address :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="alternate_emails" formControlName="alternateEmail"></div>
          </div>
          <div class="row tabs" *ngIf="collegeTrue">
              <div class="col-md-4">Type :</div>
              <div class="col-md-8">
                <mat-select id="typeSelect" [(ngModel)]="clg_dept_type" class="form-control" formControlName="clgdeptType" [ngClass]="{'is-invalid': clgdeptType.invalid && (clgdeptType.dirty || clgdeptType.touched)}" placeholder="Select Type"
                 (selectionChange)="selectClgDepat($event.value)">
                  <mat-option value="College">College</mat-option>
                  <mat-option value="Department">Department</mat-option>
                </mat-select>
              </div>
          </div>
          <div class="row tabs" *ngIf="facultyTrue">
            <div class="col-md-4">Faculty Name<span style="color: red;">*</span> :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="faculty_name" formControlName="facultyName" [ngClass]="{'is-invalid': facultyName.invalid && (facultyName.dirty || facultyName.touched)}"></div>
          </div>
          <div class="row tabs" *ngIf="facultyTrue">
            <div class="col-md-4">Degree Name<span style="color: red;">*</span> :</div>
            <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="degree_name" formControlName="degreeName" [ngClass]="{'is-invalid': degreeName.invalid && (degreeName.dirty || degreeName.touched)}"></div>
          </div>
          <div class="row tabs" *ngIf="facultyTrue">
              <div class="col-md-4">Year<span style="color: red;">*</span> :</div>
              <div class="col-md-8"><input type="text" class="form-control" [(ngModel)]="years" formControlName="year" (keypress)="numberOnly($event)" minlength="1" maxlength="1" [ngClass]="{'is-invalid': year.invalid && (year.dirty || year.touched)}"></div>
          </div>
          <p-button label="SAVE" styleClass="p-button-success" (click)="saveCollegeFaculty()"></p-button>
        </form>
        </div>
    </div>
  `,
  styles: [
    `
    .tabs{
      margin-bottom: 5%;
    }
    `
  ],
  providers: [
    MessageService
  ]
})
export class AdminManagementDialogComponent {
  adminManagementForm: FormGroup;
  //declaration of variables for data get from adminManagement component
  function_type: any;
  purpose_name: any;
  id: any;

  type: any;
  readonly mobileValidate = /^[0-9]\d{5,12}$/;

  //new formcontrols
  collegeName: FormControl;
  contactPersonName: FormControl;
  contactNo: FormControl;
  email: FormControl;
  alternateContactPersonName: FormControl;
  alternateContactNo: FormControl;
  alternateEmail: FormControl;
  clgdeptType: FormControl;
  facultyName: FormControl;
  degreeName: FormControl;
  year: FormControl;

  //new patchvalues
  college_name: any;
  contact_person_name: any;
  contact_no: any;
  emails: any;
  alternate_contact_person_name: any;
  alternate_contact_no: any;
  alternate_emails: any;
  clg_dept_type: any;
  faculty_name: any;
  degree_name: any;
  years: any;

  formData: any;
  collegeTrue: boolean;
  facultyTrue: boolean;
  token: any;
  user_id: any;
  facultyData: any;
  collegeData: any;
  user_name: string;
  app_id: any;

  constructor(
    public dialogRef: MatDialogRef<AdminManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    protected api: ApiService,
    private messageService: MessageService,
  ) {
    //set validations using form controls
    this.collegeName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.contactPersonName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.contactNo = new FormControl('', [Validators.required, Validators.pattern(this.mobileValidate)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.alternateContactPersonName = new FormControl('', [Validators.required]);
    this.alternateContactNo = new FormControl('', [Validators.required, Validators.pattern(this.mobileValidate)]);
    this.alternateEmail = new FormControl('', [Validators.required, Validators.email]);
    this.clgdeptType = new FormControl('', [Validators.required]);
    this.facultyName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.degreeName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.year = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]);
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_name = this.token.data.user.user_name + ' ' + this.token.data.user.user_surname;

    //get data from adminManagement component stores in another variables
    this.function_type = this.data.function_type;
    this.purpose_name = this.data.purpose_name;
    this.id = this.data.id;

    if (this.purpose_name == 'College') {
      this.api.getCollegeList(this.id).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.collegeData = data['data'][0];
          console.log('----------------------------++++++++++++++++++++++++++++++++++++++++++++++++++++++++', this.collegeData);


          this.college_name = this.collegeData.name;
          this.contact_person_name = this.collegeData.contactPerson;
          this.contact_no = this.collegeData.contactNo;
          this.emails = this.collegeData.emailId;
          this.alternate_contact_person_name = this.collegeData.alternateContactPerson;
          this.alternate_contact_no = this.collegeData.alternateContactNo;
          this.alternate_emails = this.collegeData.alternateEmailId;
          this.clg_dept_type = this.collegeData.type;
          console.log('Failed to load data', this.clg_dept_type);
        } else {
          console.log('Failed to load data');
        }
      })
    } else {
      console.log('Purpose not found');
    }

    if (this.purpose_name == 'Faculty') {
      this.api.getFacultyList(this.id).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.facultyData = data['data'][0];
          console.log('---------------------------->>>>>>>>>>', this.facultyData);

          this.faculty_name = this.facultyData.faculty;
          this.degree_name = this.facultyData.degree;
          this.years = this.facultyData.year;
        } else {
          console.log('Failed to load data');
        }
      })
    } else {
      console.log('Purpose not found');
    }

    //save form controls values using form builder
    if (this.purpose_name) {
      this.adminManagementForm = this.fb.group({
        collegeName: this.collegeName,
        contactPersonName: this.contactPersonName,
        contactNo: this.contactNo,
        email: this.email,
        alternateContactPersonName: this.alternateContactPersonName,
        alternateContactNo: this.alternateContactNo,
        alternateEmail: this.alternateEmail,
        clgdeptType: this.clgdeptType,
        facultyName: this.facultyName,
        degreeName: this.degreeName,
        year: this.year,
      });
    }

    // hide show collegeForm and facultyForm
    if (this.purpose_name == 'College') {
      this.collegeTrue = true;
      this.facultyTrue = false;
    } else if (this.purpose_name == 'Faculty') {
      this.collegeTrue = false;
      this.facultyTrue = true;
    }
  }

  //close dialog box
  dismiss() {
    this.dialogRef.close();
  }

    //user can press only numbers on keyboard
    numberOnly(event: any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode >= 48 && charCode <= 57) {
        return true;
      }
      return false;
    }

  //getting values of semester mat-select dropdown
  selectClgDepat(value: any) {
    console.log('value', value);

    this.type = value;
  }

  saveCollegeFaculty() {
    if (this.purpose_name == 'College') {
      this.adminManagementForm.controls['collegeName'].markAsDirty();
      this.adminManagementForm.controls['contactPersonName'].markAsDirty();
      this.adminManagementForm.controls['contactNo'].markAsDirty();
      this.adminManagementForm.controls['email'].markAsDirty();
      this.adminManagementForm.controls['alternateContactPersonName'].markAsDirty();
      this.adminManagementForm.controls['alternateContactNo'].markAsDirty();
      this.adminManagementForm.controls['alternateEmail'].markAsDirty();
      this.adminManagementForm.controls['clgdeptType'].markAsDirty();
    } else {
      this.adminManagementForm.controls['facultyName'].markAsDirty();
      this.adminManagementForm.controls['degreeName'].markAsDirty();
      this.adminManagementForm.controls['year'].markAsDirty();
    }

    this.formData = this.adminManagementForm.value;
    console.log('===========', this.formData);
    this.api.updateCollegeFaculty(this.purpose_name, this.type, this.function_type, this.formData, this.id, this.user_id, this.user_name, this.app_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.dismiss();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
      }
    })
  }

}
