import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth.guard';
import { VerifyOtpComponent } from './auth/dialog/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResendEmailComponent } from './auth/dialog/resend-email/resend-email.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pages',canActivate: [AuthGuard],loadChildren: () => import('../app/pages/pages.module').then(m => m.PagesModule)
},
  {
    path: 'auth',
    
    children: [
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'otp',
        component: VerifyOtpComponent,
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
      },
      {
        path: 'resendEmail',
        component: ResendEmailComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
