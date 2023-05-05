import { Component, OnInit } from '@angular/core';

// interface SideNavToggle{
//   screenWidth: number;
//   collapsed: boolean;
// } 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'attestation';
  // isSideNavCollapsed = false;
  // screenWidth = 0;

  constructor() { }

  ngOnInit(): void {}

  // onToggleSideNav(data: SideNavToggle){
  //   this.isSideNavCollapsed = data.collapsed;
  //   this.screenWidth = data.screenWidth;
  // }
}
