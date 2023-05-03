import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatMenuItem } from '@angular/material/menu';
import { PagesMenu } from './pages-menu';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
//   template: `
//   <mat-drawer-container class="example-container">
//   <mat-drawer-content>
//     <button mat-raised-button >Toggle drawer</button>
//   </mat-drawer-content>
//   </mat-drawer-container>
//     <router-outlet></router-outlet>
// `,
})
export class PagesComponent implements OnInit {
  token: any;
  userType: any;
  user_id: any;
  menudata: MatMenuItem[];
  role: any;
  alive: boolean = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private pagesMenu: PagesMenu
  ) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.role = this.token.data.user_type;
    console.log("this.role", this.role);

    if (this.role == 'student') {
      this.router.navigate(['pages/dashboard']);
      this.initMenu();
    } else if (this.role == 'admin' || this.role == 'sub-admin') {
      this.router.navigate(['pages/admin-dashboard']);
      this.initMenu();
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  initMenu() {
    this.pagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menudata = menu;
        console.log('this.menuthis.menuthis.menu', this.menudata)
      });

  }
}
