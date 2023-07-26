import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResendEmailComponent } from '../dialog/resend-email/resend-email.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-forgot-password',
  template: `
  <div class="center-container">
      <p-card header="Forgot Password">
        <div class="col-md-12">
          <h5>Enter your email address and we'll send a link to reset your password</h5>
        </div>
        <div class="card">
          <div class="m-2">
            <form [formGroup]="forgotPassForm">
              <div class="row">
                <div class="col-md-12">
                  <div class="card flex flex-wrap justify-content-center m-4">
                    <span class="p-input-icon-left">
                      <i class="pi pi-search"></i>
                      <input class="p-inputtext-lg" type="text" pInputText style="width: 100%" placeholder="Enter your email address" formControlName="email" [ngClass]="{'is-invalid': email.invalid && (email.dirty || email.touched)}" />
                    </span>
                  </div>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center m-3">
                <button pButton pRipple label="REQUEST PASSWORD" class="p-button-success" *ngIf="forgotPassForm.valid" (click)="reqPassword()"></button>
                <p-dialog header="Header" [style]="{width: '50vw'}">
                </p-dialog>
              </div>
            </div>
            <br>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-5">
            <p-button label="BACK TO LOG IN" icon="pi pi-sign-out reversed-icon" (click)="logIn()"></p-button>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-3">
            <p-button label="REGISTER" icon="pi pi-sign-in" iconPos="right" (click)="register()"></p-button>
          </div>
        </div>
      </p-card>
  </div>

  `,
  styles: [
    `
    .center-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* This ensures that the container takes the full height of the viewport */
    }

    .card {
      max-width: 800px; /* You can adjust the value (in pixels) as per your requirement */
      margin: 0 auto; /* This centers the card horizontally within the parent container */
    }

    .reversed-icon {
      transform: scaleX(-1);
    }

    `
  ],
  providers: [MessageService, DialogService]
})
export class ForgotPasswordComponent {
  forgotPassForm: FormGroup;
  ref: DynamicDialogRef;

  //new formcontrol
  email: FormControl;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService,
    protected api: ApiService,
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  ngOnInit(): void {
    this.forgotPassForm = this.fb.group({
      email: this.email,
    })
  }

  reqPassword() {
    if (this.forgotPassForm.valid) {
      this.api.forgotPasswordSendEmailToUser(this.forgotPassForm.controls['email'].value).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email!' });
    }

    this.ref = this.dialogService.open(ResendEmailComponent, {
      data: {
        email: this.forgotPassForm.controls['email'].value,
      },
      header: 'Resend Email',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe(() => {
    });
  }

  logIn() {
    this.router.navigate(['auth/login']);
  }

  register() {
    this.router.navigate(['auth/register']);
  }
}
