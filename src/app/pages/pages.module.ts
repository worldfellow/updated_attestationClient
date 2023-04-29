import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { NewAttestationModule } from './new-attestation/new-attestation.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    DashboardModule,
    AdminDashboardModule,
    NewAttestationModule,
  ]
})
export class PagesModule { }
