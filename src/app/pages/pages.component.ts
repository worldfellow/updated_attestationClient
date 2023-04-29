import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  token : any;
  userType  : any;
  user_id : any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.user_id;
    console.log("userid",this.user_id);
    
    
    if(this.token.data.user_type == 'student')
    {
      this.userType = 'student';
    }
    else if(this.token.data.user_type == 'admin')
    {
      this.userType = 'admin'
    }

    
  }
}
