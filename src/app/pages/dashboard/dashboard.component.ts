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


  constructor(
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_name = this.token.data.user.user_name;

    
    // this.api.getpreAppldetails().subscribe((response)=>{
    //   // if(response['status'] == 200)
    //   // {
    //   //   this.paymentFlag  = response['paymentFlag'];
    //   //   this.purposeFlag  = response['purposeFlag'];
    //   //   this.marksheetsFlag  = response['marksheetsFlag'];
    //   //   this.educationFlag = response['educationFlag'];
    //   //   this.transcriptFlag = response['transcriptFlag'];
    //   //   this.collegeFlag = response['collegeFlag'];
    //   // }
    // })
  }

  // click button GO or Apply Again navigate to attestation_page  
  dashboardRoutes()
  {
    this.router.navigate(['pages/attestation_page']);
  }

}
