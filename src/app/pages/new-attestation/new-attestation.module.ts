import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAttestationComponent } from './new-attestation.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    NewAttestationComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
  ]
})
export class NewAttestationModule { }
