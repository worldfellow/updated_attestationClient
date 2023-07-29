import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-sub-admin',
  template: `
  <div class="card">
    <div class="row m-3">
      <form [formGroup]="subAdminForm">
        <div class="row">
          <div class="col-md-4">Name :</div>
          <div class="col-md-8">
            <input type="text" [(ngModel)]="name" class="form-control" formControlName="allName" [ngClass]="{'is-invalid': allName.invalid && (allName.dirty || allName.touched)}">
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-md-4">Surname :</div>
          <div class="col-md-8">
            <input type="text" [(ngModel)]="surname" class="form-control" formControlName="allSurname" [ngClass]="{'is-invalid': allSurname.invalid && (allSurname.dirty || allSurname.touched)}">
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-md-4">Email :</div>
          <div class="col-md-8">
            <input type="text" [(ngModel)]="email" class="form-control" formControlName="allEmail" [ngClass]="{'is-invalid': allEmail.invalid && (allEmail.dirty || allEmail.touched)}">
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-md-4">Mobile NO :</div>
          <div class="col-md-8">
            <input type="text" [(ngModel)]="mobile" class="form-control" formControlName="allMobile" [ngClass]="{'is-invalid': allMobile.invalid && (allMobile.dirty || allMobile.touched)}">
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-md-4">Gender :</div>
          <div class="col-md-8">
          <mat-radio-group aria-label="Select an option" formControlName="allGender" [(ngModel)]="gender">
            <mat-radio-button value="Male">Male</mat-radio-button>
            <mat-radio-button value="Female">Female</mat-radio-button>
          </mat-radio-group>
          </div>
        </div>
      </form>
      <div class="col-md-12 d-flex justify-content-center m-2">
        <button pButton pRipple label="SAVE" class="p-button-success" *ngIf="subAdminForm.valid" (click)="saveSubAdmin()"></button>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .col-md-3 {
      display: flex;
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
    }

    .col-md-4{
      font-size: 17px;
    }
    `
  ],
  providers: [
    MessageService,
  ]
})
export class AddSubAdminComponent {
  subAdminForm: FormGroup;
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly mobileValidate = /^[0-9]\d{5,12}$/;
  userData: any;

  //formcontrol names
  allName: FormControl;
  allSurname: FormControl;
  allEmail: FormControl;
  allMobile: FormControl;
  allGender: FormControl;

  //patchvalues while editing
  name: any;
  surname: any;
  email: any;
  mobile: any;
  gender: any;

  //declaration of variables for data get from role component
  user_id: any;
  function_type: any;

  formData: any;
  token: any;
  admin_email: any;

  constructor(
    private fb: FormBuilder,
    protected api: ApiService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
  ) {
    //save form controls values using form builder
    this.allName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.allSurname = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.allEmail = new FormControl('', [Validators.required, Validators.email]);
    this.allMobile = new FormControl('', [Validators.required, Validators.pattern(this.mobileValidate)]);
    this.allGender = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;

    //get data from purpose component stores in another variables
    this.user_id = this.config.data.user_id;    
    this.function_type = this.config.data.function_type;

    this.subAdminForm = this.fb.group({
      allName: this.allName,
      allSurname: this.allSurname,
      allEmail: this.allEmail,
      allMobile: this.allMobile,
      allGender: this.allGender,
    });


    if (this.function_type == 'edit') {
      this.api.getUserDetails(this.user_id).subscribe((data: any) => {
        this.userData = data['data'];
        
        this.name = this.userData.name;
        this.surname = this.userData.surname;
        this.email = this.userData.email;
        this.mobile = this.userData.mobile;
        this.gender = this.userData.gender;
      })
    }
  }

  saveSubAdmin() {
    if (this.subAdminForm.valid) {
      this.subAdminForm.controls['allName'].markAsDirty();
      this.subAdminForm.controls['allSurname'].markAsDirty();
      this.subAdminForm.controls['allEmail'].markAsDirty();
      this.subAdminForm.controls['allMobile'].markAsDirty();
      this.subAdminForm.controls['allGender'].markAsDirty();

      this.formData = this.subAdminForm.value;

      this.api.getUpdateSubAdmin(this.formData, this.user_id, this.function_type, this.admin_email).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.ref.close();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      })
    }
  }
}
