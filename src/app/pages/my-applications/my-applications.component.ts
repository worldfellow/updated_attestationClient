import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PurposeComponent } from '../purpose/purpose.component';
@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent {
  myApplicationData: any;
  token: any;
  user_id: any;
  app_id: any;
  email: void;
  otherEmail: any;
  id: any;

  constructor(
    protected api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;

    this.api.getMyApplicationData().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.myApplicationData = data['data'];
        console.log('@@@@@@@@@@@@@@@@@@@',this.myApplicationData[0].id);
        this.app_id = this.myApplicationData[0].id;
        // this.sendData();
      } else {
        console.log('Data not found!');
      }
    })
  }

  // sendData(){
  //   const dataToSend = { app_id: this.myApplicationData[0].id };
  //   console.log('Data not found!',dataToSend);
  //   const urlWithQueryParams = this.router.createUrlTree(['pages/previewApplication'], { queryParams: dataToSend }).toString();
  //   console.log(urlWithQueryParams); 
  // }
}
