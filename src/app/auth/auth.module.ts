import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyOtpComponent
  ],
  entryComponents: [
    VerifyOtpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule,
    MatDialogModule,
    ButtonModule,
    ToastModule,
  ],
  exports : [
  ],
})
export class AuthModule { }
