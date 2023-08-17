import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PurposeComponent } from '../purpose/purpose.component';
import { saveAs } from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MyApplicationsComponent {
  myApplicationData: any;
  token: any;
  user_id: any;
  app_id: any;
  email: void;
  otherEmail: any;
  id: any;
  appliedData: any;
  purposeData: any;
  filepath: any;

  constructor(
    protected api: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;

    this.api.getMyApplicationData().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.myApplicationData = data['data'];
        console.log(':::::::::::::::::::::::::', this.myApplicationData);

        this.app_id = this.myApplicationData[0].id;
        // this.sendData();
      } else {
        console.log('Data not found!');
      }
    })
  }

  downloadReceipt(app_id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to download receipt?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.getDownloadPaymentReceipt(app_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.filepath = data['data'];

            this.api.getDownloadBySaveAs(this.filepath).subscribe((data: any) => {
              saveAs(data, app_id + '_Attestation_Payment_Challan');
            })
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
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
