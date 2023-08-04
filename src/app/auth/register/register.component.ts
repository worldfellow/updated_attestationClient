import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  displayNo1:boolean=false
  displayno2:boolean=false
  constructor() { }

  ngOnInit(): void {
  }

  Register(){
    this.displayNo1= true
    this.displayno2=false
  }

  GwtnewOTP(){
    this.displayno2=true
    this.displayNo1= false
  }
  

}
