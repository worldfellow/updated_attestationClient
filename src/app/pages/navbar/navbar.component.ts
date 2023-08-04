import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChangePasswordComponent } from '../dailogComponents/change-password.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class NavbarComponent implements OnInit {
  user_name: any;
  token: any;
  ref: DynamicDialogRef;
  notificationCount: number | null = null;
  notificationList: any = [];

  constructor(
    private router: Router, protected api: ApiService, private dialogService: DialogService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_name = this.token.data.user.user_name;
    this.notification();
  }


  /** helpBtn function to navigate to help components*/
  helpBtn() {
    this.router.navigate(['pages/helps']);
  }

  /** viewCart function to navigate to view cart components*/
  viewCart() {
    this.router.navigate(['pages/dashboard/cart']);
  }

  /** view profile function to navigate to profile component */
  viewProfile() {
    this.router.navigate(['pages/profile']);
  }

  /** changePassword function to change the password of user itself*/
  changePassword() {
    this.ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Changed Successfully!' });
      }
    });
  }

  /** logOut function to navigate to login page and delete the token*/
  logOut() {
    this.api.removeToken();
    this.router.navigate(['/auth/login']);
    Swal.fire("", 'Logged Out Successfully ', 'success')
  }

  /**notification function to show the notification of user*/
  notification() {
    this.api.getNotification().subscribe((data: any) => {
      console.log("data", data.data);
      this.notificationList = data.data;

      this.notificationCount = 0; // Initialize the count to zero before counting.
      for (let i = 0; i < this.notificationList.length; i++) {
        const read = this.notificationList[i].read;
        if (read == "false") {
          this.notificationCount++;
        }
      }
    });
  }

  /** markAsRead function to make that notification as mark as read*/
  markAsRead() {
    this.api.markAsRead().subscribe((data: any) => {
      if (data) {
        if (data.status == 200) {
          this.notificationCount = null;
        }
      }
    })
  }

}

