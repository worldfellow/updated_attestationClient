import { Component } from '@angular/core';

@Component({
  selector: 'app-email-tracker',
  templateUrl: './email-tracker.component.html',
  styleUrls: ['./email-tracker.component.css']
})
export class EmailTrackerComponent {
  first: number = 0;
  rows: number = 10;
}
