import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiService } from 'src/app/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService} from 'primeng/api';
import { ChangePasswordComponent } from '../dailogComponents/change-password.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class NavbarComponent implements OnInit{
user_name:any;
token:any; 
ref: DynamicDialogRef;

constructor(
  private router:Router, protected api: ApiService,private dialogService: DialogService,private messageService: MessageService
) { }

ngOnInit(): void {
  this.token = JSON.parse(localStorage.getItem('user')!)
  this.user_name = this.token.data.user.user_name;
 
 
  
 
}



helpBtn(){
  console.log("vsjajhdvddvdv");
  this.router.navigate(['pages/helps']);
}

viewCart(){
  this.router.navigate(['pages/dashboard/cart']);
}

viewProfile(){
  this.router.navigate(['pages/profile']);
}

changePassword(){
  this.ref = this.dialogService.open(ChangePasswordComponent, {
    header: 'Change Password', 
    width:'40%',
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000, 
  });
  this.ref.onClose.subscribe((data:any) => { 
    if(data){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Changed Successfully!' });
    }
  });
}

logOut(){
 this.api.removeToken();
 this.router.navigate(['/auth/login']); 
}
}
