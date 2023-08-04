import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

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

  constructor(private bnIdle : BnNgIdleService,private router: Router, protected api: ApiService) { }

  ngOnInit(): void {
    /**if user inactive more than 10 min it will logout automatically */
    this.bnIdle.startWatching(600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.api.removeToken();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  // onToggleSideNav(data: SideNavToggle){
  //   this.isSideNavCollapsed = data.collapsed;
  //   this.screenWidth = data.screenWidth;
  // }
}
