import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInstitutionDialogComponent } from '../dialog/add-institution-dialog/add-institution-dialog.component';
import { AddHrdDialogComponent } from '../dialog/add-hrd-dialog/add-hrd-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css'],
  providers: [ConfirmationService, MessageService],
})

export class PurposeComponent {
  institute: any;
  user_id: any;
  purpose_name: any;
  function_type: any;
  @Input() purposeList: string;
  token: any;
  purposes: any;
  instituteData: any;
  user_type: any;
  app_id: any;
  show: boolean;
  selectedOption: any;
  hrdTrue: boolean;
  appliedFor: any;
  Masters: any;
  Bachelors: any;
  Phd: any;
  hrdData: any;
  hrdInfo: any;
  differentCourse: boolean;
  @Input() data: any;

  constructor(
    protected api: ApiService,
    public dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // this.route.queryParams.subscribe(params => {
    //   this.app_id = params;
    //   console.log('<<<<<<<<<<<<<<<', this.app_id);
    // });
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_type = this.token.data.user.user_type;

    //get dynamic data of deopdown
    this.api.getPurposeList('').subscribe((data: any) => {
      if (data['data'] != undefined) {
        this.purposes = data['data'];
      }
    });

    //get all institute purpose data to display on page
    this.api.getInstituteData(this.app_id, '', '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.instituteData = data['data'];
        console.log('!!!!!!!!!!!!!!',this.instituteData);
      } else if (data['status'] == 400) {
      }
    });

    //get all hrd purpose data to display on page
    this.api.getHrdData('', '', '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.hrdData = data['data'];
      }
    })
  }

  //get students details of which degree he applied 
  checkApplied() {
    this.api.getAppliedDetails(this.app_id, this.user_type).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.appliedFor = data['data'][0];

        this.Masters = this.appliedFor.Masters;
        this.Bachelors = this.appliedFor.Bachelors;
        this.Phd = this.appliedFor.Phd;
      } else if (data['status'] == 400) {
        console.log('Data not found!');
      }
    })
  }

  //using this we can open AddInstitutionDialogComponent dialog box and send data using his type add and edit & display form
  addInstitution(institute: any, id: any, name: any, type: any, app_id: any) {
    if (type == 'add') {
      if (name == 'HRD') {
        this.hrdTrue = true;
        this.checkApplied();
      } else {
        this.hrdTrue = false;
        this.differentCourse = false;
        const dialogRef = this.dialog.open(AddInstitutionDialogComponent, {
          data: {
            institute: institute,
            purpose_id: id,
            purpose_name: name,
            function_type: type,
            app_id: app_id,
          }
        }).afterClosed().subscribe((data: any) => {
          if (data?.status == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
            this.ngOnInit();
          } else if (data?.status == 400) {
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: data.message });
          } else {
          }
        });
      }
    } else if (type == 'edit') {
      const dialogRef = this.dialog.open(AddInstitutionDialogComponent, {
        data: {
          institute: institute,
          institute_id: id,
          purpose_name: name,
          function_type: type,
        }
      }).afterClosed().subscribe((data: any) => {
        if (data?.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          this.ngOnInit();
        } else if (data?.status == 400) {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: data.message });
        } else {
        }
      });
    }
  }

  //delete both all institutes and hrd displayed purpose data 
  deleteInstituteHrd(institute_id: any, purpose_name: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.deleteInstituteHrd(institute_id, purpose_name).subscribe((data: any) => {
          if (data['status'] == 200) {
            if (purpose_name == 'HRD') {
              let Array = this.hrdData.filter((data: any) => data.id != institute_id);
              this.hrdData = Array;
              this.confirmationService.close();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: data.message });
            } else {
              let Array = this.instituteData.filter((data: any) => data.id != institute_id);
              this.instituteData = Array;
              this.confirmationService.close();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: data.message });
            }
          } else if (data['status'] == 400) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
          // this.ngOnInit();
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  //using this we can open AddHrdDialogComponent dialog box and send data using his type add and edit & display form
  addHrd(type: any, purpose: any, degree: any, faculty: any, hrd_id: any, app_id: any) {
    if (type == 'add') {
      this.api.getHrdInfo(degree, '', null).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.hrdInfo = data['data'];

          if (this.hrdInfo.length > 1) {
            this.differentCourse = true;
          } else {
            this.differentCourse = false;
            const dialogRef = this.dialog.open(AddHrdDialogComponent, {
              data: {
                function_type: type,
                purpose_name: purpose,
                degree_type: degree,
                faculty_type: faculty,
                app_id: app_id,
              }
            }).afterClosed().subscribe(result => {
              this.ngOnInit();
            });
          }
        }
      })
    } else if (type == 'edit') {
      const dialogRef = this.dialog.open(AddHrdDialogComponent, {
        data: {
          function_type: type,
          purpose_name: purpose,
          degree_type: degree,
          faculty_type: faculty,
          hrd_id: hrd_id,
          app_id: app_id,
        }
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
  }

  //using this we can open AddHrdDialogComponent dialog box and send data using his type add and edit & display form for different courses.
  addDifferentCourse(type: any, purpose: any, degree: any, faculty: any, hrd_id: any, app_id: any) {
    console.log('type', type);
    console.log('purpose', purpose);
    console.log('degree', degree);
    console.log('faculty', faculty);
    console.log('hrd_id', hrd_id);

    if (type == 'add') {
      const dialogRef = this.dialog.open(AddHrdDialogComponent, {
        data: {
          function_type: type,
          purpose_name: purpose,
          faculty_type: faculty,
          degree_type: degree,
          app_id: app_id,
        }
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    } else if (type == 'edit') {
      const dialogRef = this.dialog.open(AddHrdDialogComponent, {
        data: {
          function_type: type,
          purpose_name: purpose,
          faculty_type: faculty,
          degree_type: degree,
          hrd_id: hrd_id,
          app_id: app_id,
        }
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
  }

  previewApplication() {
    this.router.navigate(['pages/previewApplication']);
  }
}
