import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // loginForm = FormGroup;
  loginForm: FormGroup;
  submitted = false;
  token: any;
  identifierName: any = 'prathu';
  user_type: any;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    });
  }
  get loginData() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.auth.login(this.loginForm.controls).subscribe({
      next: () => {
        // this.router.navigate(['pages']);
        // get return url from query parameters or default to home page
        this.token = JSON.parse(localStorage.getItem('user')!);
        this.user_type = this.token.data.user.user_type;

        if (this.user_type == 'student') {
          this.router.navigateByUrl('pages/dashboard');
        } else {
          const dialogRef = this.dialog.open(VerifyOtpComponent, {}).afterClosed().subscribe(result => {
            // this.ngOnInit();
            console.log(' After close function ');
          });
        }
      },
      error: error => {
        // this.alertService.error(error);
        // this.loading = false;
      }
    });
  }
  clear() {
    this.loginForm.patchValue({
      userName: '',
      passWord: ''
    });
  }
}