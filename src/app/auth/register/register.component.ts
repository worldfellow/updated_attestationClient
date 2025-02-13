import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { ConfirmationService } from 'primeng/api';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ConfirmationService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  instructionForm: FormGroup;
  displayNo1: boolean = false
  displayNo2: boolean = false
  countriesList: any[] = [];
  formData: any;
  value!: string;
  submitted: boolean = false;
  captchaUrl: string | undefined;
  instructionPage: boolean = false;
  registerPage: boolean = true;
  checked: boolean = false;
  instruction1: boolean = true;
  instruction2: boolean = true;
  isSectionDisabled: boolean = true;
  instructionData: any;
  otp: string;
  defaultSelect: any;
  public showPassword: boolean;
  public showConfmPassword: boolean;
  countrySelect: any;
  mobNo: any;
  @ViewChild('captcha') captcha!: ElementRef;
  @ViewChild('mobileNum') mobileNum!: ElementRef;
  @ViewChild('otp1Value') otp1Value!: ElementRef;
  @ViewChild('otp2Value') otp2Value!: ElementRef;
  @ViewChild('otp3Value') otp3Value!: ElementRef;
  @ViewChild('otp4Value') otp4Value!: ElementRef;
  @ViewChild('otp5Value') otp5Value!: ElementRef;
  @ViewChild('otp6Value') otp6Value!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    protected api: ApiService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api.getCountry().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.countriesList = data['data'];
        this.defaultSelect = data['data'][97].name;
        console.log('sdidfasudasid',this.defaultSelect);
      } else {
        console.log('Data not found!');
      }
    })

    this.getCaptcha();

    this.registerForm = this.formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      surnameCtrl: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      genderCtrl: [''],
      emailCtrl: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      passwordCtrl: ['', [Validators.required, , Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9_-]*$")]],
      confmPasswordCtrl: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*$")]],
      sameWappNoCtrl: [''],
      countryCtrl: ['', Validators.required],
      mobileNoCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      captchaCtrl: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]],
    }, {
      validator: this.MustMatch('passwordCtrl', 'confmPasswordCtrl')
    });

    this.instructionForm = this.formBuilder.group({
      instructionCtrl1: ['', [Validators.required]],
      instructionCtrl2: ['', [Validators.required]],
      instructionCtrl3: ['', [Validators.required]],
      instructionCtrl4: ['', [Validators.required]],
      instructionCtrl5: ['', [Validators.required]],
    });
  }

  getCaptcha() {
    this.api.createCaptcha().subscribe((data: any) => {
      if (data['status'] === 200) {
        this.captchaUrl = data['data'];
      } else {
        console.error('Error fetching captcha');
      }
    });
  }

  get f() { return this.registerForm.controls; }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (!control.value || control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onKeyPress(event: any) {
    this.api.checkEmailExist(this.registerForm.value.emailCtrl).subscribe((data: any) => {
      if (data['status'] == 400) {
        this.confirmationService.confirm({
          message: 'Your email id is already exists in our database!!! Do you want to login on this website using same id and password??',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
    
          accept: () => {
            this.router.navigate(['/auth/login']);
          },
    
          reject: () => {
            this.confirmationService.close();
          }
        })
      } else {
      }
    })
  }

  proceed() {
    this.submitted = true;
    this.formData = this.registerForm.value;
    console.log('::::::::::::::::::::::', this.formData);

    this.registerForm.controls['nameCtrl'].markAsDirty();
    this.registerForm.controls['surnameCtrl'].markAsDirty();
    this.registerForm.controls['genderCtrl'].markAsDirty();
    this.registerForm.controls['emailCtrl'].markAsDirty();
    this.registerForm.controls['passwordCtrl'].markAsDirty();
    this.registerForm.controls['confmPasswordCtrl'].markAsDirty();
    this.registerForm.controls['sameWappNoCtrl'].markAsDirty();
    this.registerForm.controls['countryCtrl'].markAsDirty();
    this.registerForm.controls['mobileNoCtrl'].markAsDirty();
    this.registerForm.controls['captchaCtrl'].markAsDirty();

    if (this.registerForm.valid) {
      if (this.formData.captchaCtrl == this.captchaUrl) {
        this.api.RegisterValues(this.formData).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.registerPage = false;
            this.instructionPage = true;
            Swal.fire("Congratulations", data.message, 'success');
          } else {
            Swal.fire("Ooops", data.message, 'error');
          }
        })
      } else {
        Swal.fire("Ooops", 'Captcha dosent match!', 'error');
        this.getCaptcha();
        this.captcha.nativeElement.value = '';
      }
    } else {
      Swal.fire("Ooops", 'Invalid Details!', 'error');
    }
  }

  Register() {
    console.log('JJJJJJJJJJJJJ',this.countrySelect);
    console.log('IIIIIIIIIII',this.mobNo);
    
    if (this.instructionForm.valid) {
      this.displayNo1 = true;
      this.displayNo2 = false;
      this.otp1Value.nativeElement.value = '';
      this.otp2Value.nativeElement.value = '';
      this.otp3Value.nativeElement.value = '';
      this.otp4Value.nativeElement.value = '';
      this.otp5Value.nativeElement.value = '';
      this.otp6Value.nativeElement.value = '';
    } else {
      Swal.fire("Ooops", 'Invalid Details!', 'error');
    }
  }

  verifyOTP(otp1Value: string, otp2Value: string, otp3Value: string, otp4Value: string, otp5Value: string, otp6Value: string) {
    this.otp = otp1Value + otp2Value + otp3Value + otp4Value + otp5Value + otp6Value;
    this.displayNo1 = false;
    this.api.verifyOtp(this.otp, this.registerForm.value.emailCtrl).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.router.navigate(['/auth/login']);
        Swal.fire("Congratulations", data.message, 'success');
      } else {
        Swal.fire("Ooops", data.message, 'error');
      }
    })
  }

  GwtnewOTP() {
    this.displayNo2 = true;
    this.displayNo1 = false;
    this.mobileNum.nativeElement.value = '';
  }
}
