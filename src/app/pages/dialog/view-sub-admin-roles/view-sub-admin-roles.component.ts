import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

export interface DialogData {
  rolesData: any;
  user_id: any;
}

@Component({
  selector: 'app-view-sub-admin-roles',
  template: `
  <div class="card text-center">
    <div class="card-header">
      <div class="header-content">
        <h1>Role Management</h1>
      </div>
      <i class="pi pi-times" mat-dialog-close style="font-size: 1.5rem"></i>
    </div>
    <div class="card-body">
      <form class="flex align-items-center gap-1" [formGroup]="rolesForm">
        <div class="row">
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="studentManagement" [(ngModel)]="rolesData.studentManagement" (change)="onChange()">Student Management</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminManagement" [(ngModel)]="rolesData.adminManagement" (change)="onChange()">Admin Management</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminTotal" [(ngModel)]="rolesData.adminTotal" (change)="onChange()">Total Applications</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminPending" [(ngModel)]="rolesData.adminPending" (change)="onChange()">Pending Applications</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminVerified" [(ngModel)]="rolesData.adminVerified" (change)="onChange()">Verified Applications</mat-checkbox>
              </span>
            </section>
          </div>  
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminSigned" [(ngModel)]="rolesData.adminSigned" (change)="onChange()">Signed Applications</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminPayment" [(ngModel)]="rolesData.adminPayment" (change)="onChange()">Payment</mat-checkbox>
              </span>
            </section>
          </div>  
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminEmailTracker" [(ngModel)]="rolesData.adminEmailTracker" (change)="onChange()">Email Tracker</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminReport" [(ngModel)]="rolesData.adminReport" (change)="onChange()">Report</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminhelp" [(ngModel)]="rolesData.adminhelp" (change)="onChange()">Help</mat-checkbox>
              </span>
            </section>
          </div>  
          <div class="col-md-3">  
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminemailed" [(ngModel)]="rolesData.adminemailed" (change)="onChange()">Emailed Applications</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminWesApp" [(ngModel)]="rolesData.adminWesApp" (change)="onChange()">WES Applications</mat-checkbox>
              </span>
            </section>
          </div>
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="adminActivityTracker" [(ngModel)]="rolesData.adminActivityTracker" (change)="onChange()">Activity Tracker</mat-checkbox>
              </span>
            </section>
          </div>  
          <div class="col-md-3">
            <section class="example-section">
              <span class="example-list-section">
                <mat-checkbox class="example-margin" formControlName="studentFeedback" [(ngModel)]="rolesData.studentFeedback" (change)="onChange()">Student Feedback</mat-checkbox>
              </span>
            </section>
          </div>
        </div>
        <button pButton pRipple label="SAVE" mat-dialog-close class="p-button-success" (click)="saveRoles()"></button>
      </form>
      <div class="roles-list">
        <h1>Roles Array</h1>
        <ol class="bullet-list">
            <div *ngIf="rolesData.studentManagement == true">
              <li>
                Student Management
              </li>  
            </div>  
            <div *ngIf="rolesData.adminManagement == true">
              <li>
                Admin Management
              </li>  
            </div>  
            <div *ngIf="rolesData.adminTotal == true">
              <li>
                Total Applications
              </li>  
            </div>  
            <div *ngIf="rolesData.adminPending == true">
              <li>
                Pending Applications
              </li>  
            </div>  
            <div *ngIf="rolesData.adminVerified == true">
              <li>
                Verified Applications
              </li>  
            </div>  
            <div *ngIf="rolesData.adminSigned == true">
              <li>
                Singed Applications
              </li>  
            </div>  
            <div *ngIf="rolesData.adminPayment == true">
              <li>
                Payment
              </li>  
            </div>  
            <div *ngIf="rolesData.adminEmailTracker == true">
              <li>
                Email Tracker
              </li>  
            </div>  
            <div *ngIf="rolesData.adminReport == true">
              <li>
                Report
              </li>  
            </div>  
            <div *ngIf="rolesData.adminhelp == true">
              <li>
                Help
              </li>  
            </div>  
            <div *ngIf="rolesData.adminemailed == true">
              <li>
                Emailed Application 
              </li>  
            </div>  
            <div *ngIf="rolesData.adminWesApp == true">
              <li>
                Wes Application
              </li>  
            </div>  
            <div *ngIf="rolesData.adminActivityTracker == true">
              <li>
                Activity Tracker
              </li>  
            </div>  
            <div *ngIf="rolesData.studentFeedback == true">
              <li>
                Student Feedback
              <li>  
            </div>
        </ol>
      </div>
    </div>
  </div>
<p-toast></p-toast>
  `,
  styles: [
    `
    .roles-list {
      text-align: left;
      padding-left: 0;
      margin-left: 0;
    }

    .bullet-list {
      list-style-type: disc;
      padding-left: 20px;
    }
    
    .bullet-list li {
      margin-bottom: 10px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header-content {
      flex: 1;
    }    
    `
  ],
  providers: [
    MessageService,
  ]
})
export class ViewSubAdminRolesComponent {
  rolesForm: FormGroup;
  // checked: boolean = true;

  //declaration of variables for data get from role component
  user_id: any;
  rolesData: any;
  formData: any;
  token: any;
  admin_email: any;

  constructor(
    private fb: FormBuilder,
    protected api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;

    //get data from purpose component stores in another variables
    this.user_id = this.data.user_id;
    this.rolesData = this.data.rolesData;

    this.rolesForm = this.fb.group({
      studentManagement: [],
      adminManagement: [],
      adminTotal: [],
      adminPending: [],
      adminVerified: [],
      adminSigned: [],
      adminWesApp: [],
      adminemailed: [],
      adminPayment: [],
      adminEmailTracker: [],
      adminReport: [],
      adminActivityTracker: [],
      adminhelp: [],
      studentFeedback: [],
    })
  }

  onChange() { }

  saveRoles() {
    this.formData = this.rolesForm.value;

    this.api.getUpdateRoles(this.formData, this.user_id, this.admin_email).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
      }
    })
  }
}
