import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

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

  constructor(
    protected api: ApiService,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;

    this.api.getMyApplicationData(this.user_id, this.app_id).subscribe((data: any)=>{
      if(data['status'] == 200){
        this.myApplicationData = data['data'];
      }
    })
  }
}
