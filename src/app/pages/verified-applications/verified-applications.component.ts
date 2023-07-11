import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-verified-applications',
  templateUrl: './verified-applications.component.html',
  styleUrls: ['./verified-applications.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class VerifiedApplicationsComponent {
  rangeDates: Date[] | undefined;
  value: string | undefined;
  verifiedData: any[] = [];
  purposes: any[] = [];
  verifiedLength: any;
  filterText: string = "";
  endDate: any;
  first: number = 0;
  rows: number = 10;
  token: any;
  admin_id: any;
  admin_email: string;
  verifiedShow: boolean = false;
  filepath: any;
  purpose_name: any;

  constructor(
    private router: Router,
    protected api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {


    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_id = this.token.data.user.user_id;
    this.admin_email = this.token.data.user.user_email;

    //for first time data load calling
    this.refresh(0, 10," "," ");

    //get dynamic data of deopdown
    this.api.getPurposeList('').subscribe((data: any) => {
      if (data['data'] != undefined) {
        this.purposes = data['data'];
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

  refresh(offset: number, limit: number, globalSearch: any, purpose_search: any) {

    this.api.getUserApplication("verified","accept"," ", offset, limit," "," ", globalSearch, purpose_search).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.verifiedData = data['data'];
      } else {
        console.log('Verified data not found!');
      }
    })
  }

  downloadExcel(range: any) {
    const start = moment(range[0]);
    const end = moment(range[1]);

    const startDate = start.format('YYYY-MM-DD');
    const endDate = end.format('YYYY-MM-DD');

    this.api.getDownloadExcel(startDate, endDate, 'verified', "AND tracker='verified'", "AND status='accept'").subscribe((data: any) => {
      if (data['status'] == 200) {
        this.filepath = data['data'];

        this.api.getDownloadExcelBySaveAs(this.filepath).subscribe((data: any) => {
          saveAs(data, 'verifiedApplications.xlsx');
        })
      } else {
        console.log('File path not found!');
      }
    })
  }

  viewMore(user_id: any, app_id: any) {
    this.router.navigate(['pages/adminVerified/viewMore'], { queryParams: { user_id: user_id, app_id: app_id, viewFrom: 'verified' } })
  }

  sendSingle() {
    this.confirmationService.confirm({
      message: 'Are you sure want to sign single?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  sendMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure want to sign multiple?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  rejectApplication(user_id: any, app_id: any, user_name: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to reject application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.rejectApplication(user_id, app_id, user_name, 'pending', this.admin_email).subscribe((data: any) => {
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

  resendApplication(user_id: any, app_id: any, user_name: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to resend application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.resendApplication(user_id, app_id, user_name, 'pending', this.admin_email).subscribe((data: any) => {
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
