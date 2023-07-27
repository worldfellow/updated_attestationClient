import { Component, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CountriesService } from 'src/app/data/countries.service';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface DialogData {
  institute: any;
  purpose_id: any;
  institute_id: any;
  purpose_name: any;
  function_type: any;
  student_id: any;
  student_app_id: any;
}

@Component({
  selector: 'app-add-institution-dialog',
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
          <form [formGroup]="institutionForm" (ngSubmit)="saveInstitution()">

              <div class="row">
                <div class="col-md-12" style ="color: red;">
                  <p >Note :1. Document uploaded will be provided to the concerned agency/university , university does not check if your document meet their requirements.
                    <span *ngIf = "purpose_name == 'IQAS' || purpose_name == 'ICES' || purpose_name == 'NASBA'">2. Documents will send on all email addresses</span> 
                  </p>
                </div>
              </div>

              <div class="row" *ngIf="refno">
                <div class="col-md-4">Ref No:<span *ngIf="purpose_name == 'Further study' || purpose_name == 'Employment' || purpose_name == 'Visa'" style="color : red; font-size: 13px;">(Input the reference number of the recipient University/Agency wherein you want to send the documents)</span></div>
                <div class="col-md-1">MU-</div>
                <div class="col-md-7" *ngIf="purpose_name == 'Educational credential evaluators WES' || purpose_name == 'Further study' || purpose_name == 'Employment' || purpose_name == 'Visa' || purpose_name == 'Others' || purpose_name == 'ICAS' || purpose_name == 'IQAS' || purpose_name == 'NASBA' || purpose_name == 'National Committee on Accreditation'">
                  <input type="text" [(ngModel)]="ref_numbers" class="form-control" formControlName="allRefNo" (keypress)="numberOnly($event)" minlength="7" maxlength="8" [ngClass]="{'is-invalid': allRefNo.invalid && (allRefNo.dirty || allRefNo.touched)}">
                  <mat-hint *ngIf="purpose_name == 'Educational credential evaluators WES'">Enter 7-digit numeric values.</mat-hint>
                  <mat-hint *ngIf="purpose_name == 'IQAS'">Enter 6-digit numeric values only.</mat-hint>
                  <mat-hint *ngIf="purpose_name == 'CES' || purpose_name == 'MYIEE' || purpose_name == 'ICES' || purpose_name == 'NCEES' || purpose_name == 'UK NARIC / UK ENIC / ECCTIS'">Enter alphanumeric values.</mat-hint>
                  <mat-hint *ngIf="purpose_name == 'ICAS' || purpose_name == 'NASBA' || purpose_name == 'National Committee on Accreditation'">Enter numeric values.</mat-hint>
                  <br>                
                </div>
                <div class="col-md-7" *ngIf="purpose_name == 'CES' || purpose_name == 'MYIEE' || purpose_name == 'ICES' || purpose_name == 'NCEES' || purpose_name == 'UK NARIC / UK ENIC / ECCTIS'">
                  <input type="text" [(ngModel)]="ref_numbers" class="form-control" formControlName="allRefNo" [ngClass]="{'is-invalid': allRefNo.invalid && (allRefNo.dirty || allRefNo.touched)}">
                  <mat-hint>Enter alphanumeric values.</mat-hint>
                  <br>
                </div>
              </div>
              
              <div class="row" *ngIf="wesname" style="margin-bottom : -1px">
                  <div class="col-md-4">Name as per Wes Application/Registration:</div>
                  <div class="col-md-8">
                    <input type="text" [(ngModel)]="wes_name" class="form-control" formControlName="wesName" pattern="^[ A-Za-z_@./#&+-]*$" [ngClass]="{'is-invalid': wesName.invalid && (wesName.dirty || wesName.touched)}">
                    <br>
                  </div>
              </div>
              
              <div class="row" *ngIf="wessurname">
                  <div class="col-md-4">Surname as per Wes Application/Registration:</div>
                  <div class="col-md-8">
                    <input type="text" [(ngModel)]="wes_surname" class="form-control" formControlName="wesSurname" pattern="^[ A-Za-z_@./#&+-]*$" [ngClass]="{'is-invalid': wesSurname.invalid && (wesSurname.dirty || wesSurname.touched)}">
                    <br>
                  </div>
              </div>
              
              <div class="row" *ngIf="wesemail">
                  <div class="col-md-4">Registered email id as per WES registration:</div>
                  <div class="col-md-8" >
                    <input type="text" [(ngModel)]="wes_email" class="form-control" formControlName="wesEmail" [ngClass]="{'is-invalid': wesEmail.invalid && (wesEmail.dirty || wesEmail.touched)}">
                  </div>
              </div>

              <div class="row" *ngIf="unicompname">
                  <div class="col-md-4" *ngIf="purpose_name == 'Further study'">University Name:</div>
                  <div class="col-md-4" *ngIf="purpose_name == 'Employment'">Company Name:</div>
                  <div class="col-md-8">
                    <input type="text" [(ngModel)]="university_compony_name" class="form-control" formControlName="allUniversityCompanyName" pattern="^[ A-Za-z_@./#&+-]*$" [ngClass]="{'is-invalid': allUniversityCompanyName.invalid && (allUniversityCompanyName.dirty || allUniversityCompanyName.touched)}">
                    <br>
                  </div>
              </div>

              <div class="row" *ngIf="allname">
                  <div class="col-md-4">Name:</div>
                  <div class="col-md-8">
                    <input type="text" [(ngModel)]="names" class="form-control" formControlName="allName" pattern="[A-Za-z]+$" [ngClass]="{'is-invalid': allName.invalid && (allName.dirty || allName.touched)}">
                    <br>
                  </div>
              </div>

              <div class="row" *ngIf="countryname">
                <div class="col-md-4">Country:</div>
                <div class="col-md-8">
                  <mat-select *ngIf="countryname" [(ngModel)]="country_names" class="form-control" name="selectedCountry" formControlName="allCountryName" >
                    <mat-option *ngFor="let country of Countries" [value]="country.id">
                      {{country.name}}
                    </mat-option>
                  </mat-select>
                  <mat-autocomplete #Countryauto="matAutocomplete">
                    <mat-option *ngFor="let option of country_nameAutoS" [value]="option">
                      {{ option }}
                    </mat-option>
                  </mat-autocomplete> 
                </div>
              </div>
              <br>

              <div class="row" *ngIf="conpername">
                  <div class="col-md-4">Contact Person Name:</div>
                  <div class="col-md-8">
                    <input type="text" [(ngModel)]="contact_person_names" class="form-control" formControlName="allContactPersonName" pattern="[A-Za-z]+$" [ngClass]="{'is-invalid': allContactPersonName.invalid && (allContactPersonName.dirty || allContactPersonName.touched)}">
                    <br>
                  </div>
              </div>

              <div class="row" *ngIf="contactno">
                  <div class="col-md-4">Contact Number</div>
                  <div class="col-md-8">
                    <input type="tel" [(ngModel)]="contact_numbers" class="form-control" (keypress)="numberOnly($event)" formControlName="allContactNo" [ngClass]="{'is-invalid': allContactNo.invalid && (allContactNo.dirty || allContactNo.touched)}"> 
                    <br>
                  </div>
              </div>

              <div class="row" *ngIf="allemail">
                <div class="col-md-4">Email:</div>
                <div class="col-md-8">
                  <input type="text" [(ngModel)]="email_ids" class="form-control" formControlName="allEmail" [ngClass]="{'is-invalid': allEmail.invalid && (allEmail.dirty || allEmail.touched)}">      
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
  providers: [ConfirmationService, MessageService, CountriesService],
})

export class AddInstitutionDialogComponent {
  //other variables and form group
  institutionForm: FormGroup;
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readonly mobileValidate = /^[0-9]\d{5,12}$/;
  token: any;
  instituteData: any;
  Countries: any[];
  universitynames: Observable<any[]>;
  submitted: boolean = false;
  country_nameAutoS = [];
  user_id: any;
  user_type: any;
  count: any;
  Data: any;
  app_id: any = null;

  //declaration of variables for data get from purpose component
  institute: any;
  purpose_id: any;
  purpose_name: any;
  function_type: any;
  institute_id: any;
  student_id: any;
  student_app_id: any;

  //manage fields database wise
  refno: any;
  wesname: any;
  wessurname: any;
  wesemail: any;
  unicompname: any;
  allname: any;
  countryname: any;
  conpername: any;
  contactno: any;
  allemail: any;
  scholarship: any;
  purposes: any;
  purpose: any;

  //new patchvalues
  ref_numbers: any;
  wes_email: any;
  wes_name: any;
  wes_surname: any;
  university_compony_name: any;
  names: any;
  country_names: any;
  contact_person_names: any;
  contact_numbers: any;
  email_ids: any;

  //new formcontrols
  allRefNo: FormControl;
  wesEmail: FormControl;
  wesName: FormControl;
  wesSurname: FormControl;
  allUniversityCompanyName: FormControl;
  allName: FormControl;
  allCountryName: FormControl;
  allContactPersonName: FormControl;
  allContactNo: FormControl;
  allEmail: FormControl;
  user_email: any;
  formData: any;
  saveWes: boolean;

  constructor(
    protected api: ApiService,
    public dialogRef: MatDialogRef<AddInstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    protected countries: CountriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    //get list of countries
    this.Countries = this.countries.getData();

    //set validations using form controls
    this.allRefNo = new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]);
    this.wesEmail = new FormControl('', [Validators.required, Validators.email]);
    this.wesName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.wesSurname = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.allUniversityCompanyName = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]);
    this.allName = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]);
    this.allCountryName = new FormControl('', [Validators.required]);
    this.allContactPersonName = new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(3)]);
    this.allContactNo = new FormControl('', [Validators.required, Validators.pattern(this.mobileValidate)]);
    this.allEmail = new FormControl('', [Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_type = this.token.data.user.user_type;
    this.user_email = this.token.data.user.user_email;

    //get data from purpose component stores in another variables
    this.institute = this.data.institute;
    this.purpose_id = this.data.purpose_id;
    this.purpose_name = this.data.purpose_name;
    this.institute_id = this.data.institute_id;
    this.function_type = this.data.function_type;
    this.student_id = this.data.student_id;
    this.student_app_id = this.data.student_app_id;

    //view input fields as per database values
    this.api.getPurposeList(this.purpose_name).subscribe((data: any) => {
      if (data['data'] != undefined) {
        this.purpose = data['data'][0];
        this.refno = this.purpose['allRefNo'];
        this.wesname = this.purpose['wesName'];
        this.wessurname = this.purpose['wesSurname'];
        this.wesemail = this.purpose['wesEmail'];
        this.unicompname = this.purpose['allUniversityCompanyName'];
        this.allname = this.purpose['allName'];
        this.countryname = this.purpose['allCountryName'];
        this.conpername = this.purpose['allContactPersonName'];
        this.contactno = this.purpose['allContactNo'];
        this.allemail = this.purpose['allEmail'];
        this.email_ids = this.purpose['email'];
        this.scholarship = this.purpose['scholarship'];
      } else {
        console.log('Data not found!');
      }
    });

    //storing patchvalues while editing
    if (this.user_type == 'student') {
      if (this.function_type == 'edit') {
        this.api.getInstituteData(this.app_id, this.purpose_name,this.institute_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.instituteData = data['data'][0];

            this.ref_numbers = this.instituteData.reference_no.split('MU-').pop();
            this.wes_name = this.instituteData.nameaswes;
            this.wes_surname = this.instituteData.lastnameaswes;
            this.wes_email = this.instituteData.emailAsWes;
            this.university_compony_name = this.instituteData.university_name;
            this.names = this.instituteData.name;
            this.country_names = parseInt(this.instituteData.country_name, 10);
            this.contact_person_names = this.instituteData.contact_person;
            this.contact_numbers = this.instituteData.contact_number;
            this.email_ids = this.instituteData.email;
          } else if (data['status'] == 400) {
            console.log('Data not found!');
          }
        });
      } else {
        console.log('Failed to get function_type == edit');
      }
    } else {
      if (this.function_type == 'edit') {
        this.api.getInstituteData(this.student_app_id, this.purpose_name,this.institute_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.instituteData = data['data'][0];

            this.ref_numbers = this.instituteData.reference_no.split('MU-').pop();
            this.wes_name = this.instituteData.nameaswes;
            this.wes_surname = this.instituteData.lastnameaswes;
            this.wes_email = this.instituteData.emailAsWes;
            this.university_compony_name = this.instituteData.university_name;
            this.names = this.instituteData.name;
            this.country_names = parseInt(this.instituteData.country_name, 10);
            this.contact_person_names = this.instituteData.contact_person;
            this.contact_numbers = this.instituteData.contact_number;
            this.email_ids = this.instituteData.email;
          } else if (data['status'] == 400) {
            console.log('Data not found!');
          }
        });
      } else {
        console.log('Failed to get function_type == edit');
      }
    }

    //save form controls values using form builder
    if (this.purpose_name) {
      this.institutionForm = this.fb.group({
        allRefNo: this.allRefNo,
        wesEmail: this.wesEmail,
        wesName: this.wesName,
        wesSurname: this.wesSurname,
        allUniversityCompanyName: this.allUniversityCompanyName,
        allName: this.allName,
        allCountryName: this.allCountryName,
        allContactPersonName: this.allContactPersonName,
        allContactNo: this.allContactNo,
        allEmail: this.allEmail,
      });
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

  //save button
 async saveInstitution() {
    this.confirmationService.confirm({
      message: 'Are you sure want to save purpose?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        //set field controls on particulur purpose
        if (this.purpose_name == "Educational credential evaluators WES") {
          this.institutionForm.controls['allRefNo'].markAsDirty();
          this.institutionForm.controls['wesName'].markAsDirty();
          this.institutionForm.controls['wesSurname'].markAsDirty();
          this.institutionForm.controls['wesEmail'].markAsDirty();
        }
        else if (this.purpose_name == "Further study" || this.purpose_name == "Employment") {
          this.institutionForm.controls['allRefNo'].markAsDirty();
          this.institutionForm.controls['allUniversityCompanyName'].markAsDirty();
          this.institutionForm.controls['allCountryName'].markAsDirty();
          this.institutionForm.controls['allContactPersonName'].markAsDirty();
          this.institutionForm.controls['allContactNo'].markAsDirty();
          this.institutionForm.controls['allEmail'].markAsDirty();
        }
        else if (this.purpose_name == "Visa" || this.purpose_name == "Others") {
          this.institutionForm.controls['allRefNo'].markAsDirty();
          this.institutionForm.controls['allName'].markAsDirty();
          this.institutionForm.controls['allCountryName'].markAsDirty();
          this.institutionForm.controls['allContactPersonName'].markAsDirty();
          this.institutionForm.controls['allContactNo'].markAsDirty();
          this.institutionForm.controls['allEmail'].markAsDirty();
        }
        else if (this.purpose_name == "ICAS" || this.purpose_name == "IQAS" || this.purpose_name == "CES" || this.purpose_name == "MYIEE" || this.purpose_name == "ICES" || this.purpose_name == "NASBA" || this.purpose_name == "NCEES" || this.purpose_name == "UK NARIC / UK ENIC / ECCTIS" || this.purpose_name == "National Committee on Accreditation") {
          this.institutionForm.controls['allRefNo'].markAsDirty();
          this.institutionForm.controls['allEmail'].markAsDirty();
        }

        //create and update purpose data
        this.formData = this.institutionForm.value;

        if (this.user_type == 'student') {
          if(this.purpose_name == "Educational credential evaluators WES"){
            this.api.getwesdetails(this.institutionForm.controls['allRefNo'].value,this.institutionForm.controls['wesEmail'].value,this.institutionForm.controls['wesName'].value,this.institutionForm.controls['wesSurname'].value).subscribe(async(data:any) => {
              if(data['status'] == 400){
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data['message'] });
              }else{

                var ref_no = "MU-" + this.institutionForm.controls['allRefNo'].value;
                this.api.updateAllInstitute(this.purpose_name, ref_no, this.formData,this.app_id, this.institute_id, this.function_type, '', this.user_email, '').subscribe((data: any) => {
                  if (data['status'] == 200) {
    
                    this.dismiss();
    
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
                  }
                  else if (data['status'] == 400) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
                  }
                });
                
              }
             
            })
          }else{
            var ref_no = "MU-" + this.institutionForm.controls['allRefNo'].value;
            this.api.updateAllInstitute(this.purpose_name, ref_no, this.formData,this.app_id, this.institute_id, this.function_type, '', this.user_email, '').subscribe((data: any) => {
              if (data['status'] == 200) {

                this.dismiss();

                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
              }
              else if (data['status'] == 400) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
              }
            });
          }
        } else {
            var ref_no = "MU-" + this.institutionForm.controls['allRefNo'].value;
            this.api.updateAllInstitute(this.purpose_name, ref_no, this.formData,this.student_app_id, this.institute_id, this.function_type, this.user_id, this.user_email, this.user_type).subscribe((data: any) => {
              if (data['status'] == 200) {

                this.dismiss();

                this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
              }
              else if (data['status'] == 400) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
              }
            });
        
        }
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }
}
