import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // loginForm = FormGroup;
  loginForm: FormGroup; 
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private auth : AuthService,
    private fb:FormBuilder,
    private router:Router,){

    }
  ngOnInit(): void
  {
    console.log('dddddddddddddddddd')
    this.loginForm = this.fb.group({
      userName:['',[Validators.required,Validators.email]],
      passWord:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    });
  }
  get loginData(){
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.auth.login('shubhamr@edulab.in','123456')
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl('pages/dashboard');
            },
            error: error => {
                // this.alertService.error(error);
                // this.loading = false;
            }
        });
}
  clear()
  {
    this.loginForm.patchValue({
      userName:'',
      passWord:''
    });
  }
}