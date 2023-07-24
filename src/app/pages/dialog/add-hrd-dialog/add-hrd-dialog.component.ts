import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { MessageService, ConfirmationService } from 'primeng/api';

//getting data from purpose component via interface
export interface DialogData {
  function_type: any,
  purpose_name: any,
  degree_type: any,
  faculty_type: any,
  hrd_id: any,
  student_id: any;
  student_app_id: any;
}

@Component({
  selector: 'app-add-hrd-dialog',
  template: `
    <p-toast></p-toast>
    <p-confirmDialog [style]="{width: '25vw'}"></p-confirmDialog>
    <div>
      <div class="card text-center">
        <div class="card-header">
          <div class="header-content">
            <h3>{{purpose_name}}</h3>
          </div>
          <i class="pi pi-times" mat-dialog-close style="font-size: 1.5rem"></i>
        </div>
      <div class="card-body">
        <form [formGroup]="hrdForm" (ngSubmit)="saveHrd()">
          <div class="row">
          <div class="col-md-12" style ="color: red;">
            <p>Note :1. Document uploaded will be provided to the concerned agency/university , university does not check if your document meet their requirements.
            </p>
          </div>
          </div>

          <div class="row">
            <div class="col-md-4">Full Name :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="full_name" class="form-control" formControlName="fullName" [ngClass]="{'is-invalid': fullName.invalid && (fullName.dirty || fullName.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">Course Name :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="course_name" class="form-control" formControlName="courseName" [ngClass]="{'is-invalid': courseName.invalid && (courseName.dirty || courseName.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">Specialization(In case no Specialization leave the input box empty) :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="specializations" class="form-control" formControlName="specialization" [ngClass]="{'is-invalid': specialization.invalid && (specialization.dirty || specialization.touched)}">
              <br>
            </div>
          </div>

          <div class="row" *ngIf="pattern == 'Annual'">
            <div class="col-md-4">Seat No. :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="seat_no" class="form-control" formControlName="seatNo" [ngClass]="{'is-invalid': seatNo.invalid && (seatNo.dirty || seatNo.touched)}">
              <br>
            </div>
          </div>

          <div class="row" *ngIf="pattern == 'Semester'">
            <div class="col-md-4">
              <mat-select id="purposeSelect" [(value)]="second_last_sem" class="form-control" placeholder="Select Semester"
              style="background-color:  #8a7fff; color: black; height: 40px; width: 177px; margin-left: 54px;" (selectionChange)="selectSemester($event.value,'secondlast')">
                <mat-option value="Semester 1">Sem I</mat-option>
                <mat-option value="Semester 2">Sem II</mat-option>
                <mat-option value="Semester 1">Sem III</mat-option>
                <mat-option value="Semester 4">Sem IV</mat-option>
                <mat-option value="Semester 5">Sem V</mat-option>
                <mat-option value="Semester 6">Sem VI</mat-option>
                <mat-option value="Semester 7">Sem VII</mat-option>
                <mat-option value="Semester 8">Sem VIII</mat-option>
                <mat-option value="Semester 9">Sem IX</mat-option>
                <mat-option value="Semester 10">Sem X</mat-option>
              </mat-select>
            </div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="seat_no_sem5" class="form-control" formControlName="seatNo_sem5" [ngClass]="{'is-invalid': seatNo_sem6.invalid && (seatNo_sem6.dirty || seatNo_sem6.touched)}">
              <br>
            </div>
          </div>

          <div class="row" *ngIf="pattern == 'Semester'">
            <div class="col-md-4">
              <mat-select id="purposeSelect" [(value)]="last_sem" class="form-control" placeholder="Select Semester"
              style="background-color: #8a7fff; color: black; height: 40px; width: 177px; margin-left: 54px;" (selectionChange)="selectSemester($event.value,'last')">
                <mat-option value="Semester 1">Sem I</mat-option>
                <mat-option value="Semester 2">Sem II</mat-option>
                <mat-option value="Semester 3">Sem III</mat-option>
                <mat-option value="Semester 4">Sem IV</mat-option>
                <mat-option value="Semester 5">Sem V</mat-option>
                <mat-option value="Semester 6">Sem VI</mat-option>
                <mat-option value="Semester 7">Sem VII</mat-option>
                <mat-option value="Semester 8">Sem VIII</mat-option>
                <mat-option value="Semester 9">Sem IX</mat-option>
                <mat-option value="Semester 10">Sem X</mat-option>
              </mat-select>
            </div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="seat_no_sem6" class="form-control" formControlName="seatNo_sem6" [ngClass]="{'is-invalid': seatNo_sem5.invalid && (seatNo_sem5.dirty || seatNo_sem5.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">PRN No. (Optional) :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="prn_no" class="form-control" formControlName="prnNo" [ngClass]="{'is-invalid': prnNo.invalid && (prnNo.dirty || prnNo.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">CGPA :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="cgpa_no" class="form-control" (keyup)="check($event, 'cgpa')" formControlName="cgpaNo" [ngClass]="{'is-invalid': cgpaNo.invalid && (cgpaNo.dirty || cgpaNo.touched)}">
              <p>OR</p>
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">CGPI :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="cgpi_no" class="form-control" (keyup)="check($event, 'cgpi')" formControlName="cgpiNo" [ngClass]="{'is-invalid': cgpiNo.invalid && (cgpiNo.dirty || cgpiNo.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">Transcript No :</div>
            <div class="col-md-8">
              <input type="text" [(ngModel)]="transcript_no" class="form-control" formControlName="transcriptNo" [ngClass]="{'is-invalid': transcriptNo.invalid && (transcriptNo.dirty || transcriptNo.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">Transcript Issuance Date :</div>
            <div class="col-md-8">
              <input type="date" [(ngModel)]="transcript_date" class="form-control" formControlName="transcriptDate" [ngClass]="{'is-invalid': transcriptDate.invalid && (transcriptDate.dirty || transcriptDate.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">Examination Held in Month-Year :</div>
            <div class="col-md-8">
              <input type="month" [(ngModel)]="exam_date" class="form-control" formControlName="examDate" [ngClass]="{'is-invalid': examDate.invalid && (examDate.dirty || examDate.touched)}">
              <br>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">E-Mail :</div>
            <div class="col-md-8">
              <input type="text" class="form-control" formControlName="email" [ngClass]="{'is-invalid': email.invalid && (email.dirty || email.touched)}">
              <br>
            </div>
          </div>

          <div class="card-footer text-muted">
            <button mat-raised-button color="primary">SAVE</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  `,
  styles:[
    `
    .col-md-4{
      font-weight: 600;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(64,220,126) !important;
    }
    
    .header-content {
      flex: 1;
    } 
    `
  ],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class AddHrdDialogComponent {
  //declaration of data get from purpose component 
  function_type: any;
  purpose_name: any;
  degree_type: any;
  faculty_type: any;
  student_id: any;
  student_app_id: any;

  //new formcontrols declaration
  email: FormControl;
  fullName: FormControl;
  courseName: FormControl;
  specialization: FormControl;
  seatNo: FormControl;
  seatNo_sem6: FormControl;
  seatNo_sem5: FormControl;
  transcriptNo: FormControl;
  cgpiNo: FormControl;
  cgpaNo: FormControl;
  prnNo: FormControl;
  examDate: FormControl;
  transcriptDate: FormControl;

  //new patchvalues declaration
  full_name: any = '';
  course_name: any;
  specializations: any;
  seat_no: any;
  seat_no_sem5: any;
  seat_no_sem6: any;
  second_last_sem: any;
  last_sem: any;
  prn_no: any;
  cgpa_no: any;
  cgpi_no: any;
  transcript_no: any;
  transcript_date: any;
  exam_date: any;

  //other variables & formgroup declaration 
  hrdForm: FormGroup;
  pattern: any;
  degree: any;
  formData: any;
  secondlastSem: any;
  lastSem: any;
  hrd_id: any;
  hrdData: any;
  token: any;
  user_id: any;
  app_id: any;
  hrdInfo: any;
  user_type: any;
  user_email: any;

  constructor(
    public dialogRef: MatDialogRef<AddHrdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    protected api: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    //set validations using form controls
    this.email = new FormControl('do.asthahte-mh@gov.in, desk-adm1.sdeed-mh@gov.in');
    this.fullName = new FormControl('', [Validators.required]);
    this.courseName = new FormControl('', [Validators.required]);
    this.specialization = new FormControl('', [Validators.required]);
    this.seatNo = new FormControl('');
    this.seatNo_sem6 = new FormControl('');
    this.seatNo_sem5 = new FormControl('');
    this.transcriptNo = new FormControl('', [Validators.required]);
    this.cgpiNo = new FormControl('');
    this.cgpaNo = new FormControl('');
    this.prnNo = new FormControl('');
    this.examDate = new FormControl('', [Validators.required]);
    this.transcriptDate = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_type = this.token.data.user.user_type;
    this.user_email = this.token.data.user.user_email;

    //get data from purpose component stores in another variables
    this.function_type = this.data.function_type;
    console.log('function_type++++++++++',this.function_type);
    this.purpose_name = this.data.purpose_name;
    console.log('purpose_name++++++++++',this.purpose_name);
    this.degree_type = this.data.degree_type;
    console.log('degree_type++++++++++',this.degree_type);
    this.faculty_type = this.data.faculty_type;
    console.log('faculty_type++++++++++',this.faculty_type);
    this.hrd_id = this.data.hrd_id;
    console.log('hrd_id++++++++++',this.hrd_id);
    this.student_id = this.data.student_id;
    console.log('student_id++++++++++',this.student_id);
    this.student_app_id = this.data.student_app_id;
    console.log('student_app_id------------',this.student_app_id);

    //save form controls values using form builder
    this.hrdForm = this.fb.group({
      email: this.email,
      fullName: this.fullName,
      courseName: this.courseName,
      specialization: this.specialization,
      seatNo: this.seatNo,
      seatNo_sem6: this.seatNo_sem6,
      seatNo_sem5: this.seatNo_sem5,
      transcriptNo: this.transcriptNo,
      cgpiNo: this.cgpiNo,
      cgpaNo: this.cgpaNo,
      prnNo: this.prnNo,
      examDate: this.examDate,
      transcriptDate: this.transcriptDate,
    });

    //storing patchvalues while editing
    if (this.function_type == 'edit') {
      if (this.user_type == 'student') {
        this.api.getHrdData(this.hrd_id, this.purpose_name, '').subscribe((data: any) => {
          if (data['status'] == 200) {
            this.hrdData = data['data'][0];
            this.full_name = this.hrdData.fullName;
            this.course_name = this.hrdData.course_name;
            this.specializations = this.hrdData.specialization;
            this.seat_no = this.hrdData.seat_no;
            this.seat_no_sem5 = this.hrdData.seat_no_sem5;
            this.seat_no_sem6 = this.hrdData.seat_no_sem6;
            this.second_last_sem = this.hrdData.secondlastsem;
            this.last_sem = this.hrdData.lastsem;
            this.prn_no = this.hrdData.prn_no;
            this.cgpa_no = this.hrdData.cgpa;
            this.cgpi_no = this.hrdData.cgpi;
            this.transcript_no = this.hrdData.transcript_no;
            this.transcript_date = this.hrdData.transcript_date;
            this.exam_date = this.hrdData.exam_date;
          }
        })
      } else {
        this.api.getHrdData(this.hrd_id, this.purpose_name, this.student_app_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.hrdData = data['data'][0];
            this.full_name = this.hrdData.fullName;
            this.course_name = this.hrdData.course_name;
            this.specializations = this.hrdData.specialization;
            this.seat_no = this.hrdData.seat_no;
            this.seat_no_sem5 = this.hrdData.seat_no_sem5;
            this.seat_no_sem6 = this.hrdData.seat_no_sem6;
            this.second_last_sem = this.hrdData.secondlastsem;
            this.last_sem = this.hrdData.lastsem;
            this.prn_no = this.hrdData.prn_no;
            this.cgpa_no = this.hrdData.cgpa;
            this.cgpi_no = this.hrdData.cgpi;
            this.transcript_no = this.hrdData.transcript_no;
            this.transcript_date = this.hrdData.transcript_date;
            this.exam_date = this.hrdData.exam_date;
          }
        })
      }
    }

    //show pre-filled data of student name and his course name as well as show seat no or last sem seat nos as per annual or semester pattern 
    if (this.user_type == 'student') {
      this.api.getHrdInfo(this.degree_type, this.faculty_type, null).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.hrdInfo = data['data'][0];
          console.log('this.hrdInfo', this.hrdInfo);

          if (this.hrdInfo != null) {
            this.full_name = this.hrdInfo.fullName ? this.hrdInfo.fullName : null;
            this.course_name = this.hrdInfo.type ? this.hrdInfo.type : null;
            this.pattern = this.hrdInfo.pattern ? this.hrdInfo.pattern : null;
            this.degree = this.hrdInfo.degree ? this.hrdInfo.degree : null;

            if (this.pattern == 'Annual') {
              this.hrdForm.controls['seatNo'].setValidators([Validators.required]);
            } else if (this.pattern == 'Semester') {
              this.hrdForm.controls['seatNo_sem6'].setValidators([Validators.required]);
              this.hrdForm.controls['seatNo_sem5'].setValidators([Validators.required]);
            }
            console.log('aaaaaaaaaaaa');
            
          }
        }
      })
    } else {
      this.api.getHrdInfo(this.degree_type, this.faculty_type, this.student_app_id).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.hrdInfo = data['data'][0];
          console.log('this.hrdInfo', this.hrdInfo);

          if (this.hrdInfo != null) {
            this.full_name = this.hrdInfo.fullName ? this.hrdInfo.fullName : null;
            this.course_name = this.hrdInfo.type ? this.hrdInfo.type : null;
            this.pattern = this.hrdInfo.pattern ? this.hrdInfo.pattern : null;
            this.degree = this.hrdInfo.degree ? this.hrdInfo.degree : null;

            if (this.pattern == 'Annual') {
              this.hrdForm.controls['seatNo'].setValidators([Validators.required]);
            } else if (this.pattern == 'Semester') {
              this.hrdForm.controls['seatNo_sem6'].setValidators([Validators.required]);
              this.hrdForm.controls['seatNo_sem5'].setValidators([Validators.required]);
            }
          }
        }
      })
    }

  }

  //close dialog box
  dismiss() {
    this.dialogRef.close();
  }

  //get disable one input box while any one is selected between cgpa & cgpi
  check(event: any, value: any) {
    if (value == 'cgpa') {
      this.hrdForm.get('cgpiNo')?.disable();
    } else if (value == 'cgpi') {
      this.hrdForm.get('cgpiNo')?.disable();
    }
  }

  //getting values of semester mat-select dropdown
  selectSemester(value: any, sem: any) {
    if (sem == 'secondlast') {
      this.secondlastSem = value;
    } else if (sem == 'last') {
      this.lastSem = value;
    }
  }

  //save button
  saveHrd() {
    //set field controls on particulur purpose
    if (this.purpose_name == 'HRD') {
      this.hrdForm.controls['fullName'].markAsDirty();
      this.hrdForm.controls['courseName'].markAsDirty();
      this.hrdForm.controls['specialization'].markAsDirty();
      this.hrdForm.controls['seatNo'].markAsDirty();
      this.hrdForm.controls['seatNo_sem6'].markAsDirty();
      this.hrdForm.controls['seatNo_sem5'].markAsDirty();
      this.hrdForm.controls['prnNo'].markAsDirty();
      this.hrdForm.controls['cgpaNo'].markAsDirty();
      this.hrdForm.controls['cgpiNo'].markAsDirty();
      this.hrdForm.controls['transcriptNo'].markAsDirty();
      this.hrdForm.controls['transcriptDate'].markAsDirty();
      this.hrdForm.controls['examDate'].markAsDirty();
      this.hrdForm.controls['email'].markAsDirty();
    }

    //create and update purpose data
    this.formData = this.hrdForm.value;
    if (this.user_type == 'student') {
      this.api.updateAllHrd(this.formData, this.function_type, this.degree_type, this.secondlastSem, this.lastSem, this.purpose_name, this.hrd_id, this.student_app_id, '', '', '').subscribe((data: any) => {
        if (data['status'] == 200) {
          this.dismiss();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      })
    } else {
      this.api.updateAllHrd(this.formData,this.function_type, this.degree_type, this.secondlastSem, this.lastSem, this.purpose_name, this.hrd_id, this.student_app_id, this.user_id, this.user_email, this.user_type).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.dismiss();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      })
    }
  }
}
