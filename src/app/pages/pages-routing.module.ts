import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth.guard';

console.log("inside pages routing");

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path : 'dashboard/attestation_page',
      component : NewAttestationComponent
    },
    {
      path : 'dashboard',
      component : DashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'admin-dashboard',
      component : AdminDashboardComponent,
      canActivate: [AuthGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
  
 }
