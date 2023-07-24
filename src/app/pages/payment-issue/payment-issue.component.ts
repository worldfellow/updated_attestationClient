import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../../../config';
import { ApiService } from 'src/app/api.service';
import { ImageCroppedEvent } from "ngx-image-cropper";



@Component({
  selector: 'app-payment-issue',
  templateUrl: './payment-issue.component.html',
  styleUrls: ['./payment-issue.component.css'],
})
export class PaymentIssueComponent {
  registerForm: FormGroup;
  NameChangeLetterUrl = config.NameChangeLetterUrl;
  fileUploaded: File;
  imageChangedEvent: any;
  base64Image: any;
  token: any;
  user_id: any;
  croppedImage: any = "";
  height: number;
  width: number;
  file: File;
  issuedata: any;
  constructor(
    private formBuilder: FormBuilder,
    protected api: ApiService,) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      bankrefCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transactionCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      paymentdateCtrl: ['', Validators.required,],
      amountCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ordeidCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      noteCtrl: ['', Validators.required],
      fileInputCtrl: ['', Validators.required],
    });
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.getDetails();
   
}

handleFileInput(event: any): void {  
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    this.imageChangedEvent = event;
    this.fileUploaded = event.target.files[0];
    this.base64Image = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
    };
  }
}
imageCropped(event: ImageCroppedEvent): void {
  this.croppedImage = event.base64;
  this.height = event.height
  this.width = event.width
}
dataurl(croppedFile: any, name: any ,height : number , width : number) {
  const base64String = croppedFile.split(",")[1]; // Extract the base64 string from the data URI

  const byteCharacters = atob(base64String);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
  
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: "image/jpeg" });
  return new File([blob], name, { type: blob.type });
}
uploadDetails(){
  const fileUrl = this.dataurl(this.croppedImage, "11.jpeg",this.height,this.width)
  
  this.file = fileUrl
  const formData = new FormData();
  formData.append('file', this.file);
  console.log("this.file",this.file);
  
  formData.append('user_id', this.user_id);
  var data: any = {
    "emailCtrl": this.registerForm.controls['emailCtrl'].value,
    "bankrefCtrl": this.registerForm.controls['bankrefCtrl'].value,
    "transactionCtrl": this.registerForm.controls['transactionCtrl'].value,
    "paymentdateCtrl": this.registerForm.controls['paymentdateCtrl'].value,
    "amountCtrl": this.registerForm.controls['amountCtrl'].value,
    "ordeidCtrl": this.registerForm.controls['ordeidCtrl'].value,
    "noteCtrl": this.registerForm.controls['noteCtrl'].value,

  };

  if (this.registerForm.valid) {
   this.api.savepaymentissuedata(data,formData).subscribe((data: any) => {

    if (data['status'] == 200) {
      this.getDetails()
    }
  })
  }
}

getDetails(){
  this.api.getpaymentissuedata().subscribe((data: any)=>{
    if(data['status'] == 200){
      this.issuedata = data['data'];
    }else{
    }
  })
}
}
