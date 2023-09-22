import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { VerifyOtpComponent } from './dialog/verify-otp/verify-otp.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ResendEmailComponent } from './dialog/resend-email/resend-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoaderComponent } from '../loader/loader.component'; 
import { RouterModule, Routes } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
// import { AuthInterceptor } from '../auth-interceptor';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyOtpComponent,
    ForgotPasswordComponent,
    ResendEmailComponent,
    LoaderComponent
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule,
    MatDialogModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    CardModule,
    InputTextModule,
    ConfirmDialogModule,
    RouterModule,
    PasswordModule,
    MatCheckboxModule,
    MatSelectModule,
    DropdownModule,
    AutoCompleteModule,
  ],
  exports : [
    RouterModule, 
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ],
})
export class AuthModule { }
