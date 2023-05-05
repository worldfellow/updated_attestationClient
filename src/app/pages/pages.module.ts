import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { NewAttestationModule } from './new-attestation/new-attestation.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesComponent } from './pages.component';
import { NavbarModule } from './navbar/navbar.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './profile/profile.component';
import { PaymentIssueComponent } from './payment-issue/payment-issue.component';
import { HelpsComponent } from './helps/helps.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthGuard } from '../auth.guard';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PagesComponent,
    ProfileComponent,
    PaymentIssueComponent,
    HelpsComponent,
    BodyComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    PagesRoutingModule,
    DashboardModule,
    AdminDashboardModule,
    NewAttestationModule,
    NavbarModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers:[AuthGuard]
})
export class PagesModule { }
