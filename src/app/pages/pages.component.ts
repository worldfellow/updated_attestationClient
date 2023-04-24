import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
   token : any;
   userType  : any;
  constructor() { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!)
    console.log("token===>",JSON.parse(localStorage.getItem('user')!));
    if(this.token.data.type == 'student'){
      console.log("stuent");
      this.userType = 'student'
      
    }
    
    // if(this.token.role)
    // {

    // }
  }

}
