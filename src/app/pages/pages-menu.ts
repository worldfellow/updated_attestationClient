import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatMenuItem } from '@angular/material/menu';


@Injectable()
export class PagesMenu {
adminMenu : any;
studentMenu : any;
role : any;
    token: any;
 constructor() {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.role = this.token.data.user_type;
    console.log("this.role in pages menu", this.role);
  }

  getMenu(): Observable<MatMenuItem[]> {
     this.adminMenu = [
        
    ];
    this.studentMenu = [
        {
            title: 'Dashboard',
            icon: 'pie-chart-outline',
            link: '/pages/student-verification',
            home: false,
            children: undefined,
          },
          {
            title: 'Help',
            icon: 'pie-chart-outline',
            link: '/pages/contact-us',
            home: false,
            children: undefined,
          },
    ];

    if (this.role == 'admin') {
      return this.adminMenu
    }
    else if (this.role == 'student') {
        return of([...this.studentMenu]);
    }
    else{
        return of([...this.studentMenu]);
    }
  }
   
}