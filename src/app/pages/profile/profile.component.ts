import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MessageService} from 'primeng/api'; 
import { FormControl,FormGroup } from '@angular/forms';
import { CountriesService } from 'src/app/data/countries.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ MessageService,CountriesService]
})
export class ProfileComponent implements OnInit {
  checked: boolean = false;
  token:any;
  user_id:any;
  profileValue:any;
  firstName:any;
  surname:any;
  emailId:any;
  gender:any;
  mobile:any;
  mobileCode:any;
  whatsApp:any;
  whatsAppCode:any;
  userValue:boolean = true;
  userEmail:boolean = true;
  genderList:any=[];
  CountryCode:any=[];
  form: FormGroup;
  whatsAppInput:boolean = true; 

  profile: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    surname: new FormControl(''),
    gender: new FormControl(''),
    emailId: new FormControl(''),
    mobile: new FormControl(''),
    mobileCode: new FormControl(''),
    whatsAppCode: new FormControl(''),
    whatsApp : new FormControl('')
  })

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.genderList = [
      { name: 'Male' },
      { name: 'Female' },
      { name: 'Others' }
    ];
    this.refresh();
    console.log("countrycode",this.CountryCode);
  }
    
    constructor(protected api: ApiService,private messageService: MessageService,protected countries: CountriesService){
    this.CountryCode = this.countries.getData();

    }
    
  whatsAppCodeControl = new FormControl('');
  refresh(){
  this.api.getProfileValue(this.user_id).subscribe((data:any) =>{
    console.log("profileValue",data['data']['profile']);
    this.profileValue=data['data']['profile'];
    this.profile.patchValue({
      firstName : data['data']['profile']['name'],
      surname : data['data']['profile']['surname'] ,
      gender : data['data']['profile']['gender'],
      emailId : data['data']['profile']['email'],
      mobile : data['data']['profile']['mobile'],
      mobileCode : "+" + data['data']['profile']['mobile_country_code'],
      whatsApp : data['data']['profile']['what_mobile'],
      whatsAppCode : "+" + data['data']['profile']['what_mobile_country_code']
  })
  })
 }

 editData(){
  this.userValue=false;
 }
 onOptionSelected(option: any) {
  this.profile.get('whatsAppCode')?.setValue('+' + option.phonecode);
}

onOptionSelectedMob(option: any) {
  this.profile.get('mobileCode')?.setValue('+' + option.phonecode);
}

onChange(event:any){
  if(event.target.checked == true){
    if(event.target.value == "sameAsMobNO"){
      console.log("event.target.value",event.target.value);
      this.profile.get('whatsApp')?.setValue('');
      this.profile.get('whatsAppCode')?.setValue('');
      this.whatsAppInput = false
    }else{
      console.log("event.target.value",event.target.value);
      this.whatsAppInput = true
    } 
  }else{
    this.whatsAppInput = true
  }
}

 updateData(){
  this.userValue=true;
   
  const data={
    username:this.profile.controls['firstName'].value,
    surname:this.profile.controls['surname'].value,
    gender:this.profile.controls['gender'].value,
    email:this.profile.controls['emailId'].value,
    mobile_country_code:this.profile.controls['mobileCode'].value.replace('+',''),
    mobile:this.profile.controls['mobile'].value,
    whatsappCountryCode:this.profile.controls['whatsAppCode'].value.replace('+',''),
    whatsappMobile:this.profile.controls['whatsApp'].value,
  }
  
  this.api.updateProfile(this.user_id,data).subscribe((data:any)=>{
     if(data){
      if(data['status'] == 200){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });
        this.refresh();
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data['message'] });
      }
     }
  });
 }



}
