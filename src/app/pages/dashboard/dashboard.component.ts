import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLinear = false;

  user_name: any;
  token: any;
  paymentFlag: any;
  purposeFlag: any;
  marksheetsFlag: any;
  educationFlag: any;
  transcriptFlag: any;
  collegeFlag: any;
  tabcheck1: any;
  tabcheck2: any;
  tabcheck3: any;
  app_id: string | null;
  educationDetails: boolean;
  documentDetails: boolean;
  purposeDetails: boolean;
  paymentDetails: boolean;
  applied: boolean;
  verified: boolean;
  signed: boolean;
  done: boolean;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_name = this.token.data.user.user_name;

    this.progressBar();
    this.appBar();
  }

  // click button GO or Apply Again navigate to attestation_page
  dashboardRoutes() {
    this.router.navigate(['pages/attestation_page']);
  }

  /**progressbar function to get the status of pre-Application */
  progressBar() {
    this.api.getPreApplication().subscribe((data: any) => {
      this.educationDetails = data.educationDetails;
      this.documentDetails = data.documentDetails;
      this.purposeDetails = data.purposeDetails;
      this.paymentDetails = data.paymentDetails;
    });
  }

  /**appBar function to get the status of post application after payment. */
  appBar() {
    this.api.getPostApplication().subscribe((data: any) => { 
      this.applied = data.pending;
      this.verified = data.verified;
      this.signed = data.signed;
      this.done = data.done;
    });
  }
}
