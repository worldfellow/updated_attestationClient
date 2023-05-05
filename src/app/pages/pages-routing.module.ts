import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PaymentIssueComponent } from './payment-issue/payment-issue.component';
import { HelpsComponent } from './helps/helps.component';

console.log("inside pages routing");

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path : 'dashboard',
      component : DashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path : '',
      component : DashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'admin-dashboard',
      component : AdminDashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'dashboard/attestation_page',
      component : NewAttestationComponent
    },
    {
      path : 'payment-issue',
      component : PaymentIssueComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'profile',
      component : ProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'helps',
      component : HelpsComponent,
      canActivate: [AuthGuard], 
    },
  ],
  providers:[AuthGuard]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
  
 }
