import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';




interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-total-applications',
  templateUrl: './total-applications.component.html',
  styleUrls: ['./total-applications.component.css'],
  providers: [ConfirmationService, MessageService]

})

export class TotalApplicationsComponent implements OnInit {

  totalApplication: any;
  loading: boolean = false;
  first: number = 0;
  rows: number = 10;
  range: any
  rangeDates: Date[] | undefined;
  startDate: any;
  endDate: any;
  filterText: any;
  isLoadingResults: boolean = false;


  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('globalSearch') globalSearch!: ElementRef;


  constructor(protected api: ApiService, private formBuilder: FormBuilder, private router: Router, private messageService: MessageService,) {

  }
  ngOnInit() {
    this.refresh(0, 10, null, " ", null, "null");
  }






  refresh(offset: number, limit: number, id: any, name: any, email: any, globalSearch: any) {
    this.isLoadingResults = true;
    this.api.getUserApplication("", "", id, offset, limit, name, email, globalSearch,"").subscribe((data: any) => {
      if (data) {
        this.isLoadingResults = false;  
        this.totalApplication = data['data'];
      }

    })
  }



  clear() {
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.globalSearch.nativeElement.value = '',
      this.refresh(0, 10, null, " ", null, null)
  }

  getSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'reject':
        return 'danger';

      case 'new':
        return 'success';

      case 'requested':
        return 'warning';

      case 'changed':
        return 'info';

      case 'accept':
        return 'help';

      case 'apply':
        return 'help';

      case 'signed':
        return 'info';

      case 'verified':
        return 'success';

      default:
        return ' ';
    }
  }

  viewMore() {
    console.log("view");
    this.router.navigate(['pages/adminTotal/viewMore']);
  }

  search(id: any, name: any, email: any) {
    if (!id) {
      id = null;
    }

    if (!email) {
      email = null;
    }

    console.log("name", id, name, email);
    this.refresh(0, 10, id, name, email, null);

  }
  filterData() {
    this.refresh(0, 10, "null", "", "null", this.filterText)
  }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first
    let limit = this.rows
    this.filterData();
    let filterData;
    if (!this.filterText) {
      filterData = "null"
    } else {
      filterData = this.filterText
    }
    this.refresh(offset, limit, "null", "", "null", filterData);
  }
  downloadExcel(range: any) {

    if (range === undefined || range.length !== 2 || range.includes(null)) {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Select Date to download!' });
    } else {
      this.loading = true;
      const start = moment(range[0]);
      const end = moment(range[1]);
      const startDate = start.format('YYYY-MM-DD');
      const endDate = end.format('YYYY-MM-DD');
      console.log('startDate >>>>>>>>>>>>>>>>', startDate);
      console.log('endDate >>>>>>>>>>>>>>>>', endDate);

    }
  }

}
