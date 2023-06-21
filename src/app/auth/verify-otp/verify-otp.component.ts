import { Component, ElementRef, Inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-otp',
  template: `
  <p-toast></p-toast>
  <div class="body">
    <div class="card text-center">
        <div class="card-header" style="font-weight: bold; background-color: rgb(174, 152, 176) !important;">
            <h1 style="font-weight: bold;">Verify OTP</h1>
            <div class="right" (click)="dismiss()">
              <i title="Back" class="fas fa-arrow-left fa-pull-right fa-border"></i>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title">Enter Your OTP</h5>

            <div class="row box">
                <div class="col-xs-1">
                    <input type="text" id="otp" maxlength="1" (keypress)="numberOnly($event)" [(ngModel)]="otp1Value">
                    <input type="text" id="otp" maxlength="1" (keypress)="numberOnly($event)" [(ngModel)]="otp2Value">
                    <input type="text" id="otp" maxlength="1" (keypress)="numberOnly($event)" [(ngModel)]="otp3Value">
                    <input type="text" id="otp" maxlength="1" (keypress)="numberOnly($event)" [(ngModel)]="otp4Value">
                    <input type="text" id="otp" maxlength="1" (keypress)="numberOnly($event)" [(ngModel)]="otp5Value">
                    <input type="text" id="otp" maxlength="1" (keypress)="numberOnly($event)" [(ngModel)]="otp6Value">
                </div>
            </div>
        </div>
        <div class="card-footer text-body-secondary button-container">
            <p-button label="Cancel" (click)="cancel()"></p-button>
            <p-button label="Verify" (click)="verify()"></p-button>
            <p-button label="Resend OTP" (click)="resendOtp()"></p-button>
        </div>
    </div>
  </div>
  `,
  styles: [
    `.body{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: whitesmoke;
      height: 100%;
  }
  
  .box{
      display: flex;
  }
  
  .box input{
      width: 50px;
      font-size: 32px;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin: 2px;
      border: 2px solid black;
      background: wheat;
      font-weight: bold;
      color: black;
      outline: none;
      transition: all 0.1s;
  }
  
  .box input:focus{
      border: 2px solid black;
      box-shadow: 0 0 2px 2px black;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .button-container p-button {
    margin-right: 10px;
  }
  `
  ],
  providers: [MessageService],
})
export class VerifyOtpComponent {
  otp1Value: string = '';
  otp2Value: string = '';
  otp3Value: string = '';
  otp4Value: string = '';
  otp5Value: string = '';
  otp6Value: string = '';
  otp: string;
  getOtp: any = 111111;
  token: any;
  user_id: any;
  id: any;

  constructor(
    public dialogRef: MatDialogRef<VerifyOtpComponent>,
    private elementRef: ElementRef,
    private messageService: MessageService,
    private router: Router,
    protected api: ApiService,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;

    const otpFields = this.elementRef.nativeElement.querySelectorAll('input[id^=otp]');

    otpFields.forEach((field: any, index: number) => {
      field.addEventListener('input', (event: any) => {
        if (event.data !== null && index < otpFields.length - 1) {
          const nextField = otpFields[index + 1];
          nextField.focus();
        } else if (event.inputType === 'deleteContentBackward' && index > 0) {
          const previousField = otpFields[index - 1];
          previousField.focus();
        }
      });
    });
  }

  //close dialog box
  dismiss() {
    console.log('Dismiss called');
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

  cancel(){
    this.dismiss();
    this.router.navigate(['auth/login']);
  }

  resendOtp(){}

  verify() {
    this.otp = this.otp1Value + this.otp2Value + this.otp3Value + this.otp4Value + this.otp5Value + this.otp6Value;
    console.log('&&&&&&&&&&&', this.otp);
    console.log('this.getOtp' ,this.getOtp)

    if (this.getOtp == this.otp) {
      this.api.updateOtp(this.user_id, this.otp).subscribe((data: any) => {
        if (data['status'] == 200) {
          console.log('inside=============================');
          this.router.navigateByUrl('pages/adminDashboard');
          this.dismiss();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        } else {
          console.log(' Erorrrrrrrrrrrrrrrrrrr ')
          this.dismiss();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      })
    }
  }
}
