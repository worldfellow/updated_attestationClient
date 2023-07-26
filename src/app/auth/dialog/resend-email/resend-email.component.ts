import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-resend-email',
  template: `
    <div class="card">
      <form [formGroup]="resendEmailForm">
        <div class="row">
          <div class="col-md-12">
            <div class="card flex flex-wrap justify-content-center m-4">
              <span class="p-input-icon-left">
                <input class="p-inputtext-lg" [(ngModel)]="email_val" type="text" pInputText style="width: 100%" placeholder="Enter your email address" formControlName="email" [ngClass]="{'is-invalid': email.invalid && (email.dirty || email.touched)}" />
              </span>
            </div>
          </div>
          <span class="centered-text">An email has been sent to [ {{email_val}} ] containing the instructions to change your password. Please check your email.</span>
        </div>
      </form>
      <div class="col-md-12 d-flex justify-content-center m-3">
        <button pButton pRipple label="RESEND EMAIL" class="p-button-success" (click)="resendEmail()"></button>
      </div>
    </div>
    <p-toast></p-toast>
    <p-confirmDialog [style]="{width: '25vw'}"></p-confirmDialog>
  `,
  styles: [
    `
    .centered-text {
      display: inline-block;
      text-align: center;
      color: green;
    }
    `
  ],
  providers:[ConfirmationService, MessageService]
})
export class ResendEmailComponent {
  resendEmailForm: FormGroup;
  email_val: any;

  //new formcontrol
  email: FormControl;

  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService,
    protected api: ApiService,
    private messageService: MessageService,
    public ref: DynamicDialogRef
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    //data get from forgot password component
    this.email_val = this.config.data.email;

    this.resendEmailForm = this.fb.group({
      email: this.email,
    })
  }

  resendEmail() {
    this.confirmationService.confirm({
      message: 'Are you sure want to resend email?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.forgotPasswordSendEmailToUser(this.resendEmailForm.controls['email'].value).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.ref.close();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }
}