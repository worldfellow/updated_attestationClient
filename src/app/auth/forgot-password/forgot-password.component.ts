import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResendEmailComponent } from '../dialog/resend-email/resend-email.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],

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
