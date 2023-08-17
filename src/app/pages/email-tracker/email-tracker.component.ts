import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-email-tracker',
  templateUrl: './email-tracker.component.html',
  styleUrls: ['./email-tracker.component.css'],
})
export class EmailTrackerComponent {
  first: number = 0;
  rows: number = 10;
  emailActivityData: any[] = [];
  emailActivityCount: any;
  filterText: any;

  @ViewChild('globalSearch') globalSearch!: ElementRef;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getEmailData('', 10, 0);
  }

  /**getEmailData function to get all the activity Tracker Data*/
  getEmailData(globalSearch: any, limit: number, offset: number) {
    this.api.getEmailActivity(globalSearch, limit, offset).subscribe((data: any) => {
        this.emailActivityData = data.data;
        this.emailActivityCount = data.count;
      });
  }

  /**filterData function to get the input text field data to search and get searched data */
  filterData() {
    this.getEmailData(this.filterText, 10, 0);
  }

  /**clear function to clear the search input data and return all the data */
  clear() {
    (this.globalSearch.nativeElement.value = ''),
      (this.filterText = ''),
      this.getEmailData('', 10, 0);
  }

  /**onPageChange function to move one page to another page */
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first;
    let limit = this.rows;
    let filterData;

    if (!this.filterText) {
      filterData = '';
    } else {
      filterData = this.filterText;
    }
    this.getEmailData(filterData, limit, offset);
  }
}
