import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PagesRoutingModule } from './pages-routing.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module'; 
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesComponent } from './pages.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './profile/profile.component';
import { PaymentIssueComponent } from './payment-issue/payment-issue.component';
import { HelpsComponent } from './helps/helps.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewAttestationComponent } from './new-attestation/new-attestation.component';
import { AuthGuard } from '../auth.guard';
import { MatIconModule } from '@angular/material/icon'; 
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card'; 
import { ButtonModule } from 'primeng/button'; 
import { FileUploadModule } from 'primeng/fileupload';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import{ToastModule} from 'primeng/toast';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ImageViewComponent } from './dailog/image-view/image-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CollegeDetailsComponent } from './college-details/college-details.component';


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
    CollegeDetailsComponent
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
    AdminDashboardModule,  
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
  ],
  providers:[AuthGuard]
})
export class PagesModule { }
