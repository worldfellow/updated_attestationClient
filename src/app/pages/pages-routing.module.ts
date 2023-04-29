import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

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
    },
    {
      path : 'admin-dashboard',
      component : AdminDashboardComponent,
    },
    {
      path : '',
      redirectTo : 'dashboard',
      pathMatch : 'full'

    },
    // {
    //   path : 'attestation_page',
    //   redirectTo : 'new-attestation',
    //   pathMatch : 'full'

    // },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
  
 }
