import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CartComponent {
  token: any;
  user_id: any;
  cartData: any;
  hrdData: any;
  current_location: any;
  total_amount: any;

  constructor(
    protected api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.current_location = this.token.data.user.current_location;

    //get all institute purpose data to display on page
    this.api.getCartDetails(this.user_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.cartData = data['data'];
        console.log('this.cartData---------->', this.cartData);

        if (this.current_location == 'WITHIN') {
          this.total_amount = 536 * this.cartData.length;
        } else {
          this.total_amount = 8308 * this.cartData.length;
        }
      } else {
        this.total_amount = null;
      }
    })

    //get all hrd purpose data to display on page
    this.api.getHrdData(this.user_id, '', '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.hrdData = data['data'];
        console.log('this.hrdData---------->', this.hrdData);
      }
    })
  }

  deleteCartValue(institute_id: any, purpose_name: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.deleteInstituteHrd(institute_id, purpose_name, this.user_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            if (purpose_name == 'HRD') {
              let Array = this.hrdData.filter((data: any) => data.id != institute_id);
              this.hrdData = Array;
              this.confirmationService.close();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: data.message });
            } else {
              let Array = this.cartData.filter((data: any) => data.id != institute_id);
              this.cartData = Array;
              this.confirmationService.close();
              this.messageService.add({ severity: 'info', summary: 'Success', detail: data.message });
            }
          } else if (data['status'] == 400) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
          this.ngOnInit();
        })


      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  previewApplication(){
    this.router.navigate(['pages/dashboard/previewApplication']);
  }

}
