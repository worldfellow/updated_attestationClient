import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
user_name:any;
token:any;
constructor(
  private router:Router,
) { }

ngOnInit(): void {
  this.token = JSON.parse(localStorage.getItem('user')!)
  this.user_name = this.token.data.user.user_name;
 
}



helpBtn(){
  console.log("vsjajhdvddvdv");
  this.router.navigate(['pages/helps']);
}
}
