import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PagesRoutingModule } from './pages-routing.module';
// import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module'; 
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesComponent } from './pages.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './profile/profile.component';
import { PaymentIssueComponent } from './payment-issue/payment-issue.component';
import { HelpsComponent } from './helps/helps.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
// import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { AuthGuard } from '../auth.guard';
// import { MatIconModule } from '@angular/material/icon'; 
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { MatStepperModule } from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatCardModule} from '@angular/material/card'; 
// import { ButtonModule } from 'primeng/button'; 
import { FileUploadModule } from 'primeng/fileupload';
import { CdkStepperModule } from '@angular/cdk/stepper';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import{ToastModule} from 'primeng/toast';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageViewComponent } from './dailogComponents/image-view.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CollegeDetailsComponent } from './dailogComponents/college-details.component';
import { AccordionModule } from 'primeng/accordion';
import { CompetencyDailogComponent } from './dailogComponents/competency-dailog.component';
import { TabViewModule } from 'primeng/tabview';
import { TranscriptDailogComponent } from './dailogComponents/transcript-dailog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { UploadMarksheetsComponent } from './upload-marksheets/upload-marksheets.component';
import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PurposeComponent } from './purpose/purpose.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddInstitutionDialogComponent } from './dialog/add-institution-dialog/add-institution-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AddHrdDialogComponent } from './dialog/add-hrd-dialog/add-hrd-dialog.component';
import { CartComponent } from './cart/cart.component';
import { TableModule } from 'primeng/table';
import { PreviewApplicationComponent } from './preview-application/preview-application.component';
import { OpenImgPdfDialogComponent } from './dialog/open-img-pdf-dialog/open-img-pdf-dialog.component';
import { DividerModule } from 'primeng/divider';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { TotalApplicationsComponent } from './total-applications/total-applications.component';
import { PendingApplicationsComponent } from './pending-applications/pending-applications.component';
import { VerifiedApplicationsComponent } from './verified-applications/verified-applications.component';
import { SignedApplicationsComponent } from './signed-applications/signed-applications.component';
import { WesApplicationsComponent } from './wes-applications/wes-applications.component';
import { EmailedApplicationsComponent } from './emailed-applications/emailed-applications.component';
import { PaymentsComponent } from './payments/payments.component';
import { EmailTrackerComponent } from './email-tracker/email-tracker.component';
import { ReportsComponent } from './reports/reports.component';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogModule } from 'primeng/dialog';
import { AdminManagementDialogComponent } from './dialog/admin-management-dialog/admin-management-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminCollegeFacultyPreviewComponent } from './dialog/admin-college-faculty-preview/admin-college-faculty-preview.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivityTrackerComponent } from './activity-tracker/activity-tracker.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddDocumentByAdminComponent } from './dialog/add-document-by-admin/add-document-by-admin.component';
import { UpdateInstructionalAffiliationComponent } from './dialog/update-instructional-affiliation/update-instructional-affiliation.component';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator'; 
import { InputTextareaModule } from 'primeng/inputtextarea'; 
import { TagModule } from 'primeng/tag';  
import { TooltipModule } from 'primeng/tooltip';
import { NotesComponent } from './dailogComponents/notes.component'; 
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { AddSubAdminComponent } from './dialog/add-sub-admin/add-sub-admin.component';
import { MatRadioModule } from '@angular/material/radio';
import { ViewSubAdminRolesComponent } from './dialog/view-sub-admin-roles/view-sub-admin-roles.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { ShowPreviewComponent } from '../pages/show-preview/show-preview.component';
import { ChangePasswordComponent } from './dailogComponents/change-password.component'; 
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    PagesComponent,
    ProfileComponent,
    PaymentIssueComponent,
    HelpsComponent,
    BodyComponent,
    SidenavComponent,
    FooterComponent, 
    NavbarComponent,
    NewAttestationComponent,
    UploadDocumentComponent,
    ImageViewComponent,
    PagesComponent,
    ProfileComponent,
    PaymentIssueComponent,
    HelpsComponent,
    BodyComponent,
    CompetencyDailogComponent,
    SidenavComponent,
    FooterComponent,
    NavbarComponent,
    TranscriptDailogComponent,
    NewAttestationComponent,
    UploadDocumentComponent,
    ImageViewComponent,
    CollegeDetailsComponent,
    UploadMarksheetsComponent,
    PurposeComponent,
    AddInstitutionDialogComponent,
    AddHrdDialogComponent,
    CartComponent,
    PreviewApplicationComponent,
    OpenImgPdfDialogComponent,
    AdminDashboardComponent,
    MyApplicationsComponent,
    StudentManagementComponent,
    RoleManagementComponent,
    AdminManagementComponent,
    TotalApplicationsComponent,
    PendingApplicationsComponent,
    VerifiedApplicationsComponent,
    SignedApplicationsComponent,
    WesApplicationsComponent,
    EmailedApplicationsComponent,
    PaymentsComponent,
    EmailTrackerComponent,
    ReportsComponent,
    StudentFeedbackComponent,
    AdminManagementDialogComponent,
    AdminCollegeFacultyPreviewComponent,
    ActivityTrackerComponent,
    ViewMoreComponent,
    AddDocumentByAdminComponent,
    UpdateInstructionalAffiliationComponent, 
    NotesComponent,
    AddSubAdminComponent,
    ViewSubAdminRolesComponent,
    ShowPreviewComponent,
    ChangePasswordComponent, 
  ],
  imports: [
    CommonModule, 
    MessagesModule,
    MatChipsModule,
    CdkStepperModule,
    MatSidenavModule,
    PagesRoutingModule,
    CardModule, 
    ImageCropperModule,
    DashboardModule,
    DropdownModule,
    MatCardModule,
    FileUploadModule,
    MatMenuModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,  
    MatStepperModule,
    MatCheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    MatButtonToggleModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    AccordionModule,
    TabViewModule,
    PdfViewerModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,  
    MatStepperModule,
    MatCheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    MatButtonToggleModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    ConfirmDialogModule,
    ToastModule,  
    TableModule,
    DividerModule,
    ButtonModule,
    MatTabsModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CalendarModule,
    PaginatorModule,
    InputTextareaModule,
    TagModule,
    TooltipModule,
    AvatarModule,
    MenubarModule,
    AutoCompleteModule,
    CheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    PasswordModule
  ],
  providers:[AuthGuard]
})
export class PagesModule { }
