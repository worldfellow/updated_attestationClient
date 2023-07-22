import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
user_name:any;
token:any; 

constructor(
  private router:Router, protected api: ApiService
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
  this.router.navigate(['pages/dashboard/viewProfile']);
}

changePassword(){

}

logOut(){
 this.api.removeToken();
 this.router.navigate(['/auth/login']);
}
}
