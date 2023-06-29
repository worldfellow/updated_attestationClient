import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrls: ['./activity-tracker.component.css']
})
export class ActivityTrackerComponent {
  trackerData: any;
  trackerLength: any;
  filterText: string = "";

  constructor(
    protected api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getActivityTrackerList('').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.trackerData = data['data'];
        console.log('this.trackerData***********', this.trackerData.length);
        this.trackerLength = this.trackerData.length;
      } else {
        console.log('Failed to load data!');
      }
    })
  }

  filterTable() {
    if (this.filterText) {
      this.trackerData = this.trackerData.filter((tracker: any) =>
        tracker.activity.toLowerCase().includes(this.filterText.toLowerCase()) || tracker.data.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.trackerLength = this.trackerData.length;
    } else {
      this.trackerData = this.trackerData;
    }
  }

}
