import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInstitutionDialogComponent } from '../dialog/add-institution-dialog/add-institution-dialog.component';
import { AddHrdDialogComponent } from '../dialog/add-hrd-dialog/add-hrd-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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

  constructor(
    protected api: ApiService,
    public dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) { }

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
    this.api.getInstituteData(this.app_id, '', this.user_id, '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.instituteData = data['data'];        
      } else if (data['status'] == 400) {
      }
    });

    //get all hrd purpose data to display on page
    this.api.getHrdData(this.user_id, '', '', '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.hrdData = data['data'];
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvv',this.hrdData);
      }
    })
  }

  //get students details of which degree he applied 
  checkApplied() {
    this.api.getAppliedDetails(this.app_id, this.user_type, this.user_id).subscribe((data: any) => {
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
  addInstitution(institute: any, id: any, name: any, type: any) {
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
          }
        }).afterClosed().subscribe(result => {
          this.ngOnInit();
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
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
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
        this.api.deleteInstituteHrd(institute_id, purpose_name, this.user_id).subscribe((data: any) => {
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
  addHrd(type: any, purpose: any, degree: any, faculty: any, hrd_id: any) {
    console.log('type------------',type);
    console.log('purpose------------',purpose);
    console.log('degree------------',degree);
    console.log('faculty------------',faculty);
    console.log('hrd_id------------',hrd_id);

    if (type == 'add') {
      this.api.getHrdInfo(this.user_id, degree, '', null).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.hrdInfo = data['data'];
          console.log('this,hrdInfo------------------------------->', this.hrdInfo);

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
        }
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
  }

  //using this we can open AddHrdDialogComponent dialog box and send data using his type add and edit & display form for different courses.
  addDifferentCourse(type: any, purpose: any, degree: any, faculty: any, hrd_id: any) {
    console.log('type',type);
    console.log('purpose',purpose);
    console.log('degree',degree);
    console.log('faculty',faculty);
    console.log('hrd_id',hrd_id);
    
    if (type == 'add') {
      const dialogRef = this.dialog.open(AddHrdDialogComponent, {
        data: {
          function_type: type,
          purpose_name: purpose,
          faculty_type: faculty,
          degree_type: degree,
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
        }
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
  }

  viewCart(){
    this.router.navigate(['pages/dashboard/cart']);
  }
}
