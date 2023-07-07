import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentIssueComponent } from './payment-issue/payment-issue.component';
import { HelpsComponent } from './helps/helps.component';
import { UploadMarksheetsComponent } from './upload-marksheets/upload-marksheets.component';
import { CartComponent } from './cart/cart.component';
import { PreviewApplicationComponent } from './preview-application/preview-application.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { AuthGuard } from '../auth.guard';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { ReportsComponent } from './reports/reports.component';
import { EmailTrackerComponent } from './email-tracker/email-tracker.component';
import { PaymentsComponent } from './payments/payments.component';
import { EmailedApplicationsComponent } from './emailed-applications/emailed-applications.component';
import { WesApplicationsComponent } from './wes-applications/wes-applications.component';
import { SignedApplicationsComponent } from './signed-applications/signed-applications.component';
import { VerifiedApplicationsComponent } from './verified-applications/verified-applications.component';
import { PendingApplicationsComponent } from './pending-applications/pending-applications.component';
import { TotalApplicationsComponent } from './total-applications/total-applications.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ActivityTrackerComponent } from './activity-tracker/activity-tracker.component';
import { ViewMoreComponent } from './view-more/view-more.component';

console.log("inside pages routing");

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    //student
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
      path : 'dashboard/attestation_page',
      component : NewAttestationComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'payment-issue',
      component : PaymentIssueComponent,
      canActivate: [AuthGuard],
    },
    {
      path : 'my-applications',
      component : MyApplicationsComponent,
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
    {
      path : 'dashboard/upload-marksheets',
      component : UploadMarksheetsComponent,
      canActivate: [AuthGuard], 
    },
    {
      path : 'dashboard/cart',
      component : CartComponent,
      canActivate: [AuthGuard], 
    },
    {
      path : 'dashboard/previewApplication',
      component : PreviewApplicationComponent,
      canActivate: [AuthGuard], 
    },

    //admin
    {
      path : 'adminDashboard',
      component : AdminDashboardComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminDashboard']}
    },
    {
      path : 'studentManagement',
      component : StudentManagementComponent,
      canActivate: [AuthGuard],
      data: {type: ['studentManagement']}
    },
    {
      path : 'roleManagement',
      component : RoleManagementComponent,
      canActivate: [AuthGuard],
      data: {type: ['roleManagement']}
    },
    {
      path : 'adminManagement',
      component : AdminManagementComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminManagement']}
    },
    {
      path : 'adminTotal',
      component : TotalApplicationsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminTotal']}
    },
    {
      path : 'adminPending',
      component : PendingApplicationsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminPending']}
    },
    {
      path : 'adminVerified',
      component : VerifiedApplicationsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminVerified']}
    },
    {
      path : 'adminSigned',
      component : SignedApplicationsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminSigned']}
    },
    {
      path : 'adminWesApp',
      component : WesApplicationsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminWesApp']}
    },
    {
      path : 'adminemailed',
      component : EmailedApplicationsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminemailed']}
    },
    {
      path : 'adminPayment',
      component : PaymentsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminPayment']}
    },
    {
      path : 'adminEmailTracker',
      component : EmailTrackerComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminEmailTracker']}
    },
    {
      path : 'adminReport',
      component : ReportsComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminReport']}
    },
    {
      path : 'adminActivityTracker',
      component : ActivityTrackerComponent,
      canActivate: [AuthGuard],
      data: {type: ['adminActivityTracker']}
    },
    {
      path : 'helpadmin',
      component : StudentManagementComponent,
      canActivate: [AuthGuard],
      data: {type: ['helpadmin']}
    },
    {
      path : 'studentFeedback',
      component : StudentFeedbackComponent,
      canActivate: [AuthGuard],
      data: {type: ['studentFeedback']}
    },
    {
      path : 'adminVerified/viewMore',
      component : ViewMoreComponent,
      // canActivate: [AuthGuard],
      // data: {type: ['studentFeedback']}
    },
    {
      path : 'studentManagement/viewMore',
      component : ViewMoreComponent,
      // canActivate: [AuthGuard],
      // data: {type: ['studentFeedback']}
    },
    {
      path : 'adminSigned/viewMore',
      component : ViewMoreComponent,
      // canActivate: [AuthGuard],
      // data: {type: ['studentFeedback']}
    },
    {
      path : 'adminTotal/viewMore',
      component : ViewMoreComponent,
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
