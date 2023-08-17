import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrls: ['./activity-tracker.component.css']
})
export class ActivityTrackerComponent {
  trackerData: any;
  trackerLength: any;
  filterText: string = "";
  first: number = 0;
  rows: number = 10;
  totalCount:number;
  @ViewChild('local') local!: ElementRef;

  constructor(
    protected api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getTrackerData(0, 10, '');
  }

  filterTable() {
    this.getTrackerData(0, 10, this.filterText)
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first
    let limit = this.rows
    let filterData;
    this.filterTable();
    if(!this.filterText){
       filterData="";
    }else{
      filterData = this.filterText;
    }
    this.getTrackerData(offset, limit, filterData);
  }

  getTrackerData(offset: any, limit: any, globalSearch: any){
    this.api.getActivityTrackerList('', offset, limit, globalSearch).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.trackerData = data['data'];
        this.totalCount = data['count'];
      } else {
        console.log('Failed to load data!');
      }
    })
  }

  clear() {
    this.local.nativeElement.value = '';
    this.getTrackerData(0, 10, '');
  }

}
