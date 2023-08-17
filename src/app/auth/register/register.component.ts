import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  displayNo1: boolean = false
  displayNo2: boolean = false
  countriesList: any[] = [];
  formData: any;
  value!: string;
  submitted: boolean = false;
  captcha: any;
  captchaImageUrl: any;
  captchaValue: any;

  constructor(
    private formBuilder: FormBuilder,
    protected api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getCountry().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.countriesList = data['data'];
      } else {
        console.log('Data not found!');
      }
    })

    this.api.createCaptcha().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.captchaImageUrl = data['data'];
        console.log('!!!!!!!!!!!!', this.captchaImageUrl);
        this.captchaValue = data['value'];
        console.log('$$$$$$$$$$$$', this.captchaValue);
      }
    })

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

  verifyCaptcha() { }

  Register() {
    this.formData = this.registerForm.value;
    console.log('::::::::::::::::::::::', this.formData);

    if (this.formData.captchaCtrl == this.captchaValue) {
      this.displayNo1 = true
      this.displayNo2 = false

      if (this.registerForm.valid) {
        this.api.RegisterValues(this.formData).subscribe((data: any) => {
          if (data['status'] == 200) {
            Swal.fire("Congratulation", 'You Successfully Registered', 'success');
          } else {
            Swal.fire("Ooops", 'Failed to register!', 'error');
          }
        })
      } else {
        Swal.fire("Ooops", 'Something Went Wrong!', 'error');
      }
    } else {
      Swal.fire("Ooops", 'Captcha dosent match!', 'error');
    }
  }

  GwtnewOTP() {
    this.displayNo2 = true
    this.displayNo1 = false
  }

  selectCountry() {


  }

  onChange(event: any) {
    console.log('eventeventevent', event);

  }
}
