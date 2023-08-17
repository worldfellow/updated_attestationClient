import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog'; 
import { saveAs } from 'file-saver';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotesComponent } from '../dailogComponents/notes.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-signed-applications',
  templateUrl: './signed-applications.component.html',
  styleUrls: ['./signed-applications.component.css'],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class SignedApplicationsComponent {
  ref: DynamicDialogRef;
  rangeDates: Date[] | undefined;
  value: string | undefined;
  signedData: any[] = [];
  purposes: any[] = [];
  signedLength: any;
  filterText: string = "";
  endDate: any;
  first: number = 0;
  rows: number = 10;
  token: any;
  admin_email: any;
  signedShow: boolean = false;
  excel: any;
  filepath: any;
  purpose_name: any; 
  totalCount:any;

  constructor(
    private router: Router,
    protected api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;

    //for first time data load calling
    this.refresh(0, 10," "," ");

    //get dynamic data of deopdown
    this.api.getPurposeList('').subscribe((data: any) => {
      if (data['data'] != undefined) {
        this.purposes = data['data'];
      } else {
        console.log('Purpose data not found!');
      }
    });
  }

  filterData() {
    console.log("filterText", this.filterText);
    this.refresh(0, 10, this.filterText," ")
  }

  filteredByPurpose(purpose_name: any) {
    this.purpose_name = purpose_name;
    console.log('----------',purpose_name);
    this.refresh(0, 10," ", purpose_name);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first;
    let limit = this.rows;
    this.filterData();
    let filterData;
    if (!this.filterText) {
      filterData = " ";
    } else {
      filterData = this.filterText;
    }

    this.filteredByPurpose(this.purpose_name);
    let purpose;
    if(!this.purpose_name){
      purpose = " ";
    }else{
      purpose = this.purpose_name;
    }
    this.refresh(offset, limit, filterData, purpose);
  }

  refresh(offset: number, limit: number, globalSearch: any, purposeSearch: any) {
console.log("karthik",purposeSearch);

    this.api.getUserApplication("signed","accept"," ", offset, limit," "," ", globalSearch, purposeSearch).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.signedData = data['data'];
        this.totalCount = data['count'];
        console.log('signed data', this.signedData);
      } else {
        console.log('Signed data not found!');
        // this.signedShow = true;
      }
    })
  }

  downloadExcel(range: any) {
    console.log('range>>>>>>>>>>>>>>>>', range);
    const start = moment(range[0]);
    const end = moment(range[1]);

    const startDate = start.format('YYYY-MM-DD');
    const endDate = end.format('YYYY-MM-DD');
    console.log('startDate>>>>>>>>>>>>>>>>', startDate);
    console.log('endDate>>>>>>>>>>>>>>>>', endDate);

    this.api.getDownloadExcel(startDate, endDate, 'signed', "AND tracker='signed'", "AND status='accept'").subscribe((data: any) => {
      if (data['status'] == 200) {
        this.filepath = data['data'];

        this.api.getDownloadBySaveAs(this.filepath).subscribe((data: any) => {
          saveAs(data, 'signedApplications.xlsx');
        })
      } else {
        console.log('File path not found!');
      }
    })
  }

  viewMore(user_id: any, app_id: any) {
    this.router.navigate(['pages/adminSigned/viewMore'], { queryParams: { user_id: user_id, app_id: app_id, viewFrom: 'signed' } })
  }

  showNotes(notes: any, app_id: any, user_id: any, collegeConfirmation: any) {
    this.ref = this.dialogService.open(NotesComponent, {
      data: {
        notes_data: notes,
        app_id: app_id,
        user_id: user_id,
        collegeConfirmation: collegeConfirmation,
      },
      header: 'Notes Details',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closable: true
    });
    this.ref.onClose.subscribe((data: any) => {  
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Details Saved Successfully!' });
        this.refresh(0, 10, " ", " "); 
      }
    });
  }


  rejectApplication(user_id: any, app_id: any, user_name: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to reject application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.ref = this.dialogService.open(NotesComponent, {
          data: {
            type: 'rejected',
            app_id: app_id
          },
          header: 'Notes Details',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          closable: false
        });
        this.ref.onClose.subscribe(() => { 
          this.api.rejectApplications(user_id, app_id, 'verified', this.admin_email).subscribe((data: any) => {
            if (data['status'] == 200) {
              this.refresh(0, 10," "," ");
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data['message'] });
            }
          })
        });
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  resendApplication(user_id: any, app_id: any,type:string) {
    this.confirmationService.confirm({
      message: 'Are you sure want to resend application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.resendApplication(user_id, app_id,type, this.admin_email).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.ngOnInit();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }
}
