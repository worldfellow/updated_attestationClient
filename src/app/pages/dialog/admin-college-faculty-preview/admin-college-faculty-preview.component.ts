import { Component, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MessageService } from 'primeng/api';
import { AdminManagementDialogComponent } from '../admin-management-dialog/admin-management-dialog.component';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-college-faculty-preview',
  template: `
  
        <div class="card" *ngIf="purpose_name == 'College'">
          <div class="row m-3">
            <div class="col-md-12 tabs">Contact Person : {{purpose_data.contactPerson}}</div>
            <div class="col-md-12 tabs">Contact Number : {{purpose_data.contactNo}}</div>
            <div class="col-md-12 tabs">Email Address : {{purpose_data.emailId}}</div>
            <div class="col-md-12 tabs">Alternate Contact Person : {{purpose_data.alternateContactPerson}}</div>
            <div class="col-md-12 tabs">Alternate Contact Number : {{purpose_data.alternateContactNo}}</div>
            <div class="col-md-12 tabs">Alternate Email Address : {{purpose_data.alternateEmailId}}</div>
            <br>
            <div class="col-md-12 d-flex justify-content-center m-2">
              <p-button label="SEND EMAIL" styleClass="p-button-rounded p-button-success" (click)="sendEmail()"></p-button>
              <p-button label="EDIT" styleClass="p-button-rounded p-button-success" (click)="editCollegeFaculty(purpose_name,id,'edit')"></p-button>
            </div>
          </div>
        </div>
        <div class="card" *ngIf="purpose_name == 'Faculty'">
          <div class="row m-2">
            <div class="col-md-12 tabs">Faculty Name : {{purpose_data.faculty}}</div>
            <div class="col-md-12 tabs">Degree Name : {{purpose_data.degree}}</div>
            <div class="col-md-12 tabs">Year : {{purpose_data.year}}</div>
            <br>
            <div class="col-md-12 d-flex justify-content-center m-2">
              <p-button label="SEND EMAIL" styleClass="p-button-rounded p-button-success" (click)="sendEmail()"></p-button>
              <p-button label="EDIT" styleClass="p-button-rounded p-button-success" (click)="editCollegeFaculty(purpose_name,id,'edit')"></p-button>
            </div>
          </div>
        </div>

  `,
  styles: [
    `
    .tabs{
      margin-bottom: 2%;
    }
    `
  ],
  providers: [
    MessageService, DialogService
  ]
})
export class AdminCollegeFacultyPreviewComponent {

  //declaration of variables for data get from adminManagement component
  id: any;
  faculty: any;
  degree: any;
  college_name: any;
  purpose_name: any;
  purpose_data: any;
  ref: DynamicDialogRef;

  constructor(

    protected api: ApiService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    //get data from adminManagement component stores in another variables
    this.id = this.config.data.data.id;
    this.faculty = this.config.data.data.faculty;
    this.degree = this.config.data.data.degree;
    this.purpose_name = this.config.data.purpose_name;
    this.college_name = this.config.data.data.name;
    this.purpose_data = this.config.data.data;
  }

  editCollegeFaculty(purpose: any, id: any, type: any) {
    this.ref = this.dialogService.open(AdminManagementDialogComponent, {
      data: {
        id: id,
        purpose_name: purpose,
        function_type: type,
      },
      header: 'Verify OTP',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe(() => {
    });
  }

  sendEmail() { }

}
