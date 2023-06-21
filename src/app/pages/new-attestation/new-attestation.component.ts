import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-new-attestation',
  templateUrl: './new-attestation.component.html',
  styleUrls: ['./new-attestation.component.css']
})
export class NewAttestationComponent implements OnInit {
  @ViewChild(MatStepper) stepper: MatStepper
  firstForm: FormGroup;

  educationalDetails: any;
  instructionalDetails: any;
  curriculumDetails: any;
  gradToPer: any;
  affiliation: any;
  CompetencyLetter: any;
  LetterforNameChange: any;
  token: any;
  user_id: any;
  formdata: any;
  showButton: boolean;
  firstComplete: boolean = false;
  message: any;

  constructor(
    private router: Router,
    protected api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    console.log("this.user_idthis.user_id", this.user_id);

    this.firstForm = this.fb.group({
      educationalDetails: [],
      instructionalDetails: [],
      curriculumDetails: [],
      gradToPer: [],
      affiliation: [],
      CompetencyLetter: [],
      LetterforNameChange: [],
    })
  }

  onChange(){
    this.formdata = this.firstForm.value;
    
    if(this.formdata.educationalDetails == true || this.formdata.instructionalDetails == true || this.formdata.curriculumDetails == true || this.formdata.gradToPer == true || this.formdata.affiliation == true || this.formdata.CompetencyLetter == true || this.formdata.LetterforNameChange == true){
      this.showButton = true;
    }else{
      this.showButton = false;
    }
  }

  getUserEducation() {
    console.log("inside userEducation");

  }

  checktabs(event: any){
    // console.log("indexsdasds",event);
    
    // if (event.previouslySelectedIndex === 0) {
    //   // Check if step 1 is completed
    //   if (this.isStep1Completed()) {
    //     // Mark step 2 as completed
    //     this.stepper.selected.completed = true;
    //   } else {
    //     // Prevent navigation to step 2
    //     this.stepper.selected.editable = false;
    //   }
    // }
  }

  checkStepper(){
    console.log("inside checkstepper");
    
  }

  eduDetails(){
    this.firstComplete = true;
    this.formdata = this.firstForm.value;

    this.api.addUserEducationalDetails(this.formdata, this.user_id).subscribe((response: any) => {
      if (response['status'] == 200) {
        this.message = response.message;
      }
    });
  }

  nextStep() {
    console.log("selectedIndex == " + this.stepper.selectedIndex);
    // this.eduDetails(this.message);
    // console.log("selectedIndex == " + this.messgae);

    // if(this.stepper.selectedIndex == 1 && )
  }

}
