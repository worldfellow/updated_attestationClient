import { Component,OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import * as CryptoJS from 'crypto-js';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  template: `
  <p-card>
  <h6 style="text-align:center;color:green">Please set a new password</h6>
  <form (ngSubmit)="onSubmit()" [formGroup]="reactiveForm">
    <div class="row">
      <div class="col-md-4">
        Password
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-4">
        <p-password [toggleMask]="true" formControlName="password" [feedback]="false" placeholder="Type Password"
          [ngClass]="{ 'is-invalid': submitted && f['password'].errors }"></p-password>
        <div *ngIf="(f['password'].invalid || f['password'].touched) && (f['password'].touched || submitted)" class="invalid-feedback">
          <div *ngIf="f['password'].invalid && f['password'].errors?.hasOwnProperty('required')">Password is required</div>
          <div *ngIf="f['password']?.errors?.hasOwnProperty('minlength')">Password must be at least 6 characters</div>
        </div>
      </div>
    </div>
    <div class="row">
    <div class=col-md-5></div>
    <div class=col-md-4>
    <div *ngIf=" !submitted && f['password']?.errors?.hasOwnProperty('minlength')" style="font-size: 13px; color: #de5555;">Password must be at least 6 characters</div>
    </div>
    </div>
    <div class="row pt-2">
      <div class="col-md-4">
        Confirm Password
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-4">
        <p-password formControlName="confirmPassword" [feedback]="false" placeholder="Re-Type Password"
          [ngClass]="{ 'is-invalid': submitted && f['confirmPassword'].errors }" [toggleMask]="true"></p-password>
      </div>
      <div class=row>
      <div class=col-md-4></div>
      <div class=col-md-1></div>
      <div class=col-md-4 >
      <div *ngIf="submitted && f['confirmPassword'].errors" style="font-size: 13px; color: #de5555;">
      <div *ngIf="f['confirmPassword'].errors['required']">Confirm Password is required</div>
      <div *ngIf="f['confirmPassword'].errors['mustMatch']">Passwords doesn't match</div>
    </div>
      <div *ngIf="!submitted && f['confirmPassword'].errors" style="font-size: 13px; color: #de5555;">
      <div *ngIf="f['confirmPassword'].errors['mustMatch']">Passwords doesn't match</div>
    </div></div>

      </div>
    </div>
    <div class="row pt-4">
      <p-button type="submit" styleClass="p-button-raised p-button-success">SUBMIT</p-button>
    </div>
  </form> 
</p-card>
  `,
  styles: [
  ],
  providers: [MessageService]
})
export class ChangePasswordComponent implements OnInit {

  value!:string;
  reactiveForm: FormGroup;
  submitted:boolean = false;
  @Output() changePassword = new EventEmitter<any>();
ngOnInit(): void {
  
}

constructor(private formBuilder: FormBuilder, protected api: ApiService, public ref: DynamicDialogRef,private messageService: MessageService){

  this.reactiveForm = this.formBuilder.group({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  });
  }


get f() { return this.reactiveForm.controls; } 
MustMatch(controlName: string, matchingControlName: string) {
return (formGroup: FormGroup) => {
const control = formGroup.controls[controlName];
const matchingControl = formGroup.controls[matchingControlName];
if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
return;
}
 
if (!control.value || control.value !== matchingControl.value) {
  matchingControl.setErrors({ mustMatch: true });
} else {
  matchingControl.setErrors(null);
}
}
}

onSubmit(){
this.submitted = true;
if (this.reactiveForm.invalid) {
return;
} 
const password=this.reactiveForm.value.confirmPassword
const data=CryptoJS.MD5(password).toString(); 

this.api.changePassword(data).subscribe((data:any)=>{
  if (data['status'] == 200) {
    this.changePassword.emit(data['status']);
    this.ref.close(data['status']);
  }else{
    this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Details Not Updated!' });
  }
})

}
}



