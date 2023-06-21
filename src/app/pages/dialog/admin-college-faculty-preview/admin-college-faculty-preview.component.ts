import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { MessageService } from 'primeng/api';
import { AdminManagementDialogComponent } from '../admin-management-dialog/admin-management-dialog.component';

export interface DialogData {
  data: any,
  purpose_name: any,
}

@Component({
  selector: 'app-admin-college-faculty-preview',
  template: `
    <div>
      <div class="card text-center">
        <div class="card-header">
          <div *ngIf="purpose_name == 'College'">
            <h3>{{college_name}}</h3>
          </div>
          <div *ngIf="purpose_name == 'Faculty'">
            <h3>{{degree}} of {{faculty}}</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="row" *ngIf="purpose_name == 'College'">
            <div class="col-md-6 tabs">Contact Person : {{purpose_data.contactPerson}}</div>
            <div class="col-md-6 tabs">Contact Number : {{purpose_data.contactNo}}</div>
            <div class="col-md-6 tabs">Email Address : {{purpose_data.emailId}}</div>
            <div class="col-md-6 tabs">Alternate Contact Person : {{purpose_data.alternateContactPerson}}</div>
            <div class="col-md-6 tabs">Alternate Contact Number : {{purpose_data.alternateContactNo}}</div>
            <div class="col-md-6 tabs">Alternate Email Address : {{purpose_data.alternateEmailId}}</div>
            <br>
            <div class="col-md-12">
              <p-button label="SEND EMAIL" styleClass="p-button-rounded p-button-success" (click)="sendEmail()"></p-button>
              <p-button label="EDIT" styleClass="p-button-rounded p-button-success" (click)="editCollegeFaculty(purpose_name,id,'edit')"></p-button>
            </div>
          </div>
          <div class="row" *ngIf="purpose_name == 'Faculty'">
            <div class="col-md-12 tabs">Faculty Name : {{purpose_data.faculty}}</div>
            <div class="col-md-12 tabs">Degree Name : {{purpose_data.degree}}</div>
            <div class="col-md-12 tabs">Year : {{purpose_data.year}}</div>
            <br>
            <div class="col-md-12">
              <p-button label="SEND EMAIL" styleClass="p-button-rounded p-button-success" (click)="sendEmail()"></p-button>
              <p-button label="EDIT" styleClass="p-button-rounded p-button-success" (click)="editCollegeFaculty(purpose_name,id,'edit')"></p-button>
            </div>
          </div>
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
    MessageService
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

  constructor(
    public dialogRef: MatDialogRef<AdminCollegeFacultyPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    protected api: ApiService,
    private messageService: MessageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //get data from adminManagement component stores in another variables
    this.id = this.data.data.id;
    this.faculty = this.data.data.faculty;
    this.degree = this.data.data.degree;
    this.purpose_name = this.data.purpose_name;
    this.college_name = this.data.data.name;
    this.purpose_data = this.data.data;    
  }

  //close dialog box
  dismiss() {
    this.dialogRef.close();
  }

  editCollegeFaculty(purpose: any, id: any, type: any) {
    this.dismiss();
    const dialogRef = this.dialog.open(AdminManagementDialogComponent, {
      data: {
        id: id,
        purpose_name: purpose,
        function_type: type,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  sendEmail() { }

}
