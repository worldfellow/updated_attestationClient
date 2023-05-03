import { Component, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter;
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  constructor() { }

  ngOnInit(): void {}

    toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }
}