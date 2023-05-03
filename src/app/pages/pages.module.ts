import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { NewAttestationModule } from './new-attestation/new-attestation.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesComponent } from './pages.component';
import { NavbarModule } from './navbar/navbar.module';
import { MatMenuModule } from '@angular/material/menu';
import { PagesMenu } from './pages-menu';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    PagesRoutingModule,
    DashboardModule,
    AdminDashboardModule,
    NewAttestationModule,
    NavbarModule,
    MatMenuModule
  ],
  providers:[PagesMenu]
})
export class PagesModule { }
