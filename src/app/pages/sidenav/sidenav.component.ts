import { Component, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter;

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  token: any;
  user_name: any;

  constructor(
    private router:Router,
  ) { }

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_name = this.token.data.user_name;
    
    console.log("---------->", this.navData);

    this.screenWidth = window.innerWidth;
  }


  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  // closeSidenav() {
  //   this.collapsed = false;
  //   this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  // }

  helpBtn(){
    console.log("vsjajhdvddvdv");
    this.router.navigate(['pages/helps']);
  }
}