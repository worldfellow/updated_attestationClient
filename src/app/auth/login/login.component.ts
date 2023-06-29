import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from 'src/app/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  // loginForm = FormGroup;
  loginForm: FormGroup;
  visible: boolean = false;
  token: any;
  identifierName: any = 'prathu';
  user_type: any;
  otp: string;
  getOtp: any = 111111;
  user_id: any;
  id: any;
  otpForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private elementRef: ElementRef,
    private messageService: MessageService,
    protected api: ApiService,
  ) {
    this.otpForm = this.fb.group({
      otp1Value: new FormControl('', Validators.required),
      otp2Value: new FormControl('', Validators.required),
      otp3Value: new FormControl('', Validators.required),
      otp4Value: new FormControl('', Validators.required),
      otp5Value: new FormControl('', Validators.required),
      otp6Value: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    });

    const otpFields = this.elementRef.nativeElement.querySelectorAll('input[id^=otp]');

    otpFields.forEach((field: any, index: number) => {
      field.addEventListener('input', (event: any) => {
        if (event.data !== null && index < otpFields.length - 1) {
          const nextField = otpFields[index + 1];
          console.log('++++++++++++++',nextField);
          
          nextField.focus();
        } else if (event.inputType === 'deleteContentBackward' && index > 0) {
          const previousField = otpFields[index - 1];
          console.log('++++++++++++++',previousField);

          previousField.focus();
        }
      });
    });
  }
  get loginData() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.auth.login(this.loginForm.controls).subscribe({
      next: () => {
        // this.router.navigate(['pages']);
        // get return url from query parameters or default to home page
        this.token = JSON.parse(localStorage.getItem('user')!);
        this.user_type = this.token.data.user.user_type;

        if (this.user_type == 'student') {
          this.router.navigateByUrl('pages/dashboard');
        } else {
          this.visible = true;
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

  //user can press only numbers on keyboard
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
  }

  cancel() {
    // this.dismiss();
    this.router.navigate(['auth/login']);
  }

  resendOtp() { }

  verify() {
    this.otp = this.otpForm.controls['otp1Value'].value + this.otpForm.controls['otp2Value'].value + this.otpForm.controls['otp3Value'].value + this.otpForm.controls['otp4Value'].value + this.otpForm.controls['otp5Value'].value + this.otpForm.controls['otp6Value'].value;
    console.log('&&&&&&&&&&&', this.otp);
    console.log('this.getOtp', this.getOtp)

    if (this.getOtp == this.otp) {
      this.api.updateOtp(this.user_id, this.otp).subscribe((data: any) => {
        if (data['status'] == 200) {
          console.log('inside=============================');
          this.router.navigateByUrl('pages/adminDashboard');
          this.visible = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        } else {
          console.log(' Erorrrrrrrrrrrrrrrrrrr ')
          this.visible = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        }
      })
    }
  }
}