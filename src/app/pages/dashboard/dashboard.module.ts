import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    PanelModule,
    ButtonModule
  ]
})
export class DashboardModule { }


