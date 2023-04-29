import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormsModule
  ],
  exports : [
    // ReactiveFormsModule,
    // FormsModule
  ]
})
export class AuthModule { }
