import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
   
   }

  ngOnInit(): void {
   var token = localStorage.getItem('user')
    console.log("tokentoken" +token);
    
  }

}
