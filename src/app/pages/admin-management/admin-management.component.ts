import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminManagementDialogComponent } from '../dialog/admin-management-dialog/admin-management-dialog.component';
import { ApiService } from 'src/app/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AdminCollegeFacultyPreviewComponent } from '../dialog/admin-college-faculty-preview/admin-college-faculty-preview.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AdminManagementComponent {
  collegeData: any;
  collegeLength: any;
  facultyData: any;
  facultyLength: any;

  //filtered
  filterText: string = "";
  filteredCollege: [];
  filteredFaculty: [];

  //slide toggle
  color = 'accent';
  disabled = false;

  event: any;
  college_id: any;
  token: any;
  user_id: any;
  user_name: any;
  app_id: any;

  constructor(
    private dialog: MatDialog,
    protected api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_name = this.token.data.user.user_name + ' ' + this.token.data.user.user_surname;


    this.api.getCollegeList(null).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.collegeData = data['data'];
        this.collegeLength = this.collegeData.length;
      } else {
        console.log('Failed to load data');
      }
    })

    this.api.getFacultyList(null).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.facultyData = data['data'];
        this.facultyLength = this.facultyData.length;
      } else {
        console.log('Failed to load data');
      }
    })
  }

  filterTableCollege() {
    if (this.filterText) {
      this.collegeData = this.collegeData.filter((college: any) =>
        college.name.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.collegeLength = this.collegeData.length;
    } else {
      this.collegeData = this.collegeData;
    }
  }

  filterTableFaculty() {
    if (this.filterText) {
      this.facultyData = this.facultyData.filter((faculty: any) =>
        faculty.faculty.toLowerCase().includes(this.filterText.toLowerCase()) || faculty.degree.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.facultyLength = this.facultyData.length;
    } else {
      this.facultyData = this.facultyData;
    }
  }

  addCollegeFaculty(purpose: any, type: any) {
    const dialogRef = this.dialog.open(AdminManagementDialogComponent, {
      data: {
        purpose_name: purpose,
        function_type: type,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  viewCollegeFaculty(data: any, purpose: any) {
    const dialogRef = this.dialog.open(AdminCollegeFacultyPreviewComponent, {
      data: {
        data: data,
        purpose_name: purpose,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCollegeFaculty(purpose_name: any, dataCollegeFaculty: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.deleteCollegeFaculty(purpose_name, dataCollegeFaculty, this.user_id, this.user_name, this.app_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            if (purpose_name == 'College') {
              let Array = this.collegeData.filter((data: any) => data.id != dataCollegeFaculty.id);
              this.collegeData = Array;
              this.ngOnInit();
              this.confirmationService.close();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: data.message });
            } else {
              let Array = this.facultyData.filter((data: any) => data.id != dataCollegeFaculty.id);
              this.facultyData = Array;
              this.ngOnInit();
              this.confirmationService.close();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: data.message });
            }
          } else if (data['status'] == 400) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  toggleChanged(event: any, collegeData: any) {
    this.api.activeinactiveCollege(event, collegeData, this.user_id, this.user_name, this.app_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        if (data['data'] == 'active') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          // this.api.activityTracker(this.user_id, this.user_email).subscribe((data: any) => { })
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: data.message });
      }
    })
  }

  sendEmail(college: any) { }
}
