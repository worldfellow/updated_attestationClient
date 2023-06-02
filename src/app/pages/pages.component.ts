import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatMenuItem } from '@angular/material/menu';
import { takeUntil, takeWhile } from 'rxjs/operators';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  token: any;
  userType: any;
  user_id: any;
  menudata: MatMenuItem[];
  role: any;
  alive: boolean = true;

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!);
    console.log("his.token.data.user_type",this.token.data.user.user_type );
    
    this.role = this.token.data.user.user_type;
    console.log("this.role", this.role);

    if (this.role == 'student') {
      console.log("student");
      
      this.router.navigate(['pages/dashboard']);
    } else if (this.role == 'admin' || this.role == 'sub-admin') {
      console.log("admin");
      this.router.navigate(['pages/admin-dashboard']);
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  onToggleSideNav(data: SideNavToggle){
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
