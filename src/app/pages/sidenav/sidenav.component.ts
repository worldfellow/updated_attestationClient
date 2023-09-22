import { Component, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

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
  navData: any[] = [];
  token: any;
  user_name: any;
  user_type: any;
  user_roles: any;

  constructor(
    protected api: ApiService,
    private router: Router,
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
    this.user_name = this.token.data.user.user_name;
    this.user_type = this.token.data.user.user_type;
    this.user_roles = this.token.data.user.roles;  
    console.log('????????????????????????????????????',this.user_roles);
      

    if(this.user_type == 'student'){
      this.api.checkStudentPaid().subscribe((data:any)=>{
        if(data['status'] == 200){
          this.navData = navbarData.paidStudentMenu;
        }else{
          this.navData = navbarData.studentMenu;
        }
      })
      console.log('this.navData11111',this.navData);
    }else{
      this.navData = navbarData.adminMenu;
      console.log('this.navData22222',this.navData);
    }

    this.screenWidth = window.innerWidth;
  }


  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  helpBtn(){
    this.router.navigate(['pages/helps']);
  }

  viewCart(){
    this.router.navigate(['pages/dashboard/cart']);
  }
}